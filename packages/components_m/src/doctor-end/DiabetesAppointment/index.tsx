import React, { Component } from 'react';
import { Select, Button, DatePicker, Modal } from 'antd';
import moment from 'moment';
import { getOrderTime } from '@/utils/formula';
import request from '@/lib/request';

export default class Index extends Component {
  state = {
    menzhenDate: new Date(),
    orderData: null,
    selectList: ['本周五', '下周五', '下下周五'],
    hasAppointment: false,
  };

  async componentDidMount() {}

  handleDateChange = (date: any, dateString: any) => {
    this.setState({
      menzhenDate: dateString,
    });
  };

  handleTimeSelect = (v: any) => {
    this.setState({
      menzhenDate: getOrderTime(v),
    });
  };

  handleCancel = () => {
    const { closeModal } = this.props;
    closeModal('isShowMenzhen');
  };

  handleOk = () => {
    const { closeModal } = this.props;
    const { menzhenDate } = this.state;
    closeModal('isShowMenzhen', `糖尿病日间门诊(${moment(menzhenDate).format('YYYY-MM-DD')})`, 'prescription');
    // service.shouzhen.makeOutpatientAppointment(menzhenDate);
  };

  buttons = () => {
    const { hasAppointment } = this.state;
    return (
      <>
        <Button onClick={this.handleCancel}>取消</Button>
        <Button type="primary" onClick={this.handleOk}>
          {hasAppointment ? '改期' : '确定'}
        </Button>
      </>
    );
  };

  render() {
    const { isShowMenzhen } = this.props;
    const { menzhenDate, selectList, orderData } = this.state;

    return (
      <Modal
        visible={isShowMenzhen}
        onCancel={this.handleCancel}
        footer={this.buttons()}
        title={<span>糖尿病日间门诊预约</span>}
      >
        <span>预约时间</span>
        <DatePicker
          allowClear={false}
          value={moment(menzhenDate)}
          onChange={(date, dateString) => this.handleDateChange(date, dateString)}
        />
      </Modal>
    );
  }
}
