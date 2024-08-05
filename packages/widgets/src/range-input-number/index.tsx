/**
 * 区间输入，如血压值
 */
import React from 'react'
import { Input, Tooltip } from 'antd'
import classnames from 'classnames'
import get from 'lodash/get'
import { QuestionCircleOutlined } from '@ant-design/icons'
import Digit from '../digit'
import './index.less'
type RangeInputNumberProps = {
    size?: any // 'small' | 'large' | 'middle'| 'default'
    split?: string
    suffix?: React.ReactNode
    tips?: string
    placeholder?: string[]
    inputStyle?: React.CSSProperties[]
    centered?: boolean
    value?: (number | undefined)[]
    onChange?: (value?: (number | string | undefined)[]) => void
    underline?: boolean
}
const RangeInputNumber: React.ForwardRefRenderFunction<any, RangeInputNumberProps> = (
    {
        split = '~',
        suffix,
        tips,
        size,
        placeholder = ['请输入', '请输入'],
        inputStyle = [],
        centered,
        onChange = () => {},
        value,
        underline,
        ...rest
    },
    ref,
) => {
    const minRef = React.useRef<HTMLInputElement>(null)
    const maxRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(ref, () => ({
        // value: [minRef.current, maxRef.current],
    }))

    const suffixDom = React.useMemo(() => {
        if (!suffix) {
            return null
        }
        return <p className="ant-range-input-suffix">{suffix}</p>
    }, [suffix])

    const tipsDom = React.useMemo(() => {
        if (!tips) {
            return null
        }
        return (
            <Tooltip className="ant-range-input-suffix" title={tips}>
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

    const handleMinPressEnter = () => {
        maxRef.current?.focus()
    }

    return (
        <Input.Group
            compact
            size={size}
            className={classnames('ant-range-input', { 'ant-range-input-underline': underline, centered })}
        >
            <Digit
                ref={minRef}
                controls={false}
                placeholder={placeholder[0]}
                value={get(value, 0)}
                style={{ ...inputStyle[0] }}
                size={size}
                onChange={handleMinChange}
                onPressEnter={handleMinPressEnter}
            />
            <Input disabled placeholder={split} className="ant-range-input-split" />
            <Digit
                ref={maxRef}
                controls={false}
                placeholder={placeholder[1]}
                value={get(value, 1)}
                style={{ ...inputStyle[1] }}
                size={size}
                onChange={handleMaxChange}
            />
            {(tipsDom || suffixDom) && (
                <span className="ant-range-input-suffix-wrap">
                    {tipsDom}
                    {suffixDom}
                </span>
            )}
        </Input.Group>
    )
}
export default React.forwardRef(RangeInputNumber)
