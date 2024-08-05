import React from 'react';
import { Input } from 'antd';
export default function MultiplicationInput({ value = '×', onChange, ...rest }) {
  const preValues = value ? value.split('×') : ['', ''];

  const handleChange = (name: string, e: any) => {
    let val = '';
    const inputVal = e.target.value;
    if (name === 'arg1') {
      val = `${inputVal}×${preValues[1]}`;
    }
    if (name === 'arg2') {
      val = `${preValues[0]}×${inputVal}`;
    }
    onChange(val);
  };

  const extraStyle = {
    lineHeight: '32px',
    padding: '0 2px',
  };
  return (
    <Input.Group compact style={{ display: 'inline-flex', width: 148, margin: '0 5px' }}>
      <Input style={{ width: 50 }} value={preValues[0]} onChange={(e) => handleChange('arg1', e)} />
      <span style={extraStyle}>×</span>
      <Input style={{ width: 50 }} value={preValues[1]} onChange={(e) => handleChange('arg2', e)} />
      <span style={extraStyle}>cm²</span>
    </Input.Group>
  );
}
