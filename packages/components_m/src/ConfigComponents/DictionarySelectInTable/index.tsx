import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import DictionarySelect from '../../GeneralComponents/DictionarySelect';
interface IProps {
  config?: any;
  value?: any;
  onChange?: any;
}

// 在表格编辑中适配字典的 select 或者 checkbox 或者 radio，不可带 input
export default (props: IProps) => {
  const [data, setData] = useState({});
  const { mode, ...rest } = props;

  useEffect(() => {
    const { value } = props;
    let outputData = {};
    if (value) {
      if (mode === 'single') {
        outputData = {
          selectedData: value,
          otherNote: '',
        };
      } else if (mode === 'multiple') {
        outputData = {
          selectedData: value,
          otherNote: '',
        };
      }
      setData(outputData);
    }
  }, []);

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
    onChange && onChange(get(outputData, 'key'));
  };

  return <DictionarySelect {...rest} onChange={handleChange} value={data} />;
};
