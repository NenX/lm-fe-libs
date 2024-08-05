import React, { Component } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
export default class CustomSpin extends Component<any> {
  render() {
    const { id, style = {}, tip = '数据加载中...' } = this.props;
    return <Spin id={id} style={style} className={styles["spin-container"]} tip={tip} />;
  }
}
