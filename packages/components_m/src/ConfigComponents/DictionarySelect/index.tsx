import React, { useState, useEffect } from 'react';
import { get, isEmpty } from 'lodash';
import DictionarySelect from '../../GeneralComponents/DictionarySelect';
import { mchcEnv } from '@lm_fe/env';
interface IProps {
  config?: any;
  value?: any;
  onChange?: any;
}

// 适配字典的 select 或者 checkbox 或者 radio
export function ConfigComponents_DictionarySelect(props: IProps) {
  const [data, setData] = useState({});
  const { value } = props;

  const config = get(props, 'config');
  const specialConfig = get(config, 'specialConfig') ?? (get(config, 'special_config') && JSON.parse(get(config, 'special_config')));
  const { mode = 'single' } = specialConfig;
  mchcEnv.logger.log('ConfigComponents_DictionarySelect', { props, data })

  useEffect(() => {
    let outputData = {};
    if (!isEmpty(value)) {
      if (mode === 'single') {
        outputData = {
          selectedData: get(value, 'key'),
          otherNote: get(value, 'keyNote'),
        };
      } else if (mode === 'multiple') {
        outputData = {
          selectedData: JSON.parse(get(value, 'key')),
          otherNote: get(value, 'keyNote'),
        };
      }
      setData(outputData);
    }
  }, [value]);

  const handleChange = (callbackData: any) => {
    const { onChange } = props;
    const newData = {
      key: get(callbackData, 'selectedData'),
      keyNote: get(callbackData, 'otherNote'),
    };
    setData(newData);
    let outputData;
    if (mode === 'single') {
      outputData = {
        key: get(callbackData, 'selectedData'),
        keyNote: get(callbackData, 'otherNote'),
      };
    } else if (mode === 'multiple') {
      outputData = {
        key: JSON.stringify(get(callbackData, 'selectedData')),
        keyNote: get(callbackData, 'otherNote'),
      };
    }
    setData(callbackData);
    onChange && onChange(outputData);
  };

  return <DictionarySelect {...props} onChange={handleChange} value={data} {...specialConfig} />;
};
