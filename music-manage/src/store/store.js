import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        user,
    }
})
store.subscribe(() => {
    console.log("有缘千里来相会")
})
export default store