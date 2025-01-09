import styles from "./FlexType.module.css";
import {motion} from "motion/react";
import {useState} from "react";

function FlexType() {
    const worlds = ['Hello', 'to', 'the', 'World']
    const types = ['block', 'flex']
    const [typesName, setTypeName] = useState<'block' | 'flex'>('block')
    return (
        <>
            <div className={styles.container}>
                <div className={styles.containerBox}>
                    <motion.ul style={{display: typesName}} layout="preserve-aspect">
                        {worlds.map((item, index) => (
                                <motion.li key={index} layout style={{height: typesName === "flex" ? "300px" : "auto", }}>
                                    <div className={styles.topline}></div>
                                    {item}
                                </motion.li>
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
                                        animate={typesName === item ? {height: `4px`, opacity: 1} : {
                                            height: `2px`,
                                            opacity: 0.4
                                        }}/>
                                </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}

export default FlexType
