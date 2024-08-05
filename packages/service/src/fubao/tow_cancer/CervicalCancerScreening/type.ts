import { ICommonOption } from "@lm_fe/env"
import { IFubao_womenHealthcareMenstrualHistory, IFubao_womenHealthcarePhysicalExamination } from "../types"

export interface IFubao_CervicalCancerScreening {
    "id": 94,
    "screeningType": "宫颈癌筛查",
    "checkDate": "2023-11-27",
    "screeningSuggest": "定期检查",
    "deleteFlag": 0,
    "womenHealthcarePhysicalExamination": IFubao_womenHealthcarePhysicalExamination,
    "womenHealthcareMenstrualHistory": IFubao_womenHealthcareMenstrualHistory
    "cervicalCancerMedicalHistory": {
        "id": 76,
        "previousCervicalScreening": 2,
        "previousCervicalScreeningNote": "222",
        "previousCervicalScreening__": ICommonOption[],
        "discomfortItems": "{\"checkedValues\":[1,2,9],\"withInputValues\":[null,null,null,null,null,null,null,null,null,{\"key\":9,\"value\":{\"0\":\"22222\"}}]}",
        "contraceptiveMethodItems": "{\"checkedValues\":[1],\"withInputValues\":[null,{\"key\":1,\"value\":{\"0\":\"222\"}}]}",
        "gynecologicalDiseasesHistory": 2,
        "gynecologicalDiseasesHistoryNote": "2123",
        "gynecologicalDiseasesHistory__": ICommonOption[],
        "deleteFlag": 0,
        "familyTumorHistoryVOS": []
    },
    "cervicalCancerGynecologicExamination": {
        "id": 83,
        "vulva": 2,
        "vulvaNote": "22",
        "vulva__": ICommonOption[],
        "secretions": 2,
        "secretionsNote": "血性",
        "secretions__": ICommonOption[],
        "vaginal": 2,
        "vaginalNote": "22",
        "vaginal__": ICommonOption[],
        "cervix": 2,
        "cervixNote": "糜烂样",
        "cervix__": ICommonOption[],
        "zg": 2,
        "zgNote": "大小",
        "zg__": ICommonOption[],
        "appendix": 2,
        "appendixNote": "压痛",
        "appendix__": ICommonOption[],
        "other": "22",
        "deleteFlag": 0
    },
    "cervicalCancerInspection": {
        "id": 84,
        "vaginalCleanliness": 5,
        "trichomonas": 3,
        "candida": 3,
        "gardnerella": 3,
        "clueCell": 3,
        "other": "2222",
        "hpv": 3,
        "visualObservationAfterAceticIodineStaining": 1,
        "uterineCytology": 2,
        "uterineCytologyObtainingMaterialsWay": 3,
        "papClassification": 6,
        "tbsResult": 1,
        "deleteFlag": 0
    },
    "cervicalCancerDiagnosisAndGuidance": {
        "id": 96,
        "screeningResults": 1,
        "screeningSuggest": "定期检查",
        "screeningResultsNote": "",
        "screeningResults__": ICommonOption[]
        "checkUnit": "111",
        "checkDate": "2023-11-27",
        "checkDoctorName": "admin",
        "deleteFlag": 0
    }

}
