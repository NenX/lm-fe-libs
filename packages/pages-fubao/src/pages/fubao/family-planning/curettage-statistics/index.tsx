import { BaseListOld as BaseList } from '@lm_fe/components_m';
import { fubaoRequest as request } from '@lm_fe/utils';
import { message } from 'antd';
import { isArray, isNil } from 'lodash';
import Query from './components/Query';
import Table from './components/Table';
import { tableColumns } from './config/table';

class List extends BaseList {
  staticDefaultQuery = {
    page: 0,
    size: 20,
    sort: 'id,desc', // 基本列表都需要倒序
    'deleteFlag.equals': 0,
  };
  static defaultProps = {
    baseUrl: '/api/family/planning/getFamilyPlanningFile', request,
    baseTitle: '诊刮术统计',
    needPagination: true,
    showQuery: true,
    showAdd: false,
    showAction: false,
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
}

export default List
