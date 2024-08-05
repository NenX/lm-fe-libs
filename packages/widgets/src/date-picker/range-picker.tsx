import React, { useState, useEffect, useCallback } from 'react'
import DatePicker, { RangePickerProps as AntRangePickerProps } from 'antd/es/date-picker'
import classnames from 'classnames'
import moment from 'moment'
import 'moment/locale/zh-cn'
import zh_CN from 'antd/es/date-picker/locale/zh_CN'
import { pickerType, MOMENT_FORMAT } from './date-picker'
import { parseValueToMoment, defaultFormatDate } from './utils'
import './index.less'
type RangePickerProps = AntRangePickerProps & {
    value?: any[]
    underline?: boolean
    picker?: pickerType
    mode?: 'read' | 'edit'
    [propsName: string]: any
}
const RangePicker: React.ForwardRefRenderFunction<any, RangePickerProps> = (
    { value, mode, format, separator, underline, showTime, picker = 'date', style, onChange = () => {}, ...rest },
    ref,
) => {
    // const [val, setVal] = useState(undefined)

    // useEffect(() => {}, [])

    const handleChange = (date: any, dateString: [string, string]) => {
        console.log('----range picker-----', date, dateString)
        onChange(date, dateString)
    }
    /**
     * 增加range快捷选择
     */
    const customPickerProps = React.useMemo(() => {
        let props: {
            [propsName: string]: any
        } = {
            picker,
            showTime,
            style: {
                width: 176,
                ...style,
            },
        }
        if (['datetime'].includes(picker)) {
            props = {
                ...props,
                picker: 'date',
                showTime: true,
                style: {
                    width: 320,
                    ...style,
                },
                ranges: {
                    上个月: [
                        moment()
                            .month(moment().month() - 1)
                            .startOf('month'),
                        moment()
                            .month(moment().month() - 1)
                            .endOf('month'),
                    ],
                    上周: [
                        moment()
                            .week(moment().week() - 1)
                            .startOf('week'),
                        moment()
                            .week(moment().week() - 1)
                            .endOf('week'),
                    ],
                    昨天: [moment().subtract(1, 'day').startOf('day'), moment().subtract(1, 'day').endOf('day')],
                    今天: [moment().startOf('day'), moment().endOf('day')],
                    明天: [moment().add(1, 'day').startOf('day'), moment().add(1, 'day').endOf('day')],
                    本周: [moment().startOf('week'), moment().endOf('week')],
                    本月: [moment().startOf('month'), moment().endOf('month')],
                },
            }
        }
        if (picker === 'date') {
            props = {
                ...props,
                style: {
                    width: 212,
                    ...style,
                },
                ranges: {
                    上个月: [
                        moment()
                            .month(moment().month() - 1)
                            .startOf('month'),
                        moment()
                            .month(moment().month() - 1)
                            .endOf('month'),
                    ],
                    上周: [
                        moment()
                            .week(moment().week() - 1)
                            .startOf('week'),
                        moment()
                            .week(moment().week() - 1)
                            .endOf('week'),
                    ],
                    昨天: [moment().subtract(1, 'day'), moment().subtract(1, 'day')],
                    今天: [moment(), moment()],
                    明天: [moment().add(1, 'day'), moment().add(1, 'day')],
                    本周: [moment().startOf('week'), moment().endOf('week')],
                    下周: [
                        moment()
                            .week(moment().week() + 1)
                            .startOf('week'),
                        moment()
                            .week(moment().week() + 1)
                            .endOf('week'),
                    ],
                    本月: [moment().startOf('month'), moment().endOf('month')],
                },
            }
        }
        if (picker === 'week') {
            props = {
                ...props,
                ranges: {
                    上周: [
                        moment()
                            .week(moment().week() - 1)
                            .startOf('week'),
                        moment()
                            .week(moment().week() - 1)
                            .endOf('week'),
                    ],
                    本周: [moment().startOf('week'), moment().endOf('week')],
                    下周: [
                        moment()
                            .week(moment().week() + 1)
                            .startOf('week'),
                        moment()
                            .week(moment().week() + 1)
                            .endOf('week'),
                    ],
                },
            }
        }
        if (picker === 'month') {
            props = {
                ...props,
                ranges: {
                    上半年: [moment().month(0).startOf('month'), moment().month(5).endOf('month')],
                    上个月: [
                        moment()
                            .month(moment().month() - 1)
                            .startOf('month'),
                        moment()
                            .month(moment().month() - 1)
                            .endOf('month'),
                    ],
                    本月: [moment().startOf('month'), moment().endOf('month')],
                    下个月: [
                        moment()
                            .month(moment().month() + 1)
                            .startOf('month'),
                        moment()
                            .month(moment().month() + 1)
                            .endOf('month'),
                    ],
                    下半年: [moment().month(6).startOf('month'), moment().month(12).endOf('month')],
                },
            }
        }
        if (picker === 'quarter') {
            props = {
                ...props,
                ranges: {
                    上半年: [moment().quarter(1).startOf('quarter'), moment().quarter(2).endOf('quarter')],
                    上个季度: [
                        moment()
                            .quarter(moment().quarter() - 1)
                            .startOf('quarter'),
                        moment()
                            .quarter(moment().quarter() - 1)
                            .endOf('quarter'),
                    ],
                    本季度: [moment().startOf('quarters'), moment().endOf('quarters')],
                    下个季度: [
                        moment()
                            .quarter(moment().quarter() + 1)
                            .startOf('quarter'),
                        moment()
                            .quarter(moment().quarter() + 1)
                            .endOf('quarter'),
                    ],
                    下半年: [moment().quarter(3).startOf('quarter'), moment().quarter(4).endOf('quarter')],
                },
            }
        }
        if (picker === 'year') {
            props = {
                ...props,
                ranges: {
                    往上一年: [moment().add(-1, 'year').startOf('year'), moment().endOf('year')],
                    去年: [moment().add(-1, 'year').startOf('year'), moment().add(-1, 'year').endOf('year')],
                    今年: [moment().startOf('year'), moment().endOf('year')],
                    下一年: [moment().add(1, 'year').startOf('year'), moment().add(1, 'year').endOf('year')],
                    往下一年: [moment().startOf('year'), moment().add(1, 'year').endOf('year')],
                },
            }
        }
        return props
    }, ['picker'])

    if (mode === 'read') {
        const [startText, endText] = Array.isArray(value) ? value : []
        const parsedStartText: string = startText ? defaultFormatDate(startText, format || MOMENT_FORMAT[picker]) : ''
        const parsedEndText: string = endText ? defaultFormatDate(endText, format || MOMENT_FORMAT[picker]) : ''
        const dom = (
            <div ref={ref}>
                <span>{parsedStartText || '-'}</span>
                <span>{` ${separator || '~'} `}</span>
                <span>{parsedEndText || '-'}</span>
            </div>
        )
        return dom
    }

    return (
        <DatePicker.RangePicker
            ref={ref}
            locale={zh_CN}
            className={classnames({ 'ant-picker-underline': underline })}
            value={parseValueToMoment(value)}
            onChange={handleChange}
            separator={separator}
            {...customPickerProps}
            {...rest}
        />
    )
}
export default React.forwardRef(RangePicker)
