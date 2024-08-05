import React, { Component, ReactNode } from 'react';
import { isUndefined, isNull } from 'lodash';
import CheckboxWithExtra from '../Base/CheckboxWithExtra';
import './index.less';
import { IExtraEditors } from './type';

/**
 * 外部数据格式应为
 * {
 *  a: boolean,
 *  aNote: any,
 *  b: boolean,
 *  bNote: any
 * }
 */
interface MultipleCheckboxProps {
  // extraEditors: Array<any>,
  radio?: boolean;
  value: Array<{
    checkboxValue: any;
    editorsValue: any;
    key: string;
    label: string;
  }>;
  editors: IExtraEditors[];
  onChange: Function;
  disabled?: boolean
}
const NONE = 'none';
export default class MultipleCheckbox extends Component<MultipleCheckboxProps> {
  handleChange = (val: any, key: string) => {
    const { radio = true, value, onChange } = this.props;
    if (radio) {
      // 单选 循环 将选中值置true，非选中值置为false
      // 选中【无】时会把其他都置为false
      value.forEach((item: any) => {
        if (item.key === key) {
          onChange(
            {
              checkboxValue: val.checkboxValue,
              editorsValue: val.editorsValue,
            },
            item.key,
          );
        } else {
          onChange(
            {
              checkboxValue: false,
              editorsValue: ' ',
            },
            item.key,
          );
        }
      });
    } else {
      if (key === NONE) {
        value.forEach((item: any) => {
          onChange(
            {
              checkboxValue: false,
              editorsValue: '',
            },
            item.key,
          );
        });
      } else {
        onChange(val, key);
      }
    }
  };

  // 判断是否选中无的选项
  isSelectNone = (
    value: Array<{
      checkboxValue: any;
      editorsValue: any;
      key: string;
      label: string;
    }>,
  ) => {
    let flag = true;
    let count = 0;
    for (let i = 0; i < value.length; i++) {
      if (isUndefined(value[i].checkboxValue) || isNull(value[i].checkboxValue)) count++;
      // 有其中一个选中了
      if (value[i].checkboxValue) {
        flag = false;
        break;
      }
    }
    if (count === value.length) flag = undefined;
    return flag;
  };

  // 这这里加入一个无的选项，当选中此选项时，对象下所有都设为空
  renderCheckbox = () => {
    const { value, editors = [], disabled } = this.props;
    const renderDOM: Array<ReactNode> = [];
    // 加入 无 选项
    renderDOM.push(
      <CheckboxWithExtra
        disabled={disabled}
        key={NONE}
        onChange={(val: any) => this.handleChange(val, NONE)}
        checkboxValue={this.isSelectNone(value)}
        editorsValue={[]}
        editors={[]}
      >
        无
      </CheckboxWithExtra>,
    );
    for (let i = 0; i < value.length; i++) {
      const index = editors.findIndex((editor: any) => editor.key === value[i].key);
      renderDOM.push(
        <CheckboxWithExtra
          disabled={disabled}
          key={i}
          onChange={(val: any) => this.handleChange(val, value[i].key)}
          checkboxValue={value[i].checkboxValue}
          editorsValue={value[i].editorsValue}
          editors={index !== -1 ? editors[index].editors : []}
        >
          {value[i].label}
        </CheckboxWithExtra>,
      );
    }
    return renderDOM;
  };

  render() {
    return <div className="multiple-checkbox">{this.renderCheckbox()}</div>;
  }
}
