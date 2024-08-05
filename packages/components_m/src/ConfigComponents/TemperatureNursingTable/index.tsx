import { GeneralComponents_EditInTable_Inner } from '../../GeneralComponents/EditInTable';
import React from 'react';
import { tableColumns } from './table';
export default function CustomEditInTable(props: any) {
  const { config, value, onChange, ...rest } = props;



  return <GeneralComponents_EditInTable_Inner tableColumns={tableColumns} {...rest} onChange={onChange} value={value} />;
}
