import { ModelService } from '../../../ModelService'
import { IRequest_AxiosRequestConfig, expect_array, request } from "@lm_fe/utils"
import { MchcTypes, MchcType_广三, mchcEnv } from '@lm_fe/env'
import { TIdTypeCompatible } from '../../../types'


import { IMchc_Admission, IMchc_Admission_HeaderInfoOfInpatientEmr, IMchc_Admission_DeliveryInfo, IMchc_Admission_Document, IMchc_Admission_DocumentListItem } from './types'
import { processDocument } from './utils'
export * from './types'


class Mchc_Admission_Service extends ModelService<IMchc_Admission> {
    async getSpecialDatayByParam(data: { code: any, [x: string]: any }) {
        const res = await request.post<IMchc_Admission_Document[]>('/api/getSpecialDatayByParam', data, { successText: '操作成功!' })
        return expect_array(res.data)
    }
    async calculateTotalInputAndOutput(data: any[]) {

        const res = await request.post('/api/calculateTotalInputAndOutput', data, { successText: '操作成功!' })
        return expect_array(res.data)
    }
    async updateNursingDocument<T extends MchcTypes>(data: Partial<IMchc_Admission_Document<T>>) {
        const res = await request.post<IMchc_Admission_Document<T>>('/api/updateNursingDocument', data, { successText: '操作成功!' })
        return processDocument(res.data)
    }
    async newNursingDocument<T extends MchcTypes>(data: Partial<IMchc_Admission_Document<T>>) {
        const res = await request.post<IMchc_Admission_Document<T>>('/api/newNursingDocument', data, { successText: '操作成功!' })
        return processDocument(res.data)

    }
    async deleteNursingDocument() {
        return (await request.get<string>('/api/deleteNursingDocument')).data

    }
    async getInpatientEmrDocument<T extends MchcTypes>(id: TIdTypeCompatible) {
        const res = await request.get<IMchc_Admission_Document<T>>('/api/getInpatientEmrDocument', { params: { id } })
        return processDocument(res.data)

    }
    async importNursingDocument<T extends MchcTypes>(id: TIdTypeCompatible, code: string) {
        const res = await request.get<IMchc_Admission_Document<T>>('/api/importNursingDocument', { params: { id, code } })

        return processDocument(res.data)

    }
    async newOrUpdateNursingDocument<T extends MchcTypes>(data: Partial<IMchc_Admission_Document<T>>) {
        const isGoodId = data.id && data.id > 0
        return isGoodId ? this.updateNursingDocument(data) : this.newNursingDocument(data)

    }
    async getHeaderInfoOfInpatientEmr<T extends MchcTypes>(id: TIdTypeCompatible) {
        return (await request.get<IMchc_Admission_HeaderInfoOfInpatientEmr<T>>('/api/getHeaderInfoOfInpatientEmr', { params: { id } })).data
    }
    async getDeliveryInfo<T extends MchcTypes>(id: TIdTypeCompatible) {
        return (await request.get<IMchc_Admission_DeliveryInfo<T>>('/api/getDeliveryInfo', { params: { id } })).data
    }
    async listPatientLabExamReport<T extends MchcTypes>(data: Omit<IRequest_AxiosRequestConfig, 'params'> & { params: { inpatientNO?: string; outpatientNO?: string; idNO?: string, [x: string]: any } }) {
        const { idNO, inpatientNO, outpatientNO, id } = data.params
        let params = {
            id,
            idNO,
            idNo: idNO,
            inpatientNO,
            inpatientNo: inpatientNO,
            outpatientNO,
            outpatientNo: outpatientNO,
        }


        return (await request.get<any>('/api/listPatientLabExamReport', { ...data, params })).data
    }

    async fetchDocument<T extends MchcType_广三 = MchcType_广三>(item: IMchc_Admission_DocumentListItem<T>) {


        const inEmrId = item.inEmrId
        const activeId = item.id
        const code = item.code

        const isGoodId = activeId && activeId > 0

        if (!isGoodId && (!inEmrId || !code)) return null
        let getValues = (
            isGoodId ?
                SMchc_Admission.getInpatientEmrDocument<T>(activeId) :
                SMchc_Admission.importNursingDocument<T>(inEmrId, code)
        )
        return getValues
    }


}

export const SMchc_Admission = new Mchc_Admission_Service({
    n: '/admissions',
})




