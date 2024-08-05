import React, { Component } from 'react';
import { AutoComplete } from 'antd';
export default class Index extends Component {
  render() {
    const { value } = this.props as any;

    return <AutoComplete {...this.props} style={{ color: value === '阳性' ? '#ff4d4f' : '' }}></AutoComplete>;
  }
}
