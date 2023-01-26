import { createRouter, createWebHistory, RouteLocation, RouteRecordRaw } from "vue-router"
import Login from './pages/Login.vue'
import Litraje from './pages/Litraje.vue'
import { isAuthenticated } from "./guards/isAuthenticated"
import { notAuthenticated } from "./guards/notAuthenticated"

const routes: RouteRecordRaw[] = [
    {path:'/login',component:Login,beforeEnter:[notAuthenticated]},
    {path:'/distribucion',component:Litraje,beforeEnter:[isAuthenticated]},
    {path:'/:pathMatch(.*)',redirect(to) {
        return {path:'/login'}
    },}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router

