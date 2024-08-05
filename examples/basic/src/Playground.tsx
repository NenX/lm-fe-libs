import React, { useEffect, useState } from 'react'
import { MyCheckbox, ArrayInput } from '@lm_fe/components_m'
import { ICheckboxWithInputOption, ICheckboxWithInputProps } from '@lm_fe/components_m/dist/GeneralComponents/CheckboxWithInput_gold'
var a = {
    "type": "single",
    "options": [{ "value": 1, "label": "自然娩出", "withInput": false, "span": 4 }, { "value": 0, "label": "手术取胎盘术", "withInput": true, "span": 6, "inputSpan": 14, "labelBefore": "原因:" }]
}
JSON.stringify({
    // type: "multiple",
    "options": [
        // { label: "无", value: 0, exclusive: true },
        { label: "未检测", value: 1, },
        { label: "检测", value: 2, inputType: 'MyCheckbox', parentheses:true,prefix:'检测到梅毒螺旋体',optionKey:'否是' },
 

        // { "value": 2, "label": "指导孕妇了解临产症状及对应措施", },
        // { "value": 3, "label": "卧床休息，勤翻身，保持外阴清洁，预防感染", },
        // { "value": 4, "label": "进行适当的室内活动，注意安全，防跌倒", },
        // { "value": 5, "label": "多进食粗纤维 维生素 优质蛋白丰富的清淡食物", },
        // { "value": 6, "label": "绝对卧床休息", },
        // { "value": 0, "label": "未宣教", "exclusive": true },

    ]
    // marshal: false,
} as ICheckboxWithInputProps)
export default function Playground(params: any) {
    const [value, setValue] = useState<any>()
    useEffect(() => {

        console.log('xx', value, typeof value)
    }, [value])

    return <div>
        <MyCheckbox
            options={[
                {
                    "value": 1,
                    "label": "清",
                },
                {
                    "value": 2,
                    "label": "Ⅰ°",
                },
                {
                    "value": 2,
                    "label": "Ⅰ°",
                },
                {
                    "value": 2,
                    "label": "Ⅰ°",
                },





            ]}

        />

        <ArrayInput value={value} onChange={setValue} options={[
            { inputType: 'MyCheckbox', props: { optionKey: '阴阳' }, },
            { inputType: 'MyInput', props: { style: { width: 40 } }, prefix: '滴度：1:' },
            { inputType: 'DatePicker', props: {}, prefix: '检测时间' },

        ]} />
    </div>
}


