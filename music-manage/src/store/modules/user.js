export default {
    state: {
        name: '',
        flag: true, //通过flag来改变按钮的内容
    },
    mutations: {
        setName(state, payload) {
            state.name = payload
        },
        setFlag(state, payload) {
            state.flag = payload
        }
    },
    actions: {

    },
}