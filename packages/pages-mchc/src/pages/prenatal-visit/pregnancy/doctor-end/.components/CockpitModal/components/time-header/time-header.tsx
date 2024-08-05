import React, { useContext, useCallback, useEffect, useState } from 'react';
import { Modal, Space, Button, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment';
import classnames from 'classnames';
import { getDateArray } from '../../methods/assist-methods';
import './index.less';
interface Iprops {
  title: string;
  onChange: Function;
  [key: string]: any;
}
export enum selectTyle {
  date,
  week,
  month,
  custom,
}
export default function TimeHeader({ title, onChange, ...props }: Iprops) {
  const [currentFocus, setCurrentFocus] = useState(selectTyle.date);
  const [selectDate, setSelectDate] = useState(getDateArray(selectTyle.date));

  useEffect(() => {
    onChange && onChange(selectDate);
  }, [selectDate]);
  function handleChange(dates: any, dateStrings: any) {
    setCurrentFocus(selectTyle.custom);
    setSelectDate(dateStrings);
  }
  function handleTextClick(type: selectTyle) {
    return () => {
      setCurrentFocus(type);
      setSelectDate(getDateArray(type));
    };
  }
  return (
    <div className="time-header-container">
      <div className="left-content">{title}</div>
      <div className="right-content">
        <Space size={'middle'}>
          <div
            className={classnames('text', { focus: currentFocus == selectTyle.date })}
            onClick={handleTextClick(selectTyle.date)}
          >
            今日
          </div>
          <div
            className={classnames('text', { focus: currentFocus == selectTyle.week })}
            onClick={handleTextClick(selectTyle.week)}
          >
            本周
          </div>
          <div
            className={classnames('text', { focus: currentFocus == selectTyle.month })}
            onClick={handleTextClick(selectTyle.month)}
          >
            本月
          </div>
          <RangePicker
            onChange={handleChange}
            value={currentFocus == selectTyle.custom ? [moment(selectDate[0]), moment(selectDate[1])] : null}
          />
        </Space>
      </div>
    </div>
  );
}
