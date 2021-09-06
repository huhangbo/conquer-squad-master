import {renderElement, clearElement} from "../../Utils/modal";
import styles from "./Dialog.less"
import * as ReactDOM from "react-dom";


export default function Dialog (props) {
    const {visible=false, title, onOk=false, okTitle="确认", handleOk, onCancel=false, cancelTitle="取消", handleCancel, children} = props
    const component = visible ?
        <>
            <div className={styles.mask}></div>
            <div className={`${styles.dialog}`}>
                <h3 className={styles.header}>
                    <div className={styles.title}>
                        {title}
                    </div>
                </h3>
                <div className={styles.body}>
                    {children}
                </div>
                <div className={styles.footer}>
                    {onOk && <button onClick={handleOk}>{okTitle}</button>}
                    {onCancel && <button onClick={handleCancel}>{cancelTitle}</button>}
                </div>
            </div>
        </>
        : null
    return (
        ReactDOM.createPortal(component, document.body)
    )
}

export function alert (content){
    const component = <Dialog visible={true} title={"alter"} onOk={true} children={content}
                              handleOk={() => {clearElement(component,div)}}/>
    const div = renderElement(component)
}

export function confirm (content, ok=()=>{}, cancel=()=>{}) {
    const component = <Dialog visible={true} title={"confirm"} onOk={true} onCancle={true} children={content}
                              handleOk={() => {
                                  ok()
                                  clearElement(component, div)
                              }}
                              hanleCancel={() => {
                                  cancel()
                                  clearElement(component, div)
                              }}/>
    const div = renderElement(component)
}


