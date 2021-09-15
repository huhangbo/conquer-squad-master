import React from "react";
import * as ReactDOM from "react-dom";

export function renderElement (modal) {
    const div = document.createElement('div')
    document.getElementById("portal").append(div)
    ReactDOM.render(modal, div)
    return div
}

export function clearElement (modal, div) {
    ReactDOM.render(React.cloneElement(modal, {visible: false}), div)
    ReactDOM.unmountComponentAtNode(div)
    div.remove()
}
