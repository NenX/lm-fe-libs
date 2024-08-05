/**
 * 简单的单选radio
 */
import React, { useState, useEffect, useImperativeHandle, useRef } from 'react'
import Radio, { RadioGroupProps as AntdRadioGroupProps, RadioChangeEvent } from 'antd/es/radio'
import { CheckboxOptionType } from 'antd/es/checkbox'
import Badge from 'antd/es/badge'
export const PRESETS_COLORS = {
    success: '#52c41a',
    info: '#1890ff',
    warning: '#faad14',
    error: '#ff4d4f',
    processing: '#1890ff',
    default: '#d9d9d9',
}

// export interface CheckboxOptionType {
//     label: React.ReactNode;
//     value: string | number | boolean;
//     style?: React.CSSProperties;
//     disabled?: boolean;
//     onChange?: (e: CheckboxChangeEvent) => void;
// }
export type LabeledValue = CheckboxOptionType & {
    color?: string
}
type RadioGroupProps = {
    mode?: 'read' | 'edit'
    options: string[] | number[] | LabeledValue[]
    onChange?: (value?: string | number | boolean) => void
} & AntdRadioGroupProps
const RadioGroup: React.ForwardRefRenderFunction<any, RadioGroupProps> = (
    { mode, value, defaultValue, optionType, options = [], onChange = () => {}, ...rest },
    ref,
) => {
    const radioRef = useRef(null)
    const [val, setVal] = useState(undefined)

    useEffect(() => {
        setVal(value || defaultValue)
    }, [])

    useImperativeHandle(ref, () => ({
        ...(radioRef.current || {}),
        // 其他需要获取的属性
        options,
    }))

    const handleChange = (e: RadioChangeEvent) => {
        const value = e.target.value
        setVal(value)
        onChange(value)
    }

    /**
     * 取消选中
     * @param e
     */
    const handleRadioClick = (e: any) => {
        /**
         * 不能使用‘===’，当value：number无效
         */
        if (e.target.value == val) {
            setVal(undefined)
            onChange(undefined)
        }
    }

    if (mode === 'read') {
        const current = options ? options.find((option: any) => option === value || option?.value === value) : value
        // console.log('----999----', value, current, PRESETS_COLORS[current?.color])
        let dom = (
            <span className="ant-radio-group-read">
                {current?.color ? <Badge color={PRESETS_COLORS[current.color] ?? current.color} /> : null}
                {(current?.label || current?.value) ?? current}
            </span>
        )
        return dom
    }

    return (
        <Radio.Group ref={radioRef} value={val} onChange={handleChange} {...rest}>
            {options &&
                options.length > 0 &&
                options.map((option: any) => {
                    const ItemType = optionType === 'button' ? Radio.Button : Radio
                    const type = typeof option
                    if (type === 'string' || type === 'number') {
                        return (
                            <ItemType key={String(option)} value={option} onClick={handleRadioClick}>
                                {String(option)}
                            </ItemType>
                        )
                    }

                    const { label, value, color, ...optionRest } = (option as LabeledValue) || {}
                    return (
                        <ItemType
                            key={String(value)}
                            value={value}
                            onClick={handleRadioClick}
                            className={color ? color : ''}
                            {...optionRest}
                        >
                            {label || value}
                        </ItemType>
                    )
                })}
        </Radio.Group>
    )
}
export default React.forwardRef(RadioGroup)
