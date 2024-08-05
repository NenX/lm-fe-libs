export interface IMchc_LabExamImportTree_Item {
    id: number
    pid: number
    title: string
    items: {
        id: number
        pid: number
        title: string
        items: []
        labExamTypeEnum: string
        unusual: null
        unusualDesc: null
    }[]
    labExamTypeEnum: null
    unusual: null
    unusualDesc: null
}