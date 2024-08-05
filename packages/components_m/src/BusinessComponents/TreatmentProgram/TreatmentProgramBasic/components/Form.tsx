import React from 'react';
import BaseEditPanelForm, { formItemLayout } from '../../../../BaseEditPanel/BaseEditPanelForm';
import { Form } from 'antd';
export default class AdmissionForm extends BaseEditPanelForm {
  render() {
    const { onValuesChange } = this.props as any;
    return (
      <Form
        autoComplete="off"
        ref={this.formRef}
        onBlur={this.handleItemBlur}
        onValuesChange={onValuesChange}
        {...formItemLayout}
      >
        {this.renderEditContent()}
      </Form>
    );
  }
}
