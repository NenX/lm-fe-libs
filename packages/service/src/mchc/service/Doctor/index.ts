import { mchcEnv, MchcTypes, MchcType_default, MchcType_广三 } from "@lm_fe/env"
import { request } from "@lm_fe/utils"
import { ModelService } from "src/ModelService"
import { TIdTypeCompatible } from "src/types"

import {
    IMchc_Doctor_Diagnoses, IMchc_Doctor_FirstVisitDiagnosisOutpatient, IMchc_Doctor_FirstVisitInfoOfOutpatient, IMchc_Doctor_FirstVisitPastmhOutpatient, IMchc_Doctor_OutpatientHeaderInfo,
    IMchc_Doctor_PreRiskAssessmentInfo,
    IMchc_Doctor_RiskRecordsOfOutpatient,
    IMchc_Doctor_RvisitInfoOfOutpatient,
    IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit,
    IMchc_Doctor_VteAssessForm
} from "./types"
import { IMchc_Doctor_BuildExamTimeAxis } from "./types/IMchc_Doctor_BuildExamTimeAxis"
import { processFirstInfoOfOutpatient, processPastmh_local, processPastmh_remote, processRvisitInfoOfOutpatient } from "./utils"
import { IMchc_HusbandBaseInfoOfOutpatient, IMchc_OutpatientDocumentStatus, IMchc_PregnancyBaseInfoOfOutpatient } from "../types"
import { process_husbandBaseInfo_local, process_husbandBaseInfo_remote } from "../types/utils"

export * from './types'

export class Mchc_Doctor_Service extends ModelService {
    // 越秀妇幼
    async getVisitEmrEditable(visitId: number) {
        const ret = await request.get<boolean>('/api/doctor/getVisitEmrEditable', { params: { visitId } })
        return ret.data
    }

    // 越秀妇幼
    async getDiagnoses(pregnancyId: number | string, serialNo?: string) {
        const ret = await request.get<IMchc_Doctor_Diagnoses[]>('/api/diagnoses', { params: { [`pregnancyId.equals`]: pregnancyId, [`serialNo.equals`]: serialNo } })
        return ret.data
    }

    // 越秀妇幼
    async newOrSaveDiagnosisOfOutpatientList<T extends MchcTypes>(data: Partial<IMchc_Doctor_Diagnoses<T>>[]) {
        const ret = await request.post<IMchc_Doctor_Diagnoses<T>[]>('/api/doctor/newOrSaveDiagnosisOfOutpatientList', data)
        return ret.data
    }
    async updateRvisitInfoOfOutpatient(data: Partial<IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit>) {
        const res = await request.post<IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit>('/api/doctor/updateRvisitRecordOfOutpatient', data);
        return res.data;
    }

    async getFirstVisitDiagnosisOutpatient(id: TIdTypeCompatible) {
        const res = await request.get<IMchc_Doctor_FirstVisitDiagnosisOutpatient>('/api/doctor/getFirstVisitDiagnosisOutpatient', { params: { id } });
        return res.data;
    }
    async updateFirstVisitDiagnosisOutpatient(data: Partial<IMchc_Doctor_FirstVisitDiagnosisOutpatient>) {

        const res = await request.put<IMchc_Doctor_FirstVisitDiagnosisOutpatient>('/api/doctor/updateFirstVisitDiagnosisOutpatient', data);
        return res.data;
    }
    async getOutpatientHeaderInfo(id: TIdTypeCompatible) {
        const res = await request.get<IMchc_Doctor_OutpatientHeaderInfo>('/api/doctor/getOutpatientHeaderInfo', { params: { id } });
        const data = res.data
        data.highriskLable = data.highriskLable?.trim()
        return data;
    };
    /**获取复诊记录数据 */
    async getRvisitInfoOfOutpatient(id: TIdTypeCompatible | { id: TIdTypeCompatible, serialNo?: any }) {
        const params = typeof id === 'object' ? id : { id }
        const { data } = await request.get<IMchc_Doctor_RvisitInfoOfOutpatient>('/api/doctor/getRvisitInfoOfOutpatient', { params });
        return processRvisitInfoOfOutpatient(data)
    }

    async getPreRiskAssessmentInfo(id: any) {
        const { data } = await request.get<IMchc_Doctor_PreRiskAssessmentInfo>(`/api/doctor/getPreRiskAssessmentInfo`, { params: { id } })
        return data
    }

    /**新增修改诊断 新增无id 修改带id*/
    async newOrSaveDiagnosisOfOutpatient(x: Partial<IMchc_Doctor_Diagnoses>) {
        const { data } = await request.post<any>(`/api/doctor/newOrSaveDiagnosisOfOutpatient`, x)
        return data
    }
    /** 排序诊断 */
    async sortDiagnosesOfOutpatient(data: any) {
        const res = await request.put('/api/doctor/sortDiagnosesOfOutpatient', data);
        return res.data;
    }
    async deleteDiagnosisOfOutpatient(id: TIdTypeCompatible) {
        const res = await request.delete(`/api/doctor/deleteDiagnosisOfOutpatient/${id}`);
        return res.data;
    }
    /**一次获得全部首检信息 */
    async getFirstVisitInfoOfOutpatient(id: TIdTypeCompatible) {
        const { data } = await request.get<IMchc_Doctor_FirstVisitInfoOfOutpatient>('/api/doctor/getFirstVisitInfoOfOutpatient?id=' + id);
        return processFirstInfoOfOutpatient(data);
    }

    async updateFirstVisitInfoOfOutpatient(requestBody: Partial<IMchc_Doctor_FirstVisitInfoOfOutpatient>) {
        const { data } = await request.put<IMchc_Doctor_FirstVisitInfoOfOutpatient>('/api/doctor/updateFirstVisitInfoOfOutpatient', requestBody);
        return processFirstInfoOfOutpatient(data);
    }

    async getVteAssessForm<T extends MchcTypes>(id: TIdTypeCompatible) {
        const path = mchcEnv.is('广三') ? `VteAssessForm3` : ``
        const { data } = await request.get<IMchc_Doctor_VteAssessForm<T>>(`/api/doctor/get${path}`, { params: { id } });
        return data
    }

    async updateVteAssessForm<T extends MchcTypes>(requestBody: Partial<IMchc_Doctor_VteAssessForm<T>>) {
        const path = mchcEnv.is('广三') ? `VteAssessForm3` : ``
        const { data } = await request.put<IMchc_Doctor_VteAssessForm<T>>(`/api/doctor/update${path}`, requestBody);
        return data
    }


    /** 检验检查时间轴 增加 type 0:所有 ，1:正常 ，2:异常   */
    async buildExamTimeAxisByType(pregnancyId: TIdTypeCompatible, type?: 0 | 1 | 2) {
        const { data } = await request.get<IMchc_Doctor_BuildExamTimeAxis[]>(`/api/buildExamTimeAxis`, { params: { pregnancyId, type } })
        return data
    }


    async getRiskRecordsOfOutpatient(id: TIdTypeCompatible) {
        const { data } = await request.get<IMchc_Doctor_RiskRecordsOfOutpatient[]>(`/api/doctor/getRiskRecordsOfOutpatient`, { params: { id, } })
        return data
    }

    /** 获取孕妇信息 */
    async getPregnancyBaseInfoOfOutpatient(id: string) {
        const res = await request.get<IMchc_PregnancyBaseInfoOfOutpatient>('/api/doctor/getPregnancyBaseInfoOfOutpatient?id=' + id);
        return res.data
    }

    /**更新孕妇信息 */
    async updatePregnancyBaseInfoOfOutpatient(data: any) {
        const res = await request.put<IMchc_PregnancyBaseInfoOfOutpatient>('/api/doctor/updatePregnancyBaseInfoOfOutpatient', data);
        return res.data
    }

    /**获取丈夫信息 */
    async getHusbandBaseInfoOfOutpatient(id: string) {
        const res = await request.get<IMchc_HusbandBaseInfoOfOutpatient>('/api/doctor/getHusbandBaseInfoOfOutpatient?id=' + id);
        return process_husbandBaseInfo_remote(res.data)
    }

    /**更新丈夫信息 */
    async updateHusbandBaseInfoOfOutpatient(data: any) {
        const res = await request.put<IMchc_HusbandBaseInfoOfOutpatient>('/api/doctor/updateHusbandBaseInfoOfOutpatient', process_husbandBaseInfo_local(data));
        return process_husbandBaseInfo_remote(res.data)
    }

    /**获取档案状态 */
    async getOutpatientDocumentStatus(id: string) {
        const res = await request.get<IMchc_OutpatientDocumentStatus>('/api/doctor/getOutpatientDocumentStatus?id=' + id);
        return res.data
    }

    /**更新档案状态 */
    async updateOutpatientDocumentStatus(data: any) {
        const res = await request.put<IMchc_OutpatientDocumentStatus>('/api/doctor/updateOutpatientDocumentStatus', data);
        return res.data
    }

    /**既往史 */
    async getFirstVisitPastmhOutpatient(id: string) {
        const res = await request.get<IMchc_Doctor_FirstVisitPastmhOutpatient>('/api/doctor/getFirstVisitPastmhOutpatient?id=' + id);
        return processPastmh_remote(res.data)
    }
    async updateFirstVisitPastmhOutpatient(data: any) {
        const res = await request.put<IMchc_Doctor_FirstVisitPastmhOutpatient>('/api/doctor/updateFirstVisitPastmhOutpatient', processPastmh_local(data));
        return processPastmh_remote(res.data)
    }
}

export const SMchc_Doctor = new Mchc_Doctor_Service


