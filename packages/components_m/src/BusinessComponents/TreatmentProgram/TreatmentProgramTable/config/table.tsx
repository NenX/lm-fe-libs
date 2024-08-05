// import React from 'react';
import { APP_CONFIG } from '../../../utils/constants';
export const tableColumns = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 44,
    fixed: 'left',
    render: (text: any, record: any, index: any) => `${index + 1}`,
  },
  {
    title: '预约日期',
    dataIndex: 'appointmentDate',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '时间段',
    dataIndex: 'timeRange',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
    render: (value: any, row: any) => {
      return `${row.appointmentTimeRangeStart} ~ ${row.appointmentTimeRangeEnd}`;
    },
  },
  {
    title: '状态',
    dataIndex: 'state',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    render: (value: any) => {
      switch (value) {
        case 1:
          return '预约';
          break;
        case 2:
          return '到诊';
          break;
        case 3:
          return '取消';
          break;
        case 4:
          return '超时';
          break;
        case 5:
          return '爽约';
          break;
        default:
          return '';
      }
    },
  },
  {
    title: '预约者',
    dataIndex: 'name',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
];
