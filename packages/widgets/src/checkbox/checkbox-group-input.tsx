/**
 * checkbox with input
 */
import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react'
import { Select, AutoComplete } from 'antd'
import { map, pick, pickBy, isEmpty, get, forEach } from 'lodash'
import Checkbox, { CheckboxGroupProps, CheckboxChangeEvent } from 'antd/es/checkbox'
import Digit from '../digit'
import Text from '../text'

/**
 * 去除object中null/undefined/false/0/''
 */
function filterObjectTruthValue(obj?: object) {
    let result = {}
    forEach(obj, (value, key) => {
        if (value) {
            result = { ...result, [key]: value }
        }
    })
    return result
}
const InputComponent = {
    string: Text,
    number: Digit,
    select: Select,
    autoComplete: AutoComplete,
}
type LabeledValue = {
    value: string
    valueType?: string
    label: string
    disabled?: boolean
    color?: string
    underline?: boolean
    exclusion?: boolean // 互斥
    input?: {
        type?: 'string' | 'number' | 'select' | 'radio' | 'autoComplete'
        options?: any
        [propsName: string]: any
    }
}
type CheckboxGroupInputProps = {
    defaultValue?: {}
    value?: {
        [propsName: string]: any
    }
    valueType?: 'string' | 'number' | 'boolean'
    options?: LabeledValue[]
    onChange?: (value: { [propsName: string]: any }) => void
    underline?: boolean
    mode?: 'read' | 'edit'
}
const CheckboxGroupInput: React.ForwardRefRenderFunction<any, CheckboxGroupInputProps> = (
    { defaultValue, options, value, valueType = 'boolean', onChange = () => {}, mode, ...rest },
    ref,
) => {
    const checkBoxRef = useRef(null)
    const [val, setVal] = useState<undefined | object>(undefined)

    useEffect(() => {
        setVal(value)
    }, [])

    useImperativeHandle(ref, () => ({
        ...(checkBoxRef.current || {}),
        // 其他需要获取的属性
        options,
        value: val,
    }))

    const handleChange = (e: CheckboxChangeEvent) => {
        /**
         * id值要保留
         */
        const { value, checked } = e.target
        const currentItem = e.target['data-item']
        let filterVal = { ...val }
        /**
         * 1.如果是‘无’等一类的互斥项，其他选项置空
         */
        if (checked && currentItem.exclusion) {
            // const integralKeys = options?.filter((_) => !_.exclusion).map((_) => _.key)
            filterVal = { id: get(val, 'id') }
        }
        /**
         * 2.如果是非互斥项，取消互斥项选择，然后再更新
         */
        if (checked && !currentItem.exclusion) {
            const exclusionKeys = options?.filter((_) => _.exclusion)
            exclusionKeys?.map((_) => {
                const k = _.value
                filterVal = {
                    ...filterVal,
                    [k]: undefined,
                    [`${k}Note`]: undefined,
                }
            })
        }

        let obj: any = { [value]: checked }
        if (valueType === 'string') {
            obj = {
                [value]: checked ? '1' : '0',
            }
        }
        if (valueType === 'number') {
            obj = {
                [value]: checked ? 1 : 0,
            }
        }
        const newVal = {
            ...filterVal,
            ...obj,
        }
        setVal(newVal)
        onChange(newVal)
    }

    // number | React.ChangeEvent<HTMLInputElement>
    const handleInputChange = (key: string, e: any) => {
        let value = e
        // input
        if (e.target) {
            value = e.target.value
        }
        const obj: any = {
            ...val,
            [key]: value,
        }
        setVal(obj)
        onChange(obj)
    }

    const getCheckboxGroupValue = (data: object | undefined) => {
        if (isEmpty(data)) {
            return undefined
        }
        const keys = map(options, (_: any) => _.value)
        let groupValue = pick(data, keys)
        groupValue = pickBy(groupValue, (_) => !!_)
        return Object.keys(groupValue)
    }

    if (mode === 'read') {
        let text: React.ReactNode[] = []
        // 取object真值
        const truthValues = filterObjectTruthValue(value)
        // 转化成实际的options
        const selectedOptions = options ? options?.filter((option) => truthValues.hasOwnProperty(option.value)) : []
        selectedOptions?.map((_: any) => {
            const note = get(value, `${_.value}Note`)
            const unit = get(_, `input.suffix`) || get(_, 'input.addonAfter') || ''

            const item = (
                <>
                    {_.label}
                    {note && (
                        <span className="text-underline">
                            {` `}
                            {note}
                            {unit}
                            {` `}
                        </span>
                    )}
                </>
            )
            if (text.length > 0) {
                text.push('；')
            }
            text.push(item)
        })
        return <>{text}</>
    }

    return (
        <Checkbox.Group ref={checkBoxRef} value={getCheckboxGroupValue(val)} {...rest}>
            {options &&
                options.length > 0 &&
                options.map((option, index) => {
                    const key = option.value
                    const checked = get(val, key)
                    const inputType = get(option, 'input.type') || 'string'
                    const InputCop = InputComponent[inputType]
                    return (
                        <React.Fragment key={key}>
                            <Checkbox
                                data-item={option}
                                value={key}
                                onChange={handleChange}
                                className={option.color ? option.color : ''}
                            >
                                {option.label}
                            </Checkbox>
                            {option?.input && checked && (
                                <InputCop
                                    value={get(val, `${key}Note`)}
                                    placeholder="请输入"
                                    underline={true}
                                    allowClear={false}
                                    onChange={(e: any) => handleInputChange(`${key}Note`, e)}
                                    {...(option.input.type === 'select' && { showArrow: false })}
                                    {...(option.input.type === 'number' && { controls: false })}
                                    {...option.input}
                                />
                            )}
                        </React.Fragment>
                    )
                })}
        </Checkbox.Group>
    )
}
export default forwardRef(CheckboxGroupInput)
