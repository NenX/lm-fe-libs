import React, { useMemo, useState, useEffect } from 'react'
import classnames from 'classnames'
import InputNumber, { InputNumberProps } from 'antd/es/input-number'
import Group from 'antd/es/input/Group'
import './index.less'
export type DigitProps = InputNumberProps & {
    mode?: 'edit' | 'read'
    addonBefore?: React.ReactNode
    addonAfter?: React.ReactNode
    underline?: boolean
    rangeRegExp?: any // 正则表达式
    controls?: boolean // 是否显示增减按钮
}

/**
 * 数字组件
 *
 */
const Digit: React.ForwardRefRenderFunction<any, DigitProps> = (
    {
        underline,
        mode: type,
        placeholder,
        prefix,
        addonBefore,
        addonAfter,
        controls = true,
        rangeRegExp,
        value,
        defaultValue,
        onChange,
        /* intlProps, */
        ...rest
    },
    ref,
) => {
    const [val, setVal] = useState<number | string | undefined>(undefined)

    useEffect(() => {
        setVal(value || defaultValue)
    }, [])

    const handleChange = (value: number | string) => {
        setVal(value)
        onChange?.(value)
    }

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

    if (type === 'read') {
        const { precision, formatter } = rest
        let fractionDigits = {} as any
        if (precision) {
            fractionDigits = {
                minimumFractionDigits: Number(precision),
                maximumFractionDigits: Number(precision),
            }
        }
        const digit = new Intl.NumberFormat(undefined, {
            ...fractionDigits,
            // ...(intlProps || {}),
        }).format(Number(value || defaultValue) as number)
        const dom = (
            <span>
                {addonBefore}
                {prefix}
                {formatter?.(digit) || digit}
                {addonAfter}
            </span>
        )
        return dom
    } else {
        let dom = (
            <InputNumber
                ref={ref}
                min={0}
                placeholder={placeholder}
                value={val}
                defaultValue={defaultValue}
                onChange={handleChange}
                className={classnames({
                    'ant-digit': true,
                    'ant-digit-warning': hasWarning,
                    'ant-digit-hidehandler': !controls || underline,
                    'ant-digit-underline': underline,
                })}
                {...rest}
            />
        )
        if (prefix) {
            dom = (
                <span
                    className={classnames('ant-input-affix-wrapper ant-digit-affix-wrapper', {
                        'ant-digit-affix-wrapper-underline': underline,
                    })}
                >
                    <span className="ant-digit-affix">{prefix}</span>
                    {dom}
                </span>
            )
        }
        if (addonBefore || addonAfter) {
            dom = (
                <Group compact className={classnames('ant-digit-group', { 'ant-digit-group-underline': underline })}>
                    {addonBeforeDom}
                    {dom}
                    {addonAfterDom}
                </Group>
            )
        }
        return dom
    }
}
export default React.forwardRef(Digit)
