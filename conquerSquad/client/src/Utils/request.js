import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:3001"

export function request (method, url, data={}) {
    return new Promise((resolve, reject) => {
        axios[method](url, data).then( response => {
            if(response.data.code  === 200) {
                resolve(response.data.data)
            } else {
                reject(response.data.message)
            }
        })
    })
}
