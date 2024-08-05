import { AutoComplete, Input } from 'antd';
import { Component } from 'react';
export default class ReferralOrganizationSelect extends Component {
  state = {
    data: undefined,
    options: [],
  };

  componentDidMount() {
    const { value } = this.props as any;
    this.handleGetOptions();
    this.setState({
      data: value,
    });
    console.log(value);
  }

  handleGetOptions = async () => {
    // const options = await getAllResources(`/api/getNurseOrDoctorName/12`);
    const options = [];
    this.setState({
      options,
    });
  };

  handleChange = async (data: any) => {
    const { onChange } = this.props as any;
    this.setState({
      data,
    });
    onChange && onChange(data);
  };

  render() {
    const { data, options } = this.state;
    return (
      // <Select
      //   onFocus={this.handleGetOptions}
      //   onChange={this.handleChange}
      //   value={get(data, 'name') || data}
      //   showSearch
      //   allowClear
      // >
      //   {map(options, (option, index) => {
      //     return (
      //       <Select.Option key={get(option, 'id') || index} value={get(option, 'name')}>
      //         {get(option, 'name') || '--'}
      //       </Select.Option>
      //     );
      //   })}
      // </Select>
      <AutoComplete value={data} onChange={this.handleChange} dataSource={options} children={<Input type="text" />} />
    );
  }
}
