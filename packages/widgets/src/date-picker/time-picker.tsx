import React, { forwardRef } from 'react'
import AntTimePicker, { TimePickerProps as AntTimePickerProps } from 'antd/es/time-picker'
import classnames from 'classnames'
import 'moment/locale/zh-cn'
import zh_CN from 'antd/es/date-picker/locale/zh_CN'
import './index.less'
type TimePickerProps = AntTimePickerProps & {
    underline?: boolean
}
const TimePicker: React.ForwardRefRenderFunction<any, TimePickerProps> = ({ underline, ...rest }, ref) => {
    return (
        <AntTimePicker
            ref={ref}
            className={classnames({ 'ant-picker-underline': underline })}
            locale={zh_CN}
            {...rest}
        />
    )
}
export default forwardRef(TimePicker)
