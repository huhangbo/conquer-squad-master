import React, {useEffect, useContext, useState} from "react";
import styles from "./Main.less"
import Cast from "../Cast/Cast";
import world from "../../assets/world.png"
import record from "../../assets/record.png"
import instruction from "../../assets/instruction.png"
import Modal from "../Modal/Modal";
import Deploy from "../Deploy/Deploy";
import World from "../World/World";
import Instruction from "../Instruction/Instruction";
import Record from "../Record/Record";
import {request} from "../../Utils/request";
import {SoldierContext} from "../../reducer"
import {AccountContext} from "../../App";



export default function Main() {
    const {dispatch} = useContext(SoldierContext)
    const {accounts, contract} = useContext(AccountContext)
    const [modalVisible, setModalVisible] = useState({
        invade: false,
        defense: false,
        world: false,
        instruction: false,
        record: false,
    })
    function modalShow (type) {
        setModalVisible(Object.assign({} ,modalVisible,{[type]: true}))
    }
    function modalHide (type) {
        setModalVisible(Object.assign({} ,modalVisible,{[type]: false}))
    }
    useEffect(() => {
        (async function () {
            const state = await contract.methods.getTroop(accounts[0]).call()
            if(state.status === "") { //新用户第一次进入
                dispatch({
                    type: "init",
                    mainSolider: await request('get', '/soldier/initData'),
                })
            } else {        //老用户
                const {status, soldierNum, itemIDs , fightCap} = state
                let precious = []
                itemIDs.map(async item => {
                    const itemInfo1 = await contract.methods.getPrecSoldier(item).call()
                    let preciousDetail = {}
                    if(itemInfo1.blood !== "0") {
                        preciousDetail = {
                            name: itemInfo1.name,
                            type: "soldier",
                            props: {
                                id: itemInfo1.id,
                                blood: itemInfo1.blood,
                                distance: itemInfo1.distance,
                                injury: itemInfo1.injury,
                            }
                        }
                    } else {
                        const itemInfo2 = await contract.methods.getPrecItem(item).call()
                        preciousDetail = {
                            name: itemInfo2.name,
                            type: "Item",
                            props: {
                                id: itemInfo2.ID,
                                durability: itemInfo2.durability,
                                injury: itemInfo2.injury,
                                kind: itemInfo2.kind
                            }
                        }
                    }
                    precious.push(preciousDetail)
                })
                const currentState = {status, soldierNum, precious, capacity: fightCap}
                dispatch({
                    type: "init",
                    mainSolider: await request('get', '/soldier/initData'),
                    currentState,
                })
            }
        }) ()
    }, [])
    return (
        <>
            <div className={styles.bg}></div>
            <div className={styles.main}>
                <Cast/>
                <div className={styles.world} onClick={() => {modalShow("world")}}>
                    <img src={world} alt={""}/>
                    <div className={styles.worldTitle}>世界地图</div>
                </div>
                <div className={styles.record} onClick={() => {modalShow("record")}}>
                    <img src={record} alt={""}/>
                </div>
                <div className={styles.action}>
                    <div className={styles.invade} onClick={() => {modalShow("invade")}}>入侵</div>
                    <div className={styles.defense} onClick={() => {modalShow("defense")}}>防御</div>
                </div>
                <div className={styles.instruction} onClick={() => {modalShow("instruction")}}>
                    <img src={instruction} alt={""}/>
                    <div className={styles.instructionTitle}>玩法说明</div>
                </div>
                <Modal visible={modalVisible.invade} title={"入侵"} content={<Deploy type={"invade"} close={()=> {modalHide("invade")}}/>} close={()=> {modalHide("invade")}}/>
                <Modal visible={modalVisible.defense} title={"防御"} content={<Deploy type={"defense"} close={()=> {modalHide("defense")}}/> } close={()=> {modalHide("defense")}}/>
                <Modal visible={modalVisible.world} title={"世界地图"} content={<World close={()=> {modalHide("world")}}/>} close={()=> {modalHide("world")}}/>
                <Modal visible={modalVisible.record} title={"战斗记录"} content={<Record close={()=> {modalHide("record")}}/>} close={()=> {modalHide("record")}}/>
                <Modal visible={modalVisible.instruction} title={"玩法说明"} content={<Instruction close={()=> {modalHide("instruction")}}/>} close={()=> {modalHide("instruction")}}/>
            </div>
        </>
    )
}
