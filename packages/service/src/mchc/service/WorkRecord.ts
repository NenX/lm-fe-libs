
import { ModelService } from '../../ModelService'
import { IMchc_Pregnancy } from './Pregnancy'


export interface IMchc_WorkRecord {
    createby: "system"
    createtime: "2022-04-02T20:25:44+08:00"
    domain: null
    id: 49543
    knowledgeTaskId: 88
    media: "wx"
    notifystate: null
    notifytime: null
    prDocument: null
    prTreatmentId: null
    pregnancy: IMchc_Pregnancy
    remark: null
    reply: string
    replytime: null
    resourceId: number
    resourceType: 3
    result: null
    score: null
    title: null
    workflowid: null
    workstepid: null
}

export const SMchc_WorkRecord = new ModelService<IMchc_WorkRecord>({
    n: '/work-records',
})
