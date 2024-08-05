import { TIdTypeCompatible } from '@lm_fe/service';
import { request, safe_json_parse } from '@lm_fe/utils';
import { get } from 'lodash';
export default {
  /** 获取表单配置 */
  getSurveyFormConfig: async (isProduction: boolean) => {
    const formSurvey =
      get(
        isProduction
          ? get(safe_json_parse(sessionStorage.getItem('formDescriptionsJson')), 'prenatal-examination-survey')
          : (await request.get(`/api/form-descriptions?moduleName=prenatal-examination-survey`)).data,
        0,
      ) || {};
    return formSurvey;
  },

  getFurtherFormConfig: async (isProduction: boolean) => {
    const formFurther =
      get(
        isProduction
          ? get(safe_json_parse(sessionStorage.getItem('formDescriptionsJson')), 'prenatal-examination-further')
          : (await request.get(`/api/form-descriptions?moduleName=prenatal-examination-further`)).data,
        0,
      ) || {};
    return formFurther;
  },

  getUltrasoundFormConfig: async (isProduction: boolean) => {
    const formUltrasound =
      get(
        isProduction
          ? get(safe_json_parse(sessionStorage.getItem('formDescriptionsJson')), 'prenatal-examination-further-ultrasound')
          : await request.get(`/api/form-descriptions?moduleName=prenatal-examination-further-ultrasound`),
        0,
      ) || {};
    return formUltrasound;
  },

  /** 同步检验检查数据 */
  syncPatientReport: (pregnancyId: TIdTypeCompatible) => request.get(`/api/syncPatientReport?pregnancyId=${pregnancyId}`).then(r => r.data),

  /** 获取同步数据结果 */
  checkReportSync: (pregnancyId: TIdTypeCompatible) => request.get(`/api/checkReportSync?pregnancyId=${pregnancyId}`).then(r => r.data),

  /** 获取诊断历史记录 */
  findDiagnosisOperatingRecord: (pregnancyId: TIdTypeCompatible) =>
    request.get(`/api/findDiagnosisOperatingRecord?pregnancyId=${pregnancyId}`).then(r => r.data),

  /** 获取缺失报告列表 */
  findLackReports: (pregnancyId: TIdTypeCompatible) => request.get(`/api/findLackReports?pregnancyId=${pregnancyId}`).then(r => r.data),

  /** 检验检查时间轴 */
  buildExamTimeAxis: (pregnancyId: TIdTypeCompatible) => request.get(`/api/buildExamTimeAxis?pregnancyId=${pregnancyId}`).then(r => r.data),

  /** 查询产检计划模板 */
  getPrenatalVisitPlans: (pregnancyId: TIdTypeCompatible) =>
    request.get(`/api/prenatal-visit-plans?pregnancyId.equals=${pregnancyId}&sort=gestationalWeek,desc`).then(r => r.data),

  /** 查询产检计划模板类型 */
  getPrenatalVisitPlanTypes: () => request.get(`/api/prenatal-visit-plan-types?pageSize=50&pageNumber=1`).then(r => r.data),

  /** 更新产检计划模板类型 */
  updatePrenatalVisitPlanTypes: (data: any) => request.put(`/api/prenatal-visit-plan-types`, data).then(r => r.data),

  /** 新增产检计划模板类型 */
  addPrenatalVisitPlanTypes: (data: any) => request.post(`/api/prenatal-visit-plan-types`, data).then(r => r.data),

  /** 删除产检计划模板类型 */
  deletePrenatalVisitPlanTypes: (id: number) => request.delete(`/api/prenatal-visit-plan-types/${id}`).then(r => r.data),

  /**新增修改诊断 新增无id 修改带id*/
  newAddDiagnosis: (data: any) => request.post(`/api/doctor/newOrSaveDiagnosisOfOutpatient`, data).then(r => r.data),
};
