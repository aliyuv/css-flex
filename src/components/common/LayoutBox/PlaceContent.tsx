import { motion } from 'motion/react'
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
        <motion.div
          className="PlaceContent-items"
          style={{ transform: isSwitchOn ? TRANSFORM_VALUE_LEFT_OPTIONS : undefined }}
          layout
        >
          <motion.div
            className="PlaceContent-item"
            style={{ alignContent: placeContent }}
            layout
          >
            <motion.div className="PlaceContent-text R1" layout>R1</motion.div>
          </motion.div>
          <motion.div
            className="PlaceContent-item"
            style={{ justifyContent: placeContent }}
            layout
          >
            <motion.div className="PlaceContent-text C1" layout>C1</motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className="PlaceContent-box"
          style={{ transform: isSwitchOn ? TRANSFORM_VALUE_RIGHT_OPTIONS : undefined }}
          layout
        >
          <motion.div className="PlaceContent-box-inner" style={{ placeContent }} layout>
            <motion.div className="PlaceContent-box-item" layout>
              <motion.div className="" layout>Child</motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
