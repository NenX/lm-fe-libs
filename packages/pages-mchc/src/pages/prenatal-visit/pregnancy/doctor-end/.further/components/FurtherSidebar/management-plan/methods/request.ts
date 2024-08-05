import { request } from "@lm_fe/utils";

/**获取产检计划 */
async function getPlanVisitsOfOutpatient(id: string) {
  const res = await request.get('/api/doctor/getPlanVisitsOfOutpatient?id=' + id);
  return res.data;
}

/**更新产检计划 */
async function updateOutpatient(data: any) {
  const res = await request.post('/api/doctor/updatePlanVisitsOfOutpatient', data);
  return res.data;
}

export default {
  getPlanVisitsOfOutpatient,
  updateOutpatient,
};
