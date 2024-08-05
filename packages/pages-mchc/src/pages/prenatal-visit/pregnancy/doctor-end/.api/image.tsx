import { request } from "@lm_fe/utils";
export default {
  /**
   * 获取报告列表
   * type, 1 为产前检查, 2位产前诊断
   */
  getReportList: (id: number, type: number = 1) => {
    if (type === 1) {
      return request.get(`/api/getImageExam?pregnancyId=${id}&count=100&page=0`).then(r => r.data);
    } else if (type === 2) {
      return request.get(`/api/getImageExamByPrenatal?prenatalPatientId=${id}`).then(r => r.data);
    }
    return [];
  },
};
