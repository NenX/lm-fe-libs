
import { ModelService } from '../ModelService'


export interface IModel_TemplateTrees {
    active: boolean
    categoryCode: string
    categoryName: string
    code: string
    depid: number
    diagnosisCode: string
    icdCode: string
    id: number
    mnemonic: string
    pid: number
    sort: number
    systemType: number
    type: number
    userid: number
    val: string
}

export const SModel_TemplateTrees = new ModelService<IModel_TemplateTrees>({ n: '/template-trees' })
