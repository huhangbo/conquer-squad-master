import React, {useEffect, useState} from "react";
import getWeb3 from "../../getWeb3";
import SimpleStorageContract from "../../contracts/SimpleStorage.json";
import styles from "./ChainCheck.less"

export default function ChainCheck () {
    const [loaded, setLoaded] = useState(false)
    const [storageValue, setStorageValue] = useState(0)
    const [web3, setWeb3] = useState(null)
    const [account, setAccount] = useState(null)
    const [contract, setContract] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    useEffect(async () => {
        try {
            const web3 = await getWeb3();

            const accounts = await web3.eth.getAccounts();
            const balanceWei = await web3.eth.getBalance(accounts[0]);
            const balance = await web3.utils.fromWei(balanceWei);

            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            const player = {'account': accounts[0], 'balance': balance}

            setWeb3(web3)
            setAccount(accounts)
            setContract(instance)
            setUserInfo(player)
        } catch (error) {
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
        setLoaded(true)
    }, [])
    return (
        <div className={styles.ChainCheck}>
            {loaded && (
                <>{!userInfo&& (
                    <div className={styles.error}>Please Check Your Login Status</div>
                )}{userInfo && (
                    <div className={styles.info}>
                        <div>Account: {userInfo.account.substr(0, 6)}...{userInfo.account.substr(-4)}</div>
                        <div>Balance: {userInfo.balance}</div>
                    </div>
                )}
                </>
            )}
        </div>
    )
}
