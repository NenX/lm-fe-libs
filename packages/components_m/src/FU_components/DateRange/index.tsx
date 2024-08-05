import { Checkbox, DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import React, { memo, useCallback } from 'react';
import { TCommonComponent } from '../../FU_components/types';
import { IMyRangePickerProps, UNKNOWN_TIME_SYMBOL, areEqual, defaultGetPopupContainer, formatProps, getIsUnknown, handleChangeValue } from './utils';
import { getInputStyle } from 'src/utils';
import { getMomentRange } from '@lm_fe/utils';
export { UNKNOWN_TIME_SYMBOL, IMyRangePickerProps } from './utils';
export function MyRangeDate(props: IMyRangePickerProps) {
  const { placeholder, ...rest } = props
  return (
    <MyRangePicker
      ranges={getMomentRange()}
      format="YYYY-MM-DD"
      style={{ width: 216 }}

      {...rest}

    />
  );
}
export function MyRangeDateTime(props: IMyRangePickerProps) {
  const { placeholder, ...rest } = props
  return (
    <MyRangePicker
      ranges={getMomentRange()}
      showTime={{
        defaultValue: [moment('00:00', 'HH:mm'), moment('23:59', 'HH:mm')],
      }}
      format="YYYY-MM-DD HH:mm"
      style={{ width: 282 }}
      {...rest}

    />
  );
}
function MyRangePickerInner(_props: IMyRangePickerProps) {
  const props = formatProps(_props)
  const {
    value = undefined,
    onChange,
    marshal,
    minDate,
    maxDate,
    validDate,
    getPopupContainer,
    showUnknown,
    format,
    style,
    ...rest
  } = props
  const isUnknown = getIsUnknown(props)

  const _style = getInputStyle(props)


  const transValue = useCallback(
    (arr: string[]) => {
      return arr.map(
        (date) => {
          let result = null;
          if (!!date) {
            result = moment(date);
          }
          return result;
        }
      ) as any
    },
    [],
  )


  const handleChange = (date: (Moment | null)[] | null, dateString?: string[]) => {
    date = date ?? []
    const { marshal } = props
    const _value = handleChangeValue(props, date)
    onChange?.(marshal ? JSON.stringify(_value) : _value);
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
      <DatePicker.RangePicker
        style={_style}
        getPopupContainer={getPopupContainer}
        value={isUnknown ? undefined : transValue(value)}
        onChange={handleChange}
        disabledDate={disabledDate}
        format={format}
        {...rest}
        placeholder={['开始', '结束']}
      // disabled={isUnknown}

      />

    </span>
  );
}
const RangePicker = memo<IMyRangePickerProps>(MyRangePickerInner, areEqual)
export const MyRangePicker: TCommonComponent<IMyRangePickerProps, string> = RangePicker
MyRangePicker.DisplayFC = (_props) => {
  const props = formatProps(_props)

  const { value } = props
  const isUnknown = getIsUnknown(props)


  return <span>
    {Array.isArray(value) ? value.join(',') : value}
  </span>
}