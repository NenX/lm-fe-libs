import { request } from '@lm_fe/utils';
import { get } from 'lodash';
/**
 * 获取接诊情况
 */
export async function getUrgentSituation(dataArr: any) {
  return (await request.get(`/api/getUrgentSituation?startDate=${get(dataArr, `0`)}&endDate=${get(dataArr, `1`)}`)).data;
}

/**
 * 获取预约情况
 */
export async function getBookingSituation(dataArr: any) {
  return (await request.get(`/api/getBookingSituation?startDate=${get(dataArr, `0`)}&endDate=${get(dataArr, `1`)}`)).data;
}
