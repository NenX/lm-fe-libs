import React from 'react';
import { Tooltip } from 'antd';
import { APP_CONFIG } from '@lm_fe/env';

export const tableColumns = [
  {
    title: '角色代码',
    dataIndex: 'name',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '角色名称',
    dataIndex: 'nickname',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '角色描述',
    dataIndex: 'groupdesc',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
    render: (text: string, record: any) => {
      return (
        <Tooltip placement="topLeft" title={text}>
          <span className="text-overflow" style={{ width: 185 }}>
            {text}
          </span>
        </Tooltip>
      );
    },
  },
];
export const menuColumns = [
  {
    title: '菜单/权限名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
];
