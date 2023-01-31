import { UserDto, Usuario } from "../interfaces/usuarios"
import { PostResponse, Response } from "../interfaces/response"


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

    async getAll(): Promise<Usuario[]>{
        const response = await fetch(import.meta.env.VITE_API_URL+'/api/usuarios/all',{
            credentials:'include'
        })
    
        const data: Response<Usuario[]> = await response.json()

        return data.data!
    }

    async create(dto:UserDto):Promise<PostResponse<Usuario>>{
        const response = await fetch(import.meta.env.VITE_API_URL+'/api/usuarios',{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dto)
        })

        const data: PostResponse<Usuario> = await response.json()

        return data
    }

    async changePassword(password: string, userId: number):Promise<PostResponse<Usuario>>{
        const response = await fetch(import.meta.env.VITE_API_URL+'/api/usuarios/change-password/'+userId,{
            method:'PUT',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({password})
        })

        const data: PostResponse<Usuario> = await response.json()

        return data
    }

    async delete( userId: number):Promise<PostResponse<never>>{
        const response = await fetch(import.meta.env.VITE_API_URL+'/api/usuarios/'+userId,{
            method:'DELETE',
            credentials:'include',
        })

        const data: PostResponse<never> = await response.json()

        return data
    }

}

export const userService = new UserService()