/**
 * multiple select
 */
import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react'
import { Tag } from 'antd'
import Select, { SelectProps } from 'antd/es/select'
import classnames from 'classnames'
import get from 'lodash/get'
import { ColorType, LabeledValue } from './single-select'
export const TAGCOLORS = {
    info: 'default',
    success: 'success',
    error: 'error',
    warning: 'warning',
    processing: 'processing',
    default: 'default',
}
type MultipleSelectProps = {
    mode?: 'read' | 'edit'
    defaultValue?: string
    value?: string | (string | number)[]
    /**
     * value数据类型，默认string
     */
    valueType?: 'string' | 'array'
    options?: LabeledValue[]
    onChange?: (value?: string | (string | number)[]) => void
    underline?: boolean // 边框 还是 下划线
    [propsName: string]: any
}
type CustomTagProps = {
    label: React.ReactNode
    value: string | number
    closable?: boolean
    onClose: (event?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void
    [propsName: string]: any
}
export const TagRender = ({ label, value, color, closable, onClose, options }: any) => {
    const currentOption = options.find((_: any) => _.value == value)
    const currentColor = currentOption ? currentOption['color'] : 'default'
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault()
        event.stopPropagation()
    }
    return (
        <Tag
            color={TAGCOLORS.hasOwnProperty(currentColor) ? TAGCOLORS[currentColor] : currentColor}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{ marginRight: 3 }}
        >
            {label}
        </Tag>
    )
}
const MultipleSelect: React.ForwardRefRenderFunction<any, MultipleSelectProps> = (
    {
        underline,
        options,
        defaultValue,
        value,
        valueType = 'string',
        onChange = () => {},
        mode: type,
        labelInValue,
        ...rest
    },
    ref,
) => {
    const selectRef = useRef(null)
    const [val, setVal] = useState<any>([])

    useEffect(() => {
        let multipleValue = undefined
        if (valueType === 'string') {
            if (value && typeof value === 'string') {
                multipleValue = value.split(',')
            }
            if (!value && defaultValue && typeof defaultValue === 'string') {
                multipleValue = defaultValue.split(',')
            }
        }
        if (valueType === 'array') {
            if (value && Object.prototype.toString.call(value) === '[object Array]') {
                multipleValue = value
            }
            if (!value && defaultValue && Object.prototype.toString.call(defaultValue) === '[object Array]') {
                multipleValue = defaultValue
            }
        }
        setVal(multipleValue)
    }, [])

    useImperativeHandle(ref, () => ({
        ...(selectRef.current || {}),
        options,
        value: val,
    }))

    const getCallbackValue = (value?: string | (string | number)[]) => {
        let result = value
        if (valueType === 'string' && value && value.length) {
            result = value.join()
        }
        onChange(result)
    }

    const handleChange = (value: (string | number)[], option: any) => {
        let data = value
        const currentOption = option[option.length - 1]
        console.log('------value change-----', value, option, currentOption, val)
        if (currentOption && currentOption['data-exclusion']) {
            data = [currentOption.value]
        }
        if (currentOption && !currentOption['data-exclusion']) {
            const exclusionValues = options?.filter((_) => _.exclusion).map((_) => _.value)
            const filterVal = val ? val.filter((_) => !exclusionValues?.includes(_)) : []
            data = [...filterVal, currentOption.value]
        }
        // 过滤undefined，null, ''假值
        data = data.filter((_) => ![undefined, null, ''].includes(_))
        setVal(data)
        getCallbackValue(data)
    }

    /**
     * 取消选中项时
     */
    // const handleDeselect = (value: string | number | LabeledValue) => {
    //     console.log('------4564-----', value)
    //     // 判断该值是否是options的一个选项
    //     const inOptions = onDeselect(value)
    // }

    if (type === 'read') {
        if (!value) {
            return null
        }
        const valueArr: string[] = typeof value === 'string' ? value?.split(',') : value
        let text: any[] = []
        const selectedOptions = options?.filter(
            (option: any) => valueArr.includes(option) || valueArr.includes(option?.value),
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
        <Select
            ref={selectRef}
            mode="multiple"
            className={classnames({
                'ant-select-underline': underline,
            })}
            value={val}
            onChange={handleChange}
            tagRender={(props) => <TagRender {...props} options={options} />}
            {...rest}
        >
            {options &&
                options.length > 0 &&
                options.map(({ value, label, color, exclusion }) => {
                    return (
                        <Select.Option
                            key={value}
                            value={value}
                            data-exclusion={exclusion}
                            className={classnames({ ...(color && { [color]: color }) })}
                        >
                            {label || value}
                        </Select.Option>
                    )
                })}
        </Select>
    )
}
export default forwardRef(MultipleSelect)
