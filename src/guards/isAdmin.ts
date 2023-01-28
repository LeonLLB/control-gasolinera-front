import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { userService } from "../services/user.service";

export const isAdmin = async (to: RouteLocationNormalized,from:RouteLocationNormalized,next:NavigationGuardNext) => {
    //TODO: DISPLAY LOADING
    const {data} = await userService.checkAuthUser()
    if(data?.isAdmin){
        return next()
    }
    return next('/distribucion')
}