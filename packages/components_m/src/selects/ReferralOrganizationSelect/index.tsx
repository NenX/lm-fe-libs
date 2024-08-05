import React, { Component } from 'react';
import { Select } from 'antd';
import { get, isObject, map } from 'lodash';
import { getAllResources } from '../../utils/defaultMethod';
export default class ReferralOrganizationSelect extends Component {
  state = {
    data: undefined,
    options: [],
  };

  componentDidMount() {
    const { value } = this.props;
    this.setState({
      data: isObject(value) ? value : { id: value },
    });
  }

  handleGetOptions = async () => {
    const options = await getAllResources(`/api/referral-organizations`);
    this.setState({
      options,
    });
  };

  handleChange = async (data: any) => {
    const { onChange } = this.props;
    this.setState({
      data,
    });
    onChange && onChange(data);
  };

  render() {
    const { data, options } = this.state;
    return (
      <Select
        onFocus={this.handleGetOptions}
        onChange={this.handleChange}
        value={get(data, 'name') || data}
        showSearch
        allowClear
      >
        {map(options, (option, index) => {
          return (
            <Select.Option key={get(option, 'id') || index} value={get(option, 'name')}>
              {get(option, 'name') || '--'}
            </Select.Option>
          );
        })}
      </Select>
    );
  }
}
