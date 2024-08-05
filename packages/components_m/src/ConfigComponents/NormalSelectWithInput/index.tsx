import React, { useEffect, useState } from 'react';
import { get, isEmpty } from 'lodash';
import SelectWithInput, { IOption as Option } from '../../GeneralComponents/SelectWithInput';
import { safe_json_parse } from '@lm_fe/utils';
export default (props: any) => {
  const config = get(props, 'config');
  const specialConfig = get(config, 'specialConfig') ?? safe_json_parse(get(config, 'special_config'));
  const options = get(specialConfig, 'options') as [Option];
  const inputType = get(specialConfig, 'inputType');
  const selectedValueShowInput = get(specialConfig, 'selectedValueShowInput');

  const [data, setData] = useState({});

  useEffect(() => {
    const { value } = props;
    if (!isEmpty(value)) {
      setData({
        select: get(value, 'key'),
        input: get(value, 'keyNote'),
      });
    }
  }, [props.value]);

  const handleChange = (callbackData: { select: any; input: any }) => {
    const { onChange } = props;
    const newData = {
      key: get(callbackData, 'select'),
      keyNote: get(callbackData, 'input'),
    };
    onChange && onChange(newData);
  };

  return (
    <SelectWithInput
      inputType={inputType}
      options={options}
      value={data}
      selectedValueShowInput={selectedValueShowInput}
      onChange={handleChange}
    />
  );
};
