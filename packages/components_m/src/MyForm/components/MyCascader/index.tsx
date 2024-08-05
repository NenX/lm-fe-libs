import React, { Component } from 'react';
import { Cascader } from 'antd';

/**
 * 输入 以,分割
 */
interface MyCascaderProps {
  input_props: any;
  onChange: Function;
  value: any;
}
const SPLIT_KEY = ",";
export default class MyCascader extends Component<MyCascaderProps>{

  handleChange = (val: Array<any>) => {
    const { onChange } = this.props;
    onChange(val.join(SPLIT_KEY));
  }

  render() {
    const { input_props = {} } = this.props;
    const { options = [] } = input_props;
    let { value = "" } = this.props;
    if (!value || value === null) {
      value = ""
    } else {
      value = value.split(SPLIT_KEY);
    }
    return (
      <Cascader
        value={value}
        onChange={this.handleChange}
        options={options}
      />
    )
  }
}