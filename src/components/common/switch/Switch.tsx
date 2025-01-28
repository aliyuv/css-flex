import { motion } from 'motion/react'
import { useState } from 'react'
import './Switch.css'

export default function Switch() {
  const [isOn, setIsOn] = useState(false)

  const toggleSwitch = () => setIsOn(!isOn)

  return (
    <>
      <label className="toggle-switch">
        <button
          className="toggle-container"
          style={{
            justifyContent: isOn ? 'flex-start' : 'flex-end',
          }}
          onClick={toggleSwitch}
        >
          <motion.div
            className="toggle-handle"
            layout
            style={{ backgroundColor: isOn ? ' #5d666f' : '#e3e6e8' }}
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
