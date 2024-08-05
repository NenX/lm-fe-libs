import React from 'react';
import { Select } from 'antd';
export default function SingleSelector({ value, onChange, fetchOptions, ...rest }) {
  const inputProps = rest.inputProps || {};

  return <Select allowClear={true} {...inputProps} value={value} onFocus={fetchOptions} onChange={onChange}></Select>;
}
