import { MchcTypes, MchcType_default, MchcType_越秀妇幼, } from "@lm_fe/env";
import { IMchc_Doctor_Diagnoses } from "./common";


export interface IMchc_Doctor_RvisitInfoOfOutpatient<T extends MchcTypes = MchcType_default> {

    diagnoses: IMchc_Doctor_Diagnoses<T>[]
    lackReports: string[]
    rvisits: IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit[]
    visitPlans: []
    id: number
    isOpenVTETable: number // isOpenVTETable
    isOpenSCTable: number // 瘢痕子宫阴道试产表
    isOpenEclampsiaTable: number // isOpenEclampsiaTable
    serialNo: string
}

export interface IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit {
    today?: boolean
    appointmentCycle: null
    appointmentDate: string
    appointmentPeriod: string
    appointmentType: null
    chiefComplaint: null
    childUltrasounds: []
    doctorName: string
    edema: null
    exam: null
    fetusExam: {

        fetalHeartRate: "111",
        fetalMovement: "正常",
        fetalPosition: "右下",
        position: "LOA",
        presentation: "不清",
    }[]
    gestationalWeek: string
    id: number
    inspection: null
    nucleicAcidTest: number
    outEmrId: number
    outpatientNo: string
    phi: null
    prescription: null
    serialNo: string
    visitDate: string
    cardiacDisease: {
        heartrate: null
        medication: null
        otherNote: null
    }
    gdm: {
        fbg: null
        hbalc: null
        inslname: null
        pbg2: null
    }
    gynExam: {
        engagement: null
        fundalHeight: null
        waistHip: null
    }
    hypothyroidism: {
        t4: null
        tsh: null
    }
    icp: {
        alt: null
        ast: null
        tba: null
    }
    physicalExam: {
        diastolic: 70
        diastolic2: null
        diastolic3: null
        systolic: 120
        systolic2: null
        systolic3: null
        weight: 45
    }
    pih: {
        medication: null
        quality: null
        quantity: null
    }

    isOpenVTETable: number
    isOpenSCTable: number
    isOpenEclampsiaTable: number
}
