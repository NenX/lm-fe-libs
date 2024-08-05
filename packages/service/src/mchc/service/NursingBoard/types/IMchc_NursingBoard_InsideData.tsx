export interface IMchc_NursingBoard_PregnancyInfo {
    admissionDate: null
    areaName: null
    areaNo: "001"
    bedNo: "34"
    blood: null
    blood_200ml: null
    blood_300ml: null
    blood_500ml: null
    blood_1000ml: null
    checkTotal: null
    checking: null
    dataName: null
    nurseLevel: null
    pregnancyName: string
}
export interface IMchc_NursingBoard_SignFrequencySetting {
    bloodGlucose: 4
    bloodPressure: 2
    sphygmus: 2
    temperature: 2
    doctor: IMchc_NursingBoard_MedicalPeople[]
    midwife: IMchc_NursingBoard_MedicalPeople[]

    nurse: IMchc_NursingBoard_MedicalPeople[]
}
export interface IMchc_NursingBoard_MedicalPeople {
    name: "测试"
    roleName: ""
    telephone: "11"
}
export interface IMchc_NursingBoard_BedInfo {
    bedNo: string
    diastolic: number
    nurseLevel: string
    pregnancyName: string
    sphygmus: number
    systolic: number
    temperature: number
}
export interface IMchc_NursingBoard_InsideData {
    bedInfo: IMchc_NursingBoard_BedInfo[]
    inform: {
        informContent: any[]
        total: number
    }
    nurseLevel: {
        name: string
        pregnancyInfo: IMchc_NursingBoard_PregnancyInfo[]
        total: number

    }[]
    postpartumHemorrhage: {

        dataName: string,
        pregnancyInfoVMS: IMchc_NursingBoard_PregnancyInfo[]
    }[]
    vitalSigns: {
        pregnancyInfo: IMchc_NursingBoard_PregnancyInfo[]
        signName: "脉搏"
        total: 83
    }[]
    wardStatistics: {
        admissionNow: 0
        bedInUseTotal: 83
        bedTotal: 51
        bedUnUseTotal: -32
        cesareanSection: 10
        deliveredNurse: 40
        deliveringNurse: 43
        discharged: 0
        epDeliveredNurse: null
        neonate: 23
        neonateMan: 7
        neonateWoman: 16
        postpartumHemorrhage: 32
        referralIn: 6
        referralInOut: 4
        wardStatisticsType: {
            total: number
            typeName: string
            pregnancyInfo: IMchc_NursingBoard_PregnancyInfo[]

        }[]
    }
    workLog: IMchc_NursingBoard_SignFrequencySetting
}