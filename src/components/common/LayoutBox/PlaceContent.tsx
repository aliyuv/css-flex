import { animate, easeOut } from 'popmotion'
import { useRef } from 'react'
import useLayoutAnimation from '../../../hooks/useLayoutAnimation.tsx'
import './PlaceContent.css'

interface Props {
  isSwitchOn: boolean
  placeContent: string
}

const ANIMATION_DURATION = 300
const TRANSFORM_VALUE_LEFT_OPTIONS = 'translateX(10%) skewY(18deg) scaleX(0.85)'
const TRANSFORM_VALUE_RIGHT_OPTIONS = 'translateX(-10%) skewY(18deg) scaleX(0.85)'

export default function PlaceContent({
  isSwitchOn,
  placeContent,
}: Props) {
  const r1Ref = useRef<HTMLDivElement>(null)
  const c1Ref = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  useLayoutAnimation(
    [r1Ref, c1Ref, boxRef],
    [placeContent],
    (container) => {
      if (container.dataset.name === 'box') {
        container.style.placeContent = placeContent
      }
      else if (container.dataset.name === 'R1') {
        container.style.alignContent = placeContent
      }
      else if (container.dataset.name === 'C1') {
        container.style.justifyContent = placeContent
      }
    },
    (element) => {
      const currentX = Number(element.offsetLeft)
      const currentY = Number(element.offsetTop)
      const initialX = Number(element.dataset.oldX)
      const initialY = Number(element.dataset.oldY)
      const offsetX = initialX - currentX
      const offsetY = initialY - currentY
      const animation = animate({
        from: { offsetX, offsetY },
        to: { offsetX: 0, offsetY: 0 },
        duration: ANIMATION_DURATION,
        ease: easeOut,
        onUpdate: (val) => {
          element.style.transform = `translateX(${val.offsetX}px) translateY(${val.offsetY}px)`
        },
        onComplete: () => {
          element.style.transform = ``
        },
      })
      return {
        stop: () => animation.stop(),
      }
    },
  )
  return (
    <div className="PlaceContent-container">
      <div className="PlaceContent-inner">
        <div
          className="PlaceContent-items"
          style={{ transform: isSwitchOn ? TRANSFORM_VALUE_LEFT_OPTIONS : undefined }}
        >
          <div
            className="PlaceContent-item"
            ref={r1Ref}
            data-name="R1"
          >
            <div className="PlaceContent-text R1">R1</div>
          </div>
          <div
            className="PlaceContent-item"
            ref={c1Ref}
            data-name="C1"
          >
            <div className="PlaceContent-text C1">C1</div>
          </div>
        </div>
        <div
          className="PlaceContent-box"
          style={{ transform: isSwitchOn ? TRANSFORM_VALUE_RIGHT_OPTIONS : undefined }}
        >
          <div className="PlaceContent-box-inner" ref={boxRef} data-name="box">
            <div className="PlaceContent-box-item">
              <div className="">Child</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
