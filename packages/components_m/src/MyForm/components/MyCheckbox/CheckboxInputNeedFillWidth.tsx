import React, { Component, ReactNode } from 'react';
import { map, get } from 'lodash';
import CheckboxWithExtra from '../Base/CheckboxWithExtra';
import './index.less';
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

// http://ccs.lian-med.com/zentaopms/www/story-view-777.html
// 解决 checkbox 为 有 的时候 width 对齐
export default class CheckboxInputNeedFillWidth extends Component<CustomCheckboxProps> {
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
      <div className="checkbox-input-need-fill-width">
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
