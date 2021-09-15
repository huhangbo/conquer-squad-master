import * as ReactDom from "react-dom"
import styles from "./Modal.less"


export default function Modal (props) {
    const {visible=false, title="", content={}, close=()=>{}} = props
    const modal = visible ?
        <>
            <div className={styles.mask}></div>
            <div className={styles.modal}>
                <span className={styles.close} onClick={close}>返回</span>
                <div className={styles.title}>{title}</div>
                <div className={styles.content}>{content}</div>

            </div>
        </> : null
    return (
        ReactDom.createPortal(modal, document.getElementById("portal"))
    )
}
