import styles from "./Deploy.less"
import MainSolider from "../MainSolider/MainSolider";


export default function Deploy (props) {
    const {type, solider} =props
    return (
        <div className={styles.deploy}>
            <MainSolider/>
            <div className={styles.select}>
                <select className={styles.special}>
                    <option>敌法师</option>
                    <option>剧毒术士</option>
                    <option>卡尔</option>
                </select>
                <select className={styles.equip}>
                    <option>代达罗斯</option>
                    <option>飓风神杖</option>
                    <option>深渊之刃</option>
                </select>
            </div>
            <div className={styles.action}>
                {type? <button>入侵</button>
                : <button>防御</button>}
            </div>
        </div>
    )
}
