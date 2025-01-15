import React, { useEffect, useRef } from 'react'
import './SortLayout.css'

function SortLayout() {
  const container = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    // 1.first 先获取到需要的元素
    function record(container: React.RefObject<HTMLDivElement>) {
      if (container.current) {
        // 获取父元素的子元素数组
        const childrenArray = Array.from(container.current.children)
        childrenArray.forEach((item: Element) => {
          const rect = item.getBoundingClientRect()
          item.firstX = rect.left
          item.firstY = rect.top
          item.bgColor = getComputedStyle(item).getPropertyValue('background-color')
        })
      }
    }

    function change(container: React.RefObject<HTMLDivElement>) {
      const childrenArray = Array.from(container.current!.children)
      const len = childrenArray.length
      childrenArray.forEach((item, i) => {
        const newIndex = Math.floor(Math.random() * len)
        if (newIndex !== i) {
          const nextDOM = item.nextElementSiblin
          container.current!.insertBefore(item, childrenArray[i])
          container.current!.insertBefore(childrenArray[i], nextDOM)
        }
      })
    }

    function play(container: React.RefObject<HTMLDivElement>) {
      const childrenArray = Array.from(container.current!.children)
      childrenArray.forEach((item) => {
        const itemPos = item.getBoundingClientRect()
        const lastX = itemPos.left
        const lastY = itemPos.top
        const bgColor = getComputedStyle(item).getPropertyValue('background-color')
        item.animate([
          {
            transform: `translate(${item.firstX - lastX}px,${item.firstY - lastY}px)`,
            backgroundColor: item.bgColor,
          },
          {
            transform: `translate(${0}px,${0}px)`,
            backgroundColor: bgColor,
          },
        ], {
          duration: 600,
          easing: 'ease-in-out',
          fill: `forwards`,
        })
      })
    }

    btnRef.current!.addEventListener('click', () => {
      record(container)
      change(container)
      play(container)
    })
  }, [])

  return (
    <>
      <div className="sl-container" ref={container}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(element => (
            <div key={element} className="sl-box">{element}</div>
          ))
        }
      </div>
      <button ref={btnRef} className="sl-btn">随机排序</button>
    </>
  )
}

export default SortLayout
