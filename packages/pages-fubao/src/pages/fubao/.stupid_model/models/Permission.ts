


export interface IModel_Permission {
    active: boolean
    icon: string
    id: number
    key: string /// eg. /knowledge/list
    name: string
    parentid: number
    sort: number
    type: "menu" | "route"
}