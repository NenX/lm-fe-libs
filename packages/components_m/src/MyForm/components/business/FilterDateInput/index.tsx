import React from 'react';
import { Input, message } from 'antd';
interface MyInputProps {
  onChange: Function;
  dispatch?: Function;
  value: any;
  input_props: any;
  editing: any;
  disabled?: boolean
}
export default class MyInput extends React.Component<MyInputProps> {
  handleChange = (e: any) => this.props.onChange(e.target.value);

  handleBlur = (e: any) => {
    const nowYear = new Date().getFullYear();
    const numCentury = Number(nowYear.toString().substring(0, 2));
    const numYear = Number(nowYear.toString().substring(2));
    const initValue = e.target.value;
    const iptValue = initValue.replace(/[^0-9]+/g, '');

    const getCentury = (v: any) => {
      const century = Number(v) > numYear ? numCentury - 1 : numCentury;
      return century;
    };

    let finalDate = '',
      finalYear = '',
      finalMonth = '';

    if (!initValue) return;
    if (initValue.indexOf('-') !== -1 || initValue.indexOf('~') !== -1) {
      if (iptValue.length === 4 || iptValue.length === 8) {
        finalDate = initValue.replace(/\-/g, '~');
      } else {
        finalDate = initValue;
      }
      // message.error('输入日期为非规范的年月格式！', 5);
    } else if (iptValue.length === 2) {
      finalDate = getCentury(iptValue) + iptValue;
    } else if (iptValue.length === 3) {
      finalYear = iptValue.substring(0, 2);
      finalMonth = iptValue.substring(2);

      finalYear = getCentury(finalYear) + finalYear;
      finalMonth = Number(finalMonth) > 10 ? finalMonth : '0' + finalMonth;
      finalDate = finalYear + '-' + finalMonth;
    } else if (iptValue.length === 4 && (initValue.length === 4 || initValue[initValue.length - 1] === '年')) {
      finalDate = iptValue;
    } else if (iptValue.length === 4 && initValue.length !== 4) {
      finalYear = iptValue.substring(0, 2);
      finalMonth = iptValue.substring(2);

      finalYear = getCentury(finalYear) + finalYear;
      finalDate = finalYear + '-' + finalMonth;
    } else if (iptValue.length === 5) {
      finalYear = iptValue.substring(0, 4);
      finalMonth = iptValue.substring(4);

      finalYear = finalYear;
      finalMonth = Number(finalMonth) > 10 ? finalMonth : '0' + finalMonth;
      finalDate = finalYear + '-' + finalMonth;
    } else if (iptValue.length === 6) {
      finalYear = iptValue.substring(0, 4);
      finalMonth = iptValue.substring(4);
      finalDate = finalYear + '-' + finalMonth;
    } else {
      finalDate = initValue;
      message.error('输入格式错误！', 5);
      return;
    }

    if (
      (!!finalYear && Number(finalYear) < 1900) ||
      Number(finalYear) > nowYear ||
      (!!finalMonth && Number(finalMonth) < 1) ||
      Number(finalMonth) > 12
    ) {
      message.error(`输入格式为${finalDate}, 输入日期错误！`, 5);
      return;
    }

    this.props.onChange(finalDate);
  };

  render() {
    const { editing, value } = this.props;

    return <Input disabled={this.props.disabled} autoFocus={editing} value={value} onChange={this.handleChange} onBlur={this.handleBlur} />;
  }
}
