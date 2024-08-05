import request from '@/lib/request';
/** 获取孕妇信息 */
async function getPregnancyBaseInfo(id: string) {
  const res = await request.get('/api/doctor/getPregnancyBaseInfoOfOutpatient?id=' + id);
  return res;
}

/**更新孕妇信息 */
async function updatePregnancyBaseInfo(data: any) {
  const res = await request.put('/api/doctor/updatePregnancyBaseInfoOfOutpatient', data);
  return res;
}

/**获取丈夫信息 */
async function getHusbandBaseInfo(id: string) {
  const res = await request.get('/api/doctor/getHusbandBaseInfoOfOutpatient?id=' + id);
  return res;
}

/**更新丈夫信息 */
async function updateHusbandBaseInfo(data: any) {
  const res = await request.put('/api/doctor/updateHusbandBaseInfoOfOutpatient', data);
  return res;
}

/**获取档案状态 */
async function getOutpatientDocumentStatus(id: string) {
  const res = await request.get('/api/doctor/getOutpatientDocumentStatus?id=' + id);
  return res;
}

/**更新档案状态 */
async function updateOutpatientDocumentStatus(data: any) {
  const res = await request.put('/api/doctor/updateOutpatientDocumentStatus', data);
  return res;
}

export default {
  getPregnancyBaseInfo,
  updatePregnancyBaseInfo,
  getHusbandBaseInfo,
  updateHusbandBaseInfo,
  getOutpatientDocumentStatus,
  updateOutpatientDocumentStatus,
  getRequest: {
    'tab-0': getPregnancyBaseInfo,
    'tab-1': getHusbandBaseInfo,
  },
  updateRequest: {
    'tab-0': updatePregnancyBaseInfo,
    'tab-1': updateHusbandBaseInfo,
  },
};
