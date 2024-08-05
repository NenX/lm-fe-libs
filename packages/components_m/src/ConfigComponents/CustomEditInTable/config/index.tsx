import { neonateEnter } from './neonateEnter';
// import { tableColumns as tocolysisNursing } from './tocolysisNursing';
/**
 * 定义表单tableColumns
 */
const m = {
  // tocolysisNursing,
  neonateEnter
};
export function getTableColumns(type: string | any[]) {
  return Array.isArray(type) ? type : (m[type] ?? [])
}