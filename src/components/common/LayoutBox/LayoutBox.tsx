import { animate } from 'popmotion'
import { useEffect, useRef } from 'react'
import './LayoutBox.css'

interface SwitchProps {
  isOn: boolean
  activeTab: string
  jiActiveTab: string
  displayCount: boolean
}

const ANIMATION_DURATION = 300
const CONTAINER_TRANSFORM_LEFT = 'translateX(-10%) skewY(18deg) scaleX(0.85)'
const CONTAINER_TRANSFORM_RIGHT = 'translateX(10%) skewY(18deg) scaleX(0.85)'
export default function LayoutBox({ isOn, activeTab, jiActiveTab, displayCount }: SwitchProps) {
  const itemInnerRef = useRef<HTMLDivElement>(null)
  const gridContentRef = useRef<HTMLDivElement>(null)
  const contentText = ['One', 'Two', 'Three', 'Four']
  useEffect(() => {
    if (!itemInnerRef || !gridContentRef)
      return
    const containers = [itemInnerRef.current, gridContentRef.current].filter(Boolean)
    containers.forEach((container) => {
      if (!container)
        return
      const items = Array.from(container.children) as HTMLDivElement[]

      const record = () => {
        items.forEach((e) => {
          const rect = e.getBoundingClientRect()
          e.dataset.oldX = rect.left.toString()
        })
      }

      const updateLayout = () => {
        (container as HTMLElement).style.justifyContent = activeTab
      }

      const playAnimation = () => {
        items.forEach((e) => {
          const rect = e.getBoundingClientRect()
          const dx = Number.parseFloat(e.dataset.oldX || '0') - rect.left

          e.animate(
            [
              { transform: `translateX(${dx}px` },
              { transform: 'translateX(0)' },
            ],
            { duration: ANIMATION_DURATION, easing: 'ease-out' },
          )
        })
      }
      record()
      updateLayout()
      playAnimation()
    })
  }, [activeTab])

  useEffect(() => {
    if (!gridContentRef.current)
      return

    const container = gridContentRef.current
    const items = Array.from(container.children) as HTMLElement[]

    const record = () => {
      items.forEach((e) => {
        // 记录相对父容器的位置和尺寸
        e.dataset.oldX = e.offsetLeft.toString()
        e.dataset.oldW = e.offsetWidth.toString()
      })
    }

    const updateLayout = () => {
      container.style.justifyItems = jiActiveTab
    }

    const playAnimation = () => {
      items.forEach((e) => {
        const newX = e.offsetLeft
        const newW = e.offsetWidth
        const oldX = Number(e.dataset.oldX)
        const oldW = Number(e.dataset.oldW)
        // 计算正确的位移和缩放
        const translateX = oldX - newX
        const scaleX = oldW / newW
        animate({
          from: { translateX, scaleX },
          to: { translateX: 0, scaleX: 1 },
          duration: ANIMATION_DURATION,
          onUpdate: (value) => {
            e.style.transform = `translateX(${value.translateX}px) scaleX(${value.scaleX})`
            // 对子元素应用反向缩放
            const childElements = e.querySelectorAll('.lb-text') as NodeListOf<HTMLElement>
            childElements.forEach((child) => {
              child.style.transform = `scaleX(${1 / value.scaleX})`
              child.style.transformOrigin = 'center' // 确保缩放的中心点一致 / 此处浪费了 48个小时
            })
          },
        })
      })
    }

    record()
    updateLayout()
    playAnimation()
  }, [jiActiveTab])
  return (
    <div className="lb-layout-box">
      <div className="lb-inner-box">
        <div className="lb-item" style={{ transform: isOn ? CONTAINER_TRANSFORM_RIGHT : undefined }}>
          <div className="lb-item-inner" ref={itemInnerRef}>
            <div className="lb-items">C1</div>
            <div className="lb-items">C2</div>
            <div className="lb-row-line" style={{ display: displayCount ? 'block' : 'none' }}></div>
          </div>
        </div>
      </div>
      <div className="lb-grid" style={{ transform: isOn ? CONTAINER_TRANSFORM_LEFT : undefined }}>
        <div className="lb-grid-content" ref={gridContentRef}>
          {
            contentText.slice(0, displayCount ? contentText.length : 2).map(item => (
              <div className="lb-grid-item" key={item}>
                <div className="lb-grid-item-box">
                  <div className="lb-grid-inner">
                    {displayCount && <div className="lb-text">{item}</div>}
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
