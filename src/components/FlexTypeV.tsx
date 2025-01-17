import { useEffect, useRef, useState } from 'react'
import './FlexTypeV.css'

interface AnimatedElement extends Element {
  firstX: number
  firstY: number
  firstW: number
  firstH: number
}

interface AnimationInfo {
  dx: number
  dy: number
  firstW: number
  lastW: number
  firstH: number
  lastH: number
}

export default function FlexTypeV() {
  const world = ['Hello', 'to', 'the', 'world']
  const types = ['block', 'flex']
  const [active, setActive] = useState<string>('block')
  const typeRef = useRef<string>('block')
  const containerRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)
  const ref = useRef<any>({})

  useEffect(() => {
    // 获取影子盒子容器的具体位置信息
    if (shadowRef.current && containerRef.current) {
      const box = Array.from(containerRef.current.children) as HTMLElement[]
      const shadowbox = Array.from(shadowRef.current.children) as HTMLElement[]
      const shadow_rect = shadowRef.current.getBoundingClientRect()

      shadowbox.forEach((item, i) => {
        const rect = item.getBoundingClientRect()
        box[i].style.width = `${rect.width}px`
        box[i].style.height = `${rect.height}px`
        box[i].style.left = `${rect.x - shadow_rect.x}px`
        box[i].style.top = `${rect.y - shadow_rect.y}px`
      })
    }

    ref.current.record = (container: HTMLDivElement) => {
      const box = Array.from(container.children) as AnimatedElement[]
      box.forEach((item) => {
        const rect = item.getBoundingClientRect()
        item.firstX = rect.x
        item.firstY = rect.y
        item.firstW = rect.width
        item.firstH = rect.height
      })
    }

    ref.current.change = (shadow: HTMLDivElement) => {
      if (typeRef.current === 'block') {
        shadow.style.display = 'flex'
        typeRef.current = 'flex'
      }
      else if (typeRef.current === 'flex') {
        shadow.style.display = 'block'
        typeRef.current = 'block'
      }
    }

    ref.current.play = (shadow: HTMLDivElement, container: HTMLDivElement) => {
      const shadowbox = Array.from(shadow.children) as AnimatedElement[]
      const arr: AnimationInfo[] = []
      shadowbox.forEach((item: AnimatedElement) => {
        const rect = item.getBoundingClientRect()
        const lastX = rect.x
        const lastY = rect.y
        const lastW = rect.width
        const lastH = rect.height

        const dx = lastX - item.firstX
        const dy = lastY - item.firstY
        arr.push({
          dx,
          dy,
          firstW: item.firstW,
          lastW,
          firstH: item.firstH,
          lastH,
        })
      })

      const box = Array.from(container.children)
      box.forEach((item, i) => {
        const current_info = arr[i]
        let targetX = arr[i].dx
        let targetY = arr[i].dy

        if (typeRef.current === 'block') {
          targetX = 0
          targetY = 0
        }
        // if (typeRef.current === 'flex') {
        //   targetX = 0
        //   targetY = 0
        // }

        item.animate([
          {
            transform: window.getComputedStyle(item, null).getPropertyValue('transform'),
            width: window.getComputedStyle(item, null).getPropertyValue('width'),
            height: window.getComputedStyle(item, null).getPropertyValue('height'),
          },
          {
            transform: `translate(${targetX}px, ${targetY}px)`,
            width: `${current_info.lastW}px`,
            height: `${current_info.lastH}px`,
          },
        ], {
          duration: 500,
          fill: 'forwards',
          easing: 'ease',
        })
      })
    }
  }, [])

  return (
    <>
      <div className="fv-container">
        <div className="fv-box" ref={containerRef}>
          {world.map((item, i) => (
            <div className="fv-box-item" key={i}>
              <div
                className="fv-box-inner"
                key={i}
                style={{
                  textAlign: active === 'block' ? 'left' : 'center',
                }}
              >
                <span>{item}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="fv-box fv-box-shadow" ref={shadowRef}>
          {world.map((item, i) => (
            <div className="fv-box-item" key={i}>
              <div className="fv-box-inner">
                <span>{item}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="fv-display">
          <div className="fv-des">display:</div>
          {
            types.map((item, i) => (
              <div className="fv-btn" key={i}>
                <button
                  onClick={() => {
                    ref.current.record(shadowRef.current)
                    ref.current.change(shadowRef.current)
                    ref.current.play(shadowRef.current, containerRef.current)
                    setActive(item)
                  }}
                  style={{ opacity: active === item ? 1 : 0.6 }}
                >
                  {item}
                </button>
                <div
                  className="fv-bottom-line"
                  style={{ height: active === item ? 4 : 1, filter: active === item ? 'saturate(100%)' : 'saturate(0%)' }}
                >
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
