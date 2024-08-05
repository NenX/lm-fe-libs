import { map, get, isNil, set, dropRight, join } from 'lodash';
import moment from 'moment';
import { formatDateTime } from "@lm_fe/utils";
import { safe_json_parse as strToJson, safe_json_stringify as jsonToStr } from '@lm_fe/utils'

//数据转换
export const valueToApi = (values: any, nativeFormDescriptions: any) => {
  let result = {};
  map(nativeFormDescriptions, (item, key) => {
    const { inputType } = item;
    const itemVaule = get(values, key);

    switch (inputType) {
      case 'radio_input':
        const k = key.split('.').pop();
        set(result, key, get(itemVaule, `${k}`));
        set(result, `${key}Note`, get(itemVaule, `${k}Note`));
        break;
      case 'checkbox_with_single_input':
        set(result, key, get(itemVaule, 'key'));
        set(result, `${key}Note`, get(itemVaule, 'keyNote'));
        break;
      case 'single_date_picker':
        set(result, key, formatDateTime(itemVaule))
        break;
      case 'checkbox_with_input':
        const valueJson = strToJson(itemVaule);
        set(result, key, get(valueJson, 'checkedValues.0'));
        set(
          result,
          `${key}Note`,
          get(valueJson, ['withInputValues', `${get(valueJson, 'checkedValues.0')}`, 'value', '0']),
        );
        break;
      case 'pressure':
        let pressure_arr = key.split('.');
        let pressure_key;
        //如果存在多个父级对象，取上一级对象再赋值
        if (pressure_arr.length > 1) {
          pressure_arr = dropRight(pressure_arr, 1);
          pressure_key = join(pressure_arr, '.');
          set(result, `${pressure_key}.systolic`, get(itemVaule, 'systolic'));
          set(result, `${pressure_key}.diastolic`, get(itemVaule, 'diastolic'));
        } else {
          set(result, 'systolic', get(itemVaule, 'systolic'));
          set(result, 'diastolic', get(itemVaule, 'diastolic'));
        }
        break;
      default:
        set(result, key, itemVaule);
        break;
    }
  });
  return result;
};
export const valueToForm = (values: any, nativeFormDescriptions: any) => {
  map(nativeFormDescriptions, (item, key) => {
    const { inputType } = item;
    const itemVaule = get(values, key);

    switch (inputType) {
      case 'checkbox_with_single_input':
        if (!isNil(itemVaule)) {
          set(values, `${key}.key`, itemVaule);
          set(values, `${key}.keyNote`, get(values, `${key}Note`));
        }
        break;
      case 'checkbox_with_input':
        if (!isNil(itemVaule)) {
          const checkBoxValue = {
            checkedValues: [itemVaule],
            withInputValues: {
              [itemVaule]: { key: itemVaule, value: { '0': get(values, `${key}Note`) } },
            },
          };
          set(values, key, jsonToStr(checkBoxValue));
        }
        break;
      case 'pressure':
        if (!isNil(itemVaule)) {
          let pressure_arr = key.split('.');
          let pressure_key;
          //如果存在多个父级对象，取上一级对象再赋值
          if (pressure_arr.length > 1) {
            pressure_arr = dropRight(pressure_arr, 1);
            pressure_key = join(pressure_arr, '.');
            set(values, `${key}.systolic`, itemVaule);
            set(values, `${key}.diastolic`, get(values, `${pressure_key}.diastolic`));
          } else {
            set(values, `${key}.systolic`, itemVaule);
            set(values, `${key}.diastolic`, get(values, `diastolic`));
          }
        }
        break;
      default:
        if (!isNil(itemVaule)) {
          set(values, key, itemVaule);
        }
        break;
    }
  });

  return values;
};
