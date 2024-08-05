import request from '@/lib/request';

/**获取双多胎 */
export async function getPregnancyCaseOfOutpatient(id: string) {
  const res = request.get('/api/doctor/getPregnancyCaseOfOutpatient?id=' + id);
  return res;
}

/**更新双多胎 */
export async function updatePregnancyCaseOfOutpatient(data: any) {
  const res = request.put('/api/doctor/updatePregnancyCaseOfOutpatient', data);
  return res;
}
