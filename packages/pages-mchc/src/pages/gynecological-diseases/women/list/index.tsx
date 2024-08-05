import { BaseListOld as BaseList } from '@lm_fe/components_m';
import { Button, Divider, Popconfirm } from 'antd';
import { get } from 'lodash';
import React from 'react';
import Query from './components/Query';
import Table from './components/Table';
import { tableColumns } from './config/table';
import { SLocal_History } from '@lm_fe/service';
export default class List extends BaseList {
  static defaultProps = {
    baseUrl: '/api/gynecological-patients',
    //request,
    baseTitle: '妇女档案',
    needPagination: true,
    showQuery: true,
    showAdd: true,
    tableColumns,
    rowKey: 'id',
    Table,
    Query,
  };

  columns = [
    ...(this.props.tableColumns as Array<any>),
    {
      title: '操作',
      showSorter: false,
      showFilter: false,
      fixed: 'right',
      align: 'center',
      width: 136,
      render: (value: any, rowData: any, index: number) => {
        return (
          <>
            <Button
              type="link"
              size="small"
              // icon={<EyeOutlined className="global-table-action-icon" />}
              onClick={this.handleView(rowData)}
            >
              查看
            </Button>
            <Divider type="vertical" />
            <Button
              type="link"
              size="small"
              // icon={<EditOutlined className="global-table-action-icon" />}
              onClick={this.handleEdit(rowData)}
            >
              编辑
            </Button>
            <Divider type="vertical" />
            <Popconfirm
              title={`确定要删除这个${get(this.props, 'baseTitle')}吗?`}
              onConfirm={this.handleDelete(rowData)}
              okText="确定"
              cancelText="取消"
            >
              <Button type="link" size="small" /* icon={<DeleteOutlined className="global-table-action-icon" />} */>
                删除
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  handleAdd = () => {
    const { history } = this.props;
    
    SLocal_History.historyPush('/gynecological-diseases/women/add', );
  };

  handleView = (rowData: any) => () => {
    const { id } = rowData;
    const { history } = this.props;
    SLocal_History.historyPush(`/gynecological-diseases/women/women-exam-records?id=${id}`, );
  };

  handleEdit = (rowData: any) => () => {
    const { id } = rowData;
    const { history } = this.props;
    SLocal_History.historyPush(`/gynecological-diseases/women/edit?id=${id}`, );
  };
}
