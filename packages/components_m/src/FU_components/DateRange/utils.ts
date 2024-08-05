

import { safe_json_parse } from '@lm_fe/utils';
import { DatePicker } from 'antd';
import { Moment } from 'moment';
const __RangePicker = DatePicker.RangePicker
type __RangePickerProps = ConstructorParameters<typeof __RangePicker>[0]
export const defaultGetPopupContainer = () => document.body

export function areEqual(prevProps: __RangePickerProps, nextProps: __RangePickerProps) {
    if (prevProps.value !== nextProps.value) {
        return false
    }
    if (prevProps.disabled !== nextProps.disabled) {
        return false
    }
    return true

}
export const UNKNOWN_TIME_SYMBOL = '1970-01-01 00:00:00'
export type IMyRangePickerProps = {
    marshal?: boolean
    value?: any
    onChange?: any

    minDate?: any
    maxDate?: any
    validDate?: any
    getPopupContainer?: any
    format?: any
    showUnknown?: boolean
} & Omit<__RangePickerProps, 'value' | 'disabled'>

export function formatProps(props: IMyRangePickerProps) {
    const data = { ...props }
    data.format = data.format ?? 'YYYY-MM-DD'
    data.marshal = data.marshal ?? true

    const _value = props.value
    let safeValue = typeof _value === 'string' ? safe_json_parse(_value, []) : _value
    safeValue = Array.isArray(safeValue) ? safeValue : []


    data.value = safeValue
    data.getPopupContainer = data.getPopupContainer ?? defaultGetPopupContainer
    return data
}

export function getIsUnknown(props: IMyRangePickerProps) {

    return false
}

export const handleChangeValue = ({ format }: IMyRangePickerProps, date?: (Moment | null)[],) => {
    let result = date ?? [];

    if (format && date) {
        return date.map(_ => _ ? _.format(format) : null)
    }
    return result

}