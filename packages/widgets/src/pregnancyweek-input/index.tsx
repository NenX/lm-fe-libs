/**
 * Created by ZhongJun on 20/06/2022.
 * Desc: 孕周输入组件 (Gestational age)
 */
import React from 'react'
import Input, { InputProps } from 'antd/es/input'
import classnames from 'classnames'
import './index.less'
const splitStr = (str: undefined | string, symbol: string = '+') => {
    let result = [str]
    if (!str) {
        return undefined
    }

    const index = str.indexOf(symbol)
    if (index > -1) {
        const arr1 = str.slice(0, index)
        const arr2 = str.slice(index)
        result = [arr1, arr2]
    }
    return result
}
type PregnancyWeekInputProps = InputProps & {
    value?: string
    defaultValue?: string
    onChange?: (value: string) => void
    underline?: boolean
    mode?: 'read' | 'edit' | 'separate'
    format?: string | ((value?: string) => React.ReactNode) // mode===read时，格式化显示
    emptyText?: string
}
const PregnancyWeekInput: React.ForwardRefRenderFunction<any, PregnancyWeekInputProps> = (
    { defaultValue, value, onChange = () => {}, underline, style, mode, format, emptyText, ...rest },
    ref,
) => {
    const inputRef = React.useRef(null)
    const weekRef = React.useRef<any>(null)
    const dayRef = React.useRef<any>(null)
    const [val, setVal] = React.useState<any>()
    const [blur, setBlur] = React.useState(false)

    React.useImperativeHandle(ref, () => ({
        ...(inputRef.current || {}),
        value: val,
    }))

    React.useEffect(() => {
        setVal(value || defaultValue)
    }, [])

    const handleBlur = () => {
        setBlur(false)
    }

    const handleFocus = () => {
        setBlur(true)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const d = e.target.value
        onChange(d)
        setVal(d)
    }

    /**
     * 仅在mode === 'separate'有效
     */
    const handleWeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const w = e.target.value
        const oldValues = val ? val.split('+') : []
        const hasDay = oldValues[1]
        const newValues = `${w}${hasDay ? '+' : ''}${hasDay ? oldValues[1] : ''}`

        onChange(newValues)
        setVal(newValues)
    }

    /**
     * 仅在mode === 'separate'有效
     */
    const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const d = e.target.value
        const oldValues = val ? val.split('+') : []
        const hasWeek = oldValues[0]

        const newValues = `${hasWeek ? oldValues[0] : ''}+${d}`

        onChange(newValues)
        setVal(newValues)
    }

    if (mode === 'read') {
        const { suffix } = rest
        let dom = (
            <span>
                {value ?? emptyText}
                {` `}
                {suffix}
            </span>
        )

        if (format && value) {
            let text: React.ReactNode = value
            if (typeof format === 'string') {
                const units = format.split('-')
                const values = value.split('+')
                text = `${values?.[0]} ${units[0]} ${values?.[1] || ''} ${values?.[1] ? units[1] : ''}`
            }
            if (typeof format === 'function') {
                text = format(value)
            }
            dom = (
                <span>
                    {text}
                    {` `}
                    {suffix}
                </span>
            )
        }
        return dom
    }

    if (mode === 'separate') {
        const textStyle: React.CSSProperties = { width: 56, textAlign: 'center', ...style }
        const values = val ? val.split('+') : []
        /**
         * 回车键跳转
         */
        const handleWeekPressEnter = () => {
            dayRef.current?.focus()
        }

        return (
            <Input.Group
                compact
                className={classnames('ant-pregnancyweek-input-wrapper', {
                    'ant-pregnancyweek-input-underline': underline,
                })}
            >
                <Input
                    ref={weekRef}
                    suffix="周"
                    maxLength={2}
                    style={textStyle}
                    value={values?.[0]}
                    onChange={handleWeekChange}
                    onPressEnter={handleWeekPressEnter}
                />
                <Input
                    ref={dayRef}
                    suffix="天"
                    maxLength={1}
                    style={textStyle}
                    value={values?.[1]}
                    onChange={handleDayChange}
                />
            </Input.Group>
        )
    }

    return (
        <span
            className={classnames('ant-pregnancyweek-input-wrapper', {
                'ant-pregnancyweek-input-underline': underline,
            })}
        >
            <Input
                ref={ref}
                onBlur={handleBlur}
                onFocus={handleFocus}
                style={{ width: 72, ...style }}
                value={val}
                onChange={handleChange}
                {...rest}
            />
            {!blur && (
                <div className="antd-input-blur-value">
                    <span className="value-week">{splitStr(val)?.[0]}</span>
                    <span className="value-day">{splitStr(val)?.[1]}</span>
                </div>
            )}
        </span>
    )
}
export default React.forwardRef(PregnancyWeekInput)
