import { GeneralComponents_EditInTable_Inner } from '../../GeneralComponents/EditInTable';
import { tableColumns1 } from './table';
import React from 'react';
export default function CustomEditInTable(props: any) {
  const { config, value, onChange, fetalCount, ...rest } = props;


  return <GeneralComponents_EditInTable_Inner tableColumns={tableColumns1} {...rest} onChange={onChange} value={value} />;
}
