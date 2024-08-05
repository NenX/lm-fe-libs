import { EMPTY_PLACEHOLDER, safe_json_parse_arr } from "@lm_fe/utils"
import { useMarshal } from "src/utils/useMarshal"
import { ArrayPanel } from "../ArrayPanel"
import { TCommonComponent } from "../types"
import React from "react"
import { message } from "antd"
interface TakeOutVolumnProps {
    marshal?: boolean
    onBlur?: any
}
export const TakeOutVolumn: TCommonComponent<TakeOutVolumnProps, any> = function TakeOutVolumn(props) {
    const { value, onChange, marshal = false, onBlur, disabled } = props
    console.log('safe_value !!', value, typeof value)

    return <div style={{ width: 540 }} onBlur={onBlur}>
        <ArrayPanel disabled={disabled} value={value} onChange={onChange} marshal={marshal}
            addBtnStyle={{ type: 'default', }}

            actionConfig={{ layout: '1/4', }}
            // targetLabelCol={2}
            formDescriptions={[
                { inputType: 'MyAutoComplete', layout: '1/3', label: '内容', name: 'outcomingContent', inputProps: { optionKey: '出量s', dropdownStyle: { zIndex: 9999 }, style: { paddingRight: 4 } } },
                { inputType: 'MyAutoComplete', layout: '1/3', label: '颜色', name: 'outcomingColor', inputProps: { optionKey: '颜色s', dropdownStyle: { zIndex: 9999 }, style: { paddingRight: 4 } } },
                { inputType: 'input_number', layout: '1/3', label: 'ml', name: 'outcomingML', inputProps: { style: { paddingRight: 4 } } },
            ]}
        />
    </div>
}
TakeOutVolumn.DisplayFC = function TakeOutVolumnDisplayFC(props) {
    const { value, onChange, marshal = false } = props
    const { safe_value } = useMarshal<any[]>(marshal, value, onChange)
    const arr = safe_json_parse_arr(safe_value)
    return <span style={{ fontSize: 12, wordBreak: 'break-all' }}>
        {
            arr?.map?.((_, idx) =>
                <span>
                    {_.outcomingContent ?? EMPTY_PLACEHOLDER}
                    <span style={{ color: '#999' }}>
                        (
                        {_.outcomingColor ?? ''}
                        {_.outcomingML ?? EMPTY_PLACEHOLDER}ml
                        )
                    </span>
                    {idx === arr.length - 1 ? '' : '、'}
                </span>
            ) ?? arr
        }
    </span>
}