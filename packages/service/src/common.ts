

import { AxiosRequestConfig } from 'axios';
import { ModelService } from './ModelService';
export type IPageData = Partial<{ page: number; size: number;[x: string]: any }>;

export type IResponseDataType<T> = { data: T; code: 500 | 200 | 1 | 0; msg?: string; _XTotalCount?: string | number };


export type TPageOption = AxiosRequestConfig & { params?: IPageData };

export function registerErrHandler(fn: typeof ModelService.onErrMessage) {
    ModelService.onErrMessage = fn
}
export function configService(data: Partial<typeof ModelService.CONFIG> = {}) {
    Object.assign(ModelService.CONFIG, data)
}


