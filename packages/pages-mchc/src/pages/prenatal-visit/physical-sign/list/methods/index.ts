import { request } from '@lm_fe/utils';
import { get } from 'lodash';

export const getPregnancyByOutpatientNO = async (outpatientNO: string) => {
  return (await request.get(`/api/pregnancies?outpatientNO.equals=${outpatientNO}`)).data;
};

export const getPrenatalVisits = async (id: string) => {
  const data = await request.get(`/api/prenatal-visits?visitType.equals=0&pregnancyId.equals=${id}`);
  return get(data.data, 0);
};

export const getMeasuresByDate = async (outpatientNO: string, date: string) => {
  const data = await request.get(`/api/measures?createDate.equals=${date}&outpatientNO.equals=${outpatientNO}`);
  return data.data;
};
