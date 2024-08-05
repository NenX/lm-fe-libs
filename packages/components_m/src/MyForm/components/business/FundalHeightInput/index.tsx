import React, { Component } from 'react';
import { AutoComplete } from 'antd';
export default class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onChange, value } = this.props;
    const options = [
      { label: '耻联上指', value: '耻联上指' },
      { label: '脐下指', value: '脐下指' },
    ];

    const handleChange = (v: any) => {
      onChange(v);
    };

    return (
      <AutoComplete
        id="aa"
        style={{ width: '100%' }}
        value={value}
        options={options}
        filterOption={(inputValue, option) => option.value.indexOf(inputValue) !== -1}
        onChange={handleChange}
      ></AutoComplete>
    );
  }
}
