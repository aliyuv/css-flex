import { useEffect, useRef } from 'react'
import './LayoutBox.css'

interface SwitchProps {
  isOn: boolean
  activeTab: string
  jiActiveTab: string
  displayCount: boolean
}

export default function LayoutBox({ isOn, activeTab, jiActiveTab, displayCount }: SwitchProps) {
  const itemInnerRef = useRef<HTMLDivElement>(null)
  const gridContentRef = useRef<HTMLDivElement>(null)
  const gridItemRef = useRef<HTMLDivElement>(null)
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
              {
                transform: `translateX(${dx}px`,
              },
              {
                transform: 'translateX(0)',
              },
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

  useEffect(() => {
    if (!gridContentRef)
      return
    const containers = [gridContentRef.current].filter(Boolean)
    containers.forEach((container) => {
      if (!container)
        return
      const items = Array.from(container.children) as HTMLDivElement[]

      const record = () => {
        items.forEach((e) => {
          const rect = e.getBoundingClientRect()
          e.dataset.oldX = rect.left.toString()
          e.dataset.oldW = rect.width.toString()
        })
      }

      const updateLayout = () => {
        (container as HTMLElement).style.justifyItems = jiActiveTab
      }
      const playAnimation = () => {
        items.forEach((e) => {
          const rect = e.getBoundingClientRect()
          const dx = Number.parseFloat(e.dataset.oldX || '0') - rect.left
          const dw = Number.parseFloat(e.dataset.oldW || '0') / rect.width
          e.animate(
            [
              {
                transform: `translateX(${dx}px) scaleX(${dw})`,
              },
              {
                transform: 'translateX(0) scaleX(1)',
              },
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
  }, [jiActiveTab, displayCount])
  return (
    <div className="lb-layout-box">
      <div className="lb-inner-box">
        <div
          className="lb-item"
          style={{
            transform: isOn
              ? 'translateX(10%) skewY(18deg) scaleX(0.85)'
              : 'none',
          }}
        >
          <div
            className="lb-item-inner"
            ref={itemInnerRef}
          >
            <div className="lb-items">C1</div>
            <div className="lb-items">C2</div>
            <div className="lb-row-line" style={{ display: displayCount ? 'block' : 'none' }}></div>
          </div>
        </div>
      </div>
      <div
        className="lb-grid"
        style={{
          transform: isOn
            ? 'translateX(-10%) skewY(18deg) scaleX(0.85)'
            : 'none',
        }}
      >
        <div className="lb-grid-content" ref={gridContentRef}>
          {displayCount
            ? (
                contentText.map((item, index) => (
                  <div
                    className="lb-grid-item"
                    key={index}
                    ref={gridItemRef}
                  >
                    <div className="lb-grid-item-box">
                      <div
                        className="lb-grid-inner"
                      >
                        <div>{displayCount ? `${item}` : ''}</div>
                      </div>
                    </div>
                  </div>
                ))
              )
            : (
                contentText.slice(0, 2).map((item, index) => (
                  <div
                    className="lb-grid-item"
                    key={index}
                    ref={gridItemRef}
                  >
                    <div
                      className="lb-grid-item-box"
                    >
                      <div
                        className="lb-grid-inner"
                        style={{
                          transform: isOn ? 'scaleX(1.176) skewY(-18deg)' : 'none',
                          transformOrigin: '0 0',
                        }}
                      >
                        <div>{displayCount ? `${item}` : ''}</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
        </div>
      </div>
    </div>
  )
}
