import { RouteLocationNormalized } from "vue-router";

export const isAuthenticated = async (to: RouteLocationNormalized): Promise<string | undefined> => {
    const response = await fetch(import.meta.env.VITE_API_URL+'/api/usuarios/check-auth',{
        credentials:'include'
    })

    if(response.status === 200){
        return '/distribucion'
    }
}