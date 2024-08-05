import React, { useEffect, useState } from 'react';
import { cloneDeep, filter, get, indexOf, isEmpty, isNil, isString, map, set } from 'lodash';
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
export default (props: any) => {
  const { onChange, config, } = props;
  const specialConfig = safe_json_parse(config?.special_config ?? config?.specialConfig);
  const options = get(specialConfig, 'options') as [Option];
  const type = get(specialConfig, 'type') as 'single' | 'multiple';

  const [data, setData] = useState({});

  useEffect(() => {
    const { value } = props;
    const valueJson = safe_json_parse(value);
    !isEmpty(valueJson) &&
      setData({
        checkedValues: get(valueJson, 'checkedValues'),
        withInputValues: get(valueJson, 'withInputValues'),
        withInputDoubleValues: get(valueJson, 'withInputDoubleValues'),
      });
  }, [props.value]);

  const handleChange = (changedData: any) => {
    onChange?.(isString(changedData) ? changedData : JSON.stringify(changedData));
  };

  return <CheckboxWithInput {...props} type={type} options={options} onChange={handleChange} value={data} />;
};
