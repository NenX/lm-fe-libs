import { EMPTY_PLACEHOLDER, safe_json_parse_arr } from "@lm_fe/utils"
import React from "react"
import { useMarshal } from "src/utils/useMarshal"
import { ArrayPanel } from "../ArrayPanel"
import { TCommonComponent } from "../types"
interface TakeInVolumnProps {
    marshal?: boolean
    onBlur?: any
}
export const TakeInVolumn: TCommonComponent<TakeInVolumnProps, any> = function TakeInVolumn(props) {
    const { value, onChange, marshal = false, onBlur, disabled } = props

    return <div onBlur={onBlur} style={{ width: 460 }}>

        <ArrayPanel disabled={disabled} value={value} onChange={onChange} marshal={marshal}
            addBtnStyle={{ type: 'default', }}
            actionConfig={{ layout: '1/3', }}
            // targetLabelCol={2}
            formDescriptions={[
                // { inputType: 'MyAutoComplete', label: '类型', name: 'incomingType' },
                { layout: '1/2', inputType: 'MyAutoComplete', label: '内容', name: 'incomingContent', inputProps: { optionKey: '入量s', dropdownStyle: { zIndex: 9999 }, style: { paddingRight: 4 } } },
                { layout: '1/2', inputType: 'input_number', label: 'ml', name: 'incomingML', inputProps: { style: { paddingRight: 4 } } },
            ]}
        />
    </div>
}
TakeInVolumn.DisplayFC = function TakeInVolumnDisplayFC(props) {
    const { value, onChange, marshal = false } = props
    console.log('TakeInVolumn DisplayFC', value, typeof value)

    const { safe_value } = useMarshal<any[]>(marshal, value, onChange)
    const arr = safe_json_parse_arr(safe_value)

    return <span style={{ fontSize: 12, wordBreak: 'break-all' }}>
        {
            safe_value?.map?.((_, idx) =>
                <span>
                    {_?.incomingContent ?? EMPTY_PLACEHOLDER}
                    <span style={{ color: '#999' }}>
                        (
                        {_?.incomingML ?? EMPTY_PLACEHOLDER}ml
                        )
                    </span>
                    {idx === arr.length - 1 ? '' : '、'}
                </span>
            ) ?? safe_value
        }
    </span>
}