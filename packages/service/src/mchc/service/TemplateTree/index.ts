import { request } from '@lm_fe/utils';
import { TIdTypeCompatible } from 'src/types';
import { ModelService } from '../../../ModelService';
import { IMchc_LabExamImportTree_Item, IMchc_TemplateTree_AlertAssessment, IMchc_TemplateTree_Item } from './types'
export * from './types'




class TemplateTreeService extends ModelService<IMchc_TemplateTree_Item>{
    name = '/template-trees'
    /** 获取诊断模糊搜索数据 */
    async getDiagnosesTemplate(value: string, page = 0) {
        const code = encodeURIComponent(value);
        const code2 = encodeURIComponent(code);
        const { data } = await request.get<IMchc_TemplateTree_Item[]>(
            `/api/template-trees?type.equals=1&code.contains=${code2}&mnemonic.contains=${code2}&val.contains=${code2}`, { params: { page, size: 99 } },
        );
        return data
    }
    /** 获取模板数据 */
    async getTemplateTree(type: number | { type: number, page?: number, size?: number, depid?: number, userid?: number }) {
        const defaultSize = 99999
        const defaultPage = 0
        const params = typeof type === 'number' ?
            {
                size: defaultSize,
                page: defaultPage,
                'type.equals': type,
            } : {
                'depid.equals': type.depid,
                'type.equals': type.type,
                'userid.equals': type.userid,
                size: type.size ?? defaultSize,
                page: type.page ?? defaultPage,
            }

        const { data } = await request.get<IMchc_TemplateTree_Item[]>(`/api/template-trees`, { params })
        return data
    }

    deleteHighrisk(data: any) { request.delete(`/api/deleteAlertAssessment`, { params: data }) }

    /** 添加模板数据 */
    async addTemplateTree(item: Partial<IMchc_TemplateTree_Item>) {
        const { data } = await request.post(`/api/template-trees`, item)
        return data
    }

    /** 获取已勾选的模板数据 */
    async findAlertAssessment(type: number, pregnancyId: TIdTypeCompatible) {
        const { data } = await request.get<IMchc_TemplateTree_AlertAssessment>(`/api/findAlertAssessment`, { params: { type, pregnancyId } })
        return data
    }

    /** 保存已勾选的模板数据 */
    saveAlertAssessment(data: any) { request.post(`/api/saveAlertAssessment`, data) }

    /** 获取高危色卡颜色 */
    getHighriskColor(module: string) { request.get(`/api/dictionaries?module.equals=${module}`) }

    /** 设置漏诊提示、高危因素标记不再提醒 */
    saveCaseIgnore(data: any) { request.post(`/api/saveCaseIgnore`, data) }

    /** 获取检验报告结果 */
    async getLabExamImportTree(pregnancyId: TIdTypeCompatible) {
        const { data } = await request.get<IMchc_LabExamImportTree_Item[]>(`/api/getLabExamImportTree?pregnancyId=${pregnancyId}`)
        return data
    }

    /** 获取超声报告结果 */
    getImageExamImportTree(pregnancyId: TIdTypeCompatible) {
        request.get(`/api/getImageExamImportTree?pregnancyId=${pregnancyId}`)
    }
    /** 获取梅毒管理数据 */
    getSyphilisManagers(pregnancyId: TIdTypeCompatible) { return request.get(`/api/syphilis-managers?pregnancyId.equals=${pregnancyId}`) }

    /** 获取梅毒管理数据 */
    createSyphilisManagers(data: any) { return request.post(`/api/syphilis-managers`, data) }

    /** 获取梅毒管理数据 */
    updateSyphilisManagers(data: any) { return request.put(`/api/syphilis-managers`, data) }


}

export const SMchc_TemplateTrees = new TemplateTreeService()