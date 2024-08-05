import { mchcEnv } from '@lm_fe/env';
import { tableColumns_default } from './default';
import { tableColumns_gysy } from './gysy';
export const tableColumns = mchcEnv.is('广三') ? tableColumns_gysy : tableColumns_default