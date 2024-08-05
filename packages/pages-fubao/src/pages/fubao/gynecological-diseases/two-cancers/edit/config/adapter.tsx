import { formatDate, safe_json_stringify as jsonToStr, safe_json_parse as strToJson } from '@lm_fe/utils';
import { get, map, set } from 'lodash';
//数据转换
export const valueToApi = (values: any) => {
  map(values, (data, key) => {
    if ((key === 'dob' || key === 'registerDate') && data) {
      set(values, key, formatDate(data));
    }
    if (key === 'womenHealthcareMenstrualHistory') {
      map(data, (item, index) => {
        if (index === 'lmd' && item) {
          set(data, index, formatDate(item));
        }
        if (index === 'dysmenorrhea' || index === 'menopause') {
          const valueJson = strToJson(item);
          set(data, `${index}`, get(valueJson, 'checkedValues.0'));
          set(
            data,
            `${index}Note`,
            get(valueJson, ['withInputValues', `${get(valueJson, 'checkedValues.0')}`, 'value', '0']),
          );
        }
      });
    }
  });
  return values;
};
export const valueToForm = (values: any) => {
  const { womenHealthcareMenstrualHistory } = values;

  //月经史
  if (womenHealthcareMenstrualHistory) {
    map(womenHealthcareMenstrualHistory, (data, key) => {
      if (key === 'dysmenorrhea' || key === 'menopause') {
        const checkBoxValue = {
          checkedValues: [data],
          withInputValues: {
            [data]: { key: data, value: { '0': get(womenHealthcareMenstrualHistory, `${key}Note`) } },
          },
        };
        set(womenHealthcareMenstrualHistory, key, jsonToStr(checkBoxValue));
      }
    });
  }
  return values;
};
