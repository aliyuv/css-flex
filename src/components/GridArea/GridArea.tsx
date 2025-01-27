import { useRef, useState } from 'react'
import { useFlipAnimation } from '../../hooks/useFlipAnimation.tsx'
import './GridArea.css'

export default function GridArea() {
  const areas = [
    { id: 'ga-sidebar', name: 'sidebar' },
    { id: 'ga-header', name: 'header' },
    { id: 'ga-main', name: 'main' },
  ]

  const [active, setActive] = useState('ga-sidebar')
  const containerRef = useRef<HTMLDivElement>(null)
  const { capturePosition } = useFlipAnimation(containerRef, active) // 传入触发依赖
  const handleClick = (area: string) => {
    if (!containerRef.current)
      return
    capturePosition() // 替换原来的位置记录逻辑
    setActive(area)
  }

  return (
    <>
      <div className="ga-contaniner">
        <div className="ga-contaniner-box">
          <div className="ga-tabs">
            <div className="ga-dec">
              <span>Grid Area</span>
              <span>:</span>
            </div>
            <div className="ga-items">
              {
                areas.map((item, i) => {
                  return (
                    <div
                      className="ga-box"
                      key={i}
                      onClick={() => handleClick(item.id)}
                    >
                      <div className="ga-box-dec" style={{ opacity: active === item.id ? 1 : 0.8 }}>{item.name}</div>
                      <div className={`ga-bottomLine ${active === item.id ? 'active' : 'inactive'}`}></div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="ga-area">
            <div className="ga-grid">
              <div className="ga-top-line"></div>
              <div className="ga-bottom-line"></div>
              <div className="ga-sidebar">
                <div>sidebar</div>
              </div>
              <div className="ga-header">
                <div>header</div>
              </div>
              <div className="ga-main">
                <div>main</div>
              </div>
            </div>
            <div className="ga-shadow">
              <div className="ga-shandow-background" ref={containerRef} style={{ gridArea: active }}>
                <div className="ga-inner-box"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
