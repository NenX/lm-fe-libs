/*
 * @Descripttion: 项目描述
 * @Author: cjl
 * @Date: 2021-12-07 16:58:12
 * @LastEditTime : 2022-04-01
 */
import { APP_CONFIG, MyBaseTableProps } from '@lm_fe/components_m';
import { formatDate } from '@lm_fe/utils';
import React from 'react';
export const tableColumns: MyBaseTableProps['columns'] = [
  {
    title: '就诊卡号',
    dataIndex: 'outpatientNO',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    sortType: 'number',
    align: 'center',
  },
  {
    title: '孕妇姓名',
    dataIndex: 'name',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL - 30,
    showSorter: false,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    sortType: 'number',
    width: 42,
  },
  {
    title: '孕周',
    dataIndex: 'currentGestationalWeek',
    width: 52,
    showSorter: false,
  },
  {
    title: '证件号码',
    dataIndex: 'idNO',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_MIDDLE + 20,
    sortType: 'number',
  },
  {
    title: '预产期-日期',
    dataIndex: 'edd',
    width: APP_CONFIG.CELL_WIDTH_SMALL - 10,
    sortType: 'date',
  },
  {
    title: '预产期-B超',
    dataIndex: 'sureEdd',
    width: APP_CONFIG.CELL_WIDTH_SMALL - 10,
    sortType: 'date',
  },
  {
    title: '孕/产',
    dataIndex: 'gravidity',
    width: 60,
    align: 'center',
    render: (value: any, rowData: any) => `${value || 0} / ${rowData.parity || 0}`,
    sortType: 'number',
    showFilter: false,
  },
  {
    title: '产检编号',
    dataIndex: 'checkupNO',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    sortType: 'number',
  },
  {
    title: '手机号码',
    dataIndex: 'telephone',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    sortType: 'number',
  },
  {
    title: '时间',
    dataIndex: 'lastModifiedDate',
    width: APP_CONFIG.CELL_WIDTH_SMALL - 10,
    sortType: 'date',
    render: (value: any, rowData: any) => {
      return formatDate(value);
    },
  },
  {
    title: '审核人',
    dataIndex: 'auditorName',
    width: APP_CONFIG.CELL_WIDTH_SMALL - 10,
  },
  // {
  //   title: '客服专员',
  //   dataIndex: 'customerService',
  //   width: APP_CONFIG.CELL_WIDTH_SMALL,
  //   inputType: 'dictionary_select_in_table',
  //   inputProps: { type: 'select', mode: 'single', boxSpan: 6, uniqueKey: 'Common.customerService' },
  //   render: (value) => {
  //     return <DictionarySelect.Display uniqueKey="Common.customerService" value={value} />;
  //   },
  // },
];
