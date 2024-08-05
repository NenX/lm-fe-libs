import { request } from '@lm_fe/utils';

export const getInformedConsents = async (pregnancyId) => {
  const result = await request.get(`/api/pregnancy-documents?pregnancyId.equals=${pregnancyId}&sort=createDate,desc`);
  return result;
};

export const getInformedConsentById = async (id) => {
  const result = await request.get(`/api/pregnancy-documents/${id}`);
  return result;
};

export const createInformedConsent = async (data) => {
  const result = await request.post('/api/pregnancy-documents', data);
  return result;
};

export const updateInformedConsent = async (data) => {
  const result = await request.put('/api/pregnancy-documents', data);
  return result;
};
