import { MyBaseList } from '@lm_fe/components_m';
import React from 'react';
import { baseTableConfig, useTableConfig } from './config/useTableConfig';
import './index.less';
import List from './index_copy';
function newList(props: any) {
  const [config] = useTableConfig(props)
  return <MyBaseList
    {...config}
  />
}
export { List };
export default newList;
