import React, { useState, useEffect } from 'react';
import { get, isNil } from 'lodash';
import CheckboxWithInput from '../../GeneralComponents/CheckboxWithInput';
import { safe_json_parse } from '@lm_fe/utils';
type Option = {
  value: string;
  label: string;
  checked: boolean;
  withInput: boolean;
  span?: number;
  offset?: number;
  inputSpan?: number;
};

// 接收格式
/**
 * value: ''
 */
export default (props: any) => {
  const config = get(props, 'config');
  const specialConfig = get(config, 'specialConfig') ?? safe_json_parse(get(config, 'special_config'));
  const options = get(specialConfig, 'options') as [Option];
  const type = get(specialConfig, 'type') as 'single' | 'multiple';

  const [data, setData] = useState({});
  useEffect(() => {
    const key = get(props, 'value');
    setData({
      checkedValues: !isNil(key) && [key],
      withInputValues: 'purecheckbox',
    });
  }, [props.value]);

  const handleChange = (callbackData: any) => {
    const { onChange } = props;
    onChange && onChange(get(callbackData, 'checkedValues.0'));
  };

  return <CheckboxWithInput {...props} type={type} options={options} onChange={handleChange} value={data} />;
};
