import React, {useEffect, useState} from "react";
import getWeb3 from "../../getWeb3";
import ConquerSquadContract from "../../contracts/ConquerSquad.json";
import styles from "./ChainCheck.less"
import {sliceId} from "../../Utils/slice";

export default function ChainCheck (props) {
    const {getTroopId, getAccounts, getContract, getWeb} = props
    const [loaded, setLoaded] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    useEffect( () => {
        (async function () {
            try {
                const web3 = await getWeb3();
                const troopId = web3.utils.randomHex(32)
                const accounts = await web3.eth.getAccounts();
                const balanceWei = await web3.eth.getBalance(accounts[0]);
                const balance = await web3.utils.fromWei(balanceWei);
                const networkId = await web3.eth.net.getId();
                const deployedNetwork = ConquerSquadContract.networks[networkId];
                const instance = new web3.eth.Contract(
                    ConquerSquadContract.abi,
                    deployedNetwork && deployedNetwork.address,
                );
                const player = {'account': accounts[0], 'balance': balance}
                getWeb(web3)
                getTroopId(troopId)
                getAccounts(accounts)
                getContract(instance)
                setUserInfo(player)
            } catch (error) {
                alert(
                    `Failed to load web3, accounts, or contract. Check console for details.`,
                );
                console.error(error);
            }
            setLoaded(true)
        }) ()
    }, [])
    return (
        <div className={styles.ChainCheck}>
            {loaded && (
                <>{!userInfo&& (
                    <div className={styles.error}>Please Check Your Login Status</div>
                )}{userInfo && (
                    <div className={styles.info}>
                        <div>Account: {sliceId(userInfo.account)}</div>
                        <div>Balance: {userInfo.balance}</div>
                    </div>
                )}
                </>
            )}
        </div>
    )
}
