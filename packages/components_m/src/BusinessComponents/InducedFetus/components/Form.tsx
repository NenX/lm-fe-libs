import React from 'react';
import BaseEditPanelForm, { formItemLayout } from '../../../BaseEditPanel/BaseEditPanelForm';
import { Form } from 'antd';
export default class AdmissionForm extends BaseEditPanelForm {
  render() {
    return (
      <Form
        autoComplete="off"
        ref={this.formRef}
        onBlur={this.handleItemBlur}
        onValuesChange={this.props.onValuesChange}
        {...formItemLayout}
      >
        {this.renderEditContent()}
      </Form>
    );
  }
}
