import { SLocal_State } from '@lm_fe/service';
import { get, isEmpty } from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import FormSection from 'src/BaseModalForm/FormSection';
import { getFormConfigByPeriodState, getFormConfigFilter } from './form_config';

class RecordSate extends Component {
  state = {
    formData: {},
  };

  componentDidMount = async () => {
    const { form, value } = this.props;

    if (!isEmpty(value)) {
      form.setFieldsValue({
        referralOutReason: get(value, 'reason'),
        referralOutReferralDate: get(value, 'referralDate')
          ? moment(get(value, 'referralDate'))
          : get(value, 'referralDate'),
        referralOutReferralOrganization: get(value, 'referralOrganization'),
        referralOutReferralDept: get(value, 'referralDept'),
        referralOutReferralDirection: get(value, 'referralDirection'),
        referralOutReferralDoctor: get(value, 'referralDoctor'),
        referralOutReferralContactNumber: get(value, 'referralContactNumber'),
        referralOutRecorder: get(value, 'recorder'),
      });
    } else {
      form.setFieldsValue({
        referralOutRecorder: SLocal_State.getUserData()?.firstName,
      });
    }


    this.setFormData();
  };



  setFormData = () => {
    const { form } = this.props;
    const formData = form.getFieldsValue();
    this.setState({ formData });
  };



  render() {
    const { formData } = this.state;

    return (
      <>

        <FormSection form={this.props.form} formDescriptions={getFormConfigFilter()} />

        <FormSection form={this.props.form} formDescriptions={getFormConfigByPeriodState(get(formData, 'periodState')!)} />
      </>
    );
  }
}
export default RecordSate
