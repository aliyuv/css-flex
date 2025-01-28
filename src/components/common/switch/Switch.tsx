import { motion } from 'motion/react'
import './Switch.css'

interface State {
  handleIsOnChange: () => void
  isOn: boolean
}

export default function Switch({ handleIsOnChange, isOn }: State) {
  return (
    <>
      <label className="toggle-switch">
        <button
          className="toggle-container"
          style={{
            justifyContent: isOn ? 'flex-end' : 'flex-start',
          }}
          onClick={handleIsOnChange}
        >
          <motion.div
            className="toggle-handle"
            layout
            style={{ backgroundColor: isOn ? '#e3e6e8' : '#5d666f' }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 20,
            }}
          />
        </button>
        <div>Show Perspective</div>
      </label>
    </>
  )
}
