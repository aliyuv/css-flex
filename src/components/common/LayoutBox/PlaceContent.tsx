import './PlaceContent.css'

interface Props {
  isSwitchOn: boolean
  placeContent: string
}

const TRANSFORM_VALUE_LEFT_OPTIONS = 'translateX(10%) skewY(18deg) scaleX(0.85)'
const TRANSFORM_VALUE_RIGHT_OPTIONS = 'translateX(-10%) skewY(18deg) scaleX(0.85)'

export default function PlaceContent({
  isSwitchOn,
  placeContent,
}: Props) {
  return (
    <div className="PlaceContent-container">
      <div className="PlaceContent-inner">
        <div className="PlaceContent-items" style={{ transform: isSwitchOn ? TRANSFORM_VALUE_LEFT_OPTIONS : undefined }}>
          <div className="PlaceContent-item" style={{ alignContent: placeContent }}>
            <div className="PlaceContent-text R1">R1</div>
          </div>
          <div className="PlaceContent-item" style={{ justifyContent: placeContent }}>
            <div className="PlaceContent-text C1">C1</div>
          </div>
        </div>
        <div className="PlaceContent-box" style={{ transform: isSwitchOn ? TRANSFORM_VALUE_RIGHT_OPTIONS : undefined }}>
          <div className="PlaceContent-box-inner" style={{ placeContent }}>
            <div className="PlaceContent-box-item">
              <div className="">Child</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
