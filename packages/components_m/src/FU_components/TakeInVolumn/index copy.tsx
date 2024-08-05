import { EMPTY_PLACEHOLDER } from "@lm_fe/utils"
import { useMarshal } from "src/utils/useMarshal"
import { ArrayPanel } from "../ArrayPanel"
import { TCommonComponent } from "../types"
import React from "react"
interface TakeInVolumnProps {
    marshal?: boolean
}
export const TakeInVolumn: TCommonComponent<TakeInVolumnProps, any> = function TakeInVolumn(props) {
    const { value, onChange, marshal = false } = props
    console.log('safe_value !!', value, typeof value)

    return <div style={{ width: 460 }}>
        <ArrayPanel value={value} onChange={onChange} marshal={marshal}
            actionConfig={{ layout: '1/3', }}
            targetLabelCol={2}
            formDescriptions={[
                // { inputType: 'MyAutoComplete', label: '类型', name: 'incomingType' },
                { layout: '1/3', inputType: 'MyAutoComplete', label: '内容', name: 'incomingContent', inputProps: { optionKey: '入量s', dropdownStyle: { zIndex: 9999 }, style: { paddingRight: 4 } } },
                { layout: '1/3', inputType: 'input_number', label: 'ml', name: 'incomingML', inputProps: { style: { paddingRight: 4 } } },
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