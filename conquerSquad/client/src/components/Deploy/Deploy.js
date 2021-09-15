import styles from "./Deploy.less"
import MainSoldier from "../MainSoldier/MainSoldier";
import {useContext, useRef} from "react";
import {SoldierContext} from "../../reducer"
import {AccountContext} from "../../App";
import {alert} from "../Dialog/Dialog";
import {calculateFightCap} from "../../Utils/calculate";



export default function Deploy (props) {
    const {soldier, dispatch} = useContext(SoldierContext)
    const {accounts, contract} = useContext(AccountContext)
    const {type} =props
    const infantryNum = useRef()
    const cavalryNum = useRef()
    const archersNum = useRef()
    const selectedSoldier = useRef()
    const selectedItem = useRef()
    const preciousSoldier = soldier.precious.filter(item => item.type === "soldier")
    const preciousItem = soldier.precious.filter(item => item.type === "Item")
    function setState (type) {
        if((parseInt(infantryNum.current.value) + parseInt(cavalryNum.current.value) + parseInt(archersNum.current.value)) > soldier.soldierNum) {
            alert("士兵数超过最大限制")
            return
        }
        const capacity = calculateFightCap(soldier, infantryNum.current.value, cavalryNum.current.value, archersNum.current.value, selectedSoldier.current.value, selectedItem.current.value, type);
        (async function () {
            let itemIds = []
            for(let i=0; i<soldier.precious.length; i++) {
                itemIds.push(soldier.precious[i].props.id)
            }
            await contract.methods.updateTroop(accounts[0], type, capacity, soldier.soldierNum, soldier.precious.length, itemIds).send({from: accounts[0], gas: 3000000});
            const troops = await contract.methods.fetchWorldMap().call()
            if(troops.includes(accounts[0])){
                await contract.methods.updateWorldMap(accounts[0], type).send({from: accounts[0]})
            } else {
                await contract.methods.uploadWorldMap(accounts[0], type).send({from: accounts[0]})
            }
        }) ();
        dispatch({
            type: "changeState",
            status: type,
            capacity,
        })
        alert(`部署成功，当前状态为：${type}`)
    }
    return (
        <div className={styles.deploy}>
            <MainSoldier  ref={{infantryNum, cavalryNum, archersNum}}/>
            <div className={styles.select}>
                <span className={styles.span}>特殊兵种：</span>
                <select className={styles.soldier} ref={selectedSoldier}>
                    {
                        preciousSoldier&&preciousSoldier.map(item =>{
                            return (
                                <option value={item.props.id} key={item.props.id}>{item.name}</option>
                            )
                        })
                    }
                </select>
                <span className={styles.span}>稀有物品：</span>
                <select className={styles.item} ref={selectedItem}>
                    {
                        preciousItem&&preciousItem.map(item =>{
                            return (
                                <option value={item.props.id} key={item.props.id}>{item.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className={styles.action}>
                {type === "invade" ? <button onClick={() => {setState("invade")}}>入侵</button>
                : <button onClick={() => {setState("defense")}}>防御</button>}
            </div>
        </div>
    )
}
