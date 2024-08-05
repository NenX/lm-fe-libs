import { fubaoRequest as request } from '@lm_fe/utils';

export const getLibExamsByOutpatientNO = async(outpatientNO) => {
  return (await request.get(`/api/lab-exams?outpatientNO.equals=${outpatientNO}&sort=reportDate,desc&size=500&page=0`)).data
};
