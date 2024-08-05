import React from 'react';
import { request } from '@lm_fe/utils';
export default function AsyncHOC(WrappedComponent) {
  return class AsyncHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
      };
    }

    componentDidMount() {
      // ...负责订阅相关的操作...
      // TODO 暂时不在页面加载时初始化
      // this.fetchData(this.props.url);
    }

    fetchData = async () => {
      const { url } = this.props;
      if (!url) {
        return;
      }
      const res = await request.get(url);
      let d = [];
      const options = res;
      if (url.includes('api/dictionaries/')) {
        d = res.enumerations.map((_) => ({ label: _.label, value: _.value }));
      } else {
        d = res.map((_) => ({ label: _.nickname, value: _.id }));
      }
      this.setState({ data: d });
    };

    render() {
      return (
        <WrappedComponent
          value={this.props.value}
          onChange={this.props.onChange}
          fetchOptions={this.fetchData}
          inputProps={{ options: this.state.data, ...this.props }}
        />
      );
    }
  };
}
