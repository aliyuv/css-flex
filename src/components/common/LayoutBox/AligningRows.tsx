import { motion } from 'motion/react'
import './AligningRows.css'

interface Props {
  justifyContentValue: string
  justifyItemsValue: string
  alignContentValue: string
  alignItemsValue: string
}

export default function AligningRows({
  justifyContentValue,
  justifyItemsValue,
  alignContentValue,
  alignItemsValue,
}: Props) {
  const textArr = ['One', 'Two', 'Three', 'Four']
  return (
    <div className="ar-container">
      <div className="ar-layout-container">
        <div className="ar-inner">
          <motion.div
            layout
            transition={{
              duration: 0.2,
              ease: 'ease',
            }}
            className="ar-inner-items columns"
            style={{
              justifyContent: justifyContentValue,
            }}
          >
            <motion.div
              className="column"
              style={{ gridColumn: `1`, gridRow: `1 / 3` }}
              layout
            >
              C1
            </motion.div>
            <motion.div
              layout
              className="column"
              style={{ gridColumn: `2`, gridRow: `1 / 3 ` }}
            >
              C2
            </motion.div>
          </motion.div>
          <motion.div
            className="ar-inner-items rows"
            style={{
              alignContent: alignContentValue,
            }}
            layout
            transition={{
              duration: 0.2,
              ease: 'ease',
            }}
          >
            <motion.div layout className="row" style={{ gridColumn: `1 / 3 `, gridRow: `1` }}>R1</motion.div>
            <motion.div layout className="row" style={{ gridColumn: `1 / 3`, gridRow: `2` }}>R2</motion.div>
          </motion.div>
        </div>
        <motion.div
          transition={{
            duration: 0.2,
            ease: 'ease',
          }}
          layout
          className="ar-grid-items"
          style={{
            justifyContent: justifyContentValue,
            justifyItems: justifyItemsValue,
            alignContent: alignContentValue,
            alignItems: alignItemsValue,
          }}
          onPointerDownCapture={e => e.stopPropagation()}
        >
          {
            textArr.map(item => (
              <motion.div className="ar-grid-layout" key={item} layout>
                <motion.div key={item} className="ar-grid-item">
                  <motion.div layout="preserve-aspect">{item}</motion.div>
                </motion.div>
              </motion.div>
            ))
          }
        </motion.div>
      </div>
    </div>
  )
}
