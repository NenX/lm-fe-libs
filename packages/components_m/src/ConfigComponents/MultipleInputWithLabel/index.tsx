import React, { useEffect, useState } from 'react';
import { get, isEmpty } from 'lodash';
import MultipleInputWithLabel from '../../GeneralComponents/MultipleInputWithLabel';
import { safe_json_parse } from '@lm_fe/utils';
interface IProps {
  config: any;
  value?: any;
  onChange?: any;
}
export default (props: IProps) => {
  const [data, setData] = useState({});

  const config = get(props, 'config');
  const specialConfig = get(config, 'specialConfig') ?? safe_json_parse(get(config, 'special_config'));
  const { options, type } = specialConfig;

  useEffect(() => {
    const { value } = props;
    if (typeof value === 'string') {
      setData(JSON.parse(value));
    } else {
      !isEmpty(value) && setData(value);
    }
  }, [props.value]);

  const handleChange = (result: any) => {
    const { onChange } = props;
    setData(result);
    onChange && onChange(JSON.stringify(result));
  };

  return <MultipleInputWithLabel options={options} type={type} onChange={handleChange} value={data} />;
};
