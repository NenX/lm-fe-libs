import { request } from '@lm_fe/utils';

// 获取公开项目的数据字典
export async function getTreatmentProgramDict() {
  const res = await request.get(`/api/postpartum/treatment/getOpenTreatmentProgram`);
  let ProgramDictObj = {};
  res.data.map((program: any) => {
    ProgramDictObj[program.projectName] = program.id;
  });
  return ProgramDictObj;
}

export async function getScheduByDateAndProjectId(params: any) {
  const res = await request.get(`/api/postpartum/treatment/getSchedulingDetails?${params}`);
  if (res.data.schedulingDetailsVMList.length) {
    return res.data.schedulingDetailsVMList[0].timeRangeList;
  }
  return [];
}
