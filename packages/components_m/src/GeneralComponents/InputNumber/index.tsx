import { Checkbox, InputNumber, InputNumberProps } from 'antd';
import './index.less';
import React from 'react';
import { getInputStyle } from '../../utils';
// .ant-input-affix-wrapper-borderless
const UNKNOWN_NUMBER_SYMBOL = 2147483647
export default function MyInputNumber(props: InputNumberProps & { unknown?: boolean }) {
  const { unknown, value, onChange, placeholder, ...others } = props
  const _style = getInputStyle(props)
  const isUnkown = !!unknown && value === UNKNOWN_NUMBER_SYMBOL
  const node = <InputNumber {...others} placeholder={placeholder ?? '请输入数值'} style={_style} controls={false} value={isUnkown ? undefined : value} onChange={onChange} />
  return unknown ? <span>
    {node}
    <span style={{ marginLeft: 6 }}>
      <Checkbox
        checked={isUnkown}
        skipGroup
        onChange={e => {
          const _value: any = e.target.checked ? UNKNOWN_NUMBER_SYMBOL : null
          onChange?.(_value)
        }}
      />
      <span style={{ marginLeft: 6 }}>不详</span>

    </span>
  </span> : node
}
