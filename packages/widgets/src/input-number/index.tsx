import React, { useMemo, useState, useEffect } from 'react'
import { Input, Button } from 'antd'
import AntdInputNumber, { InputNumberProps } from 'antd/es/input-number'
import classnames from 'classnames'
import './index.less'
type LmInputNumberProps = InputNumberProps & {
    inputRef?: any
    controls?: boolean
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    addonBefore?: React.ReactNode
    addonAfter?: React.ReactNode
    underline?: boolean
    rangeRegExp?: any // 正则表达式
    onChange?: (value: number) => void
}
export const LmInputNumber = ({
    value,
    defaultValue,
    inputRef,
    prefix,
    suffix,
    addonBefore,
    addonAfter,
    controls = true,
    size,
    underline,
    rangeRegExp,
    onChange = () => {},
    ...rest
}: LmInputNumberProps) => {
    const [val, setVal] = useState<number | string | undefined>(undefined)

    useEffect(() => {
        setVal(value || defaultValue)
    }, [])

    // TODO
    const suffixDom = useMemo(() => {
        if (!suffix) {
            return null
        }
        return (
            <Button size={size} className="ant-input-number-suffix">
                {suffix}
            </Button>
        )
    }, [suffix])

    // TODO
    const prefixDom = useMemo(() => {
        if (!prefix) {
            return null
        }
        return (
            <Button size={size} className="ant-input-number-prefix">
                {prefix}
            </Button>
        )
    }, [prefix])

    const hasWarning = useMemo(() => {
        let result = false
        if (rangeRegExp && val) {
            result = !rangeRegExp.test(val)
        }
        console.log('----warning----', rangeRegExp, val, result)
        return result
    }, [rangeRegExp, val])

    const addonBeforeDom = useMemo(() => {
        if (!addonBefore) {
            return null
        }
        return <span className={classnames('ant-input-group-addon', { underline: underline })}>{addonBefore}</span>
    }, [addonBefore])

    const addonAfterDom = useMemo(() => {
        if (!addonAfter) {
            return null
        }
        return <span className={classnames('ant-input-group-addon', { underline: underline })}>{addonAfter}</span>
    }, [addonAfter])

    const handleChange = (value: number | string) => {
        setVal(value)
        onChange(value)
    }

    if (addonBefore || addonAfter) {
        return (
            <Input.Group compact className="lm-input-group">
                {addonBeforeDom}
                <AntdInputNumber
                    ref={inputRef}
                    value={val}
                    className={classnames({
                        'ant-input-number-warning': hasWarning,
                        'ant-input-number-hidehandler': !controls,
                        'ant-input-number-underline': underline,
                    })}
                    onChange={handleChange}
                    size={size}
                    {...rest}
                />
                {addonAfterDom}
            </Input.Group>
        )
    }
    return (
        <AntdInputNumber
            ref={inputRef}
            value={val}
            className={classnames({
                'ant-input-number-warning': hasWarning,
                'ant-input-number-hidehandler': !controls,
                'ant-input-number-underline': underline,
            })}
            onChange={handleChange}
            size={size}
            {...rest}
        />
    )
}
