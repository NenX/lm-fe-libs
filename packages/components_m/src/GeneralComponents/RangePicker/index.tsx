import React from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
export default function CusRangePicker({
  value = undefined,
  onChange,
  valueType,
  format,
  getPopupContainer = () => document.body,
  ...rest
}: any) {
  const transValue = (date: moment.MomentInput[]) => {
    let result = undefined;
    if (!!date) {
      result = [moment(date[0]), moment(date[1])];
    }
    return result;
  };

  const handleChange = (date: moment.MomentInput, dateString: any) => {
    let result = date;
    if (valueType) {
      result = moment(date).format(valueType);
    }
    if (format) {
      result = moment(date).format(format);
    }
    onChange(result);
  };

  //   return (
  //     <RangePicker getPopupContainer={getPopupContainer} value={transValue(value)} onChange={handleChange} {...rest} />
  //   );
  return (
    <RangePicker getPopupContainer={getPopupContainer} value={transValue(value)} onChange={handleChange} {...rest} />
  );
}
