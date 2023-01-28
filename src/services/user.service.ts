import { Usuario } from "../interfaces/usuarios"
import { Response } from "../interfaces/response"


class UserService {

    async login(cedula:number,password:string): Promise<boolean>{
        const response = await fetch(import.meta.env.VITE_API_URL+'/api/usuarios/login',{
            method:'POST',
            credentials:'include',
            headers: {                
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({cedula,password})
        })
        if(response.status !== 200){
            //TODO: HANDLE ERROR
            return false
        }
        return true
    }

    async checkAuth():Promise<boolean>{
        const response = await fetch(import.meta.env.VITE_API_URL+'/api/usuarios/check-auth',{
            credentials:'include'
        })
    
        return (response.status === 200)
    }

    async checkAuthUser():Promise<Response<Usuario>>{
        const response = await fetch(import.meta.env.VITE_API_URL+'/api/usuarios/check-auth',{
            credentials:'include'
        })

        const data:Response<Usuario> = await response.json()
    
        return data
    }

    async logout(){
        await fetch(import.meta.env.VITE_API_URL+'/api/usuarios/logout',{
            method:'POST',
            credentials:'include'
        })
    }

}

export const userService = new UserService()