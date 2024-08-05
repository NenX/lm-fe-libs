import { mchcEnv } from '@lm_fe/env';
import { getTableColumn_default } from './default';
import { getTableColumn_gysy } from './gysy';
export const getTableColumn = mchcEnv.is('广三') ? getTableColumn_gysy : getTableColumn_default