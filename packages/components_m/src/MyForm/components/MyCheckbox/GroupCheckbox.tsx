import React, { Component } from 'react';
import { Checkbox } from 'antd';
import classnames from 'classnames';
// 普通的checkboxgroup 多个值现在保存在一个字段
const issuekey = ['nearRelation'];
interface GroupCheckboxProps {
  radio: boolean;
  disabled?: boolean;
  value: any;
  options: Array<{ label: string | number; value: string | number | boolean }>;
  editors: Array<any>;
  onChange: Function;
  issue: any;
}
export default class GroupCheckbox extends Component<GroupCheckboxProps> {
  handleChange = (val: any): void => {
    const { value, onChange, radio = true } = this.props;
    if (val.length !== 0) {
      if (radio) {
        // 单选
        if (value.length !== 0) {
          onChange(val.filter((v) => v !== value[0]));
        } else {
          onChange(val[0]);
        }
      } else {
        onChange(val);
      }
    } else {
      onChange(val);
    }
  };
  showIssue() {
    const { issue, value } = this.props;
    let bool = false;
    if (issue) {
      if (value[0] == issue[0]) bool = true;
    }
    return bool;
  }

  render() {
    const { value } = this.props;
    return (
      <div className={classnames({ 'group-issue-checkbox': this.showIssue() })}>
        <Checkbox.Group disabled={this.props.disabled} options={this.props.options || []} onChange={this.handleChange} value={value} />
      </div>
    );
  }
}
