import React, { Component, ReactNode } from 'react';
import { map, get } from 'lodash';
import CheckboxWithExtra from '../Base/CheckboxWithExtra';
import './index.less';

/**
 * 这个类型本来就是互斥的
 * 外部数据格式应为
 * {
 *  key: enum|boolean
 *  keyNote: any
 * }
 *
 */
interface CustomCheckboxProps {
  disabled?: boolean;
  radio?: boolean;
  value: {
    checkboxValue: any;
    editorsValue: any;
    key: string;
  };
  options: Array<{ label: string | number; value: string | number | boolean }>;
  editors: Array<any>;
  onChange: Function;
}
export default class CustomCheckbox extends Component<CustomCheckboxProps> {
  handleChange = (val: any, key: string | number | boolean) => {
    const { onChange } = this.props;
    // 反选问题
    if (!val.checkboxValue) {
      onChange(
        {
          checkboxValue: null,
          editorsValue: ' ',
        },
        this.props.value.key,
      );
    } else {
      onChange(
        {
          checkboxValue: key,
          editorsValue: val.editorsValue,
        },
        this.props.value.key,
      );
    }
  };

  render() {
    const { value, options = [], editors = [], disabled } = this.props;

    return (
      <div className="custom-checkbox">
        {map(options, (option, key) => {
          const editorIndex = editors.findIndex((editor: any) => editor.key === option.value);
          return (
            <CheckboxWithExtra
              disabled={disabled}
              key={key}
              onChange={(val: any) => this.handleChange(val, option.value)}
              checkboxValue={value.checkboxValue === option.value}
              editorsValue={value.editorsValue}
              editors={editorIndex !== -1 ? editors[editorIndex].editors : []}
            >
              {option.label}
            </CheckboxWithExtra>
          );
        })}
      </div>
    );
  }
}
