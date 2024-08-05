
import { request } from '@lm_fe/utils';
import { EProgressStatus } from './constant';
import { IModel_EarlyPregnancyCheckSurgeryType } from '@/stupid_model';

class BookingService {
    booking() {

    }
    getKnowledgeType() {
        type IDataType = { enumerations: { id: number, label: string, note: string, value: number }[] }
        return request.get('/api/dictionaries/134') as Promise<IDataType>
    }
    getKnowledge(type: number) {
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
        return request.get(`/api/knowledges?sort=id,desc&page=0&size=999&type.equals=${type}`) as Promise<IDataType[]>
    }
    appointmentSurgery(data: Partial<IModel_EarlyPregnancyCheckSurgeryType>) {

        return request.post('/api/family/planning/appointmentSurgery', {
            ...data,
            progressStatus: EProgressStatus.待签到

        }) as Promise<{ msg: string, data: IModel_EarlyPregnancyCheckSurgeryType }>
    }
    appointmentSurgerySign(data: Partial<IModel_EarlyPregnancyCheckSurgeryType>) {

        return request.put<{ msg: string }>('/api/family/planning/updateSurgeryProgress', {
            ...data,
            progressStatus: EProgressStatus.已签到

        })
    }
}
export const bookingService = new BookingService();