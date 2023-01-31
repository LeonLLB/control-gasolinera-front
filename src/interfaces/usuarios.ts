
interface UsuarioCore{
    cedula: number
    usuario:string
    password: string
}

export interface Usuario extends UsuarioCore {
    id: number

    isAdmin: boolean
}

export interface UserDto extends UsuarioCore{

}