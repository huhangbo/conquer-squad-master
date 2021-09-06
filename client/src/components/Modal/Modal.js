import * as ReactDom from "react-dom"
import {renderElement,clearElement} from "../../Utils/modal";
import styles from "./Modal.less"

export default function Modal (props) {
    const {visible=false, title="", content={}, close=()=>{}} = props
    console.log(props)
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
        ReactDom.createPortal(modal, document.body)
    )
}

export function modal (title, content) {
    const component = <Modal visible={true} content={content} title={title}
                             close={()=>clearElement(component, div)}/>
    const div = renderElement(component)
}
