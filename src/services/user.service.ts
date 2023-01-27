

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

}

export const userService = new UserService()