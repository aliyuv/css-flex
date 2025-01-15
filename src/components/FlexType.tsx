import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import styles from './FlexType.module.css'

function FlexType() {
  const worlds = ['Hello', 'to', 'the', 'World']
  const types = ['block', 'flex']
  const [typesName, setTypeName] = useState<'block' | 'flex'>('block')
  const elRef = useRef<HTMLUListElement>(null)
  useEffect(() => {
    // 组件渲染后执行 执行一次 获取元素节点  id获取元素
    console.log(elRef.current)
  }, [])
  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerBox}>
          <motion.ul style={{ display: typesName, flexDirection: 'row' }} ref={elRef}>
            {worlds.map((item, index) => (
              <motion.div
                key={index}
                className={styles.libox}
                layout
                style={{ display: typesName === 'flex' ? 'flex' : 'block' }}
              >
                <motion.li layout>
                  <motion.span layout="preserve-aspect">{item}</motion.span>
                </motion.li>
              </motion.div>
            ))}
          </motion.ul>
        </div>
        <div className={styles.dis}>
          <div className={styles.arrt}>display:</div>
          <div className={styles.type}>
            {types.map((item, index) => (
              <div className={styles.btn} key={index}>
                <motion.button onClick={() => setTypeName(item as 'block' | 'flex')}>
                  <motion.div key={index}>{item}</motion.div>
                </motion.button>
                <motion.div
                  className={typesName === item ? styles.activeButton : styles.defaultButton}
                  key={index}
                  animate={typesName === item
                    ? { height: `4px`, opacity: 1 }
                    : {
                        height: `2px`,
                        opacity: 0.4,
                      }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}

export default FlexType
