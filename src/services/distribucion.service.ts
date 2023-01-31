import { Distribucion, DistribucionDto } from "../interfaces/distribucion"
import { PostResponse, Response } from "../interfaces/response"
import { notiflix } from "./notiflix.service"

class DistribucionService {

    async registrar(dto: DistribucionDto){
        notiflix.loading.displayLoading('Registrando litraje...','dots')
        const response = await fetch(import.meta.env.VITE_API_URL+'/api/distribucion',{
            credentials:'include',
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dto)
        })

        const body: PostResponse<Distribucion> = await response.json()

        notiflix.loading.hideLoading()
        if(response.status === 200){
            notiflix.toast.failure(body.message!)
            return true
        }
        notiflix.toast.success('Litraje registrado!')
        return false
    }

}

export const distribucionService = new DistribucionService()