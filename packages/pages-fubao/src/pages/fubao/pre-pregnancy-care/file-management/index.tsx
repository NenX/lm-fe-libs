import React from 'react';
import Table from './components/Table';
import Query from './components/Query';
import { tableColumns } from './config/table';
import { get, isNil, isArray } from 'lodash';
import { Button, Popconfirm, Divider, message } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PrinterOutlined } from '@ant-design/icons';
import { BaseListOld, mchcModal } from '@lm_fe/components_m';
import { fubaoRequest as request } from '@lm_fe/utils';
import { fubaoHistoryPush } from '@lm_fe/components_m';


class List extends BaseListOld {
  staticDefaultQuery = {
    page: 0,
    size: 20,
    sort: 'id,desc', // 基本列表都需要倒序
    'deleteFlag.equals': 0,
  };
  static defaultProps = {
    baseUrl: '/api/progestation/check/getProgestationCheckArchives', request,
    baseTitle: '档案管理',
    needPagination: true,
    showQuery: true,
    showAdd: true,
    tableColumns,
    rowKey: 'id',
    Table,
    Query,
    otherTableProps: {
      scroll: { x: 1298 },
    },
  };

  state = {
    total: 0,
    defaultQuery: this.staticDefaultQuery,
    dataSource: [],
    selectedRowKeys: [],
    selectedRows: [],
    visible: false,
    editable: false,
    id: undefined,
    editKey: undefined,
    loading: false,
    isSearchColumnModal: false,
    printId: undefined,
    resource: '',
  };

  columns = [
    ...(this.props.tableColumns as Array<any>),
    {
      title: '档案状态',
      dataIndex: 'fileStatus',
      width: 68,
      sortType: 'number',
      fixed: 'right',
      align: 'center',
      render: (fileStatus: any, rowData: any) => {
        if (fileStatus === 2) {
          return (
            <Button size="small" onClick={this.handleEdit(rowData)}>
              已审核
            </Button>
          );
        }
        //待审核 fileStatus===1
        return (
          <Button type="primary" size="small" onClick={this.handleEdit(rowData)}>
            待审核
          </Button>
        );
      },
    },
    {
      title: '操作',
      showSorter: false,
      showFilter: false,
      fixed: 'right',
      width: 330,
      align: 'center',
      render: (value: any, rowData: any, index: number) => {
        return (
          <>
            <Button
              type="link"
              size="small"
              icon={<EyeOutlined className="global-table-action-icon global-table-action-view" />}
              onClick={this.handleView(rowData)}
            >
              查看
            </Button>
            <Divider type="vertical" />
            <Button
              type="link"
              size="small"
              icon={<PrinterOutlined className="global-table-action-icon global-table-action-edit" />}
              onClick={this.handlePrint(rowData, 'progestationCheckPrint')}
            >
              打印<span style={{ color: '#6c6b6b' }}>(女方)</span>
            </Button>
            <Divider type="vertical" />
            <Button
              type="link"
              size="small"
              icon={<PrinterOutlined className="global-table-action-icon global-table-action-edit" />}
              onClick={this.handlePrint(rowData, 'progestationCheckPrint')}
            >
              打印<span style={{ color: '#6c6b6b' }}>(男方)</span>
            </Button>
            <Divider type="vertical" />
            <Popconfirm
              title={`确定要删除这个${get(this.props, 'baseTitle')}吗?`}
              onConfirm={this.handleDelete(rowData)}
              okText="确定"
              cancelText="取消"
            >
              <Button
                type="link"
                size="small"
                icon={<DeleteOutlined className="global-table-action-icon global-table-action-delete" />}
              >
                删除
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  async componentDidActivate() {
    this.handleSearch();
  }

  handleSearch = async () => {
    const { editKey, defaultQuery } = this.state;
    const { baseUrl } = this.props;
    if (!baseUrl) {
      return;
    }
    if (!isNil(editKey)) {
      message.error('请保存未保存的记录');
      return;
    }
    this.setState({ loading: true });
    let dataSource = [];
    let total = 0;
    const query = this.formatQuery(defaultQuery);
    const _res = await request.get(`${baseUrl}/page`, { params: query });
    const res = _res.data
    if (isArray(res.data.pageData)) {
      dataSource = res.data.pageData;
    }
    if (!isNaN(Number(res.data.totalElements))) {
      total = Number(res.data.totalElements);
    }
    this.setState({ dataSource, total, loading: false });
  };

  handleAdd = () => {
    const { history } = this.props as any;

    fubaoHistoryPush(`/pre-pregnancy-care/file-management/add`, this.props as any)

  };

  handleView = (rowData: any) => () => {
    const { id } = rowData;
    fubaoHistoryPush(`/pre-pregnancy-care/wife/wife-exam?id=${id}`, this.props as any)
  };

  handlePrint = (rowData: any, resource: string) => () => {
    const { id } = rowData;
    this.setState({ printId: id, resource });
    mchcModal.open('print_modal', {
      modal_data: {
        request,
        requestConfig: {
          url: "/api/progestationCheckPrint",
          data: {
            resource: resource,
            template: '',
            version: '',
            note: '',
            id: id,
          }
        }
      }
    })
    // message.info('暂未开放此功能，敬请期待；');
  };

  handleEdit = (rowData: any) => () => {
    const { id } = rowData;
    const { history } = this.props as any;
    fubaoHistoryPush(`/pre-pregnancy-care/file-management/edit?id=${id}`, this.props as any);
  };

  handleDelete = (rowData: any) => async () => {
    const _res = await request.delete(`/api/progestation/check/deleteProgestationCheckArchives/${get(rowData, 'id')}`);
    const res = _res.data


    this.handleSearch();
  };

  renderSearchColumnModal = () => {
    const { printId, resource } = this.state;
    return null
  };
}
export default List
