import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './components/auth/Login.vue'
 import Test from './components/test.vue'
import Register from './components/auth/Register.vue'
import NewShowing from './components/showing/NewShowing.vue'
import Profile from './components/user/Profile.vue'
import Logout from './components/auth/Logout.vue'
import Showing from './components/showing/Showing.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/test',
            name: 'test',
            component: Test
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/logout',
            name: 'logout',
            component: Logout,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/showing/:id',
            name: 'showing',
            component: Showing,
            props: true
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            meta: {
                requiresAuth: true
            },
            props: true
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
        {
            path: '/newShowing',
            name: 'newShowing',
            component: NewShowing,
            meta: {
                requiresAuth: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    // to and from are both route objects
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.state.auth.loggedInUser) {
            next();
        } else {
            next('/login');
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.state.auth.loggedInUser) {
            next('/');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router
