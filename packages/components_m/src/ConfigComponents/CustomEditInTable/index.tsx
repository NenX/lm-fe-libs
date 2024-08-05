import { safe_json_parse } from '@lm_fe/utils';
import { get } from 'lodash';
import { GeneralComponents_EditInTable_Inner } from '../../GeneralComponents/EditInTable';
import { getTableColumns } from './config'
import React from 'react';
export default function CustomEditInTable(props: any) {
  const { config, value, onChange, type, ...rest } = props;
  // const [TableComponent, setTableComponent] = useState();

  // useEffect(() => {
  //   const specialConfig = safe_json_parse(get(config, 'specialConfig'));
  //   const tableColumns = get(specialConfig, 'tableColumns');
  //   const TableComponent = HOC({ tableColumns });
  //   setTableComponent(TableComponent);
  // }, []);
  const specialConfig = safe_json_parse(get(config, 'specialConfig'));
  const tableColumns = type ?? get(specialConfig, 'tableColumns');
  return <GeneralComponents_EditInTable_Inner tableColumns={getTableColumns(tableColumns)} {...rest} onChange={onChange} value={value} />;
}
