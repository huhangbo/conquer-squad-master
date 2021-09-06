import React, {useState} from "react";
import styles from "./App.less";
import ChainCheck from "./components/ChainCheck/ChainCheck";
import Welcome from "./components/Welcome/Welcome";
import Main from "./components/Main/Main";


function App () {
    const [page, setPage] = useState(0)
    function start () {
        setPage(1)
    }
    return (
        <div className={styles.App}>
            <ChainCheck/>
            {page === 0 && <Welcome start={start}/> }
            {page === 1 && <Main/>}
        </div>

    )
}

export default App;
