import { IModel_Group } from "./Group";



export interface IModel_User {
    activated: true
    authorities: null
    config: null
    createdBy: string
    createdDate: string
    email: string
    firstName: string
    groups: IModel_Group[]
    id: number
    imageUrl: null
    langKey: string
    lastModifiedBy: string
    lastModifiedDate: string
    lastName: null
    login: string
    overdueDate: string
    password: null
    userType: null
    wards: null
}