import { DistribucionDto } from "../interfaces/distribucion"
import { Response } from "../interfaces/response"
// import { Distribucion } from "../interfaces/Distribucion"

class DistribucionService {

    async registrar(dto: DistribucionDto){
        const response = await fetch(import.meta.env.VITE_API_URL+'/api/distribucion',{
            credentials:'include',
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dto)
        })

        const body = await response.json()

        //TODO: HANDLE ERROR
        if(response.status === 200){
            return true
        }
        console.log(body)
        return false
    }

}

export const distribucionService = new DistribucionService()