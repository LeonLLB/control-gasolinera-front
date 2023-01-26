import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const notAuthenticated = async (to: RouteLocationNormalized,from:RouteLocationNormalized,next:NavigationGuardNext) => {
    //TODO: DISPLAY LOADING
    const response = await fetch(import.meta.env.VITE_API_URL+'/api/usuarios/check-auth',{
        credentials:'include'
    })

    if(response.status === 200){
        return
    }    
    return next()
}