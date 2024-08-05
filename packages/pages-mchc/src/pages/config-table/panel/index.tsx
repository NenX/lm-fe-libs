import { BaseEditPanelFormFC, mchcModal } from "@lm_fe/components_m"
import { getSearchParamsAll, getSearchParamsValue, safeExec } from "@lm_fe/utils"
import React, { useState } from "react"
// import { message } from "antd"
import { Form, message } from "antd"
import { useEffect } from "react"
import { ICommonProps, getConfigFullUrl, useConfigHook } from "../utils"
function MyConfigPanel(props: ICommonProps) {
    const id = getSearchParamsValue('id') ?? props.id

    const [form] = Form.useForm()

    const [config, model] = useConfigHook(props)
    const [data, setData] = useState<ICommonProps>()

    function sync() {
        model.current?.sync(getSearchParamsAll()).then(processData)
    }
    async function processData(data: any = {}) {
        let _data = data
        if (config?.handleBeforePopup) {
            _data = await config.handleBeforePopup(data)
        }

        setData(_data)
        form.setFieldsValue(_data)
    }
    useEffect(() => {
        if (id) {
            model.current?.getOne(id, { params: getSearchParamsAll() }).then(processData)
        } else {
            if (config?.needSync) {
                sync()
            } else {
                processData()
            }
        }

        return () => {

        }
    }, [config])
    return <div style={{ height: '100%', overflowY: 'scroll', padding: 12, paddingBottom: 64, background: '#fff' }}>
        <BaseEditPanelFormFC form={form} data={data} formDescriptions={config?.tableColumns}
            onPrint={() => {
                mchcModal.open('print_modal', {
                    modal_data: {
                        requestData: { url: `${getConfigFullUrl(config)}print` }
                    }
                })
            }}
            onSync={config?.needSync ? sync : undefined}
            onFinish={v => {
                const _data = { ...data, ...v }
                const value = safeExec(config?.beforeSubmit, _data) ?? _data
                model.current?.postOrPut(value)?.then(() => message.success('操作成功'))
            }} />

    </div>
}
export default MyConfigPanel