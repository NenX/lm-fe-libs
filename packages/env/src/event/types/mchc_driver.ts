import { getOptionValue } from "src/select_options"
import { checkIdNo_new } from "src/utils/checkIdNO"


const ReadCard_TPL = {
    "name": "温伟杰",
    "gender": "1",
    "people": "01",
    "birth": "19981026",
    "idno": "620503199810260019",
    "address": "甘肃省天水市麦积区商埠路东１４号",
    "agency": "天水市公安局麦积分局",
    "expirestart": "20150210",
    "expireend": "20250210"
}
interface IReadCardData {
    name: string
    address: string
    idNO: string
    idType: number
    dob: string
    age: number
    nationality: string
    nativeplace: string
    gender: string
}
type T_ReadCard_RAw = typeof ReadCard_TPL
type T_ReadCard_Key_RAW = keyof T_ReadCard_RAw
type T_ReadCard_Msg = { type: 'ReadCard', data: IReadCardData }

type T_QRScan_Msg = { type: 'QRScan' }

export type TDirver_Event = T_ReadCard_Msg | T_QRScan_Msg

const readCard_data_keys = Object.keys(ReadCard_TPL) as T_ReadCard_Key_RAW[]


export function check_is_readcard(data: any) {
    const maybeReadCard = data as T_ReadCard_RAw

    return readCard_data_keys.every(k => maybeReadCard[k])
}
export function parse_readcard_data(_data: any): IReadCardData | undefined {
    const data = _data as T_ReadCard_RAw
    const __personal = checkIdNo_new(data.idno)

    if (__personal) {

        return {
            name: data.name,
            address: data.address,
            idNO: data.idno,
            idType: getOptionValue('证件类型', '身份证'),
            dob: __personal.birth!,
            age: __personal.age!,
            gender: __personal.gender!,
            nationality: __personal.nationality!,
            nativeplace: __personal.province!,
        }

    }
    return
}


