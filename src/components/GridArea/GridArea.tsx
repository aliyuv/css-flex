import { useEffect, useRef, useState } from 'react'
import './GridArea.css'

interface PositionData {
  x: number
  y: number
  width: number
  height: number
}

export default function GridArea() {
  const areas = [
    { id: 'ga-sidebar', name: 'sidebar' },
    { id: 'ga-header', name: 'header' },
    { id: 'ga-main', name: 'main' },
  ]

  const [active, setActive] = useState('ga-sidebar')
  const containerRef = useRef<HTMLDivElement>(null)
  const lastPosRef = useRef<PositionData | null>(null)
  const animationRef = useRef<Animation | null>(null) // 新增动画引用

  // 安全计算比例（防止除以零）
  const safeScale = (oldVal: number, newVal: number) => {
    return newVal === 0 ? 1 : oldVal / newVal
  }

  const runFLIPAnimation = () => {
    if (!containerRef.current || !lastPosRef.current)
      return

    // 中止之前的动画
    if (animationRef.current) {
      animationRef.current.cancel()
    }

    const element = containerRef.current
    const first = lastPosRef.current
    const last = element.getBoundingClientRect()

    // 添加安全保护
    if (last.width === 0 || last.height === 0) {
      console.warn('Element has zero dimension, abort animation')
      return
    }

    const deltaX = first.x - last.x
    const deltaY = first.y - last.y
    const scaleX = safeScale(first.width, last.width)
    const scaleY = safeScale(first.height, last.height)

    // 关键修改1：立即应用初始变换
    element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`
    element.style.transformOrigin = 'top left'
    // 关键修改2：使用强制合成层优化
    const animation = element.animate([
      {
        transform: `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`,
      },
      {
        transform: 'translate(0, 0) scale(1, 1)',
      },
    ], {
      // 添加最小动画时间
      duration: Math.max(300, 500 * Math.abs(scaleX - 1)),
      easing: 'ease-in-out',
      fill: 'both',
    })
    // 动画完成后清理样式
    animation.onfinish = () => {
      element.style.transform = ''
    }
  }

  useEffect(() => {
    // 使用双重RAF保证DOM更新完成
    let rafId: number
    const startAnimation = () => {
      rafId = requestAnimationFrame(() => {
        // 强制同步布局
        containerRef.current?.getBoundingClientRect()
        runFLIPAnimation()
        lastPosRef.current = null
      })
    }

    startAnimation()
    return () => cancelAnimationFrame(rafId)
  }, [active])

  const handleClick = (area: string) => {
    if (!containerRef.current)
      return

    // 记录位置时强制同步布局
    const rect = containerRef.current.getBoundingClientRect()
    lastPosRef.current = {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    }

    setActive(area)
  }

  return (
    <>
      <div className="ga-contaniner">
        <div className="ga-contaniner-box">
          <div className="ga-tabs">
            <div className="ga-dec">
              <span>Grid Area</span>
              <span>:</span>
            </div>
            <div className="ga-items">
              {
                areas.map((item, i) => {
                  return (
                    <div
                      className="ga-box"
                      key={i}
                      onClick={() => handleClick(item.id)}
                    >
                      <div className="ga-box-dec">{item.name}</div>
                      <div className={`ga-bottomLine ${active === item.id ? 'active' : 'inactive'}`}></div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="ga-area">
            <div className="ga-grid">
              <div className="ga-top-line"></div>
              <div className="ga-bottom-line"></div>
              <div className="ga-sidebar">
                <div>sidebar</div>
              </div>
              <div className="ga-header">
                <div>header</div>
              </div>
              <div className="ga-main">
                <div>main</div>
              </div>
            </div>
            <div className="ga-shadow">
              <div className="ga-shandow-background" ref={containerRef} style={{ gridArea: active }}>
                <div className="ga-inner-box"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
