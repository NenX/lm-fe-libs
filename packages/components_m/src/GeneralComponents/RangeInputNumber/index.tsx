import React, { useState, useEffect } from 'react';
import { Input, InputNumber } from 'antd';
import classnames from 'classnames';
import { nth } from 'lodash';
import './index.less';
interface IProps {
  min?: number;
  max?: number;
  value: number[] | undefined;
  onChange?: (val: any) => void;
}
export default function RangeInputNumber({ value, onChange = () => {}, min = 0, max = 10000, ...rest }: IProps) {
  // const [limitMin, setLimitMin] = useState(min);
  // const [limitMax, setLimitMax] = useState(max);

  // useEffect(() => {
  //   setLimitMin(nth(value, 1));
  //   setLimitMax(nth(value, 0));
  // }, []);

  const handleChange = (val: number, key: string) => {
    let newValue: any[] = [];
    if (key === 'min') {
      const max = nth(value, 1);
      newValue = [val, max];
    }
    if (key === 'max') {
      const min = nth(value, 0);
      newValue = [min, val];
    }
    onChange(newValue);
  };

  return (
    <Input.Group compact className="range-input-number">
      <InputNumber
        className={classnames('range-input-number-item', { warning: nth(value, 0) > nth(value, 1) })}
        placeholder="最小值"
        min={min}
        max={max}
        value={nth(value, 0)}
        onChange={(val) => handleChange(val, 'min')}
      />
      <Input
        style={{
          width: 30,
          borderLeft: 0,
          borderRight: 0,
          pointerEvents: 'none',
        }}
        placeholder="~"
        disabled
      />
      <InputNumber
        className={classnames('range-input-number-item', { warning: nth(value, 1) < nth(value, 0) })}
        placeholder="最大值"
        min={min}
        max={max}
        value={nth(value, 1)}
        onChange={(val) => handleChange(val, 'max')}
      />
    </Input.Group>
  );
}
