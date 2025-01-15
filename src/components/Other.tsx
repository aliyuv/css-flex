import { motion } from 'motion/react'
import { useState } from 'react'
import DisplayType from './DisplayType.tsx'

function Other() {
  const [rangeValueX, setRangeValueX] = useState(0)
  const [rangeValueY, setRangeValueY] = useState(0)
  const [rangeValueRotate, setRangeValueRotate] = useState(0)

  const objArr = [
    {
      desc: 'hello world!',
      tip: '你好，',
      delay: 0.4,
    },
    {
      desc: '你不好!',
      tip: '我叫阿达西',
      delay: 0.6,
    },
    {
      desc: '你很好!',
      tip: '我是一个前端工程师',
      delay: 0.8,
    },
    {
      desc: '你很不好!',
      tip: '我喜欢学习',
      delay: 0.85,
    },
    {
      desc: '你很很好!',
      tip: '我喜欢编程',
      delay: 0.9,
    },
    {
      desc: '你很很不好!',
      tip: '我喜欢写代码',
      delay: 0.95,
    },
    {
      desc: '你很很很好!',
      tip: '我喜欢看书',
      delay: 1,
    },
    {
      desc: '你很很很不好!',
      tip: '我喜欢写博客',
      delay: 1.5,
    },
    {
      desc: '你很很很很好!',
      tip: '我喜欢分享',
      delay: 1.7,
    },
    {
      desc: '你很很很很不好!',
      tip: '我喜欢交流',
      delay: 1.9,
    },
    {
      desc: '你很很很很很好!',
      tip: '我喜欢交友',
      delay: 2,
    },
  ]
  return (
    <>
      <div className="app">
        <div className="box">
          <motion.div
            className="box1"
            animate={{ x: rangeValueX, y: rangeValueY, rotate: rangeValueRotate }}
            transition={{ type: 'spring' }}
          />
        </div>
        <div className="box2">
          <ul>
            <li>
              <input
                type="range"
                id="volume"
                name="volume"
                min={0}
                max={100}
                value={rangeValueX}
                onChange={(e) => {
                  setRangeValueX(Number(e.target.value))
                }}
              />
              <span>
                x:
                {rangeValueX}
              </span>
            </li>
            <li>
              <input
                type="range"
                id="volume"
                name="volume"
                min={0}
                max={100}
                value={rangeValueY}
                onChange={(e) => {
                  setRangeValueY(Number(e.target.value))
                }}
              />
              <span>
                y:
                {rangeValueY}
              </span>
            </li>
            <li>
              <input
                type="range"
                id="volume"
                name="volume"
                min={0}
                max={360}
                value={rangeValueRotate}
                onChange={(e) => {
                  setRangeValueRotate(Number(e.target.value))
                }}
              />
              <span>
                rotate:
                {rangeValueRotate}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container">
        <ul>
          {objArr.map((item, index) => {
            return (
              <li key={index}>
                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: item.delay }}
                >
                  {item.tip}
                </motion.h1>
                <motion.a
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: item.delay }}
                >
                  {item.desc}
                </motion.a>
              </li>
            )
          })}
        </ul>
      </div>
      <DisplayType />
    </>
  )
}

export default Other
