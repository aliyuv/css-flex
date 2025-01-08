import styles from "./DisplayType.module.css";
import {motion} from "motion/react";
import {useState} from "react";

function FlexType() {
    const worlds = ['hello', 'world', 'world', 'to']
    const types = ['block', 'flex']
    const [typesName, setTypeName] = useState('block')
    return (
        <>
            <div className={styles.container}>
                <div className={styles.containerBox}>
                    <motion.ul>
                        {worlds.map((item, index) => (
                            <>
                                {/*<div className={styles.nth} >11111111111111111111</div>*/}
                                <motion.li key={index} layout animate={typesName === 'block' ?
                                    {
                                        transformOrigin: 'center center',
                                        scale: 2,
                                        translateX: `0px`,
                                        translateY: `-50px`,
                                        translateZ: `100px`
                                    } : {transformOrigin: 'center center', skew: '180deg'}}
                                           transition={{type: 'spring'}}>{item}11
                                </motion.li>
                            </>
                        ))}
                    </motion.ul>
                </div>
                <div className={styles.dis}>
                    <div className={styles.arrt}>display:</div>
                    <div className={styles.type}>
                        {types.map((item, index) => (
                            <>
                                <div className={styles.btn} key={index}>
                                    <motion.button onClick={() => setTypeName(item)}>
                                        <motion.div key={index}>{item}</motion.div>
                                    </motion.button>
                                    <motion.div
                                        className={typesName === item ? styles.activeButton : styles.defaultButton}
                                        key={index}
                                        animate={typesName === item ? {height: `4px`, opacity: 1} : {
                                            height: `2px`,
                                            opacity: 0.4
                                        }}/>
                                </div>
                            </>
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}

export default FlexType
