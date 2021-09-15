import React, {useState, useReducer, createContext} from "react";
import styles from "./App.less";
import ChainCheck from "./components/ChainCheck/ChainCheck";
import Welcome from "./components/Welcome/Welcome";
import Main from "./components/Main/Main";
import {reducer, soldierSate, SoldierContext} from "./reducer";

export const AccountContext = createContext({})

function App () {
    const [page, setPage] = useState(0)
    const [soldier, dispatch] = useReducer(reducer, soldierSate)
    const [troopId, setTroopId] = useState(null)
    const [web3, setWeb3] = useState(null)
    const [accounts, setAccount] = useState(null)
    const [contract, setContract] = useState(null)
    function start () {
        setPage(1)
    }
    function getTroopId (value) {
        setTroopId(value)
    }
    function getAccounts (value) {
        setAccount(value)
    }
    function getContract (value) {
        setContract(value)
    }
    function getWeb (value) {
        setWeb3(value)
    }
    return (
        <AccountContext.Provider value={{troopId, accounts, contract, web3}}>
        <SoldierContext.Provider value={{soldier, dispatch}}>
        <div className={styles.App}>
            <ChainCheck getTroopId={getTroopId} getAccounts={getAccounts} getContract={getContract} getWeb={getWeb}/>
            {page === 0 && <Welcome start={start}/> }
            {page === 1 && <Main/>}
        </div>
        <div id={"portal"}></div>
        </SoldierContext.Provider>
        </AccountContext.Provider>
    )
}

export default App;
