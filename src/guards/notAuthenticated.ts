import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { userService } from "../services/user.service";

export const notAuthenticated = async (to: RouteLocationNormalized,from:RouteLocationNormalized,next:NavigationGuardNext) => {
    const isAuth = await userService.checkAuth()
    if(isAuth){
        return next('/distribucion')
    }
    return next()
}