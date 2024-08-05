import { EMPTY_PLACEHOLDER } from "@lm_fe/utils"
import { useMarshal } from "src/utils/useMarshal"
import { ArrayPanel } from "../ArrayPanel"
import { TCommonComponent } from "../types"
import React from "react"
import { MyEditTable } from "../MyEditTable"
interface TakeInVolumnProps {
    marshal?: boolean
}
export const TakeInVolumn: TCommonComponent<TakeInVolumnProps, any> = function TakeInVolumn(props) {
    const { value, onChange, marshal = false } = props

    return <div style={{ width: 460 }}>
        <MyEditTable value={value} onChange={onChange} marshal={marshal}
            formDescriptions={[
                {
                    dataIndex: 'incomingContent', title: '内容', inputType: 'MyAutoComplete',
                    inputProps: { optionKey: '入量s', dropdownStyle: { zIndex: 9999 }, style: { paddingRight: 4 } }
                },
                { dataIndex: 'incomingML', title: 'ml', inputType: 'InputNumber', },
            ]}
        />
    </div>
}
TakeInVolumn.DisplayFC = function TakeInVolumnDisplayFC(props) {
    const { value, onChange, marshal = false } = props
    const { safe_value } = useMarshal<any[]>(marshal, value, onChange)
    return <span>
        {
            safe_value?.map?.(_ => `${_.incomingContent ?? EMPTY_PLACEHOLDER}(${_.incomingML ?? EMPTY_PLACEHOLDER}ml)`)?.join?.('、') ?? safe_value
        }
    </span>
}