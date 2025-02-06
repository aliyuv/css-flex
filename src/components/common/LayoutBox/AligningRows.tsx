import './AligningRows.css'

export default function AligningRows() {
  const textArr = ['One', 'Two', 'Three', 'Four']
  return (
    <div className="ar-container">
      <div className="ar-layout-container">
        <div className="ar-inner">
          <div className="ar-inner-items columns">
            <div className="column" style={{ gridColumn: `1`, gridRow: `1 / 3` }}>C1</div>
            <div className="column" style={{ gridColumn: `2`, gridRow: `1 / 3 ` }}>C2</div>
          </div>
          <div className="ar-inner-items rows">
            <div className="row" style={{ gridColumn: `1 / 3 `, gridRow: `1` }}>R1</div>
            <div className="row" style={{ gridColumn: `1 / 3`, gridRow: `2` }}>R2</div>
          </div>
        </div>
        <div className="ar-grid-items">
          {
            textArr.map(item => (
              <div className="ar-grid-layout">
                <div key={item} className="ar-grid-item">
                  <div>{item}</div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
