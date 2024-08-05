import { request, safe_json_parse } from '@lm_fe/utils';
import { get } from 'lodash';
export default {
  /** 获取表单配置 */
  getPostpartumFormConfig: async (isProduction: boolean) => {
    const formPostpartum =
      get(
        isProduction
          ? get(safe_json_parse(sessionStorage.getItem('formDescriptionsJson')), 'prenatal-examination-postpartum')
          : (await request.get(`/api/form-descriptions?moduleName=prenatal-examination-postpartum`)).data,
        0,
      ) || {};
    return formPostpartum;
  },
};
