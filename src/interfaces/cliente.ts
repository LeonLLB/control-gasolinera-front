

interface ClienteCore{
    cedula: number
    nombre: string
    apellido: string
}

export interface Cliente extends ClienteCore {
    id: number

}

export interface ClienteDto extends ClienteCore{
    id?: number
}