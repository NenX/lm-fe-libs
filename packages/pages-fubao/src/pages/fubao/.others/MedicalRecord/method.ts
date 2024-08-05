import { fubaoRequest as request } from '@lm_fe/utils';
import { map, get, set } from 'lodash';

export const getAllPrenatalDiagnosesByPatientId = async (patientID: number) => {
  return (await request.get(
    `/api/prenatal-diagnoses?visitStyle.in=0,1&prenatalPatientId.equals=${patientID}&sort=visitDate,desc&page=0&size=999`,
  )).data;
};

const pastHistory = [
  { key: 'pdDiseaseHistory.hypertension', name: '高血压' },
  { key: 'pdDiseaseHistory.diabetes', name: '糖尿病' },
  { key: 'pdDiseaseHistory.cardiacDisease', name: '心脏病' },
  { key: 'pdProcedureHistory.other', name: '手术史' },
  { key: 'pdAllergyHistory.other', name: '过敏史' },
  { key: 'pdTransfusionHistory.other', name: '输血史' },
  { key: 'pdDiseaseHistory.other', name: '其他' },
];

const personalHistory = [
  { key: 'pdPrenatalPatientProfile.smoke', name: '吸烟' },
  { key: 'pdPrenatalPatientProfile.alcohol', name: '饮酒' },
  { key: 'pdPrenatalPatientProfile.hazardoussubstances', name: '接触有害物质' },
  { key: 'pdPrenatalPatientProfile.radioactivity', name: '接触放射线' },
  { key: 'pdPrenatalPatientProfile.other', name: '其它' },
];

const familyHistory = [
  { key: 'pdFamilyHistory.diabetes', name: '糖尿病' },
  { key: 'pdFamilyHistory.birthdefects', name: '先天畸形' },
  { key: 'pdFamilyHistory.heritableDisease', name: '遗传疾病' },
  { key: 'pdFamilyHistory.hypertension', name: '高血压' },
  { key: 'pdFamilyHistory.other', name: '其它' },
];

export const transformMedicalRecordData = (data: any) => {
  let pdDiseaseHistoryOther = '';
  let pdPrenatalPatientProfileAllNote = '';
  let pdFamilyHistoryOther = '';

  map(pastHistory, (item) => {
    if (get(data, item.key) && !!get(data, `${item.key}Note`)) {
      pdDiseaseHistoryOther += `${item.name}：${get(data, `${item.key}Note`)}；`;
    }
  });

  map(personalHistory, (item) => {
    if (get(data, item.key) && !!get(data, `${item.key}Note`)) {
      pdPrenatalPatientProfileAllNote += `${item.name}：${get(data, `${item.key}Note`)}；`;
    }
  });

  map(familyHistory, (item) => {
    if (get(data, item.key) && !!get(data, `${item.key}Note`)) {
      pdFamilyHistoryOther += `${item.name}：${get(data, `${item.key}Note`)}；`;
    }
  });

  set(data, 'pdDiseaseHistory.other', true);
  set(data, 'pdDiseaseHistory.otherNote', pdDiseaseHistoryOther);
  set(data, 'pdPrenatalPatientProfile.allNote', pdPrenatalPatientProfileAllNote);
  set(data, 'pdFamilyHistory.other', true);
  set(data, 'pdFamilyHistory.otherNote', pdFamilyHistoryOther);

  return data;
};
