import React from "react";

export const soldierSate = {
    soldierNum: 0,
    infantry: {},       //步兵
    cavalry: {},        //骑兵
    archers: {},         //弓箭兵
    precious: [],
    status: "",         //入侵和防守
    capacity: 0,        //战斗力
    record: [],       //战斗记录
}

export const SoldierContext = React.createContext(soldierSate)

export const reducer = (state, action) => {
    switch (action.type){
        case "init": {
            return Object.assign({}, state, action.mainSolider, action.currentState)
        }
        case "cast": {
            return Object.assign({}, state, {precious: [...state.precious, action.castResult]})
        }
        case "changeState": {
            return Object.assign({}, state, {status: action.status, capacity: action.capacity,})
        }
        case "update": {
            return Object.assign({}, state, {soldierNum: action.soldierNum})
        }
        default: {
            return state
        }
    }
}
