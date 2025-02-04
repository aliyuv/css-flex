import { motion } from 'motion/react'
import { useState } from 'react'
import './FlexDiretion.css'

function FlexDirection() {
  const typeValues = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']
  const worlds = ['Hello', 'to', 'the', 'World']
  const [justify, setJustify] = useState<'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'>('flex-start')
  const [direction, setDirection] = useState<'column' | 'row'>('column')
  const directions = [`column`, `row`]
  const [isOn, setIsOn] = useState(false)
  const toggleSwitch = () => setIsOn(!isOn)
  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  }

  return (
    <>
      <div className="fd-flexdir">
        <div className="fd-switch">
          <div className="switch" data-ison={isOn} onClick={toggleSwitch}>
            <motion.div
              className="fd-handle"
              layout
              transition={spring}
              style={{
                backgroundColor: !isOn ? 'rgb(93, 102, 111)' : 'rgb(227, 230, 232)',
              }}
            />
          </div>
          <span>Show Primary Axis</span>
        </div>
        <motion.div className="fd-flexContent" layout>
          <motion.ul
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: justify,
              flexDirection: direction,
              position: 'relative',
            }}
          >
            {worlds.map((item, index) => (
              <motion.div
                layout
                className="fd-inner"
                key={index}
                initial={{ borderRadius: 4 }}
              >
                <motion.li
                  layout
                  initial={{ borderRadius: 2 }}
                  style={{
                    height: direction === 'column' ? 'auto' : '100%',
                    width: direction === 'column' ? '100%' : 'auto',
                  }}
                >
                  <motion.span
                    layout="preserve-aspect"
                    style={{
                      fontSize: item === 'Hello' || item === 'World' ? '22px' : '',
                    }}
                  >
                    {item}
                  </motion.span>
                </motion.li>
              </motion.div>
            ))}
            <motion.div
              className="fd-primary-axis"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isOn ? 1 : 0,
              }}
              style={{
                transform: direction === 'column' ? 'translate(-50%,-50%) rotate(-630deg)' : 'translate(-50%, -50%)',
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: direction === 'column' ? `calc(100% - 470px)` : 'calc(100% - 4px)',
              }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
            >
              <span className="fd-paxis">Primary Axis</span>
              <div className="fd-secondary-axis">
                <div></div>
                <div
                  className="fd-line"
                  style={{
                  }}
                >
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  className="agwqywx"
                  fill="none"
                  stroke="#e3e6e8"
                  strokeWidth="2"
                >
                  <path
                    d="
      M 8 0
      L 16 8
      L 8 16
    "
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                  </path>
                </svg>
              </div>
            </motion.div>
          </motion.ul>

        </motion.div>
        <div className="fd-flextype">
          <div className="fd-flexmenu">
            <span>flex-direction:</span>
            <select onChange={e => setDirection(e.target.value as 'row' | 'column')}>
              {
                directions.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))
              }
            </select>
            <div className="fd-svg-arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgb(227, 230, 232)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-down"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </div>
          </div>
          <div className="fd-flexmenu">
            <span>just-content:</span>
            <select onChange={(e) => {
              setJustify(e.target.value as 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly')
            }}
            >
              {
                typeValues.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))
              }
            </select>
            <div className="fd-svg-arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgb(227, 230, 232)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-down"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FlexDirection
