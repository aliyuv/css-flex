import { animate, easeOut } from 'popmotion'
import { useRef } from 'react'
import useLayoutAnimation from '../../../hooks/useLayoutAnimation.tsx'
import './LayoutBox.css'

interface SwitchProps {
  isOn: boolean
  activeTab: string
  activeValue: string
  display_justify: boolean
  activeItem: string
}

const ANIMATION_DURATION = 300
const CONTAINER_TRANSFORM_LEFT = 'translateX(-10%) skewY(18deg) scaleX(0.85)'
const CONTAINER_TRANSFORM_RIGHT = 'translateX(10%) skewY(18deg) scaleX(0.85)'

export default function LayoutBox({ isOn, activeTab, activeValue, activeItem, display_justify }: SwitchProps) {
  const itemInnerRef = useRef<HTMLDivElement>(null)
  const gridContentRef = useRef<HTMLDivElement>(null)
  const gridItemRef = useRef<HTMLDivElement>(null)
  const contentText = ['One', 'Two', 'Three', 'Four']

  useLayoutAnimation(
    [itemInnerRef, gridContentRef],
    [activeTab],
    (container) => {
      container.style.justifyContent = activeTab
    },
    (element) => {
      const currentX = Number(element.offsetLeft)
      const initialX = Number(element.dataset.oldX)
      const offsetX = initialX - currentX
      const animation = animate({
        from: offsetX,
        to: 0,
        duration: ANIMATION_DURATION,
        ease: easeOut,
        onUpdate: (x) => {
          element.style.transform = `translateX(${x}px)`
        },
        onComplete: () => {
          element.style.transform = ``
        },
      })

      return {
        stop: () => animation.stop(),
      }
    },
    'my-sync-group', // 同步组标识
  )

  useLayoutAnimation(
    [gridContentRef, gridItemRef],
    [activeValue, activeItem, display_justify],
    (container) => {
      container.style.justifyItems = activeValue
      if (container.children && container.children.length >= 1) {
        (container.firstElementChild as HTMLElement).style.justifySelf = activeItem
      }
    },
    (element) => {
      const newX = element.offsetLeft
      const newW = element.offsetWidth
      const oldX = Number(element.dataset.oldX)
      const oldW = Number(element.dataset.oldW)

      const translateX = oldX - newX
      const scaleX = oldW / newW

      const animation = animate({
        from: { translateX, scaleX },
        to: { translateX: 0, scaleX: 1 },
        duration: ANIMATION_DURATION,
        ease: easeOut,
        onUpdate: (value) => {
          element.style.transform = `translateX(${value.translateX}px) scaleX(${value.scaleX})`
          const childElements = element.querySelectorAll<HTMLElement>('.lb-text')
          childElements.forEach((child) => {
            child.style.transform = `scaleX(${1 / value.scaleX})`
            child.style.transformOrigin = 'center'
          })
        },
        onComplete: () => {
          element.style.transform = ''
          const childElements = element.querySelectorAll<HTMLElement>('.lb-text')
          childElements.forEach(child => (child.style.transform = ''))
        },
      })

      return {
        stop: () => animation.stop(),
      }
    },
    'my-sync-group',
  )
  return (
    <div className="lb-layout-box">
      <div className="lb-inner-box">
        <div className="lb-item" style={{ transform: isOn ? CONTAINER_TRANSFORM_RIGHT : undefined }}>
          <div className="lb-item-inner" ref={itemInnerRef}>
            <div className="lb-items">C1</div>
            <div className="lb-items">C2</div>
            <div className={`lb-row-line ${display_justify ? 'visible' : 'hidden'}`} />
          </div>
        </div>
      </div>
      <div className="lb-grid" style={{ transform: isOn ? CONTAINER_TRANSFORM_LEFT : undefined }}>
        <div className="lb-grid-content" ref={gridContentRef}>
          {contentText
            .slice(0, display_justify ? contentText.length : 2)
            .map((item, i) => (
              <div className="lb-grid-item " key={item} ref={gridItemRef}>
                <div className="lb-grid-item-box">
                  <div className={`lb-grid-inner ${i === 0 ? 'active' : ''}`}>
                    {display_justify && <div className="lb-text">{item}</div>}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
