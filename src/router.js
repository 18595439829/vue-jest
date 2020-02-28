import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Router = new VueRouter({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            redirect: '/Ball'
        },
        {
            path: '/Ball',
            name: 'Ball',
            component: () => import ('@/views/Ball.vue'),
        },
        {
            path: '/AddBall',
            name: 'AddBall',
            component: () => import ('@/views/AddBall.vue'),
        }
    ]
})

export default Router;