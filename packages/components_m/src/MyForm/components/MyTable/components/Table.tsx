import React from 'react';
import { BaseTable } from '../../../../BaseTable';
import { Table } from 'antd';
export default function FormTable(props: any) {

  const { columns, ...rest } = props;


  return <BaseTable size="small" bordered className="my-table" {...rest} columns={columns} />;

}
