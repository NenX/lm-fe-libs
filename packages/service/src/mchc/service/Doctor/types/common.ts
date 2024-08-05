import { MchcTypes, MchcType_default, MchcType_越秀妇幼 } from "@lm_fe/env"
import { IMchc_Pregnancy } from "../../Pregnancy"





export interface IMchc_Doctor_Diagnoses<T extends MchcTypes = MchcType_default> {
    categoryCode: null
    categoryName: null
    createDate: string
    createdBy: string
    deleteDate: null
    deleted: null
    deletedoctor: null
    createdDate: string
    diagnosis: string
    diagnosisCode: string
    doctor: null
    gestationalWeek: string
    highrisk: false
    icdCode: null
    id: number
    lastModifiedBy: string
    lastModifiedDate: string
    note: string
    preNote: string
    pregnancy: IMchc_Pregnancy
    remark: null
    serialNo: T extends MchcType_越秀妇幼 ? string : never
    sort: number
    // 兼容
    visible: boolean

    outEmrId: number
    clear: boolean
    ignoreState: null

    visitNo: null
    depCode: null

}
