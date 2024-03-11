import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

const routes: Array<RouteRecordRaw> = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/:pathMatch(.*)*', redirect: '/' },
    { path: 'dashboard', component: () => import('../views/Dashboard.vue'), meta: { requiresAuth: true } }
];


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user')

    if (to.meta?.requiresAuth) {
        if (loggedIn) {
            next('/login')
            return
        }
    }
    next()

})

export default router
