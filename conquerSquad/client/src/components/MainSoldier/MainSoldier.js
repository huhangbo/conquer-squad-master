import {forwardRef, useContext} from "react";
import {SoldierContext} from "../../reducer"
import styles from "./MainSoldier.less";
import infantry from "../../assets/infantry.png";
import cavalry from "../../assets/cavalry.png";
import archers from "../../assets/archer.png";


 const MainSoldier = forwardRef((props, ref) =>{
    const {infantryNum, cavalryNum, archersNum} = ref
    const {soldier} = useContext(SoldierContext)
    console.log(soldier)
    return (
        <div className={styles.box}>
            <div className={styles.infantry}>
                <div className={styles.img}>
                    <img src={infantry} alt={""}/>
                </div>
                <div className={styles.amount}>
                    <label>步兵：</label>
                    <input ref={infantryNum}/>
                </div>
            </div>
            <div className={styles.cavalry}>
                <div className={styles.img}>
                    <img src={cavalry} alt={""}/>
                </div>
                <div className={styles.amount}>
                    <label>骑兵：</label>
                    <input ref={cavalryNum}/>
                </div>
            </div>
            <div className={styles.archers}>
                <div className={styles.img}>
                    <img src={archers} alt={""}/>
                </div>
                <div className={styles.amount}>
                    <label>弓箭兵：</label>
                    <input ref={archersNum}/>
                </div>
            </div>
        </div>
    )
})

export default MainSoldier
