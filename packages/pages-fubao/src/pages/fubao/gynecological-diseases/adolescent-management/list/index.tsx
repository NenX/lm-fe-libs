import React from 'react';
import Table from './components/Table';
import Query from './components/Query';
import { tableColumns } from './config/table';
import { BaseListOld as BaseList } from '@lm_fe/components_m';
import { get, isFunction, map, set, isNil, pick, isArray, join } from 'lodash';
import { Button, Divider, message, Popconfirm } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { getDataSource } from '@lm_fe/components_m';
const dataSourceDemo = [
  {
    id: 13,
    outpatientNO: '111',
    checkupNO: '111',
    insuranceType: '宫颈癌筛查',
    name: '测试',
    age: 11,
    gender: null,
    dob: '2020-03-17',
    jcrq: '2020-03-10',
    idType: 1,
    idNO: '1',
    nationality: 'HPV检查',
    nativeplace: '--',
    ethnic: '--',
    telephone: '1287582345',
    maritalStatus: 1,
    nearRelation: false,
    maritalYears: 1,
    education: '否',
    occupation: '1',
    workplace: '北京市,市辖区,东城区&',
    workPhone: '11',
    occupationDetail: null,
    familyIncome: '11',
    residenceAddress: '北京市,市辖区,东城区&',
    permanentResidenceAddress: '北京市,市辖区,东城区&',
    community: '11',
    createDate: '2021-05-13',
    modifyDate: null,
    validateDate: null,
    note: '活检',
    recordsrc: null,
    recordstate: null,
    husband: null,
    familyHistory: null,
    procedureHistory: null,
    diseaseHistory: null,
    allergyHistory: null,
    maritalHistory: null,
    premaritalVisit: null,
  },
  {
    id: 12,
    outpatientNO: '2235211',
    checkupNO: '253254263',
    insuranceType: '乳腺癌筛查',
    name: 'kimo',
    age: 22,
    gender: null,
    dob: '2020-03-16',
    jcrq: '2020-03-09',
    idType: 1,
    idNO: '441624199710222327',
    nationality: '乳腺B超',
    nativeplace: '短信',
    ethnic: '--',
    telephone: '13163712279',
    maritalStatus: 2,
    nearRelation: false,
    maritalYears: 1,
    education: '否',
    occupation: '搬砖',
    workplace: '北京市,市辖区,东城区&新社区',
    workPhone: '36256953',
    occupationDetail: null,
    familyIncome: '1000',
    residenceAddress: '北京市,市辖区,石景山区&1111',
    permanentResidenceAddress: '天津市,市辖区,河东区&新社区',
    community: '新社区',
    createDate: '2021-05-07',
    modifyDate: null,
    validateDate: null,
    note: '短期随访(6个月后复查乳腺X线)',
    recordsrc: null,
    recordstate: null,
    husband: null,
    familyHistory: null,
    procedureHistory: null,
    diseaseHistory: null,
    allergyHistory: null,
    maritalHistory: null,
    premaritalVisit: null,
  },
  {
    id: 11,
    outpatientNO: '2235211',
    checkupNO: '253254263',
    insuranceType: '宫颈癌筛查',
    name: 'kimo',
    age: 22,
    gender: null,
    dob: '2020-03-15',
    jcrq: '2020-03-08',
    idType: 1,
    idNO: '441624199710222327',
    nationality: '宫颈癌细胞学检查',
    nativeplace: '电话',
    ethnic: '关机',
    telephone: '13163712279',
    maritalStatus: 3,
    nearRelation: false,
    maritalYears: 1,
    education: '是',
    occupation: '搬砖',
    workplace: '北京市,市辖区,东城区&新社区',
    workPhone: '36256953',
    occupationDetail: null,
    familyIncome: '1000',
    residenceAddress: '北京市,市辖区,石景山区&1111',
    permanentResidenceAddress: '天津市,市辖区,河东区&新社区',
    community: '新社区',
    createDate: '2021-05-07',
    modifyDate: null,
    validateDate: null,
    note: '活检',
    recordsrc: null,
    recordstate: null,
    husband: null,
    familyHistory: null,
    procedureHistory: null,
    diseaseHistory: null,
    allergyHistory: null,
    maritalHistory: null,
    premaritalVisit: null,
  },
  {
    id: 10,
    outpatientNO: '2235211',
    checkupNO: '253254263',
    insuranceType: '宫颈癌筛查',
    name: 'kimo',
    age: 22,
    gender: null,
    dob: '2020-03-14',
    jcrq: '2020-03-07',
    idType: 1,
    idNO: '441624199710222327',
    nationality: '宫颈癌细胞学检查',
    nativeplace: '短信',
    ethnic: '--',
    telephone: '13163712279',
    maritalStatus: 2,
    nearRelation: false,
    maritalYears: 1,
    education: '否',
    occupation: '搬砖',
    workplace: '北京市,市辖区,东城区&新社区',
    workPhone: '36256953',
    occupationDetail: null,
    familyIncome: '1000',
    residenceAddress: '北京市,市辖区,石景山区&1111',
    permanentResidenceAddress: '天津市,市辖区,河东区&新社区',
    community: '新社区',
    createDate: '2021-05-07',
    modifyDate: null,
    validateDate: null,
    note: '活检',
    recordsrc: null,
    recordstate: null,
    husband: null,
    familyHistory: null,
    procedureHistory: null,
    diseaseHistory: null,
    allergyHistory: null,
    maritalHistory: null,
    premaritalVisit: null,
  },
  {
    id: 9,
    outpatientNO: '123',
    checkupNO: '123',
    insuranceType: '乳腺癌筛查',
    name: '陈美美333',
    age: 34,
    gender: null,
    dob: '2020-03-13',
    jcrq: '2020-03-06',
    idType: 1,
    idNO: '10101199003078822',
    nationality: '乳腺B超',
    nativeplace: '--',
    ethnic: '--',
    telephone: '15219526456',
    maritalStatus: 1,
    nearRelation: false,
    maritalYears: 23,
    education: '否',
    occupation: '老师',
    workplace: '北京市,市辖区,东城区&',
    workPhone: '1234567',
    occupationDetail: null,
    familyIncome: '230000',
    residenceAddress: '天津市,市辖区,和平区&',
    permanentResidenceAddress: '天津市,市辖区,和平区&',
    community: '石牌',
    createDate: '2021-03-11',
    modifyDate: null,
    validateDate: null,
    note: '活检',
    recordsrc: null,
    recordstate: null,
    husband: null,
    familyHistory: null,
    procedureHistory: null,
    diseaseHistory: null,
    allergyHistory: null,
    maritalHistory: null,
    premaritalVisit: null,
  },
];
export default class List extends BaseList {
  static defaultProps = {
    baseUrl: '/api/wives', request,
    baseTitle: '',
    needPagination: true,
    showQuery: false,
    showAdd: false,
    tableColumns,
    rowKey: 'id',
    Table,
    Query,
    otherTableProps: {
      scroll: { x: 1298 },
    },
  };

  columns = [
    ...(this.props.tableColumns as Array<any>),
    {
      title: '操作',
      showSorter: false,
      showFilter: false,
      fixed: 'right',
      width: 150,
      align: 'center',
      render: (value: any, rowData: any, index: number) => {
        return (
          <>
            <Button
              type="link"
              size="small"
              icon={<EyeOutlined className="global-table-action-icon global-table-action-edit" />}
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
              <Button type="link" size="small">
                <DeleteOutlined className="global-table-action-icon" />
                删除
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  handleSearch = async () => {
    const { editKey, defaultQuery } = this.state;
    const { baseUrl, processFromApi } = this.props;
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
    const { data, count } = await getDataSource(baseUrl, query, processFromApi);
    if (data && isArray(data)) {
      dataSource = data;
    }
    if (count) {
      total = Number(count);
    }
    this.setState({ dataSource: dataSourceDemo, total, loading: false });
  };

  handleView = (rowData: any) => () => {
    const { id } = rowData;
    const { history } = this.props;
    //history.push(`/gynecological-diseases/two-cancers/exam?id=${id}`);
  };
}
