import { MchcTypes, MchcType_default, } from "@lm_fe/env"

export interface IMchc_Doctor_RiskRecordsOfOutpatient<T extends MchcTypes = MchcType_default> {
    "id": number,
    "outEmrId": null,
    "eventDate": string,
    "gestationalWeek": null,
    "highriskGrade": string,
    "highriskNote": string
    "infection": null,
    "infectionNote": null,
    "note": null,
    "doctor": string


}