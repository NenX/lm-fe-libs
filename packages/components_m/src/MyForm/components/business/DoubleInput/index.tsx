import React, { Component } from 'react';
import { Input, InputNumber } from 'antd';
import { get, keys } from 'lodash';
import './index.less';
interface BloodPressureProps {
  input_props: any;
  onChange: Function;
  value: any;
  validate: any;
  firstRange: number[];
  secondRange: number[];
}
class BloodPressure extends Component<BloodPressureProps> {
  render() {
    const { value, onChange, firstRange, secondRange } = this.props;
    const paramsArr = keys(value);
    const firstParam = get(paramsArr, '0');
    const secondParam = get(paramsArr, '1');
    const firstValue = get(value, firstParam) || '';
    const secondValue = get(value, secondParam) || '';

    const handleFirstChange = (val: number) => {
      onChange({ [firstParam]: val, [secondParam]: secondValue });
    };

    const handleSecondChange = (val: number) => {
      onChange({ [firstParam]: firstValue, [secondParam]: val });
    };

    return (
      <Input.Group compact className="blood-pressure-input-group">
        <InputNumber
          min={0}
          style={{
            color: firstRange && (firstValue < get(firstRange, '0') || firstValue > get(firstRange, '1')) ? '#f00' : '',
          }}
          value={firstValue}
          onChange={(val: any) => handleFirstChange(val)}
        />
        <Input className="blood-pressure_separator" disabled defaultValue="/" />
        <InputNumber
          min={0}
          style={{
            color:
              secondRange && (secondValue < get(secondRange, '0') || secondValue > get(secondRange, '1')) ? '#f00' : '',
          }}
          value={secondValue}
          onChange={(val: any) => handleSecondChange(val)}
        />
      </Input.Group>
    );
  }
}
export default BloodPressure;
