/*
 * @Author: ZhongJun
 * @Date: 2020-12-07 17:15:48
 * @Descriptions: table配置文件
 */

import React from 'react';
import { ColumnType } from 'antd/es/table';
import { APP_CONFIG } from '@lm_fe/components_m';

export const columns = [
  // {
  //   key: 'index',
  //   width: 48,
  // },
  {
    key: 'outpatientNO',
    label: '就诊卡号',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    search: true,
    valueType: 'input',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    key: 'name',
    label: '孕妇姓名',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    search: true,
  },
  {
    key: 'age',
    label: '年龄',
    sortType: 'number',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    key: 'currentGestationalWeek',
    label: '孕周',
    unit: '周',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    showSorter: false,
  },
  {
    key: 'idNO',
    label: '身份证号码',
    search: true,
    width: APP_CONFIG.CELL_WIDTH_LARGE,
  },
  {
    key: 'edd',
    label: '预产期-日期',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    sortType: 'date',
  },
  {
    key: 'sureEdd',
    label: '预产期-B超',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    sortType: 'date',
  },
  {
    label: '孕/产',
    unit: '次',
    key: 'gravidity',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    sortType: 'number',
    showFilter: false,
  },
  {
    label: '产检编号',
    key: 'checkupNO',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
    sortType: 'number',
  },
  {
    key: 'telephone',
    label: '手机号码',
    search: true,
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  // {
  //   key: 'recordstate',
  //   label: '档案状态',
  //   search: true,
  //   width: APP_CONFIG.CELL_WIDTH_SMALL,
  //   initialValue: 'open',
  //   valueType: 'select',
  //   valueEnum: {
  //     all: { label: '全部', value: null },
  //     open: {
  //       label: '未审核',
  //       value: '1',
  //     },
  //     closed: {
  //       label: '已审核',
  //       value: '2',
  //     },
  //   },
  // },
];

export function transformToColumns(array: any) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    const ele = array[i];
    const item = {
      key: ele.key,
      dataIndex: ele.key,
      ellipsis: ele.ellipsis,
      filterDropdown: ele.filterDropdown,
      filterDropdownVisible: ele.filterDropdownVisible,
      filtered: ele.filtered,
      filteredValue: ele.filteredValue,
      filterIcon: ele.filterIcon,
      filterMultiple: ele.filterMultiple,
      filters: ele.filters,
      fixed: ele.fixed,
      showSorterTooltip: ele.showSorterTooltip,
      sortDirections: ele.sortDirections,
      sorter: ele.sorter,
      sortOrder: ele.sortOrder,
      width: ele.width,
      onCell: ele.onCell,
      onFilter: ele.onFilter,
      onHeaderCell: ele.onHeaderCell,
      onFilterDropdownVisibleChange: ele.onFilterDropdownVisibleChange,
      title: () => {
        return (
          <span className="table-header">
            {ele.label}
            <span className="table-header-unit">{ele.unit}</span>
          </span>
        );
      },
    };
    result.push(item);
  }
  return result;
}

export function transformToFormfileds(array: any) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    const ele = array[i];
    if (ele.search) {
      const item = {
        valueType: ele.valueType,
        valueEnum: ele.valueEnum,
        initialValue: ele.initialValue,
        formItemProps: ele.formItemProps,
        placeholder:
          ele.placeholder || `请${ele.valueType && ele.valueType.includes('select') ? '选择' : '输入'}${ele.label}`,
        allowClear: ele.allowClear,
      };
      result.push(item);
    }
  }
  return result;
}
