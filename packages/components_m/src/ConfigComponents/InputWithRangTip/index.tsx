import InputWithRangTip from '../../GeneralComponents/InputWithRangTip';
import { safe_json_parse } from '@lm_fe/utils';
import { get } from 'lodash';
import React from 'react';
export default (props: any) => {
  const { config, onChange, value } = props;
  const specialConfig = get(config, 'specialConfig') ?? safe_json_parse(get(config, 'special_config'));

  return <InputWithRangTip {...specialConfig} onChange={onChange} value={value} />;
};
