import styles from "./World.less"
import {SoldierContext} from "../../reducer";
import {AccountContext} from "../../App";
import {useEffect, useState, useContext} from "react";
import {sliceId} from "../../Utils/slice"
import {alert} from "../Dialog/Dialog";


export default function World () {
    const {soldier, dispatch} = useContext(SoldierContext)
    const {accounts, contract, web3} = useContext(AccountContext)
    const [troops, setTroops] = useState([])
    const [status, setStatus] = useState([])
    useEffect(() => {
        (async function () {
            const troops = await contract.methods.fetchWorldMap().call();
            setTroops(troops)
            getTroopsInfo(troops)
            console.log(troops,status)
        } ())
    }, [])
    function getTroopsInfo (troops, status=[]) {
        (async function (){
            for(let i=0 ; i<troops.length; i++){
                const statusResult = await contract.methods.getStatus(troops[i]).call()
                    status.push(statusResult)
            }
            setStatus(status)
        }) ()
    }
    async function invade (id) {
        const state = await contract.methods.getTroop(id).call()
        const fightResult =  compute(soldier.capacity, state["fightCap"])
        await contract.methods.computeWinner(accounts[0], id,fightResult.code).send({from: accounts[0]})
        const warRecordId = web3.utils.randomHex(32)
        const record = {invader: accounts[0], defender: id, result: fightResult.info}
        await contract.methods.uploadWarRecords(warRecordId, JSON.stringify(record)).send({from: accounts[0], gas: 3000000})
        const currentState = await contract.methods.getTroop(accounts[0]).call()
        dispatch({
            type: "update",
            soldierNum: currentState["soldierNum"]
        })
        alert(`入侵结果：${fightResult.detail}`)
    }
    function compute(invaderCapacity, defenderCapacity) {
        const result = invaderCapacity - defenderCapacity
        if(result > 0) return {info: "invaderWin", code:1, detail: "成功"}
        else if(result === 0) return {info: "noWinner", code: 0, detail: "平局"}
        else if(result < 0) return {info: "defenderWin", code: 2, detail: "失败"}
    }
    return (
        <div className={styles.world}>
            <div className={styles.list}>
                <div className={styles.listTitle}>
                    <span className={styles.idTitle}>用户id</span>
                    <span className={styles.statusTitle}>当前状态</span>
                    <span>操作</span>
                </div>
            {troops.map((item, index) => {
                return (
                    <div className={styles.item} key={index}>
                        <span className={styles.troopId}>{sliceId(item)}</span>
                        <span className={styles.status}>{status[index]}</span>
                        {status[index] === "defense" && <span className={styles.action} onClick={() => {invade(item)}}>入侵</span>}
                    </div>
                )
            })}
            </div>
        </div>
    )
}
