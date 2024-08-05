import { TIdTypeCompatible } from "src/types"
import { ModelService } from "../../../ModelService"
import { IMchc_Pregnancy } from "../Pregnancy"
export interface IMchc_SyphilisManage {
    id: TIdTypeCompatible
    referral: boolean
    consent: boolean
    tppa: string
    trust: string
    syphilisTreatments: {
        id: TIdTypeCompatible
        syphilisInjections: {
            id: TIdTypeCompatible
            injectionDate: "2022-09-06"
            gesweek: string
            injectionResult: "已执行"
            executeDate: null
            user: null
        }[]
    }[]
    syphilisFollowUps: {
        id: TIdTypeCompatible
        reportDate: "2022-09-06"
        tppa: null
        trust: string
    }[]
    pregnancy: IMchc_Pregnancy
}
export interface IMchc_HBvManage {
    id: TIdTypeCompatible
    "hbsag": "wewe",
    "hbsab": "sdf",
    "hbeag": null,
    "hbeab": null,
    "hbcab": null,
    "hbvDna": null,
    "useDrug": null,
    "drugContent": null,
    "useDrugWeek": null,
    pregnancy: IMchc_Pregnancy
}

export const SMchc_SyphilisManage = new ModelService<IMchc_SyphilisManage>({
    n: '/syphilis-managers'
})
export const SMchc_HBvManage = new ModelService<IMchc_HBvManage>({
    n: '/hbv-managers'
})