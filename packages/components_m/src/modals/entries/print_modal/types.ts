import { Request } from '@lm_fe/utils';
import { AxiosRequestConfig } from 'axios';
import { lm_pdfjs_info } from '@lm_fe/static'
export interface IPrintResData {
    pdfdata?: string
    filepath?: string
    imagesData?: string[]
}
export type TVersion = keyof typeof lm_pdfjs_info.dirs
export interface IPrintModalProps {
    request?: Request
    requestData?: {
        url: string
        resource?: string
        template?: string
        version?: string
        note?: string
        id?: number | string
        method?: string
        subid?: number
        vmName?: string
        [x: string]: any
    }
    requestConfig?: AxiosRequestConfig
    printData?: string
    version?: TVersion
    filepath?: string
    callback?(data?: string): void
}
