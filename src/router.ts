import { createRouter, createWebHistory, RouteLocation, RouteRecordRaw } from "vue-router"
import Login from './pages/Login.vue'
import Litraje from './pages/Litraje.vue'

const routes: RouteRecordRaw[] = [
    {path:'/login',component:Login},
    {path:'/distribucion',component:Litraje },
    {path:'/:pathMatch(.*)',redirect(to) {
        return {path:'/login'}
    },}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router

