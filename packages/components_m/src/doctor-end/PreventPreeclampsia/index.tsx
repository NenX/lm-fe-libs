import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { changePreventPreeclampsia } from '@/actions/prenatal-visit';
class Index extends Component {
  handleCancel = () => {
    const { changePreventPreeclampsia } = this.props;
    changePreventPreeclampsia(false);
  };

  handleOk = () => {
    const { changePreventPreeclampsia, closeModal } = this.props;
    closeModal('', '阿司匹林', 'prescription');
    changePreventPreeclampsia(false);
  };

  render() {
    const { isShowPreventPreeclampsia } = this.props;

    return (
      <Modal
        title="请注意！"
        className="diag-reminder-wrapper"
        visible={isShowPreventPreeclampsia}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
      >
        <p>是否使用 “阿司匹林” 预防子痫前期</p>
      </Modal>
    );
  }
}
const mapDisPathchToProps = { changePreventPreeclampsia };
export default connect(null, mapDisPathchToProps)(Index);
