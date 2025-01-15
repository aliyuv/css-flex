import { motion } from 'motion/react'
import { useState } from 'react'
import './FlexDiretion.css'

function FlexDirection() {
  const typeValues = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']
  const worlds = ['Hello', 'to', 'the', 'World']
  const [justify, setJustify] = useState<'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'>('flex-start')
  const [direction, setDirection] = useState<'row' | 'column'>('row')
  const directions = [`row`, `column`]
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
              className="handle"
              layout
              transition={spring}
              style={{
                backgroundColor: !isOn ? 'rgb(93, 102, 111)' : 'rgb(227, 230, 232)',
              }}
            />
          </div>
          <span>Show Primary Axis</span>
        </div>
        <div className="fd-flexContent">
          <motion.ul style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: justify,
            flexDirection: direction,
            position: 'relative',
          }}
          >
            {worlds.map((item, index) => (
              <motion.li
                key={index}
                layout="preserve-aspect"
                style={{
                  height: direction === 'column' ? '50px' : '100%',
                  width: direction === 'column' ? '100%' : '100px',
                  outline: ' 1px solid  rgb(230, 232, 240)',
                  borderRadius: '10px',
                }}
              >
                {item}
              </motion.li>

            ))}
            <motion.div
              className="fd-primary-axis"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isOn ? 1 : 0,
              }}
              style={{
                transform: direction === 'column' ? 'translate(-50%,-50%) rotate(-630deg)' : 'translate(-50%, -50%)',
                transformOrigin: 'center',
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: direction === 'column' ? '400px' : '800px',
              }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
            >
              <span className="fd-paxis">Primary Axis</span>
              <div className="fd-secondary-axis">
                <div className="fd-line"></div>
                <i className="iconfont icon-jiantou jiantou"></i>
              </div>
            </motion.div>
          </motion.ul>

        </div>
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
          </div>
        </div>
      </div>
    </>
  )
}

export default FlexDirection
