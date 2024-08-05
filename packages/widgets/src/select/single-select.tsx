/**
 * 单项选择
 */
import React, { useState, useEffect, useMemo, forwardRef, useRef, useImperativeHandle } from 'react'
import Select, { SelectProps } from 'antd/es/select'
import Badge from 'antd/es/badge'
import classnames from 'classnames'
import get from 'lodash/get'
import { getType } from './utils'
import { PRESETS_COLORS } from '../radio/radio-group'
export type ColorType = 'success' | 'info' | 'warning' | 'error' | 'processing' | 'default'
export type LabeledValue = {
    key?: string
    value: string | number
    label?: React.ReactNode
    color?: string
    exclusion?: boolean
    disabled?: boolean
}
type SingleSelectProps = {
    mode?: 'read' | 'edit'
    value?: string
    options?: string[] | LabeledValue[]
    onChange?: (value: string) => void
    underline?: boolean // 边框 还是 下划线
    [propsName: string]: any
}
const SingleSelect: React.ForwardRefRenderFunction<any, SingleSelectProps> = (
    { value, options = [], underline, onChange = () => {}, mode: type, format, ...rest },
    ref,
) => {
    const selectRef = useRef(null)
    const [val, setVal] = useState<string | undefined>(undefined)

    useEffect(() => {
        setVal(value)
    }, [value])

    useImperativeHandle(ref, () => ({
        ...(selectRef.current || {}),
        options,
    }))

    const selectedColor = useMemo(() => {
        let result = undefined
        if (val && options) {
            const item = options.find((_: LabeledValue) => _.value === val)
            result = get(item, 'color')
        }
        return result
    }, [val, options])

    const handleChange = (value: string, option: any) => {
        setVal(value)
        onChange(value)
    }

    const renderOptionsDom = (options: string[] | LabeledValue[]) => {
        if (!options) {
            return null
        }
        const result = options.map((_) => {
            if (typeof _ === 'string') {
                return (
                    <Select.Option key={_} value={_}>
                        {_}
                    </Select.Option>
                )
            }
            const { key, value, label, color, ...optionRest } = _
            return (
                <Select.Option
                    key={key || value}
                    value={value}
                    className={classnames({ ...(color && { [color]: color }) })}
                    {...optionRest}
                >
                    {label || value}
                </Select.Option>
            )
        })
        return result
    }

    if (type === 'read') {
        const current = options ? options.find((option: any) => option === value || option?.value === value) : value
        // console.log('----999----', value, current, PRESETS_COLORS[current?.color])
        let dom = (
            <span className="ant-radio-group-read">
                {current?.color ? <Badge color={PRESETS_COLORS[current.color] ?? current.color} /> : null}
                {(current?.label || current?.value) ?? current}
            </span>
        )
        if (format) {
            dom = <></>
        }
        return dom
    }

    return (
        <Select
            ref={selectRef}
            className={classnames({
                ...(selectedColor && { [selectedColor]: true }),
                'ant-select-underline': underline,
            })}
            value={val}
            onChange={handleChange}
            {...rest}
        >
            {renderOptionsDom(options)}
        </Select>
    )
}
export default forwardRef(SingleSelect)
