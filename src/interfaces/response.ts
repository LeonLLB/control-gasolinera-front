

export interface Response<T>{
    success: boolean,
    data?:T
}

export interface PostResponse<T>{
    success?: boolean,
    data?:T
    message?: string
}