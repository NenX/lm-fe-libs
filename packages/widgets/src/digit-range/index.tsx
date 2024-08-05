/**
 * 区间输入，如血压值
 */
import React from 'react'
import { Input, Tooltip } from 'antd'
import classnames from 'classnames'
import get from 'lodash/get'
import { QuestionCircleOutlined } from '@ant-design/icons'
import Text from '../text'
import Digit from '../digit'
import './index.less'
export type Value = string | number | undefined
export type ValuePair = Value[]
type RangeInputNumberProps = {
    size?: any // 'small' | 'large' | 'middle'| 'default'
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    tips?: string
    placeholder?: string[]
    inputStyle?: React.CSSProperties[]
    centered?: boolean
    value?: ValuePair
    defaultValue?: ValuePair
    onChange?: (value?: ValuePair) => void
    underline?: boolean
    mode?: 'read' | 'edit'
    separator?: string
    separatorWidth?: number
    formatter?: (value: string) => string
}
export const DigitRange: React.ForwardRefRenderFunction<any, RangeInputNumberProps> = (
    {
        separator = '~',
        separatorWidth = 24,
        prefix,
        suffix,
        tips,
        size,
        placeholder = ['请输入', '请输入'],
        inputStyle = [],
        centered,
        onChange = () => {},
        value,
        defaultValue,
        underline,
        mode,
        formatter,
        ...rest
    },
    ref,
) => {
    const minRef = React.useRef<HTMLInputElement>(null)
    const maxRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(ref, () => ({
        value: [minRef.current?.value, maxRef.current?.value],
    }))

    const suffixDom = React.useMemo(() => {
        if (!suffix) {
            return null
        }
        return <p className="ant-digit-range-suffix">{suffix}</p>
    }, [suffix])

    const tipsDom = React.useMemo(() => {
        if (!tips) {
            return null
        }
        return (
            <Tooltip className="ant-digit-range-suffix" title={tips}>
                <QuestionCircleOutlined />
            </Tooltip>
        )
    }, [tips])

    const handleMinChange = (val: number | string | undefined) => {
        const newValue = [val, get(value, 0)]
        handleChange(newValue)
    }

    const handleMaxChange = (val: number | string | undefined) => {
        const newValue = [get(value, 0), val]
        handleChange(newValue)
    }

    const handleChange = (val?: (number | string | undefined)[]) => {
        let newVal = val
        if (!get(value, 0) && !get(value, 1)) {
            newVal = undefined
        }
        onChange(newVal)
    }

    /**
     * 回车键跳转
     */
    const handleMinPressEnter = () => {
        maxRef.current?.focus()
    }

    if (mode === 'read') {
        const getContent = (number: Value) => {
            const digit = new Intl.NumberFormat(undefined, {
                minimumSignificantDigits: 2,
            }).format(Number(number) as number)

            return formatter?.(digit) || digit
        }
        let dom = (
            <span ref={ref}>
                {prefix}
                {` `}
                {getContent(get(value, 0))} {separator} {getContent(get(value, 1))}
                {` `}
                {suffix}
            </span>
        )
        return dom
    }

    return (
        <Input.Group
            compact
            size={size}
            className={classnames('ant-digit-range', { 'ant-digit-range-underline': underline, centered })}
        >
            <Digit
                ref={minRef}
                underline={underline}
                placeholder={placeholder[0]}
                value={get(value, 0)}
                style={{ ...inputStyle[0] }}
                size={size}
                onChange={handleMinChange}
                onPressEnter={handleMinPressEnter}
            />
            <Text
                disabled
                allowClear={false}
                underline={underline}
                placeholder={separator}
                className="ant-digit-range-separator"
                style={{ width: separatorWidth }}
            />
            <Digit
                ref={maxRef}
                underline={underline}
                placeholder={placeholder[1]}
                value={get(value, 1)}
                style={{ ...inputStyle[1] }}
                size={size}
                onChange={handleMaxChange}
            />
            {(tipsDom || suffixDom) && (
                <span className="ant-digit-range-suffix-wrap">
                    {tipsDom}
                    {suffixDom}
                </span>
            )}
        </Input.Group>
    )
}
export default React.forwardRef(DigitRange)
