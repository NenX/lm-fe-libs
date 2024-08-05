/*
 * @Descripttion: 项目描述
 * @Author: cjl
 * @Date: 2021-11-02 16:27:21
 * @LastEditTime: 2021-11-02 16:27:21
 */
import { Button } from 'antd';
import React from 'react';
import './index.less';
interface IProps {
  changeSchame: any;
  [key: string]: any;
}
interface IState {
  [key: string]: any;
}
export default function BrowseSchema({ changeSchame, ...props }: IProps) {
  function handleChangeSchame(type: boolean) {
    return (e) => {
      changeSchame(type);
    };
  }
  return (
    <div className="browse-schema-container">
      浏览模式
      <Button onClick={handleChangeSchame(false)}>编辑模式</Button>
      <Button onClick={handleChangeSchame(true)}>浏览模式</Button>
    </div>
  );
}
