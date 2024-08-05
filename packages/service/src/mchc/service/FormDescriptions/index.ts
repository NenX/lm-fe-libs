import { request } from "@lm_fe/utils"


import { IMchc_FormDescriptions_Field, IMchc_FormDescriptions, IMchc_FormDescriptions_InputProps } from './types'
import { getCache, parseFormDescriptions, defineFormConfig, setCache } from "./utils"
export * from "./types"


export { parseFormDescriptions, defineFormConfig }



export const SMchc_FormDescriptions = {
    async getModule(moduleName: string,) {
        const res = await request.get<IMchc_FormDescriptions<true>[]>('/api/form-descriptions', { params: { moduleName } })
        setCache(moduleName, res.data)
        return res.data
    },
    async getModuleCache(moduleName: string,) {
        return getCache(moduleName) ?? this.getModule(moduleName)
    },
    async getModuleParse(moduleName: string,) {
        const data = await this.getModule(moduleName)
        return parseFormDescriptions(data)
    },
    async getModuleParseCache(moduleName: string,) {
        const data = await this.getModuleCache(moduleName)
        return parseFormDescriptions(data)

    }
}