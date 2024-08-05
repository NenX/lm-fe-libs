import React from 'react';
import { Input } from 'antd';

// 主要是解决鼠标悬浮，文字 title
export default (props: any) => {
  return <Input allowClear title={props?.value} {...props} />;
};
