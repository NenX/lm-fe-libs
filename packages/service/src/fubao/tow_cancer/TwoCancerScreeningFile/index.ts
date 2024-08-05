import { ModelService } from "../../../ModelService";
import { IFubao_TwoCancerScreeningFile } from './type';
import { processTwoCancer_local, processTwoCancer_remote } from "./utils";
export * from './type';

class TwoCancerScreeningFile_Service extends ModelService<IFubao_TwoCancerScreeningFile> {
    async getOne(id: any) {
        let res = await this.getFuckPage({ params: { id } })
        const data = res.pageData[0]
        return processTwoCancer_remote(data)
    }
    async postOrPut(_data: IFubao_TwoCancerScreeningFile) {

        let data = await this[_data.id ? 'put' : 'post'](processTwoCancer_local(_data))
        return processTwoCancer_remote(data)
    }
}

export const SFubao_TwoCancerScreeningFile = new TwoCancerScreeningFile_Service({
    apiPrefix: '/fb/api',
    prePath: '/two/cancer/screening',
    n: 'TwoCancerScreeningFile',
})