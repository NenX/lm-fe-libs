import React, { useState, useEffect } from 'react';
import { get, isEmpty, join, split } from 'lodash';
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

/**
 * 简单的 checkbox 组合
 */
export default (props: any) => {
  const config = get(props, 'config');
  const specialConfig = get(config, 'specialConfig') ?? safe_json_parse(get(config, 'special_config'));
  const options = get(specialConfig, 'options') as [Option];
  const type = (get(specialConfig, 'type') as 'single' | 'multiple') ? get(specialConfig, 'type') : 'single';

  const [data, setData] = useState({});
  useEffect(() => {
    const { value } = props;
    let res: any;
    if (value) {
      if (type === 'single') {
        res = {
          checkedValues: value && [value],
          withInputValues: null,
        };
      } else {
        res = {
          checkedValues: value && split(value, ','),
          withInputValues: null,
        };
      }
      // console.log(res)
      setData(res);
    } else if (typeof value == 'boolean' && !value) {
      //value为布尔值false表单不回显
      if (type === 'single') {
        res = {
          checkedValues: [value],
          withInputValues: null,
        };
      }
      setData(res);
    }
  }, [props.value]);

  const handleChange = (callbackData: any) => {
    const { onChange } = props;
    let res: any;
    if (type === 'single') {
      res = get(callbackData, 'checkedValues.0');
    } else {
      res = join(get(callbackData, 'checkedValues'), ',');
    }
    onChange && onChange(res);
  };

  return <CheckboxWithInput type={type} options={options} onChange={handleChange} value={data} />;
};
