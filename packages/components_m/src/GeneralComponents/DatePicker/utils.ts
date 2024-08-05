

import { formatDate, formatDateTime } from '@lm_fe/utils';
import { PickerDateProps } from 'antd/lib/date-picker/generatePicker';
import moment, { Moment } from 'moment';
export const defaultGetPopupContainer = () => document.body

export function areEqual(prevProps: any, nextProps: any) {
    if (prevProps.value !== nextProps.value) {
        return false
    }
    if (prevProps.disabled !== nextProps.disabled) {
        return false
    }
    return true

}
export const UNKNOWN_TIME_SYMBOL = '1970-01-01 00:00:00'
export type ICusDatePickerProps = {
    value?: any
    onChange?: any
    valueType?: any
    minDate?: any
    maxDate?: any
    validDate?: any
    getPopupContainer?: any
    format?: any
    showUnknown?: boolean
    unknown?: boolean
} & Omit<PickerDateProps<Moment>, 'value'>

export function getUnknown(props: ICusDatePickerProps) {



    const { showUnknown, unknown } = props

    return (showUnknown || unknown)
}
export function formatProps(props: ICusDatePickerProps) {



    const data = { ...props }
    data.format = data.format ?? (data.showTime ? formatDateTime.format : formatDate.format)
    data.getPopupContainer = data.getPopupContainer ?? defaultGetPopupContainer
    return data
}

export function getIsUnknown(props: ICusDatePickerProps) {
    const { value, } = props
    const symbolValue = handleChangeValue(props, UNKNOWN_TIME_SYMBOL)
    const _value = handleChangeValue(props, value)
    const isUnknown = _value === symbolValue && getUnknown(props)
    return isUnknown
}

export const handleChangeValue = ({ valueType, format }: ICusDatePickerProps, date?: any,) => {
    let result = date;
    if (valueType && date) {
        result = moment(date).format(valueType);
    }
    if (format && date) {
        result = moment(date).format(format);
    }
    return result

}