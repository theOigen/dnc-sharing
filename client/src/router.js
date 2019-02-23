import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './components/auth/Login.vue'
import Register from './components/auth/Register.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                requiresVisitor: true
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                requiresVisitor: true
            }
        },
    ]
})
