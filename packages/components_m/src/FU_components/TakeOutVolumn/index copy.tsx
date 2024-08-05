import { EMPTY_PLACEHOLDER } from "@lm_fe/utils"
import { useMarshal } from "src/utils/useMarshal"
import { ArrayPanel } from "../ArrayPanel"
import { TCommonComponent } from "../types"
import React from "react"
import { MyEditTable } from "../MyEditTable"
interface TakeOutVolumnProps {
    marshal?: boolean
}
export const TakeOutVolumn: TCommonComponent<TakeOutVolumnProps, any> = function TakeOutVolumn(props) {
    const { value, onChange, marshal = false } = props
    console.log('safe_value !!', value, typeof value)

    return <div style={{ width: 500 }}>
        <MyEditTable value={value} onChange={onChange} marshal={marshal}
            formDescriptions={[
                { inputType: 'MyAutoComplete', layout: '1/4', label: '内容', name: 'outcomingContent', inputProps: { optionKey: '出量s', dropdownStyle: { zIndex: 9999 }, style: { paddingRight: 4 } } },
                { inputType: 'MyAutoComplete', layout: '1/4', label: '颜色', name: 'outcomingColor', inputProps: { optionKey: '颜色s', dropdownStyle: { zIndex: 9999 }, style: { paddingRight: 4 } } },
                { inputType: 'input_number', layout: '1/4', label: 'ml', name: 'outcomingML', inputProps: { style: { paddingRight: 4 } } },
            ]}
        />
    </div>
}
TakeOutVolumn.DisplayFC = function TakeOutVolumnDisplayFC(props) {
    const { value, onChange, marshal = false } = props
    const { safe_value } = useMarshal<any[]>(marshal, value, onChange)
    return <span>
        {
            safe_value?.map?.(_ => `${_.outcomingContent ?? EMPTY_PLACEHOLDER}(${_.outcomingColor ?? ''} ${_.outcomingML ?? EMPTY_PLACEHOLDER}ml)`)?.join?.('、') ?? safe_value
        }
    </span>
}