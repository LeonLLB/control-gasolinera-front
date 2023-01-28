import { createRouter, createWebHistory, RouteLocation, RouteRecordRaw } from "vue-router"
import Login from './pages/Login.vue'
import Litraje from './pages/Litraje.vue'
import Usuarios from './pages/Usuarios.vue'
import Reportes from './pages/Reportes.vue'
import { isAuthenticated } from "./guards/isAuthenticated"
import { notAuthenticated } from "./guards/notAuthenticated"
import { isAdmin } from "./guards/isAdmin"

const routes: RouteRecordRaw[] = [
    {path:'/login',component:Login,beforeEnter:[notAuthenticated]},
    {path:'/distribucion',component:Litraje,beforeEnter:[isAuthenticated]},
    {path:'/usuarios',component:Usuarios,beforeEnter:[isAuthenticated,isAdmin]},
    {path:'/reportes',component:Reportes,beforeEnter:[isAuthenticated,isAdmin]},
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

