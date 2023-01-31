import { UserDto, Usuario } from "../interfaces/usuarios"
import { PostResponse, Response } from "../interfaces/response"
import { notiflix } from "./notiflix.service"


class UserService {

    async login(cedula:number,password:string): Promise<boolean>{
        notiflix.loading.displayLoading('Iniciando sesión...','dots')
        const response = await fetch(import.meta.env.VITE_API_URL+'/api/usuarios/login',{
            method:'POST',
            credentials:'include',
            headers: {                
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({cedula,password})
        })
        const status = response.status
        const data: PostResponse<never> = await response.json()
        notiflix.loading.hideLoading()
        if(status !== 200){
            notiflix.toast.failure(data.message!)            
            return false
        }
        notiflix.toast.success('Sesion iniciada con exito!')
        return true
    }

    async checkAuth():Promise<boolean>{
        notiflix.loading.displayLoading('','dots')
        const response = await fetch(import.meta.env.VITE_API_URL+'/api/usuarios/check-auth',{
            credentials:'include'
        })
        notiflix.loading.hideLoading()
        return (response.status === 200)
    }

    async checkAuthUser():Promise<Response<Usuario>>{
        notiflix.loading.displayLoading('','dots')
        const response = await fetch(import.meta.env.VITE_API_URL+'/api/usuarios/check-auth',{
            credentials:'include'
        })
        notiflix.loading.hideLoading()
        const data:Response<Usuario> = await response.json()
    
        return data
    }

    async logout(){
        notiflix.loading.displayLoading('Cerrando sesión','dots')
        await fetch(import.meta.env.VITE_API_URL+'/api/usuarios/logout',{
            method:'POST',
            credentials:'include'
        })
        notiflix.loading.hideLoading()
        notiflix.toast.success('Sesión cerrada con exito!')
    }

    async getAll(): Promise<Usuario[]>{
        notiflix.loading.displayLoading('Obteniendo usuarios...','dots')
        const response = await fetch(import.meta.env.VITE_API_URL+'/api/usuarios/all',{
            credentials:'include'
        })
    
        const data: Response<Usuario[]> = await response.json()
        notiflix.loading.hideLoading()
        return data.data!
    }

    async create(dto:UserDto):Promise<PostResponse<Usuario>>{
        notiflix.loading.displayLoading('Registrando usuario...','dots')
        const response = await fetch(import.meta.env.VITE_API_URL+'/api/usuarios',{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dto)
        })

        const data: PostResponse<Usuario> = await response.json()
        notiflix.loading.hideLoading()
        return data
    }

    async changePassword(password: string, userId: number):Promise<PostResponse<Usuario>>{
        notiflix.loading.displayLoading('Cambiando la clave del usuario...','dots')
        const response = await fetch(import.meta.env.VITE_API_URL+'/api/usuarios/change-password/'+userId,{
            method:'PUT',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({password})
        })

        const data: PostResponse<Usuario> = await response.json()
        notiflix.loading.hideLoading()
        return data
    }

    async delete( userId: number):Promise<PostResponse<never>>{
        notiflix.loading.displayLoading('Eliminando usuario...','dots')
        const response = await fetch(import.meta.env.VITE_API_URL+'/api/usuarios/'+userId,{
            method:'DELETE',
            credentials:'include',
        })

        const data: PostResponse<never> = await response.json()

        notiflix.loading.hideLoading()
        return data
    }

}

export const userService = new UserService()