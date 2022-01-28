import Vue from 'vue'
import Router from 'vue-router';

Vue.use(Router);

import DashBoard from "./components/Dashboard.vue"
import Board from "./components/Board.vue"
import Login from "./components/Login.vue"
import Register from "./components/Register.vue"


export const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            redirect: '/dashBoards'
        },
        {
            path: '/boards/:boardID',
            component: Board
        },
        {
            path: '/dashBoards',
            component: DashBoard,
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/:notFound(.*)', // catchAll route need to be the last one 
            redirect: '/dashBoards'
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return {
            left: 0,
            top: 0
        }
    }
})
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('UserData');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});
export default router