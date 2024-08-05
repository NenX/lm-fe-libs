import { Tabs } from 'antd';
import { get } from 'lodash';
import React, { Component } from 'react';
import InspectionResults from '../../../.public-exam/InspectionResults';
import './index.less';
export default class panel extends Component {
  state = {
    activeKey: '',
  };

  async componentDidMount() {
    const activeKey = get(this.props, 'routerQuery.activeKey') || 'InspectionResults';
    this.setState({
      activeKey,
    });
  }

  handleTabChange = (key: any) => {
    this.setState({
      activeKey: key,
    });
  };

  render() {
    const { activeKey } = this.state;
    const { moduleName, filesData, id, type, handleClickTab, handleChangeTabs, subscribeHandleItemChange, onRef } = this
      .props as any;
    return (
      <div className="child-panel">
        <Tabs activeKey={activeKey} onChange={this.handleTabChange}>
          <Tabs.TabPane tab="检查结果" key="InspectionResults">
            <InspectionResults
              moduleName={moduleName}
              filesData={filesData}
              id={id}
              type={type}
              handleClickTab={handleClickTab}
              handleChangeTabs={handleChangeTabs}
              subscribeHandleItemChange={subscribeHandleItemChange}
              onRef={onRef}
            />
          </Tabs.TabPane>
          {/* <Tabs.TabPane tab="检验报告" key="SurveyReport">
            <SurveyReport />
          </Tabs.TabPane>
          <Tabs.TabPane tab="影像报告" key="ImageReport">
            <ImageReport />
          </Tabs.TabPane> */}
        </Tabs>
      </div>
    );
  }
}
