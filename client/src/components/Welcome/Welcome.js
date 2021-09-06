import {useCallback} from "react";
import {alert} from "../Dialog/Dialog";
import styles from "./Welcome.less"
import title from "../../assets/title.png"
import open from "../../assets/open.png"
import Cast from "../Cast/Cast";
import Deploy from "../Deploy/Deploy";

export default function Welcome ({start}) {
    const handleStart = useCallback(() => {
        start()
    }, [start])

    return (
        <div className={styles.welcome}>
            <div className={styles.title}>
                <img src={title} alt={"征服者小队"}/>
            </div>
            <div className={styles.open}>
                <img src={open}/>
                <div className={styles.openTitle} onClick={()=>handleStart()}>
                    进入征途
                </div>
            </div>
        </div>
    )
}
