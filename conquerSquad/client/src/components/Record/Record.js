import styles from "./Record..less";
import {useEffect, useState, useContext} from "react";
import {AccountContext} from "../../App";
import {SoldierContext} from "../../reducer";
import {sliceId} from "../../Utils/slice";


export default function Record () {
    const {soldier} = useContext(SoldierContext)
    const {accounts, contract} = useContext(AccountContext)
    const [records, setRecords] = useState([])

    useEffect(() => {
        (async function () {
        const result  = await contract.methods.fetchWarRecords().call();
        let recordsResult = []
        for(let i=0; i<result.length; i++) {
            const record = await contract.methods.getRecord(result[i]).call();
            recordsResult.push(JSON.parse(record))
            console.log(record)
            recordsResult[i].warRecordId = result[i]
            console.log(recordsResult[i])
        }
        setRecords(recordsResult)
    } ())
}, [])
    return (
        <div className={styles.record}>
            <div className={styles.list}>
                {records.length ? records.filter(item => item.invader === accounts[0] || item.defender === accounts[0]).map((item, index) => {
                    return (
                        <div className={styles.item} key={index}>
                            <span className={styles.invader}>ID: {sliceId(item.invader)}</span>
                            <span className={styles.defender}>入侵 {sliceId(item.defender)}</span>
                            <span className={styles.result}>结果: {item.result}</span>
                        </div>
                    )
                }) : <span>还没有记录哦，快去部署吧！</span>
                    }
                </div>
            <div className={styles.capacity}>当前战斗力为：{soldier.capacity}</div>
        </div>
    )
}
