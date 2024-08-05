import React, { Component } from 'react';
import { Input } from 'antd';
import './index.module.less';
// import templateIcon from '@/assets/imgs/template-icon.png';
interface ITextareaWithTemplateProp {
  onChange: Function;
  value: any;
  input_props: any;
  onClick: Function;
  disabled?: boolean
}
export default class TextareaWithTemplate extends Component<ITextareaWithTemplateProp, {}> {
  handleClickBtn = () => {
    const { onClick } = this.props;
    onClick();
  };

  handleTextareaChange = (e: any) => {
    const { onChange } = this.props;
    onChange(e.target.value);
  };

  render() {
    const { value, input_props = {}, disabled } = this.props;
    const { minRows = 2, maxRows = 5 } = input_props;

    return (
      <div className="template-wrapper">
        <Input.TextArea
          className="template-texarea"
          value={value}
          autoSize={{ minRows, maxRows }}
          onChange={this.handleTextareaChange}
          disabled={disabled}
        />
        <div className="template-action" onClick={this.handleClickBtn}>
          {/* <img src={templateIcon} style={{ width: '12px', height: '12px' }} /> */}
        </div>
      </div>
    );
  }
}
