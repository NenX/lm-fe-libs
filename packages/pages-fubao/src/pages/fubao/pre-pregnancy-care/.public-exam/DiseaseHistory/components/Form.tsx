import React from 'react';
import { Space } from 'antd';
import {BaseEditPanelForm} from '@lm_fe/components_m';
export default class Form extends BaseEditPanelForm {
  renderBtns = () => {
    return (
      // <Space>
      <>
        {this.renderResetBtn()}
        {this.renderSubmitBtn()}
      </>
      // </Space>
    );
  };
}
