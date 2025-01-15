import { useEffect, useRef } from 'react'
import './FlexTypeV.css'

function FlexTypeV() {
  const world = ['A', 'B', 'C', 'D']
  const types = ['block', 'flex']
  // const [type, setType] = useState('block')
  const typeRef = useRef<string>('block')

  // flip思想 f 先获取元素 以及记录元素初始位置
  const containerRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const ref = useRef<any>({})

  useEffect(() => {
    // 初始位置
    ref.current.record = (container) => {
      // 记录初始位置
      const box = Array.from(container.children)
      box.forEach((item, index) => {
        const rect = item.getBoundingClientRect()
        item.firstX = rect.x
        item.firstY = rect.y
        item.firstW = rect.width
        item.firstH = rect.height
      })
    }

    ref.current.change = (container) => {
      if (typeRef.current === 'block') {
        container.style.display = 'flex'
        typeRef.current = 'flex'
      }
      else if (typeRef.current === 'flex') {
        container.style.display = 'block'
        typeRef.current = 'block'
      }
    }

    ref.current.play = (container) => {
      const box = Array.from(container.children)
      const arr = []
      box.forEach((item, index) => {
        const rect = item.getBoundingClientRect()
        const lastX = rect.x
        const lastY = rect.y
        const lastW = rect.width
        const lastH = rect.height

        const dx = item.firstX - lastX
        const dy = item.firstY - lastY
        arr.push({
          dx,
          dy,
          firstW: item.firstW,
          lastW,
          firstH: item.firstH,
          lastH,
        })
      })
      box.forEach((item, i) => {
        item.animate([
          {
            transform: `translate(${arr[i].dx}px, ${arr[i].dy}px)`,
            width: `${arr[i].firstW}px`,
            height: `${arr[i].firstH}px`,
          },
          {
            transform: `translate(${0}px, ${0}px)`,
            width: `${arr[i].lastW}px`,
            height: `${arr[i].lastH}px`,
          },
        ], {
          duration: 30000,
        })
      })
    }
  }, [])

  return (
    <>
      <div className="fv-container">
        <div className="fv-box" ref={containerRef}>
          {world.map((item, i) => (
            <div className="fv-list box" key={i}>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className="fv-display">
          <div>display:</div>
          {
            types.map((item, i) => (
              <div className="fv-btn" key={i}>
                <button onClick={() => {
                  ref.current.record(containerRef.current)
                  ref.current.change(containerRef.current)
                  ref.current.play(containerRef.current)
                }}
                >
                  {item}
                </button>
                <div className="fv-bottom-line"></div>
              </div>
            ))
          }
        </div>
      </div>
      {/* <SortLayout/> */}
    </>
  )
}

export default FlexTypeV
