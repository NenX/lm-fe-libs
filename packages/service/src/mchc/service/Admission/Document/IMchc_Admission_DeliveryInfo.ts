import { MchcTypes } from "@lm_fe/env";
import { IMchc_Admission_LabourDocument } from "./IMchc_Admission_LabourDocument";
import { IMchc_Admission_NeonateDocument } from "./IMchc_Admission_NeonateDocument";

export interface IMchc_Admission_DeliveryInfo<T extends MchcTypes> {
  "id": 7300,
  "areaNO": "12312",
  "areaName": "12312",
  "bedNO": "123",
  "inpatientNO": "234234234",
  "name": "2342",
  "age": 21,
  "dob": "2022-11-02",
  "ethnic": "汉族",
  "occupation": null,
  "idType": 2,
  "idNO": "12312",
  "adminDate": "2022-11-03",
  "lmp": null,
  "edd": "2022-11-01",
  "sureEdd": "2022-11-02",
  "gravidity": 2,
  "parity": 1,
  "gestationalWeek": null,
  "currentGestationalWeek": "42",
  "permanentResidenceAddress": null,
  "residenceAddress": "北京市,市辖区,东城区&234234",
  "maritalStatus": 1,
  "labourRecord": IMchc_Admission_LabourDocument,
  "neonateRecord": IMchc_Admission_NeonateDocument[],
  "hbsag": null,
  "hbeag": null,
  "hbvExamDate": null
}