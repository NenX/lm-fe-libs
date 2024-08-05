import { ICommonOption, mchcEnv, optionKey不详, optionKey其他, optionKey否 } from "@lm_fe/env";
import { getSearchParamsValue, safe_json_parse_arr } from "@lm_fe/utils";
import { IFubao_TwoCancerScreeningFile } from "./type";


export function processTwoCancer_remote(data: IFubao_TwoCancerScreeningFile) {
    if (!data?.womenHealthcareMenstrualHistory) return data
    const womenHistory = data.womenHealthcareMenstrualHistory

    womenHistory.dysmenorrhea__ = [
        { value: womenHistory.dysmenorrhea, text: womenHistory.dysmenorrheaNote }
    ]

    return data
}
export function processTwoCancer_local(_data: IFubao_TwoCancerScreeningFile) {
    const data = { ..._data }

    const womenHistory = data.womenHealthcareMenstrualHistory
    if (!womenHistory) return _data
    const dysmenorrhea__ = safe_json_parse_arr(womenHistory.dysmenorrhea__)?.[0]
    if (dysmenorrhea__) {
        womenHistory.dysmenorrhea = dysmenorrhea__.value
        womenHistory.dysmenorrheaNote = dysmenorrhea__.text
    }


    data.womenHealthcareMenstrualHistory = womenHistory
    return data
}