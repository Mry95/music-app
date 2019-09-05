import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path == '/music') {
        let token = localStorage.token
        if (token) {
            next()
        } else {
            next({ path: '/login' })
        }
    } else {
        next();
    }
})
export default router

// 全局路由守卫