import { GeneralComponents_EditInTable_Inner } from '../../GeneralComponents/EditInTable';
import { tableColumns } from './table';
import React from 'react';
export default function CustomEditInTable(props: any) {
  const { config, value, onChange, ...rest } = props;



  return <GeneralComponents_EditInTable_Inner tableColumns={tableColumns} {...rest} onChange={onChange} value={value} />;
}
