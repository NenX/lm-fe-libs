import { request } from "@lm_fe/utils";
export default {
  /**
   * 获取报告列表
   * type, 1 为产前检查, 2位产前诊断
   */
  getLabExamGroup: (id: number, type: number = 1) => {
    if (type === 1) {
      return request.get(`/api/getLabExamGroup?pregnancyId=${id}`).then(r => r.data);
    } else if (type === 2) {
      return request.get(`/api/getLabExamGroupByPrenatal?prenatalPatientId=${id}`).then(r => r.data);
    }
    return [];
  },

  /** 标记报告已读 */
  saveFirstReader: (data: any) => request.post(`/api/saveFirstReader`, data).then(r => r.data),

  /** 获取外院报告pdf */
  getOutReportFileBase64: (path: string) => request.get(`/api/getOutReportFileBase64?path=${path}`).then(r => r.data),
};
