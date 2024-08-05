export interface ISystemConfig {
    id: number
    systemName: string
    systemMode: "devlopment"
    systemTheme: string
    expireTime: number
    openWebsocket: boolean
    websocketAddress: "ws://127.0.0.1:8087/Laputa",
    auditRestriction: boolean
    openIntro: boolean
    fetalMonitor: string
    openHighriskSign: boolean
    highriskVersion: number
    curveVersion: "nichd",
    prenatalDiagnosis: boolean
    CaseReport: boolean
    FetalMonitor: boolean
    InformedConsent: boolean
    nurseDeskVoucher: boolean
    pregnancyInitial: 'tab' | 'vertical'
    isOpenDiabetes: boolean
    diagnosisStyle: "tab",
    diagnosisFollowUpRecord: boolean
    diagnosisLaboratoryReport: boolean
    diagnosisPrenatalVisit: boolean
    tablePrintBtn: boolean
    homeStatistics: boolean
    highriskStatistics: boolean
    customerService: true
    highriskType: string
    禁止编辑高危等级: boolean
    护士端_禁止编辑高危因素_传染病: boolean
    医生端_模块隐藏: string[]
    doctorOpenWebsocket: boolean
    VTE预防用药筛查表: string
    nurseHide: string[],
    medicalHide: string[]
    PDF预览组件版本?: string

}

interface ITab {


    closable: boolean
    key: string
    lastSearch: string
    path: string
    search: string
    title: string

}

export interface IState {
    system: {
        config: ISystemConfig
        collapsed: boolean
        socketState: boolean
    }
    tabs: {
        activeKey: string
        tabs: ITab[]
        tabsMapping: {
            [x: string]: ITab
        }
    }
    user: {
        userData: any
        basicInfo: any
        allMenuTree: any[]
        menuTree: any[]
        permissionsMapping: { x: string }
    }
    dictionaries: { [x: string]: IDictionaries, } & { initDictionaries: IDictionaries[] }
}

export interface IDictionaries {
    id: number
    module: string
    type: number
    key: string
    name: string
    note: string
    enumerations: IDictionaries_Enumeration[]
}
export interface IDictionaries_Enumeration {
    id: number
    label: string
    note: string
    value: number
}