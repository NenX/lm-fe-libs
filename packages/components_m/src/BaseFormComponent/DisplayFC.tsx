import { DatePicker as AntDatePicker, Radio } from 'antd';
import { get } from 'lodash';
import React, { useCallback } from 'react';
import { componentMap } from './index';
export default function BaseFormComponentDisplayFC(props: any) {
  const type: 'Input' = get(props, 'inputType')

  const children = props.children ?? null
  const C = (componentMap[type] as any)?.DisplayFC
  return C ? <C {...props} /> : children

};
