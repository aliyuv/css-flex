import './PlaceContent.css'

export default function PlaceContent() {
  return (
    <div className="PlaceContent-container">
      <div className="PlaceContent-inner">
        <div className="PlaceContent-items">
          <div
            className="PlaceContent-item"
          >
            <div className="PlaceContent-text R1">R1</div>
          </div>
          <div
            className="PlaceContent-item"
          >
            <div className="PlaceContent-text C1">C1</div>
          </div>
        </div>
        <div className="PlaceContent-box">
          <div className="PlaceContent-box-inner">
            <div className="PlaceContent-item">
              <div className="">Child</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
