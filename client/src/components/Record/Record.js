import styles from "./Record..less";

export default function Record (props) {
    const {list} = props
    return (
        <div className={styles.world}>
            <div className={styles.list}>
                {list.map(item => {
                    return (
                        <div className={styles.item}>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}
