import React, {useReducer} from "react";
import styles from "./Main.less"
import Cast from "../Cast/Cast";
import world from "../../assets/world.png"
import record from "../../assets/record.png"
import instruction from "../../assets/instruction.png"
import {modal} from "../Modal/Modal";
import Deploy from "../Deploy/Deploy";
import World from "../World/World";
import Instruction from "../Instruction/Instruction";
import Record from "../Record/Record";


const initialState = {
    infantry: 0,       //步兵
    cavalry: 0,        //骑兵
    archer: 0,         //弓箭兵
    special: [],        //特种兵
    equip: [],          //装备
    state: 0,           //1和2分别代表入侵和防守
    capacity: 0,        //战斗力
    fightLog: [],       //战斗记录
}

export const SoliderContext = React.createContext({})

const reducer = (state, action) => {
    switch (action.type){
        case "cast": {

        }
        case "invade": {

        }
        case "defense": {

        }
    }
}

export default function Main() {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <SoliderContext.Provider value={{solider : initialState, dispatch}}>
            <div className={styles.bg}></div>
            <div className={styles.main}>
                <Cast/>
                <div className={styles.world} onClick={()=>modal("世界地图",<World/>)}>
                    <img src={world}/>
                    <div className={styles.worldTitle}>世界地图</div>
                </div>
                <div className={styles.record} onClick={() => modal("战斗记录",<Record/> )}>
                    <img src={record}/>
                </div>

                <div className={styles.action}>
                    <div className={styles.invade} onClick={() => modal("入侵", <Deploy type={1}/>)}>入侵</div>
                    <div className={styles.defense} onClick={() => modal("防御", <Deploy type={0}/>)}>防御</div>
                </div>
                <div className={styles.instruction} onClick={() => modal("玩法说明",<Instruction/>)}>
                    <img src={instruction}/>
                    <div className={styles.instructionTitle}>玩法说明</div>
                </div>
            </div>
        </SoliderContext.Provider>
    )
}

//TODO
// 1.各个兵种初始化状态（前端直接初始化还是从数据库获取用户状态）
// 2.铸造合成特种兵种类，以及掉落装备的方案，
// 3.战力的计算公式，进行入侵或防御时实力评估方式
// 4.战斗结束之后的掉落奖励计算机制
// 5.写入用户状态的接口
// 5.获取世界窗口列表
