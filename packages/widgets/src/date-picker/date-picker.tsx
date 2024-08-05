import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import { Button } from 'antd'
import DatePicker, { DatePickerProps } from 'antd/es/date-picker'
import classnames from 'classnames'
import moment, { Moment, isMoment } from 'moment'
import 'moment/locale/zh-cn'
import zh_CN from 'antd/es/date-picker/locale/zh_CN'
import { parseValueToMoment, defaultFormatDate } from './utils'
import './index.less'
export type pickerType = 'time' | 'date' | 'month' | 'year' | 'decade' | 'quarter' | 'datetime' | 'week'
export enum MOMENT_FORMAT {
    datetime = 'YYYY-MM-DD HH:mm:ss',
    date = 'YYYY-MM-DD',
    week = 'YYYY-wo',
    month = 'YYYY-MM',
    quarter = 'YYYY-Qo',
    year = 'YYYY',
    time = 'HH:mm:ss',
}
type LmDatePickerProps = {
    underline?: boolean
    picker?: pickerType
    mode?: 'read' | 'edit'
    format?: string | ((value: Moment) => string)
    value?: string | Moment
    defaultValue?: string | Moment
    [propsName: string]: any
}
const LmDatePicker: React.ForwardRefRenderFunction<any, LmDatePickerProps> = (
    {
        defaultValue,
        value,
        onChange = () => {},
        underline,
        picker = 'date',
        showTime,
        showNow,
        showToday = false,
        renderExtraFooter,
        mode,
        format,
        ...rest
    },
    ref,
) => {
    const pickerRef = React.useRef(null)
    const [val, setVal] = React.useState<any>(undefined)

    useImperativeHandle(ref, () => ({
        ...(pickerRef.current || {}),
    }))

    React.useEffect(() => {
        console.log('------456654------', parseValueToMoment(value || defaultValue))
        if (value || defaultValue) {
            setVal(moment())
        }
    }, [])

    const handleChange = (date: Moment | undefined, dateString: string | undefined) => {
        setVal(date)
        onChange(date, dateString)
        console.log('----date change----', date, dateString)
    }

    const handleShortcutPicker = (date: Moment | undefined, dateString: string | undefined) => {
        console.log('---shortcut---', date, dateString)
        handleChange(date, dateString)
        pickerRef.current?.blur()
    }

    /**
     * 增加选择面板快捷键
     */
    const customPickerProps = React.useMemo(() => {
        let props: any = {
            showToday,
            showTime,
            showNow,
        }
        if (picker === 'date') {
            props = {
                showToday: false,
                renderExtraFooter: (mode: pickerType) => {
                    const handleShortcutDatePicker = (shortKey: string) => {
                        let date = undefined
                        if (shortKey === 'yesterday') {
                            date = moment(new Date()).add(-1, 'days')
                        }
                        if (shortKey === 'today') {
                            date = moment(new Date())
                        }
                        if (shortKey === 'tomorrow') {
                            date = moment(new Date()).add(1, 'days')
                        }
                        handleShortcutPicker(date, date?.format('YYYY-MM-DD'))
                    }
                    return (
                        <div className="ant-picker-footer-extra-btns">
                            <Button
                                ghost
                                type="primary"
                                size="small"
                                onClick={() => handleShortcutDatePicker('yesterday')}
                            >
                                昨天
                            </Button>
                            <Button ghost type="primary" size="small" onClick={() => handleShortcutDatePicker('today')}>
                                今天
                            </Button>
                            <Button
                                ghost
                                type="primary"
                                size="small"
                                onClick={() => handleShortcutDatePicker('tomorrow')}
                            >
                                明天
                            </Button>
                        </div>
                    )
                },
            }
        }
        if (picker === 'datetime') {
            props = {
                showTime: true,
                showNow: true,
                showToday: true,
                placeholder: '请选择日期时间',
            }
        }
        if (picker === 'week') {
            props = {
                renderExtraFooter: (mode: pickerType) => {
                    const handleShortcutWeekPicker = (shortKey: string) => {
                        let date = undefined
                        if (shortKey === 'lastweek') {
                            date = moment(new Date()).add(-1, 'weeks')
                        }
                        if (shortKey === 'currentweek') {
                            date = moment(new Date())
                        }
                        if (shortKey === 'nextweek') {
                            date = moment(new Date()).add(1, 'weeks')
                        }
                        handleShortcutPicker(date, date?.format('YYYY-wo'))
                    }
                    return (
                        <div className="ant-picker-footer-extra-btns">
                            <Button
                                ghost
                                type="primary"
                                size="small"
                                onClick={() => handleShortcutWeekPicker('lastweek')}
                            >
                                上周
                            </Button>
                            <Button
                                ghost
                                type="primary"
                                size="small"
                                onClick={() => handleShortcutWeekPicker('currentweek')}
                            >
                                本周
                            </Button>
                            <Button
                                ghost
                                type="primary"
                                size="small"
                                onClick={() => handleShortcutWeekPicker('nextweek')}
                            >
                                下周
                            </Button>
                        </div>
                    )
                },
            }
        }
        if (picker === 'month') {
            props = {
                renderExtraFooter: (mode: pickerType) => {
                    const handleShortcutMonthPicker = (shortKey: string) => {
                        let date = undefined
                        if (shortKey === 'lastmonth') {
                            date = moment(new Date()).add(-1, 'months')
                        }
                        if (shortKey === 'currentmonth') {
                            date = moment(new Date())
                        }
                        if (shortKey === 'nextmonth') {
                            date = moment(new Date()).add(1, 'months')
                        }
                        handleShortcutPicker(date, date?.format('YYYY-MM'))
                    }
                    return (
                        <div className="ant-picker-footer-extra-btns">
                            <Button
                                ghost
                                type="primary"
                                size="small"
                                onClick={() => handleShortcutMonthPicker('lastmonth')}
                            >
                                上个月
                            </Button>
                            <Button
                                ghost
                                type="primary"
                                size="small"
                                onClick={() => handleShortcutMonthPicker('currentmonth')}
                            >
                                本月
                            </Button>
                            <Button
                                ghost
                                type="primary"
                                size="small"
                                onClick={() => handleShortcutMonthPicker('nextmonth')}
                            >
                                下个月
                            </Button>
                        </div>
                    )
                },
            }
        }
        if (picker === 'year') {
            props = {
                renderExtraFooter: (mode: pickerType) => {
                    const handleShortcutYearPicker = (shortKey: string) => {
                        let date = undefined
                        if (shortKey === 'lastyear') {
                            date = moment(new Date()).add(-1, 'years')
                        }
                        if (shortKey === 'currentyear') {
                            date = moment(new Date())
                        }
                        if (shortKey === 'nextyear') {
                            date = moment(new Date()).add(1, 'years')
                        }
                        handleShortcutPicker(date, date?.format('YYYY'))
                    }
                    return (
                        <div className="ant-picker-footer-extra-btns">
                            <Button
                                ghost
                                type="primary"
                                size="small"
                                onClick={() => handleShortcutYearPicker('lastyear')}
                            >
                                上一年
                            </Button>
                            <Button
                                ghost
                                type="primary"
                                size="small"
                                onClick={() => handleShortcutYearPicker('currentyear')}
                            >
                                今年
                            </Button>
                            <Button
                                ghost
                                type="primary"
                                size="small"
                                onClick={() => handleShortcutYearPicker('nextyear')}
                            >
                                下一年
                            </Button>
                        </div>
                    )
                },
            }
        }
        return props
    }, [picker])

    if (mode === 'read') {
        const dom = defaultFormatDate(value, format || MOMENT_FORMAT[picker])
        return <>{dom}</>
    }

    return (
        <DatePicker
            ref={pickerRef}
            className={classnames({ 'ant-picker-underline': underline })}
            locale={zh_CN}
            picker={picker !== 'datetime' ? picker : 'date'}
            value={val}
            onChange={handleChange}
            {...customPickerProps}
            {...rest}
        />
    )
}
export default forwardRef(LmDatePicker)
