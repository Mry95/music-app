import axios from 'axios'

let instance = axios.create();
console.log(instance)


export default {
    post(url, data) {
        return instance.post(url, data)
    },
    get(url, data) {
        return instance.get(url, { params: data })
    }
}