import { useState } from 'react'
import './GridArea.css'

export default function GridArea() {
  const containerName = ['sidebar', 'header', 'main']
  const [containerNamec, setContainerNamec] = useState('sidebar')
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
                containerName.map((item, i) => {
                  return (
                    <div className="ga-box" key={i} onClick={() => { setContainerNamec(item) }}>
                      <div className="ga-box-dec">{item}</div>
                      <div className={`ga-bottomLine ${containerNamec === item ? 'active' : 'inactive'}`}></div>
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
              <div className="ga-shandow-background">
                <div className="ga-inner-box"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
