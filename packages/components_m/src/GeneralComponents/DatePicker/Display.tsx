import { EMPTY_PLACEHOLDER, getMomentObj } from '@lm_fe/utils';
import React from 'react';
import { ICusDatePickerProps, formatProps, getIsUnknown } from './utils';


export const DisplayFC = (_props: ICusDatePickerProps) => {
  const props = formatProps(_props)

  const { value, format } = props
  const isUnknown = getIsUnknown(props)

  const m = getMomentObj(value)
  return <span>
    {isUnknown ? '不详' : (m.isValid() ? m.format(format) : EMPTY_PLACEHOLDER)}
  </span>
}