
import styles from "./World.less"

export default function World (props) {
    const {list} = props
    return (
        <div className={styles.world}>
            <div className={styles.list}>
            {list.map(item => {
                return (
                    <div className={styles.item}>
                        <span className={styles.address}>{item.address}</span>
                        <span className={styles.status}>{item.status}</span>
                        <button className={styles.action}>入侵/防守</button>
                    </div>
                )
            })}
            </div>
        </div>
    )
}
