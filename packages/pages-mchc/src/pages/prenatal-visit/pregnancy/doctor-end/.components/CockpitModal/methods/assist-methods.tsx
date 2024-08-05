import { formatTimeToDate, fun_date } from '@lm_fe/components_m';
import { selectTyle } from '../components/time-header/time-header';
/**返回时间查询数组 */
export function getDateArray(type: selectTyle, datastr?: string) {
  var date = datastr ? new Date(datastr) : new Date();
  const Arr = [formatTimeToDate(date)];
  if (type == selectTyle.date) {
    Arr.unshift(formatTimeToDate(date));
  } else if (type == selectTyle.week) {
    const week = date.getDay();
    const num = week == 0 ? -6 : -week + 1;
    Arr.unshift(fun_date(num, true, date));
  } else if (type == selectTyle.month) {
    const month_date = date.getDate();
    Arr.unshift(fun_date(-month_date + 1, true, date));
  }
  return Arr;
}
