import { Cliente, ClienteDto } from "./cliente";


export interface Distribucion {
    id:number,
    cliente:Cliente,
    litraje:number,
    placa:string
    modelo:string
}

export interface DistribucionDto {
    cliente:ClienteDto,
    litraje:number,
    placa:string
    modelo:string
}