import { useCallback, useMemo, useRef, useState } from 'react'
import './FlexGrow.css'

interface FlexGrowMap {
  a: number
  b: number
}

// interface AnimatedElement extends HTMLElement {
//   StartX: number
//   StartY: number
//   StartW: number
//   StartH: number
// }
//
// interface ContentRef {
//   current: HTMLDivElement | null
// }

export default function FlexGrow() {
  const contentRef = useRef<HTMLDivElement>(null)
  // const recordRef = useRef<any>()
  // const changeRef = useRef<any>()
  // const playRef = useRef<any>()
  const [flexGrowMap, setFlexGrowMap] = useState<FlexGrowMap>({
    a: 1,
    b: 1,
  })
  // const flexGrowMapRef = useRef(flexGrowMap)

  const incrementChild = useCallback((childId: keyof FlexGrowMap) => {
    setFlexGrowMap(currentMap => ({
      ...currentMap,
      [childId]: currentMap[childId] + 1,
    }))
  }, [])

  const decrementChild = useCallback((childId: keyof FlexGrowMap) => {
    setFlexGrowMap((currentMap) => {
      const currentVal = currentMap[childId]
      if (currentVal <= 0) {
        return currentMap
      }
      return { ...currentMap, [childId]: currentVal - 1 }
    })
  }, [])

  const totalGrow = useMemo(() => {
    return Object.values(flexGrowMap).reduce((acc, item) => acc + item, 0)
  }, [flexGrowMap])

  const isDisabled = (childId: keyof FlexGrowMap) => {
    // 当总和为0或当前元素为0时，按钮禁用
    return totalGrow <= 0 || flexGrowMap[childId] <= 0
  }
  // useEffect(() => {
  //   flexGrowMapRef.current = flexGrowMap
  // }, [flexGrowMap])
  //
  // useEffect(() => {
  //   // flip
  //   // first 先获取所有已知的信息  元素已知的
  //
  //   recordRef.current = (contentRef: ContentRef) => {
  //     // 获取初始信息
  //     const contentBoxArr = Array.from(contentRef.current!.children) as AnimatedElement[]
  //     contentBoxArr.forEach((item) => {
  //       // 获取content里面的子元素初始位置信息
  //       const rect = item.getBoundingClientRect()
  //       item.StartX = rect.left
  //       item.StartY = rect.top
  //       item.StartW = rect.width
  //       item.StartH = rect.height
  //     })
  //   }
  //
  //   changeRef.current = (contentRef: ContentRef) => {
  //     const contentBoxArr = Array.from(contentRef.current!.children) as AnimatedElement[]
  //     contentBoxArr.forEach((item, index) => {
  //       // 根据元素的索引设置对应的 flexGrow 值
  //       const key = (['a', 'b'] as const)[index]
  //       // 设置flexGrow
  //       item.style.flexGrow = `${flexGrowMapRef.current[key]}`
  //     })
  //   }
  //
  //   playRef.current = (contentRef: ContentRef) => {
  //     const contentBoxArr = Array.from(contentRef.current!.children) as AnimatedElement[]
  //     contentBoxArr.forEach((item, index) => {
  //       const rect = item.getBoundingClientRect()
  //       const lastX = rect.left
  //       const lastY = rect.top
  //
  //       const deltaX = item.StartX - lastX
  //       const deltaY = item.StartY - lastY
  //
  //       const key = (['a', 'b'] as const)[index]
  //       const initialFlexGrow = Number.parseFloat(window.getComputedStyle(item).flexGrow)
  //       const targetFlexGrow = flexGrowMapRef.current[key]
  //
  //       const animation = item.animate([
  //         {
  //           transform: `translateX(0px) translateY(0px)`,
  //           flexGrow: initialFlexGrow.toString(),
  //         },
  //         {
  //           transform: `translateX(${deltaX}px) translateY(${deltaY}px)`,
  //           flexGrow: targetFlexGrow.toString(),
  //         },
  //       ], {
  //         duration: 300,
  //         easing: 'ease-in-out',
  //       })
  //
  //       animation.onfinish = () => {
  //         // 确保动画结束时，元素的 flexGrow 被设置为目标值
  //         item.style.flexGrow = targetFlexGrow.toString()
  //       }
  //     })
  //   }
  // }, [])
  //
  // useEffect(() => {
  //   if (contentRef.current) {
  //     recordRef.current(contentRef)
  //     changeRef.current(contentRef)
  //     playRef.current(contentRef)
  //   }
  // }, [flexGrowMap])

  return (
    <>
      <div className="fg-container">
        <div className="fg-content" ref={contentRef}>
          {
            (['a', 'b'] as const).map((childId, i) => (
              <div
                className="fg-box"
                key={i}
                style={{
                  flexGrow: flexGrowMap[childId],
                  backgroundColor: totalGrow !== 0 && flexGrowMap[childId] !== 0 ? '#454d54' : '#1a1f23',
                  borderColor: isDisabled(childId) ? '#454d54' : '#9ca8b4',
                }}
              >
                <div className="fg-top-line"></div>
                <div className="fg-box-item">
                  <div className="fg-desc">flex-grow:</div>
                  {
                    totalGrow !== 0 && flexGrowMap[childId] !== 0
                      ? (
                          <div className="fg-mid-content">
                            <span className="fg-numerator">{flexGrowMap[childId]}</span>
                            <div className="fg-separator"></div>
                            <span className="fg-denominator">{totalGrow}</span>
                          </div>
                        )
                      : (
                          <div className="fg-mid-content">
                            <span className="fg-denominator">
                              {flexGrowMap[childId]}
                            </span>
                          </div>
                        )
                  }

                  <div className="fg-btns">
                    <button
                      onClick={() => {
                        decrementChild(childId)
                      }}
                      disabled={isDisabled(childId)}
                      style={{
                        backgroundColor: isDisabled(childId) ? '#454d54' : '#75808a',
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-minus"
                      >
                        <path d="M5 12h14"></path>
                      </svg>
                    </button>
                    <button onClick={() => {
                      incrementChild(childId)
                    }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-plus"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
