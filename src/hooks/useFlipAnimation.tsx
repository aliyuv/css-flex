import type { RefObject } from 'react'
import { useEffect, useRef } from 'react'

interface PositionData {
  x: number
  y: number
  width: number
  height: number
}

export function useFlipAnimation(targetRef: RefObject<HTMLElement>, trigger: unknown) {
  const lastPosRef = useRef<PositionData | null>(null)
  const animationRef = useRef<Animation | null>(null)

  // 安全比例计算
  const safeScale = (oldVal: number, newVal: number) =>
    newVal === 0 ? 1 : oldVal / newVal

  // 记录初始位置
  const capturePosition = () => {
    if (!targetRef.current)
      return

    const rect = targetRef.current.getBoundingClientRect()
    lastPosRef.current = {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    }
  }

  // 运行动画核心逻辑
  const runAnimation = () => {
    if (!targetRef.current || !lastPosRef.current)
      return

    const element = targetRef.current
    const first = lastPosRef.current
    const last = element.getBoundingClientRect()

    if (last.width === 0 || last.height === 0) {
      console.warn('Invalid element dimensions')
      return
    }

    const deltaX = first.x - last.x
    const deltaY = first.y - last.y
    const scaleX = safeScale(first.width, last.width)
    const scaleY = safeScale(first.height, last.height)

    // 中止之前的动画
    animationRef.current?.cancel()

    // 应用动画
    animationRef.current = element.animate([
      {
        transform: `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`,
        transformOrigin: 'top left',
      },
      { transform: 'translate(0, 0) scale(1, 1)' },
    ], {
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'both',
    })

    // 清理
    animationRef.current.onfinish = () => {
      element.style.transform = ''
    }
  }

  // 触发动画的副作用
  useEffect(() => {
    let rafId: number

    const startAnimation = () => {
      rafId = requestAnimationFrame(() => {
        targetRef.current?.getBoundingClientRect() // 强制重排
        runAnimation()
        lastPosRef.current = null
      })
    }

    startAnimation()
    return () => {
      cancelAnimationFrame(rafId)
      animationRef.current?.cancel()
    }
  }, [trigger])

  return { capturePosition }
}
