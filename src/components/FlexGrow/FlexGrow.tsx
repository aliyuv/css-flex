import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './FlexGrow.css'

interface FlexGrowMap {
  a: number
  b: number
}

interface AnimatedElement extends HTMLElement {
  StartX: number
  StartW: number
}

export default function FlexGrow() {
  const contentRef = useRef<HTMLDivElement>(null)
  const recordRef = useRef<any>()
  const changeRef = useRef<any>()
  const [flexGrowMap, setFlexGrowMap] = useState<FlexGrowMap>({
    a: 1,
    b: 1,
  })

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

  useEffect(() => {
    // flip
    // first 先获取所有已知的信息  元素已知的

    recordRef.current = () => {
      // 获取初始信息
      const contentBoxArr = Array.from(contentRef.current!.children) as AnimatedElement[]
      contentBoxArr.forEach((item) => {
        // 获取content里面的子元素初始位置信息
        const rect = item.getBoundingClientRect()
        item.StartX = rect.x
        item.StartW = rect.width
      })
    }
  }, [])

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
                    <button onClick={() => {
                      decrementChild(childId)
                      changeRef.current(childId)
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
                    <button onClick={() => incrementChild(childId)}>
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
