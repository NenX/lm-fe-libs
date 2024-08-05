import React, { Component, ReactNode } from 'react';
import { Tabs } from 'antd';
import MyCustom from './index';

// 以tabs的形式展示的数组对象表单
interface ArrayCustomTabProps {
  onChange: Function;
  dispatch: Function;
  value: Array<any>;
  input_props: any;
  error: any;
}
interface ArrayCustomTabState {
  value: Array<any>;
  error: Array<any>;
}
export default class ArrayCustomTab extends Component<ArrayCustomTabProps, ArrayCustomTabState> {
  constructor(props: ArrayCustomTabProps) {
    super(props);
    this.state = {
      value: [],
      error: [],
    };
  }

  componentDidMount() {
    this.mapPropsToState();
  }

  mapPropsToState = (): void => {
    const { value, error } = this.props;
    this.setState({ value, error });
  };

  handleChange = (val: any, index: number): void => {
    const { value = [], onChange } = this.props;
    const newValue = JSON.parse(JSON.stringify(value));
    newValue[index] = val;
    onChange(newValue);
  };

  handleEdit = (targetKey: any, action: any): void => {
    if (action === 'add') {
      const { value, onChange } = this.props;
      value.push({});
      onChange(value);
    } else if (action === 'remove') {
      const { value, onChange } = this.props;
      value.splice(targetKey, 1);
      onChange(value);
    }
    // console.log(targetKey);
    // console.log(action);
  };

  renderArrayCustomTabForm = (): ReactNode => {
    const { dispatch, error = [], input_props = {} } = this.props;
    let { value } = this.props;
    const { config = [], array_title = '' } = input_props;
    if (!value || value.length === 0 || value === null) {
      // 初始化一个值
      value = [];
      value.push({});
    }
    if (config.length === 0 || !config) {
      return <span>arrayCustom配置为空或非法</span>;
    }
    return (
      <Tabs type="editable-card" onEdit={this.handleEdit}>
        {value.map((val: any, index: number) => (
          <Tabs.TabPane tab={`${array_title}${index + 1}`} key={index}>
            <MyCustom
              onChange={(singleValue: any) => this.handleChange(singleValue, index)}
              dispatch={dispatch}
              input_props={input_props}
              error={null}
              value={val}
              getValidFun={() => {}}
              subscribe={() => {}}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>
    );
  };

  render() {
    return <div>{this.renderArrayCustomTabForm()}</div>;
  }
}
