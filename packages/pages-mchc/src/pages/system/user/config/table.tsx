import React from 'react';
import { get, reduce, isEmpty } from 'lodash';
import { APP_CONFIG } from '@lm_fe/env';
import { formatTimeToStandard } from '@lm_fe/components_m';

export const tableColumns = [
  {
    title: '序号',
    dataIndex: 'index',
    width: 40,
    align: 'center',
    render: (text, record, index) => index + 1,
  },
  {
    title: '账号',
    dataIndex: 'login',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '姓名',
    dataIndex: 'firstName',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    ellipsis: true,
    render: (value: string, rowData: any) => {
      const { groups } = rowData;
      const res = reduce(
        groups,
        (sum, group) => {
          return `${isEmpty(sum) ? '' : `${sum}、`}${get(group, 'nickname')}`;
        },
        '',
      );
      return <span>{res}</span>;
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdDate',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
    render: (value: string) => formatTimeToStandard(value),
  },
  {
    title: '创建者',
    dataIndex: 'createdBy',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '最近修改时间',
    dataIndex: 'lastModifiedDate',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
    render: (value: string) => formatTimeToStandard(value),
  },
  {
    title: '最近修改者',
    dataIndex: 'lastModifiedBy',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
];
