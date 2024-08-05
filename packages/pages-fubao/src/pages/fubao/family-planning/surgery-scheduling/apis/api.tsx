import { fubaoRequest as request } from '@lm_fe/utils';
export const getReservationPanelByDate = async (startDate: any, endDate: any) => {
  const params = {
    'schedulingDate.greaterOrEqualThan': startDate.format('YYYY-MM-DD'),
    'schedulingDate.lessOrEqualThan': endDate.format('YYYY-MM-DD'),
  };
  ///api/family/planning/getSchedulingInformation
  const response = (await request.get(`/api/family/planning/getSchedulingInformation`, { params })).data;
  return response;
};
