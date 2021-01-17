import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import { authGuard } from "../auth/authGuard";

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('../views/login/Login.vue')
        },
        {
            path: '/signup',
            name: 'signup',
            component: () =>
                import ('../views/signup/Signup.vue')
        },
        {
            path: '/usersreport',
            name: 'usersreport',
            component: () =>
                import ('../views/reportusers/Report.vue')
        },
        {
            path: '/addnewuser',
            name: 'addnewuser',
            component: () =>
                import ('../views/reportusers/AddUser.vue')
        },
        {
            path: '/edituser',
            name: 'edituser',
            component: () =>
                import ('../views/reportusers/EditUser.vue')
        },
        {
            path: '/forgotpassword',
            name: 'forgotpassword',
            component: () =>
                import ('../views/forgotpassword/Forgotpassword.vue')
        },
        {
            path: '/resetpassword',
            name: 'resetpassword',
            component: () =>
                import ('../views/forgotpassword/Resetpassword.vue')
        },
        {
            path: '/event/:id',
            name: 'eventSingle',
            component: () =>
                import ('../views/EventSingle.vue'),
            beforeEnter: authGuard
        }
    ]
})