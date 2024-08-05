import { fubaoRequest as request } from '@lm_fe/utils';
import { IModel_EarlyPregnancyCheckSurgeryType } from '../../../.stupid_model';
import { EProgressStatus } from '../constant';
class BookingService {
    booking() {

    }
    async getKnowledgeType() {
        type IDataType = { enumerations: { id: number, label: string, note: string, value: number }[] }
        return (await request.get('/api/dictionaries/134')).data as Promise<IDataType>
    }
    async getKnowledge(type: number) {
        type IDataType = {
            collect: null
            content: string
            createDate: null
            createUser: null
            description: string
            favorite: null
            hits: null
            id: 34
            release: false
            releaseTime: null
            releaseUser: null
            sticky: true
            thumbnail: "http://obcdn.oss-cn-shenzhen.aliyuncs.com/images/20210415175951_706.jpg?Expires=1933840791&OSSAccessKeyId=LTAI9jOS6g6sCFGf&Signature=CrT8OazWl7oQHofJxw71vlJvvjw%3D"
            title: string
            type: 2
        }
        return (await request.get(`/api/knowledges?sort=id,desc&page=0&size=999&type.equals=${type}`)).data as Promise<IDataType[]>
    }
    async appointmentSurgery(data: Partial<IModel_EarlyPregnancyCheckSurgeryType>) {

        return (await request.post<{ msg: string }>('/api/family/planning/appointmentSurgery', {
            ...data,

        })).data
    }
    async appointmentSurgerySign(data: Partial<IModel_EarlyPregnancyCheckSurgeryType>) {

        return (await request.put<{ msg: string }>('/api/family/planning/updateSurgeryProgress', {
            ...data,
            progressStatus: EProgressStatus.已签到

        })).data
    }
}
export const bookingService = new BookingService();