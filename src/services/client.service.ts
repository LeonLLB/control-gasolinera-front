import { Response } from "../interfaces/response"
import { Cliente } from "../interfaces/cliente"

class ClienteService {
    async getOne(cedula: number){
        const response = await fetch(import.meta.env.VITE_API_URL+'/api/clientes/'+cedula,{
            credentials:'include'
        })
    
        const data: Response<Cliente> = await response.json()

        return data
    }
}

export const clienteService = new ClienteService()