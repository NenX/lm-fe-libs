import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import { request } from '@lm_fe/utils';
interface IProps extends SelectProps<any> {
  labelKey?: string;
  valueKey?: string;
  method?: 'get' | 'post' | 'put';
  url?: string;
  dataSource?: { [x: string]: any }[];
}
export default ({ valueKey = 'value', labelKey = 'label', url, method = 'get', dataSource = [], ...rest }: IProps) => {
  const Option = Select.Option;
  const [options, setOptions] = useState<{ [x: string]: any }>(dataSource);
  useEffect(() => {
    url &&
      request[method](`/api/${url}`).then((r) => {
        setOptions(r.data);
      });
  }, []);

  return (
    <Select {...rest}>
      {options &&
        options.map((_) => (
          <Option key={_[valueKey]} value={_[valueKey]}>
            {_[labelKey]}
          </Option>
        ))}
    </Select>
  );
};
