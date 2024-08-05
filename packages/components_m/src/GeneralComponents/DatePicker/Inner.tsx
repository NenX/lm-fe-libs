import { mchcLogger } from '@lm_fe/env';
import { Checkbox, DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import React, { memo, useCallback } from 'react';
import { TCommonComponent } from '../../FU_components/types';
import { getInputStyle } from '../../utils';
import { ICusDatePickerProps, UNKNOWN_TIME_SYMBOL, areEqual, formatProps, getIsUnknown, getUnknown, handleChangeValue } from './utils';
export { ICusDatePickerProps, UNKNOWN_TIME_SYMBOL } from './utils';
function CusDatePicker(_props: ICusDatePickerProps) {
  const props = formatProps(_props)
  const {
    value = undefined,
    onChange,
    valueType,
    minDate,
    maxDate,
    validDate,
    getPopupContainer,
    format,
    style,
    ...rest
  } = props
  const isUnknown = getIsUnknown(props)
  const _style = getInputStyle(props)



  const transValue = useCallback(
    (date?: any) => {
      let result = undefined;
      if (!!date) {
        result = moment(date);
      }
      return result;
    },
    [],
  )


  const handleChange = (date?: any, dateString?: string) => {
    const newValue = handleChangeValue(props, date)
    mchcLogger.log('newValue', { newValue, props })
    onChange?.(newValue);
  }

  const disabledDate = useCallback(
    (current: Moment) => {
      const dateStr = moment(current).format('YYYY-MM-DD');
      if (validDate) {
        return dateStr.includes(validDate);
      }

      if (minDate) {
        if (minDate === 'now') {
          return current < moment().endOf('day');
        }
        return current < moment(minDate).endOf('day');
      }

      if (maxDate) {
        if (maxDate === 'now') {
          return current > moment().endOf('day');
        }
        return current > moment(maxDate).endOf('day');
      }
      return false;
    },
    [validDate, maxDate, minDate],
  )




  return (
    <span>
      <DatePicker
        getPopupContainer={getPopupContainer}
        value={isUnknown ? null : transValue(value)}
        onChange={handleChange}
        disabledDate={disabledDate}
        format={format}
        {...rest}
        style={_style}
        placeholder='请选择日期或时间'
      // disabled={isUnknown}

      />
      {
        getUnknown(props) ? <span style={{ marginLeft: 6 }}>
          <Checkbox checked={isUnknown}
            skipGroup
            onChange={e => {
              const _value = e.target.checked ? UNKNOWN_TIME_SYMBOL : null

              const value = handleChangeValue(props, _value)

              onChange?.(value)

            }}
          />
          <span style={{ marginLeft: 6 }}>不详</span>
        </span> : null
      }
    </span>
  );
}
const df = memo<ICusDatePickerProps>(CusDatePicker, areEqual)
CusDatePicker.MonthPicker = DatePicker.MonthPicker;
const MyDatePickerInner: TCommonComponent<ICusDatePickerProps, string> = df

export default MyDatePickerInner 