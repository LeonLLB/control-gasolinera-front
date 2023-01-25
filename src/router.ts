import { createRouter, createWebHistory, RouteLocation, RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
    {path:'/login',component:{ template: '<div>Login</div>' }},
    {path:'/distribucion',component:{ template: '<div>Distribucion</div>' }},
    {path:'/:pathMatch(.*)',redirect(to) {
        return {path:'/login'}
    },}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router

