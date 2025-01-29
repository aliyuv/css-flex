import { motion } from 'motion/react'
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
          <motion.div
            className="lb-item"
            style={{
              transform: isOn
                ? 'translateX(10%) skewY(18deg) scaleX(0.85)'
                : 'translateX(0%) skewY(0deg) scaleX(1)',
            }}
          >
            <motion.div
              className="lb-item-inner"
              style={{ justifyContent: activeTab }}
              layout
            >
              <motion.div
                className="lb-items"
                layout
              >
                C1
              </motion.div>
              <motion.div
                className="lb-items"
                layout
              >
                C2
              </motion.div>
            </motion.div>
          </motion.div>
          <div
            className="lb-grid"
            style={{
              transform: isOn
                ? 'translateX(-10%) skewY(18deg) scaleX(0.85)'
                : 'translateX(0%) skewY(0deg) scaleX(1)',
            }}
          >
            <motion.div
              className="lb-grid-content"
              style={{ justifyContent: activeTab }}
            >
              <motion.div className="lb-grid-item" layout>
                <motion.div className="lb-grid-inner"></motion.div>
              </motion.div>
              <motion.div className="lb-grid-item" layout>
                <motion.div className="lb-grid-inner"></motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
