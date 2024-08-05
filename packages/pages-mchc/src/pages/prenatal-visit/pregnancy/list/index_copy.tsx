import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Popconfirm, Tooltip } from 'antd';
import { get, isNil, map } from 'lodash';
import PrenatalModal from './components/prenatal-modal/prenatal-modal';
import Query from './components/Query';
import Table from './components/Table';
import { tableColumns } from './config/table';
import './index.less';
import { mchcEvent } from '@lm_fe/env';
import { IMchc_Pregnancy } from '@lm_fe/service';
import { APP_CONFIG, BaseListOld } from '@lm_fe/components_m';
import { formatDate } from '@lm_fe/utils';
import React from 'react';
class List extends BaseListOld {
  static defaultProps = {
    baseUrl: '/api/pregnancies',
    baseTitle: '孕册',
    needPagination: true,
    showQuery: true,
    showAdd: true,
    tableColumns: tableColumns, // transformToColumns(columns),
    rowKey: 'id',
    Table,
    Query,
    otherTableProps: {
      scroll: { x: 1140 },
    },
  };

  async componentDidActivate() {
    this.handleSearch();
  }
  rm() { }
  componentDidMount(): void {
    this.rm = mchcEvent.on_rm('my_form', e => {
      if (e.type === 'onSearch' && e.name === "outpatientNO") {
        const pregnancy: IMchc_Pregnancy = e.value?.data
        if (!pregnancy) return
        const isUn = pregnancy.recordstate === '0'
        const cb = isUn ? this.handleCheck(pregnancy) : this.handleEdit(pregnancy)
        cb()
      }
    })
  }
  componentWillUnmount(): void {
    this.rm()
  }
  columns = [
    ...(this.props.tableColumns as Array<any>),
    {
      title: '档案状态',
      dataIndex: 'recordstate',
      width: 76,
      sortType: 'number',
      // fixed: 'right',
      align: 'center',
      render: (recordstate: any, rowData: any) => {
        if (recordstate === '1') {
          return (
            <Button
              size="small"
              onClick={this.handleEdit(rowData)}
              className={`egister_ egister_2`}
            >
              已审核
            </Button>
          );
        }
        if (recordstate === '6') {
          return (
            <Button
              //  disabled
              className={`egister_ egister_`}
              style={{ color: '#cdcdcd' }}
              size="small"
              onClick={this.handleEdit(rowData)}
            >
              已结案
            </Button>
          );
        }
        //待审核 recordstate===0
        return (
          <Button
            size="small"
            className={`egister_ egister_1`}
            onClick={this.handleCheck(rowData)}
          >
            待审核
          </Button>
        );
      },
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
      title: '操作',
      fixed: 'right',
      width: 168,
      align: 'center',
      render: (value: any, rowData: any, index: number) => {
        return (
          <>
            {!!rowData.recordstate && rowData.recordstate !== '0' ? (
              <Button
                type="link"
                size="small"
                onClick={this.handlePrenatal.bind(this, rowData)}
              >
                产检本
              </Button>
            ) : (
              <Tooltip
                title={
                  <div style={{ color: '#000' }}>
                    <ExclamationCircleOutlined style={{ color: `rgb(250,173,20)`, marginRight: '10px' }} />
                    <span>审核通过后可查看</span>
                  </div>
                }
                color={'#fff'}
              >
                <Button type="link" size="small" disabled={true}>
                  产检本
                </Button>
              </Tooltip>
            )}

            <Divider type="vertical" />
            {!!rowData.recordstate && rowData.recordstate !== '0' ? (
              <Button
                type="link"
                size="small"
                // icon={<EyeOutlined className="global-table-action-icon" />}
                onClick={this.handleView(rowData)}
              >
                查看
              </Button>
            ) : (
              <Popconfirm
                placement="topRight"
                getPopupContainer={(triggerNode) => triggerNode.parentNode.parentNode.parentNode}
                title={`建档信息尚未审核，是否继续接诊?`}
                onConfirm={this.handleView(rowData)}
                okText="确定"
                cancelText="取消"
              >
                <Button type="link" size="small" /* icon={<EyeOutlined className="global-table-action-icon" />} */>
                  查看
                </Button>
              </Popconfirm>
            )}

            <Divider type="vertical" />
            <Popconfirm
              placement="topRight"
              getPopupContainer={(triggerNode) => triggerNode.parentNode.parentNode.parentNode}
              title={`确定要删除这个${get(this.props, 'baseTitle')}吗?`}
              onConfirm={this.handleDelete(rowData)}
              okText="确定"
              cancelText="取消"
            >
              <Button type="link" size="small" icon={<DeleteOutlined className="global-table-action-icon" />}>
                删除
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  handlePrenatal(rowData: any) {
    this.setState({ visible: true, selectedRowData: rowData });
  }

  handleAdd = () => {
    // @ts-ignore
    const { history } = this.props;
    history.push('/prenatal-visit/pregnancy/add');
  };

  // 双击某一行跳转进查看页面
  handleDoubleClickRow = (record: any) => () => {
    // console.log(record);
    const { id, recordstate } = record;
    // @ts-ignore
    const { history } = this.props;
    if (recordstate === '1' || recordstate === '6') {
      history.push(`/prenatal-visit/pregnancy/nurse-end?id=${id}`);
    }
    if (recordstate === '0') {
      history.push(`/prenatal-visit/pregnancy/check?id=${id}`);
    }
  };

  handleCheck = (rowData: any) => () => {
    const { id } = rowData;
    // @ts-ignore
    const { history } = this.props;
    history.push(`/prenatal-visit/pregnancy/check?id=${id}`);
  };

  handleView = (rowData: any) => () => {
    const { id } = rowData;
    // @ts-ignore
    const { history } = this.props;
    history.push(`/prenatal-visit/pregnancy/doctor-end?id=${id}`);
  };

  handleEdit = (rowData: any) => () => {
    const { id } = rowData;
    // @ts-ignore
    const { history } = this.props;
    history.push(`/prenatal-visit/pregnancy/nurse-end?id=${id}`);
  };

  handleQuerySearch = async (data: object) => {
    let queryData = { ...this.staticDefaultQuery };
    map(data, (value: any, key: any) => {
      if (!isNil(value)) {
        if (key === 'recordstate.in') {
          if (value === '0') {
            queryData = { ...queryData, [`recordstate.in`]: '0,null' };
          } else {
            queryData = { ...queryData, [`recordstate.in`]: '1,6' };
          }
          return;
        }

        queryData = { ...queryData, [`${key}`]: value };
      }
    });
    await this.setState({ defaultQuery: queryData });
    this.handleSearch();
  };

  renderOthersModal = () => {
    const { visible, selectedRowData } = this.state;
    if (!visible) return;
    return (
      <PrenatalModal
        selectedRowData={selectedRowData}
        onClose={this.handleCancel}
        {...this.props}
        id={get(selectedRowData, `id`)}
      />
    );
  };
}
export default List;
