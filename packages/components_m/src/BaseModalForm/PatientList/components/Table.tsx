import React from 'react';
import {BaseTable} from '../../../BaseTable';
import { Table } from 'antd';
import { get } from 'lodash';
export default class ProductsTable extends BaseTable {
  renderTitle = () => {
    return <></>;
  };

  render() {
    const { columns, ...rest } = this.props;
    const mergedColumns = this.mergedColumns(columns);

    return (
      <Table
        size="small"
        style={{
          marginTop: 20,
          paddingBottom: 10,
          height: '100%',
          overflowY: 'scroll',
        }}
        {...rest}
        scroll={{ x: get(rest, 'scroll.x') || '100vw' }}
        columns={mergedColumns}
        title={this.renderTitle}
        className="global-base-table"
      />
    );
  }
}
