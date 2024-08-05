import { get } from 'lodash';
import { request, safe_json_parse } from '@lm_fe/utils';
export default {
  /** 获取表单配置 */
  getFormConfig: async (isProduction: boolean) => {
    const formWife =
      get(
        isProduction
          ? get(safe_json_parse(sessionStorage.getItem('formDescriptionsJson')), 'prenatal-examination-wife')
          : (await request.get(`/api/form-descriptions?moduleName=prenatal-examination-wife`)).data,
        0,
      ) || {};
    const formHusband =
      get(
        isProduction
          ? get(safe_json_parse(sessionStorage.getItem('formDescriptionsJson')), 'prenatal-examination-husband')
          : (await request.get(`/api/form-descriptions?moduleName=prenatal-examination-husband`)).data,
        0,
      ) || {};

    return {
      formWife,
      formHusband,
    };
  },
};
