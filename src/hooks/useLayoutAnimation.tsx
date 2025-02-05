import type React from 'react'
import { useEffect } from 'react'

interface AnimationControl {
  stop: () => void
}

const syncGroups = new Map<string, { starts: (() => void)[], total: number }>()

export default function (
  containerRefs: React.RefObject<HTMLElement>[],
  effectDeps: React.DependencyList,
  updateLayout: (container: HTMLElement) => void,
  animateElement: (element: HTMLElement) => AnimationControl | undefined,
  syncGroup?: string,
) {
  useEffect(() => {
    let animations: AnimationControl[] = []
    const containers = containerRefs
      .map(ref => ref.current)
      .filter(Boolean) as HTMLElement[]
    containers.forEach((container) => {
      const items = Array.from(container.children) as HTMLElement[]
      items.forEach((element) => {
        element.dataset.oldX = element.offsetLeft.toString()
        element.dataset.oldW = element.offsetWidth.toString()
      })
    })

    containers.forEach(container => updateLayout(container))
    const startAnimations = () => {
      animations = containers.flatMap((container) => {
        return Array.from(container.children)
          .map(element => animateElement(element as HTMLElement))
          .filter((anim): anim is AnimationControl => anim !== undefined)
      })
    }

    if (syncGroup) {
      if (!syncGroups.has(syncGroup)) {
        syncGroups.set(syncGroup, { starts: [startAnimations], total: 1 })
      }
      else {
        const group = syncGroups.get(syncGroup)!
        group.starts.push(startAnimations)
        group.total += 1
        syncGroups.set(syncGroup, group)
      }
      const currentGroup = syncGroups.get(syncGroup)!
      if (currentGroup.starts.length === currentGroup.total) {
        currentGroup.starts.forEach(start => start())
        syncGroups.delete(syncGroup)
      }
    }
    else {
      startAnimations()
    }
    return () => {
      animations.forEach(anim => anim?.stop())
    }
  }, effectDeps)
}
