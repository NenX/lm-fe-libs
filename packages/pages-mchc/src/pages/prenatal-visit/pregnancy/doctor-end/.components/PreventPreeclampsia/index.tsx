import React, { Component } from 'react';
import { Modal } from 'antd';
interface IProps {
  changePreventPreeclampsia(b: boolean): void,
  closeModal(a: string, b: string, c: string): void,
  isShowPreventPreeclampsia: boolean
}
function Index(props: IProps) {
  const { changePreventPreeclampsia, closeModal, isShowPreventPreeclampsia } = props
  const handleCancel = () => {
    changePreventPreeclampsia(false);
  };

  const handleOk = () => {
    closeModal('', '阿司匹林', 'prescription');
    changePreventPreeclampsia(false);
  };


  return (
    <Modal
      title="请注意！"
      className="diag-reminder-wrapper"
      visible={isShowPreventPreeclampsia}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <p>是否使用 “阿司匹林” 预防子痫前期</p>
    </Modal>
  );
}
export default Index
