import {useContext, useRef} from "react";
import styles from "./Cast.less"
import {SoldierContext} from "../../reducer"
import MainSoldier from "../MainSoldier/MainSoldier";
import {request} from "../../Utils/request";
import {AccountContext} from "../../App";
import {alert} from "../Dialog/Dialog";

export default function Cast() {
    const {soldier, dispatch} = useContext(SoldierContext)
    const {accounts, contract} = useContext(AccountContext)
    const {soldierNum, capacity} = soldier
    const infantryNum = useRef()
    const cavalryNum = useRef()
    const archersNum = useRef()
    async function casting () {
        const castResult = await request("get", "/createlab/randomitem")
        const precious = castResult.preciousItem
        if(precious.type === "soldier" ){
            await contract.methods.uploadPrecSoldier(precious.props.id, precious.name, precious.props.injury, precious.props.distance, precious.props.blood).send({from: accounts[0], gas: 3000000})
        } else if(precious.type === "Item"){
            await contract.methods.uploadPrecItem(precious.props.id, precious.name, precious.props.kind, precious.props.injury, precious.props.durability).send({from: accounts[0], gas: 3000000})
        }
        dispatch({
            type: "cast",
            castResult: castResult.preciousItem,
        })
        alert(`铸造成功！获得${precious.type === "soldier" ? '特殊兵种' : '稀有物品'}：${precious.name}`)
    }
    return (
        <div className={styles.box}>
            <MainSoldier ref={{infantryNum, cavalryNum, archersNum}}/>
            <div className={styles.total}>士兵数：{soldierNum}</div>
            <div className={styles.capacity}>战斗力：{capacity}</div>
            <div className={styles.cast} onClick={() => {casting()}}>
                铸造
            </div>
        </div>
    )
}
