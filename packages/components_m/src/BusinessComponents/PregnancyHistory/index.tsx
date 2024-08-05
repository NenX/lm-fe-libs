import React from 'react';
import { get } from 'lodash';
import PregnancyHistoryForm from './index-form';
import PregnancyHistoryTable from './index-table';
import { safe_json_parse } from '@lm_fe/utils';
export default (props: any) => {
  const specialConfig = get(props, 'config.specialConfig') ?? safe_json_parse(get(props, 'config.special_config'))

  return get(specialConfig, 'type') === 'table' ? (
    <PregnancyHistoryTable {...props} />
  ) : (
    <PregnancyHistoryForm {...props} />
  );
};
