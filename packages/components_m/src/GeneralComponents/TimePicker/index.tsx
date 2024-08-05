import React from 'react';
import moment from 'moment';
import { TimePicker } from 'antd';
export default function CusTimePicker({
  value = undefined,
  onChange,
  valueType,
  format,
  getPopupContainer = () => document.body,
  ...rest
}: any) {
  const transValue = (date: moment.MomentInput) => {
    let result = undefined;
    if (typeof date === 'string') {
      result = moment(date);
      if (!result.isValid()) {
        result = moment(`2000 ${date}`)
      }
    }
    return result;
  };

  const handleChange = (date?: moment.Moment, dateString?: any) => {
    let result = date?.format();
    if (valueType && date) {
      result = moment(date).format(valueType);
    }
    if (format && date) {
      result = moment(date).format(format);
    }
    onChange?.(result);
  };

  return (
    <TimePicker getPopupContainer={getPopupContainer} value={transValue(value)} onChange={handleChange} format={format} {...rest} />
  );
}
