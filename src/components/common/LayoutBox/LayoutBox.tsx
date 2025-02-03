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
        if (!displayCount) {
          (container as HTMLElement).style.justifyItems = 'center'
        }
        else {
          (container as HTMLElement).style.justifyItems = jiActiveTab
        }
      }
      const playAnimation = () => {
        items.forEach((e) => {
          const rect = e.getBoundingClientRect()
          const dx = Number.parseFloat(e.dataset.oldX || '0') - rect.left
          const dw = Number.parseFloat(e.dataset.oldW || '0') / rect.width
          const animation = e.animate(
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
              fill: 'forwards',
            },
          )
          // animationP.play()
          // animationP.onfinish = () => {
          //   // 父元素宽度 = 原始宽度 * currentScale
          //   // 子元素缩放 = 1 / currentScale
          //   // 最终渲染宽度 = 父元素宽度 * 子元素缩放 = (原始宽度 * currentScale) * (1/currentScale) = 原始宽度
          //
          // }
          // requestAnimationFrame(() => {
          //   const progress = animationP.currentTime / animationP.effect.getComputedTiming().duration
          //   const currentScale = dw + (1 - dw) * progress
          //   console.log(1)
          //   console.log('当前缩放比例:', currentScale)
          //   const innerEl = e.querySelector('.lb-grid-item-box') as HTMLElement
          //   console.log('innerEl 存在?', !!innerEl) // 检查元素是否存在
          //   if (innerEl) {
          //     innerEl.style.transform = `scaleX(${1 / currentScale})`
          //   }
          // })
        })
      }
      record()
      updateLayout()
      playAnimation()
    })
  }, [jiActiveTab])
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
            ? 'translateX(-10%) skewY(18deg) scaleX(0.85) perspective(1000px)'
            : 'none',
        }}
      >
        <div className="lb-grid-content" ref={gridContentRef}>
          {
            contentText.map((item, index) => {
              if (displayCount) {
                return (
                  <div
                    className="lb-grid-item"
                    key={index}
                    style={{ width: displayCount ? 'auto' : '82px' }}
                    ref={gridItemRef}
                  >
                    <div className="lb-grid-item-box">
                      <div className="lb-grid-inner">
                        <div>{displayCount ? `${item}` : ''}</div>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            })
          }
        </div>
      </div>
    </div>
  )
}
