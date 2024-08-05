import { BaseEditPanelForm } from '@lm_fe/components_m'
import { Space } from 'antd';
export default class AdmissionForm extends BaseEditPanelForm {
  renderBtns = () => {
    return (
      <Space size="middle">
        {this.renderSubmitBtn()}
        {this.renderPrintBtn()}
      </Space>
    );
  };
}
