/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import moment from 'moment';
import { DatePicker, TimePicker } from 'antd';
interface MyDatePickerProp {
  onChange: Function;
  dispatch?: Function;
  value: any;
  size?: string;
  input_props: any;
}
const dateTypeString = 'date';
const timeTypeString = 'time';
const defaultPicker = 'date';
const defaultDateFormat = 'YYYY-MM-DD';
const defaultTimeFormat = 'HH:mm:ss';
export default function MyDateTime(props: MyDatePickerProp) {
  const { input_props = {}, value = '', size = 'default' } = props;
  const { type = dateTypeString, picker = defaultPicker, style = {}, hiddenSecond, disabled } = input_props;
  let format = type === dateTypeString ? defaultDateFormat : defaultTimeFormat;
  if (hiddenSecond) format = 'YYYY-MM-DD HH:mm:ss';

  const handleChange = (val: any) => {
    if (val) {
      props.onChange(val.format(format));
    } else {
      props.onChange(val);
    }
  };

  const renderDatePicker = () => {
    if (!value || moment(value, format).isValid()) {
      const val: any = value ? moment(value, format) : '';
      if (hiddenSecond) {
        return (
          <DatePicker
            showTime
            key={value}
            defaultValue={val}
            format="YYYY-MM-DD HH:mm"
            onChange={handleChange}
            disabled={disabled}
          />
        );
      }
      if (type === dateTypeString) {
        return (
          <DatePicker
            style={{ width: '100%', ...style }}
            size={size}
            value={val}
            format={format}
            picker={picker}
            onChange={handleChange}
            disabled={disabled}
          />
        );
      }
      if (type === timeTypeString) {
        return (
          <TimePicker
            style={{ width: '100%', ...style }}
            size={size}
            defaultValue={val}
            format={format}
            onChange={handleChange}
          />
        );
      }
      return <strong>组件类型非法</strong>;
    }
    return <strong>值类型格式非法</strong>;
  };

  return renderDatePicker();
}
