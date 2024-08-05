import React from 'react'
import { APP_CONFIG } from '@lm_fe/components_m';
import { Button, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { resolveFubaoPath } from '@lm_fe/components_m';
export const tableColumns = [
  {
    title: '建档日期',
    dataIndex: 'filingDay',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '女方姓名',
    dataIndex: 'womanName',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    render: (text: any, record: any) => {
      const id = record?.id;
      return (
        <Tooltip title="点击查看女方检查详情">
          <Link to={resolveFubaoPath(`/premarital-care/wife-v2/wife-exam?id=${id}`)}>{text}</Link>
        </Tooltip>
      );
    },
  },
  {
    title: '女方就诊卡号',
    dataIndex: 'womanOutpatientNo',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '女方年龄(岁)',
    dataIndex: 'womanAge',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '女方手机号码',
    dataIndex: 'womanTelephone',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '男方姓名',
    dataIndex: 'manName',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    render: (text: any, record: any) => {
      const id = record?.id;
      return (
        <Tooltip title="点击查看男方检查详情">
          <Link to={resolveFubaoPath(`/premarital-care/husband-v2/husband-exam?id=${id}`)}>{text}</Link>
        </Tooltip>
      );
    },
  },
  {
    title: '男方就诊卡号',
    dataIndex: 'manOutpatientNo',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '男方年龄(岁)',
    dataIndex: 'manAge',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '男方手机号码',
    dataIndex: 'manTelephone',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },

  {
    title: '档案状态',
    dataIndex: 'fileStatus',
    width: 68,
    sortType: 'number',
    fixed: 'right',
    align: 'center',
    render: (fileStatus: any, rowData: any) => {
      const { id } = rowData;

      const node = fileStatus === 2 ?
        <Button size="small" >已审核</Button>
        : <Button size="small" type="primary" >待审核</Button>

      return <Link to={resolveFubaoPath(`/premarital-care/file-management/edit?id=${id}`)}>{node}</Link>

    },
  },
];
