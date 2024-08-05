import { fubaoRequest as request } from '@lm_fe/utils';

export const getImageExamsByOutpatientNO = (outpatientNO) => {
  return request.get(`/api/image-exams?outpatientNO.equals=${outpatientNO}&sort=reportDate,desc&size=500&page=0`);
};
