import { MchcTypes, MchcType_default, MchcType_越秀妇幼 } from "@lm_fe/env"

export interface IMchc_Doctor_OutpatientHeaderInfo<T extends MchcTypes = MchcType_default> {
    age: number
    birthInsurance: false
    checkupNO: string
    cicatrixLable: string
    curgesweek: string
    daysAfterDelivery: null
    eclampsiaLable: null
    edd: string
    g: number
    gesweek: string
    hbvReportCardRemind: T extends MchcType_越秀妇幼 ? boolean : never
    highRiskDiagnosis: string
    highriskLable: string
    highriskNote?: string
    id: string
    infectionLable: string
    infectionNote?: string
    labourDate: null
    labourState: false
    labourWeek: null
    name: string
    outpatientNO: string
    p: number
    pregnancyCaseLable: string
    printLetterOfConsent: null
    recordstate: "1" | "0" | "6",
    tabPage: 'Initial'
    thrombusLable: string
    highriskGrade?: string


    // nurse
    // "sureEdd" : "2023-05-11",
}