import './CommonTabs.css'

interface props {
  props: [] | string[]
  dec?: string
  onChange?: (value: string) => void
  activeTab: string
}

export default function CommonTabs({ props, dec, onChange, activeTab }: props) {
  return (
    <>
      <div className="ct-tab-contaniner">
        <div className="ct-tab-inner">
          <div className="ct-tab-button">
            <div className="ct-dec">{dec}</div>
            <div className="ct-items">
              {
                props.map((item, i) => (
                  <button key={i} className="ct-btn" onClick={() => onChange?.(item)}>
                    <span className="ct-arrt" style={{ opacity: item === activeTab ? 1 : 0.8 }}>{item}</span>
                    <div className={`ct-bottomLine ${item === activeTab ? 'active' : 'inactive'}`}></div>
                  </button>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
