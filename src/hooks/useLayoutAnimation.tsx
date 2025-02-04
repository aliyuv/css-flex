import type React from 'react'
import { useEffect } from 'react'

interface AnimationControl {
  stop: () => void
}

export default function (
  containerRef: React.RefObject<HTMLElement>,
  effectDeps: React.DependencyList,
  updateLayout: (container: HTMLElement) => void,
  animateElement: (element: HTMLElement) => AnimationControl,
) {
  useEffect(() => {
    const container = containerRef.current
    if (!container)
      return

    // 记录初始位置
    const items = Array.from(container.children) as HTMLElement[]
    items.forEach((element) => {
      element.dataset.oldX = element.offsetLeft.toString()
      element.dataset.oldW = element.offsetWidth.toString()
    })

    // 应用布局更新
    updateLayout(container)

    // 执行动画并且返回清理函数
    const animations = items.map(element => animateElement(element))

    return () => {
      // 清理未完成的动画
      animations.forEach(animation => animation?.stop())
    }
  }, effectDeps)
}
