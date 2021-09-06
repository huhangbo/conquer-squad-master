import {useContext} from "react";
import {SoliderContext} from "../Main/Main";
import styles from "./MainSolider.less";
import infantry from "../../assets/infantry.png";
import cavalry from "../../assets/cavalry.png";
import archer from "../../assets/archer.png";

export default function MainSolider() {
    const {solider, dispatch} = useContext(SoliderContext)
    console.log(solider)

    return (
        <div className={styles.box}>
            <div className={styles.infantry}>
                <div className={styles.img}>
                    <img src={infantry}/>
                </div>
                <div className={styles.amount}>
                    <label>步兵：</label>
                    <input/>
                </div>
            </div>
            <div className={styles.cavalry}>
                <div className={styles.img}>
                    <img src={cavalry}/>
                </div>
                <div className={styles.amount}>
                    <label>骑兵：</label>
                    <input/>
                </div>
            </div>
            <div className={styles.archer}>
                <div className={styles.img}>
                    <img src={archer}/>
                </div>
                <div className={styles.amount}>
                    <label>弓箭兵：</label>
                    <input/>
                </div>
            </div>
        </div>
    )
}
