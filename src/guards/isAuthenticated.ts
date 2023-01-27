import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { userService } from "../services/user.service";

export const isAuthenticated = async (to: RouteLocationNormalized,from:RouteLocationNormalized,next:NavigationGuardNext) => {
    //TODO: DISPLAY LOADING
    const isAuth = await userService.checkAuth()
    if(isAuth){
        return next()
    }
    return next('/login')
    
}