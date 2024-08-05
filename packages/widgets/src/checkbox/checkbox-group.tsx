/**
 * base on antd Checkbox Group
 */

import React, { useImperativeHandle, useState, useEffect, useRef } from 'react'
import Checkbox, {
    CheckboxGroupProps as AntdCheckboxGroupProps,
    CheckboxOptionType,
    CheckboxChangeEvent,
} from 'antd/es/checkbox'
import { difference, includes, isString, isArray, split, join } from 'lodash'

export type CheckboxValueType = string | number | boolean

type LabeledValue = CheckboxOptionType & {
    color?: string
    exclusion?: boolean // 互斥
}

type CheckboxGroupProps = {
    value?: string | string[]
    options?: number[] | string[] | LabeledValue[]
    /**
     * 返回value形式，可选择'字符串'或'数组'，默认'string'
     */
    valueType?: 'string' | 'array' | 'object'
    mode?: 'read' | 'edit'
    selectAll?: boolean
    [propsName: string]: any
}

const CheckboxGroup: React.ForwardRefRenderFunction<any, CheckboxGroupProps> = (
    { defaultValue, value, valueType = 'string', options, mode, selectAll, onChange = () => {}, ...rest },
    ref,
) => {
    const checkBoxRef = useRef(null)
    const [val, setVal] = useState<undefined | CheckboxValueType[]>(undefined)

    useEffect(() => {
        let v = value || defaultValue
        // value--> string[]
        if (isString(v)) {
            return setVal(split(v, ','))
        }
        if (isArray(v)) {
            return setVal(v)
        }
    }, [])

    useImperativeHandle(ref, () => ({
        ...(checkBoxRef.current || {}),
        // 其他需要获取的属性
        options,
    }))

    // TODO 暂不增加全选功能
    // const handleSelectAll = (e: CheckboxChangeEvent) => {
    //     const checked = e.target?.checked
    //     console.log('-----454546----', e, checked)
    // }

    const handleChange = (value: CheckboxValueType[]) => {
        console.log('-----group-----', value)
        /**
         * 获取点击的option
         */
        let newValue = [...value]
        const currentValue = difference(value, val)[0]
        const currentOption = options?.find((_: any) => _ === currentValue || _.value === currentValue)
        if (currentOption && currentOption.exclusion) {
            newValue = [currentOption.value]
        }
        if (currentOption && !currentOption.exclusion) {
            const unexclusion = options?.filter((_) => _.exclusion).map((_) => _.value)
            newValue = value.filter((_) => !includes(unexclusion, _))
        }
        // 过滤undefined，null, ''假值
        newValue = newValue.filter((_) => !includes([undefined, null, ''], _))
        setVal(newValue)
        if (valueType === 'array') {
            onChange(newValue)
        } else {
            onChange(join(newValue))
        }
    }

    if (mode === 'read') {
        if (!value) {
            return null
        }
        const valueArr: string[] = typeof value === 'string' ? value?.split(',') : value
        let text: any[] = []
        const selectedOptions = options?.filter(
            (option: any) => includes(valueArr, option) || includes(valueArr, option?.value),
        )
        selectedOptions?.map((_: any) => {
            if (_.label) {
                text.push(_.label)
            } else if (_.value) {
                text.push(_.value)
            } else {
                text.push(_)
            }
        })

        return <>{text.join('、')}</>
    }

    return (
        <Checkbox.Group ref={checkBoxRef} value={val} onChange={handleChange}>
            {options &&
                options.length > 0 &&
                options.map((option: any) => {
                    const type = typeof option
                    if (type === 'string' || type === 'number') {
                        return (
                            <Checkbox key={String(option)} value={option}>
                                {String(option)}
                            </Checkbox>
                        )
                    }
                    return (
                        <Checkbox key={option.value} value={option.value} className={option.color ? option.color : ''}>
                            {option.label || option.value}
                        </Checkbox>
                    )
                })}
        </Checkbox.Group>
    )
}

export default React.forwardRef(CheckboxGroup)
