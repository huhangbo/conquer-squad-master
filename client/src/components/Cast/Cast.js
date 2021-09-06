import {useContext} from "react";
import styles from "./Cast.less"
import {SoliderContext} from "../Main/Main";
import MainSolider from "../MainSolider/MainSolider";

export default function Cast() {
    const {solider, dispatch} = useContext(SoliderContext)
    console.log(solider)
    function casting () {

    }
    return (
        <div className={styles.box}>
            <MainSolider/>
            <div className={styles.cast}>
                铸造
            </div>
        </div>
    )
}
