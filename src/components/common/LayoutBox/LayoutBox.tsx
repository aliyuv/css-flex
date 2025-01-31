import { useEffect, useRef } from 'react'
import './LayoutBox.css'

interface SwitchProps {
  isOn: boolean
  activeTab: string
}

export default function LayoutBox({ isOn, activeTab }: SwitchProps) {
  const itemInnerRef = useRef<HTMLDivElement>(null)
  const gridContentRef = useRef<HTMLDivElement>(null)

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
              { transform: `translate(${dx}px,0` },
              { transform: 'translate(0, 0)' },
            ],
            {
              duration: 300,
              easing: 'ease-out',
            },
          )
        })
      }
      record()
      updateLayout()
      playAnimation()
    })
  }, [activeTab])

  return (
    <div className="lb-layout-box">
      <div className="lb-inner-box">
        <div
          className="lb-item"
          style={{
            position: 'absolute',
            transform: isOn
              ? 'translateX(10%) skewY(18deg) scaleX(0.85)'
              : 'translateX(0%) skewY(0deg) scaleX(1)',
          }}
        >
          <div
            className="lb-item-inner"
            ref={itemInnerRef}
          >
            <div className="lb-items">C1</div>
            <div className="lb-items">C2</div>
          </div>
        </div>
      </div>
      <div
        className="lb-grid"
        style={{ transform: isOn ? 'translateX(10%) skewY(18deg) scaleX(0.85)' : 'translateX(0%) skewY(0deg) scaleX(1)' }}
      >
        <div className="lb-grid-content" ref={gridContentRef}>
          <div className="lb-grid-item">
            <div className="lb-grid-inner"></div>
          </div>
          <div className="lb-grid-item">
            <div className="lb-grid-inner"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
