import React, { Component } from 'react';
import { Timeline } from 'antd';
import './index.less';
export default class FollowUp extends Component {
  render() {
    return (
      <>
        <div className="two-cancers-follow-up">
          <div className="error">暂未开放此功能，敬请期待！</div>
          {/* <Timeline mode="left">
            <Timeline.Item label={<span style={{ color: 'green' }}>正常</span>} color="green">
              <div>
                <span className="time">2020-09-01 09:09 </span>
                <span>定时任务</span>
              </div>
              <div>
                <span>健康宣教:</span>
                <span>
                  【<span style={{ color: 'rgb(91,198,245)' }}>健康指导</span>】
                </span>
              </div>
            </Timeline.Item>
            <Timeline.Item label={<span style={{ color: 'red' }}>异常</span>} color="red">
              <div>
                <span className="time">2020-09-01 09:09 </span>
                <span>定时任务</span>
              </div>
              <div>
                <span>健康宣教:</span>
                <span>
                  【<span style={{ color: 'rgb(91,198,245)' }}>两癌筛查的意义</span>】
                </span>
              </div>
            </Timeline.Item>
            <Timeline.Item label={<span style={{ color: 'red' }}>异常</span>} color="red">
              <div>
                <span className="time">2020-09-03 09:09 </span>
                <span>定时任务</span>
              </div>
              <div>
                <span>健康宣教:</span>
                <span>
                  【<span>尊敬的XX，您参加的宫颈癌筛查结果已出，请到医院领取报告，祝您生活愉快！</span>】
                </span>
              </div>
            </Timeline.Item>
            <Timeline.Item label={<span style={{ color: 'green' }}>正常</span>} color="green">
              <div>
                <span className="time">2020-10-04 09:09 </span>
                <span>人工随访:李玉玉</span>
              </div>
              <div>
                <span>随访管理:</span>
                <span>
                  【<span style={{ color: 'rgb(91,198,245)' }}>初筛阳性追踪</span>】
                </span>
              </div>
            </Timeline.Item>
          </Timeline> */}
        </div>
      </>
    );
  }
}
