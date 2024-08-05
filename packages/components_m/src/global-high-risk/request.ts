
import { request } from '@lm_fe/utils';

export async function getGlobalJHighRiskAlert() {
  const res = await request.get('/api/getGlobalJHighRiskAlert');
  return res;
}

/**
 * 更新高危值
 */
export async function updateGlobaJHighRiskAlert(postdata: any) {
  const res = await request.put('/api/updateGlobalJHighRiskAlert', postdata);
  return res;
}

/**
 * 获取高危值修改记录
 */
export async function getGlobalJHighRiskUpdateRecord() {
  const res = await request.get('/api/getGlobalJHighRiskUpdateRecord?sort=id,desc&page=0&size=500');
  return res;
}
