import { MyBaseListProps } from "@lm_fe/components_m";
import { getSymbolFromDynamicScript, mchcEvent, mchcLogger } from "@lm_fe/env";
import { ModelService, TIdType } from "@lm_fe/service";
import { getHappyArg, request, safeGetFromFuncOrData } from "@lm_fe/utils";
import { useEffect, useRef, useState } from "react";
export type TConfig = Partial<MyBaseListProps> & { watchScript?: string, needSync?: boolean, needPrint?: boolean }
export interface ICommonProps {
    configId?: TIdType
    id?: any
    history?: any
}
export function getConfigOne(props: ICommonProps) {

    const id = getHappyArg() ?? props.configId

    return request.get<TConfig>(`/api/tableConfig/${id}`, { showMsg: false }).then(r => {
        const config = r.data
        config.genColumns = getSymbolFromDynamicScript(config.genColumns, props)

        config.handleBeforePopup = getSymbolFromDynamicScript(config.handleBeforePopup, props)
        config.beforeSubmit = getSymbolFromDynamicScript(config.beforeSubmit, props)

        const tableColumns = getSymbolFromDynamicScript(config.tableColumns, props)
        config.tableColumns = safeGetFromFuncOrData(tableColumns)

        const initialSearchValue = getSymbolFromDynamicScript(config.initialSearchValue, props)
        config.initialSearchValue = safeGetFromFuncOrData(initialSearchValue)

        const searchParams = getSymbolFromDynamicScript(config.searchParams, props)
        config.searchParams = safeGetFromFuncOrData(searchParams)

        const searchConfig = getSymbolFromDynamicScript(config.searchConfig, props)
        config.searchConfig = safeGetFromFuncOrData(searchConfig)




        mchcLogger.log('table config', config)

        return config
    })
}
export function useConfigHook(props?: any) {
    const model = useRef<ModelService>()
    const [config, setconfig] = useState<Partial<TConfig>>()
    const _requesting = useRef(false)
    useEffect(() => {
        if (!_requesting.current) {
            _requesting.current = true
            getConfigOne(props)
                .then(c => {
                    setconfig(c)
                })
                .finally(() => _requesting.current = false)
        }
    }, [props])



    useEffect(() => {
        const watchScript = config?.watchScript
        // const _message = message
        const rm = mchcEvent.on_rm('my_form', getSymbolFromDynamicScript(watchScript!, props) ?? function (event) {


        })


        model.current = model.current || getM(config)
        return rm
    }, [config])
    return [config, model] as const
}
export function getM(config?: TConfig) {
    if (!config?.name) return
    return new ModelService({ n: config.name, needTransferParams: false, apiPrefix: config.apiPrefix })
}
export function getConfigFullUrl(config?: TConfig) {
    if (!config) return ''
    return `${config.apiPrefix}${config.name}`
}