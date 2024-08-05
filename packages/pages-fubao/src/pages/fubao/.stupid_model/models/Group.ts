import { IModel_Permission } from "./Permission";



export interface IModel_Group {
    authorities: { name: string }[]
    groupdesc: string
    id: number
    name: string
    nickname: string
    permissions: IModel_Permission[]
}