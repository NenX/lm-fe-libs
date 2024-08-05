/* eslint-disable @typescript-eslint/camelcase */
import React, { Component, ReactNode } from 'react';
import { Row, Col } from 'antd';
import MyComponent from '../index';
import { isArr } from '../../utils/func';
import './index.less';
interface SimpleObjectProps {
  onChange: Function;
  dispatch?: Function;
  value: any;
  error: any;
  input_props: any;
}
const defaultGutterConfig = {
  gutter: [0, 16], // px
  justify: 'start',
};
export default class SimpleObject extends Component<SimpleObjectProps> {
  handleChange = (val: any, key: string): void => {
    const { onChange, value } = this.props;
    // console.log(val);
    value[key] = val;
    onChange(value);
  };

  renderInput = (): ReactNode => {
    const { input_props = {}, value = {} } = this.props;
    const { config = [] } = input_props;
    if (!Array.isArray(config)) {
      return <span>input_props.config格式为Array{'<FormConfig>'}</span>;
    }
    if (config.length === 0) {
      return <span>input_props.config.length 为 0</span>;
    }
    return config.map((conf: any, index: number) => {
      const { span = 8, offset = 0 } = conf;
      const RenderComponent = MyComponent[conf.input_type];
      return (
        <Col span={span} offset={offset} className="" key={`array-object-${index}`}>
          <div className="simple-object-item__label">{conf.label}</div>
          <div className="simple-object-item__editor">
            <RenderComponent
              onChange={(val: any) => this.handleChange(val, conf.key)}
              value={value[conf.key]}
              {...conf}
            />
          </div>
          <div className="simple-object-item__unit">{conf.unit}</div>
        </Col>
      );
    });
  };

  render() {
    return (
      <div className="simple-object">
        <Row {...defaultGutterConfig}>{this.renderInput()}</Row>
      </div>
    );
  }
}
