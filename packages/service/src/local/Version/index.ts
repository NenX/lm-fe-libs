import { getMacroValue } from "@lm_fe/env";
import { rawRequest } from "@lm_fe/utils";

const key = 'check_version'


export const SLocal_Version = {

    // 获取版本
    async checkVersion() {
        const { data } = await rawRequest.get<string>(`/${key}`, { params: { t: +new Date() } });
        const old = getMacroValue(key)
        return old !== data?.toString()
    },

}