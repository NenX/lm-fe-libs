import { ICommonOption } from "@lm_fe/env"
import { IFubao_womenHealthcareMenstrualHistory, IFubao_womenHealthcarePhysicalExamination } from "../types"

export interface IFubao_BreastCancerScreening {
    "id": 53,
    "breastCancerRecordNo": "2023RX0019",
    "screeningType": "乳腺癌筛查",
    "checkDate": "2023-12-07",
    "screeningSuggest": "定期检查",
    "deleteFlag": 0,
    "womenHealthcarePhysicalExamination": IFubao_womenHealthcarePhysicalExamination,
    "womenHealthcareMenstrualHistory": IFubao_womenHealthcareMenstrualHistory,
    "breastCancerMedicalHistory": {

        "id": 42,
        "previousBreastScreening": 1,
        "previousBreastScreeningNote": string,
        "previousBreastScreening__": ICommonOption[],
        "breastSurgeryOrBiopsy": 1,
        "breastSurgeryOrBiopsyNote": string,
        "breastSurgeryOrBiopsy__": ICommonOption[],
        "hormoneReplacementTherapyHistory": 1,
        "hormoneReplacementTherapyHistoryNote": 1,
        "hormoneReplacementTherapyHistory__": 1,
        "familyTumorHistory": "11：有：父母+222：有：子女",
        "breastCancerVOS": [],
        "ovarianCancerVOS": [],
        "deleteFlag": 0,
        "familyTumorHistoryVOS": {
            "tumorName": "222",
            "patientName": "有",
            "relationshipWithPatients": "子女"
        }[]

    },
    "breastCancerBreastPalpation": {
        "id": 50,
        "leftBreastSignsNote": "{\"checkedValues\":[0,5,1],\"withInputValues\":[null,{\"key\":1,\"value\":{\"0\":\"123\"}},null,null,null,{\"key\":5,\"value\":{\"0\":\"222\"}}]}",
        "leftBreastSymptomsNote": "{\"checkedValues\":[0,1,2],\"withInputValues\":[null,{\"key\":1,\"value\":{\"0\":\"周期性\"}},{\"key\":2,\"value\":{\"0\":\"血性\"}}]}",
        "rightBreastSignsNote": "{\"checkedValues\":[0,5,1,2],\"withInputValues\":[null,{\"key\":1,\"value\":{\"0\":\"最大直径   cm\"}},{\"key\":2,\"value\":{\"0\":\"123\"}},null,null,{\"key\":5,\"value\":{\"0\":\"22\"}}]}",
        "rightBreastSymptomsNote": "{\"checkedValues\":[0,1],\"withInputValues\":[null,{\"key\":1,\"value\":{\"0\":\"周期性\"}}]}",
        "other": "111",
        "deleteFlag": 0,
        "rightBreastSymptomsNoteVOS": [],
        "leftBreastSymptomsNoteVOS": [],
        "rightBreastSignsNoteVOS": [],
        "leftBreastSignsNoteVOS": []
    },
    "breastCancerAuxiliaryExamination": {
        "id": 58,
        "breastUltrasoundExamination": 2,
        "breastXBiRadsExamination": 2,
        "other": "111",
        "deleteFlag": 0
    },
    "breastCancerDiagnosisAndGuidance": {
        "id": 64,
        "screeningDiagnosis": 1,
        "screeningSuggest": "定期检查",
        "checkUnit": "111",
        "checkDate": "2023-12-07",
        "deleteFlag": 0
    }
}
