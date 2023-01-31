import { INotifyOptions, IBlockOptions } from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio'
import { Block } from 'notiflix/build/notiflix-block-aio'

class BlockService {
    private defaultOptions: IBlockOptions = {
        backgroundColor: '#E0E0E0',
    }

    block(blockElement: string | HTMLElement[] = '.blockable', textMessage = 'Cargando...') {
        Block.hourglass(blockElement, textMessage, this.defaultOptions)
    }

    unBlock(blockElement: string | HTMLElement[] = '.blockable') {
        Block.remove(blockElement)
    }

    constructor() { }
}

class ToastService {
    failure(message: string, options?: INotifyOptions) {
        Notify.failure(message, options)
    }

    success(message: string, options?: INotifyOptions) {
        Notify.success(message, options)
    }

    constructor() {
        Notify.init({
            position: 'center-top',
            fontSize: '16px',
            width: '20rem',
            failure: {
                background: '#ffffff',
                textColor: '#ff5549',
                notiflixIconColor: '#ff5549',
            },
            success: {
                background: '#ffffff',
                textColor: '#32c682',
                notiflixIconColor: '#32c682',
            }
        })
    }
}

class LoadingService {

    displayLoading(message: string, type: 'hourglass' | 'dots' = 'hourglass') {
        if (type === 'dots') {
            Loading.dots(message, { svgColor: '#EFC501', messageColor: '#EFC501' })
            return
        }
        Loading.hourglass(message, { svgColor: '#EFC501', messageColor: '#EFC501' })
    }

    hideLoading() {
        Loading.remove()
    }
}

class NotiflixService {
    loading = new LoadingService()
    toast = new ToastService()
    block = new BlockService()
}

export const notiflix = new NotiflixService()