import { IMchc_TemplateTree_Item } from './IMchc_TemplateTree_Item'

export * from './IMchc_TemplateTree_Item'
export * from './IMchc_LabExamImportTree_Item'

export interface IMchc_TemplateTree_AlertAssessment {
    pregnancyId: number
    type: number
    templateId: number
    value: IMchc_TemplateTree_Item[]
    first: boolean
}

