
import { ModelService } from '../ModelService'

export interface IModel_Admissions {
    adAdvices: []
    adAllergyHistory: null
    adFamilyHistory: null
    adFetuses: []
    adGeneralExam: null
    adGynecologicalExam: null
    adInducedlabor: null
    adLabExamResults: []
    adMenstrualHistory: null
    adNurseLevelRecords: []
    adPartnerProfile: null
    adPersonalProfile: null
    adPhi: null
    adPhysicalExam: null
    adPpfoDiagnoses: []
    adPregnancyHistories: []
    adPresentDiseaseHistory: null
    adProcedureHistory: null
    adTablet: null
    adTransfusionHistory: null
    adTraumaHistory: null
    adUltrasounds: []
    adminDate: "2022-03-18"
    admittingDate: "2022-03-18"
    admittingDiagnoses: []
    age: 23
    areaNO: null
    areaName: "产房"
    auditDoctor: null
    auditTimestamp: null
    bedDoctor: null
    bedDoctorNO: null
    bedNO: "1234"
    bedNurse: null
    chiefcomplaint: null
    contacterIdNO: "340404199710101234"
    contacterIdType: 1
    contacterName: "刘昊然"
    contacterRelative: 1
    contacterResidenceAddress: null
    contacterTelephone: "1234"
    createdBy: "kevin"
    createdDate: "2022-04-01 15:41:04"
    currentGestationalWeek: null
    dischargeAdvice: null
    dischargeDate: null
    dischargeDiagnoses: []
    diseaseHistoryReader: null
    dob: "1998-04-24"
    doctor: null
    documents: []
    edd: "2022-03-23"
    education: 5
    embryoNumber: 2
    ethnic: "回族"
    gender: null
    gestationalWeek: "41+4"
    gravidity: 1
    handover: null
    highriskGrade: null
    highriskNote: null
    id: 7302
    idNO: "340403199804243614"
    idType: 1
    infection: null
    infectionNote: null
    inpatientNO: "123456"
    inpatientSum: null
    inspection: null
    intrapartumComplicatedDisease: null
    labExam: null
    labourRecord: null
    lastModifiedBy: "kevin"
    lastModifiedDate: "2022-04-01 15:50:59"
    lmp: "2021-06-16"
    lunaTimestamp: null
    maritalAge: null
    maritalStatus: 1
    maritalYears: null
    morseTumble: null
    name: "测试戴一一"
    nearRelation: null
    noenateRecords: []
    nurseLevel: "三级"
    nurseRecords: []
    occupation: null
    oxytocinAssess: null
    parity: 0
    partogramPregnancies: []
    permanentResidenceAddress: "安徽省"
    postpartumComplicatedDisease: null
    pregnancy: null
    pressureSores: null
    recorder: null
    referrals: []
    registeredResidenceNature: 2
    remark: null
    residenceAddress: "辽宁省,沈阳市,和平区&"
    riskRecords: []
    roomNO: "1234"
    settlementType: 1
    state: null
    status: null
    sureEdd: "2022-03-21"
    telephone: "1234"
    treatmentProcedure: null
    treatmentResult: null
    ultrasound: null
    vicedoctor: null
}

export interface IModel_BedInfo {
    areaName: "爱婴区"
    areaNo: "001"
    bedName: string
    bedNo: "+1床"
    checkInTime: null
    doctorName: null
    doctorNo: null
    id: 2792
    roomName: null
    roomNo: "1803"
    bedPatient: {
        admissionDate: null
        age: 31
        bloodGlucoseLable: null
        bloodGlucoseLableLevel: null
        cicatrixLable: null
        deliveryLable: "产时产后"
        dischargeDate: null
        fallLable: "跌倒"
        fetalNumLable: null
        gender: null
        highriskGrade: 4
        hishRiskLable: "Ⅳ"
        infectionLable: null
        inpatientNO: "ZY202106243567"
        name: string
        nurseLevel: 2
        oxytocin: false
        paymentType: 1
        pressureSoresLable: null
        sedative: true
        status: 1
        vteLabel: null
    }
}
export interface IModel_InpatientArea {
    areaNo: string
    areaName: string
}
export const SModel_Admissions = new class extends ModelService<IModel_Admissions>{
    loadAreaInfo() {
        return this._request<IModel_InpatientArea[]>({ url: '/api/bed/loadAreaInfo' })
    }
    findByArea(areaNo: string) {
        return this._request<IModel_BedInfo[]>({ url: '/api/bed/findByArea', params: { areaNo } })
    }
}({ n: '/admissions', })
