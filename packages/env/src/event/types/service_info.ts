import { IBaseType } from "./common"


interface I_乙肝个案登机卡提醒 extends IBaseType<'乙肝个案登记卡提醒'> {
    flag: boolean

}

interface I_其他事件 extends IBaseType<'其他事件'> {

    data: {
        name: string
    }
}

export type IService_info = [I_乙肝个案登机卡提醒 | I_其他事件]