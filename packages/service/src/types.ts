export type IFuckPageResponse<T> = IFuckResponse<
    {
        totalRow: number
        pageCurrent: number
        pageSize: number
        list: T[]
    }
>

export interface IFuckResponse<T> {
    message: string
    code: string
    data: T
}

export type TIdType = number

export type TIdTypeCompatible = number | string
