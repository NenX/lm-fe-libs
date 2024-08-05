/**
 * 籍贯组件
 */
import provinceCityOptions from './config';
import { Cascader } from 'antd';
import { isArray } from 'lodash';
// type valueType = number | string;
interface Iprops {
  value: string;
  onChange: Function;
  [key: string]: any;
}
const SymbolicLink = '&';
export default function NativePlace({ value, onChange }: Iprops) {
  function handleChange(value: any, selectedOptions: any) {
    let newValue = '';
    if (isArray(value)) {
      newValue = value.join(SymbolicLink);
    }
    onChange(newValue);
  }
  function transformValue(value?: string) {
    if (value && typeof value == 'string') {
      return value.split(SymbolicLink);
    } else {
      return [];
    }
  }

  return <Cascader value={transformValue(value)} options={provinceCityOptions} onChange={handleChange} />;
}
