import React, { forwardRef } from 'react'
import TimePicker, { TimeRangePickerProps as AntTimeRangePickerProps } from 'antd/es/time-picker'
import classnames from 'classnames'
import 'moment/locale/zh-cn'
import zh_CN from 'antd/es/date-picker/locale/zh_CN'
import { parseValueToMoment, defaultFormatDate } from './utils'
import './index.less'
type TimeRangePickerProps = AntTimeRangePickerProps & {
    underline?: boolean
    mode?: 'read' | 'edit'
}
const TimeRangePicker: React.ForwardRefRenderFunction<any, TimeRangePickerProps> = (
    { value, separator, underline, mode, format = 'HH:mm:ss', ...rest },
    ref,
) => {
    if (mode === 'read') {
        const [startText, endText] = Array.isArray(value) ? value : []
        const parsedStartText: string = startText ? defaultFormatDate(startText, format) : ''
        const parsedEndText: string = endText ? defaultFormatDate(endText, format) : ''
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
        <TimePicker.RangePicker
            ref={ref}
            className={classnames('ant-picker-range-short', { 'ant-picker-underline': underline })}
            locale={zh_CN}
            separator={separator}
            value={parseValueToMoment(value)}
            {...rest}
        />
    )
}
export default forwardRef(TimeRangePicker)
