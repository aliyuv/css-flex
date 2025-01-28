import './LayoutBox.css'

interface switchProps {
  isOn: boolean
  activeTab: string
}

export default function LayoutBox({ isOn, activeTab }: switchProps) {
  return (
    <>
      <div className="lb-layout-box">
        <div className="lb-inner-box">
          <div
            className="lb-item"
            style={{
              transform: isOn ? 'translateX(10%) skewY(18deg) scaleX(0.85)' : 'translateX(0%) skewY(0deg) scaleX(1)',
            }}
          >
            <div
              className="lb-item-inner"
              style={{
                justifyContent: activeTab,
              }}
            >
              <div className="lb-items">C1</div>
              <div className="lb-items">C2</div>
            </div>
          </div>
          <div
            className="lb-grid"
            style={{
              transform: isOn ? 'translateX(-10%) skewY(18deg) scaleX(0.85)' : 'translateX(0%) skewY(0deg) scaleX(1)',
            }}
          >
            <div
              className="lb-grid-content"
              style={{
                justifyContent: activeTab,
              }}
            >
              <div className="lb-grid-item">
                <div className="lb-grid-inner"></div>
              </div>
              <div className="lb-grid-item">
                <div className="lb-grid-inner"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
