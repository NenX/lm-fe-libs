/**
 * ant RadioGroup with input
 */
import React, { useState, useEffect, useRef, useImperativeHandle } from 'react'
import { AutoComplete } from 'antd'
import classnames from 'classnames'
import get from 'lodash/get'
import Radio, { RadioGroupProps, RadioChangeEvent } from 'antd/es/radio'
import { CheckboxOptionType } from 'antd/es/checkbox'
import Digit from '../digit'
import Text from '../text'
const InputComponent = {
    string: Text,
    number: Digit,
    autoComplete: AutoComplete,
}
type LabeledValue = CheckboxOptionType & {
    key?: string
    valueType?: string
    color?: string
    exclusion?: boolean // 互斥
    input?: {
        type?: 'string' | 'number'
        options?: any
        [propsName: string]: any
    }
}
type RadioGroupInputProps = {
    name: string // 主key
    defaultValue?: {}
    value: {}
    valueType?: 'string' | 'number' | 'boolean'
    options?: LabeledValue[]
    size?: 'small' | 'middle' | 'large' | undefined
    onChange?: (value?: undefined | object) => void
    mode?: 'read' | 'edit'
} & RadioGroupProps
const RadioGroupInput: React.ForwardRefRenderFunction<any, RadioGroupInputProps> = (
    { mode, size, name, defaultValue, value, options, onChange = () => {}, ...rest },
    ref,
) => {
    const radioRef = useRef(null)
    const [val, setVal] = useState<undefined | object>(undefined)

    useEffect(() => {
        setVal(value || defaultValue)
    }, [])

    useImperativeHandle(ref, () => ({
        ...(radioRef.current || {}),
        // 其他需要获取的属性
        options,
        value: val,
    }))

    const handleChange = (e: RadioChangeEvent) => {
        const value = e.target.value
        const obj = {
            [name]: value,
        }
        setVal(obj)
        onChange(obj)
    }

    /**
     * 取消选中
     * @param e
     */
    const handleRadioClick = (e: any) => {
        /**
         * 不能使用‘===’，当value：number无效
         */
        if (e.target.value == get(val, name)) {
            setVal(undefined)
            onChange(undefined)
        }
    }

    // number | React.ChangeEvent<HTMLInputElement>
    const handleInputChange = (e: any) => {
        let value = e
        // input
        if (e.target) {
            value = e.target.value
        }
        const obj: any = {
            ...val,
            [`${name}Note`]: value,
        }
        setVal(obj)
        onChange(obj)
    }

    if (mode === 'read') {
        const current = options ? options.find((option: any, i) => option.value === value?.[name]) : value
        const showNote = current?.input && value?.[`${name}Note`]
        let dom = (
            <>
                {current?.label || current?.value}
                {` `}
                {showNote ? `，备注：${value?.[`${name}Note`]}` : ''}
                {` `}
                {showNote ? current.input?.addonAfter : ''}
            </>
        )
        return dom
    }

    return (
        <Radio.Group
            ref={radioRef}
            value={get(val, name)}
            onChange={handleChange}
            className={classnames({ 'ant-radio-group-sm': size === 'small', 'ant-radio-group-lg': size === 'large' })}
            {...rest}
        >
            {options &&
                options.length > 0 &&
                options.map((option: any) => {
                    const checked = option.value === get(val, name)
                    const inputType = get(option, 'input.type') || 'string'
                    const InputCop = InputComponent[inputType]
                    return (
                        <React.Fragment key={option.value}>
                            <Radio
                                value={option.value}
                                onClick={handleRadioClick}
                                className={option.color ? option.color : ''}
                            >
                                {option.label || option.value}
                            </Radio>
                            {option?.input && checked && (
                                <InputCop
                                    size={size}
                                    value={get(val, `${name}Note`)}
                                    placeholder="备注"
                                    onChange={handleInputChange}
                                    {...(option.input.type === 'number' && { controls: false })}
                                    {...option.input}
                                />
                            )}
                        </React.Fragment>
                    )
                })}
        </Radio.Group>
    )
}
export default React.forwardRef(RadioGroupInput)
