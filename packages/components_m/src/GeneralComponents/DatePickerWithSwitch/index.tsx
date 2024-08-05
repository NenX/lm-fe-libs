import { DatePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import { CaretLeftFilled, CaretRightFilled } from '../CustomIcon';
import moment from 'moment';
import './index.less';
export default function DatePickerWithSwitch(props: any) {
  const { value, onChange, ...rest } = props;
  const [data, setData] = useState(value);

  useEffect(() => {
    setData(value);
  }, [value]);

  const handlePrevClick = () => {
    const newDate = moment(data).subtract(1, 'day');
    onChange && onChange(newDate);
  };

  const handleNextClick = () => {
    const newDate = moment(data).add(1, 'day');
    onChange && onChange(newDate);
  };

  const handleDatePick = (date) => {
    onChange && onChange(date);
  };

  return (
    <div className="date-picker-with-switch">
      <CaretLeftFilled onClick={handlePrevClick} className="date-picker-with-switch_icon" />
      <DatePicker {...rest} onChange={handleDatePick} value={data} />
      <CaretRightFilled onClick={handleNextClick} className="date-picker-with-switch_icon" />
    </div>
  );
}
