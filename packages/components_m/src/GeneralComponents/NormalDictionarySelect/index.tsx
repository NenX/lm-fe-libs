import { get } from 'lodash';
import React, { useState } from 'react';
import DictionarySelect from '../DictionarySelect';
export default (props: any) => {
  const { mode = 'single', type = 'select', value, onChange, ...rest } = props;
  const [data, setData] = useState({
    selectedData: value,
    otherNote: '',
  });

  const handleChange = (data) => {
    setData({
      selectedData: get(data, 'selectedData'),
      otherNote: '',
    });
    onChange && onChange(get(data, 'selectedData'));
  };

  return <DictionarySelect {...rest} mode={mode} type={type} value={data} onChange={handleChange} />;
};
