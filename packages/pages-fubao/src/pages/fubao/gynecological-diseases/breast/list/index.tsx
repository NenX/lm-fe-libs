import React from 'react';
import Table from './components/Table';
import Query from './components/Query';
import { tableColumns } from './config/table';
import { BaseListOld as BaseList } from '@lm_fe/components_m';
import { processFromApi } from './config/adpater';
import { get, map, isNil, isEmpty } from 'lodash';
import { fubaoHistoryPush } from '@lm_fe/components_m';
import { fubaoRequest as request } from '@lm_fe/utils'
export default class List extends BaseList {
  staticDefaultQuery = {
    page: 0,
    size: 20,
  };

  static defaultProps = {
    baseUrl: '/api/breast-cancers', request,
    baseTitle: '乳腺癌筛查情况',
    needPagination: false,
    showQuery: true,
    showAdd: true,
    showAction: true,
    processFromApi,
    tableColumns,
    rowKey: 'id',
    Table,
    Query,
  };

  handleEdit = (rowData: any) => () => {
    const id = get(rowData, 'id');
    const { history } = this.props;
    fubaoHistoryPush(`/gynecological-diseases/breast-cancer-screen/edit?id=${id}`, this.props as any);
  };

  handleAdd = () => {
    const { history } = this.props;
    fubaoHistoryPush('/gynecological-diseases/breast-cancer-screen/add', this.props as any);
  };

  handleQuerySearch = async (data: any) => {
    let queryData = { ...this.staticDefaultQuery };
    if (get(data, 'outpatientNO')) {
      queryData = {
        ...queryData,
        'gynecologicalPatientCriteria.outpatientNO.contains': get(data, 'outpatientNO'),
      };
    }
    if (get(data, 'name')) {
      queryData = {
        ...queryData,
        'gynecologicalPatientCriteria.name.contains': get(data, 'name'),
      };
    }
    if (get(data, 'idNO')) {
      queryData = {
        ...queryData,
        'gynecologicalPatientCriteria.idNO.contains': get(data, 'idNO'),
      };
    }
    await this.setState({ defaultQuery: queryData });
    this.handleSearch();
  };
}
