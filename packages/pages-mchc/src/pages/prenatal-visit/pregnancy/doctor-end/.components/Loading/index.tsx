import React, { Component } from 'react';
import { Spin } from 'antd';
import './index.less';
export default class Index extends Component {
  render() {
    return (
      <div className="loading-wrapper">
        <Spin size="large" tip="保存中，请稍后..." />
      </div>
    );
  }
}
