import { BaseEditPanelForm, calEddByLmp, calGestationalWeekByLmp } from '@lm_fe/components_m';;
import { Space, message } from 'antd';
import { get, set } from 'lodash';
import { FormInstance } from 'antd/lib/form';
import moment from 'moment';
export default class AdmissionForm extends BaseEditPanelForm {
  renderBtns = () => {
    return (
      <Space size="middle">
        {this.renderSubmitBtn()}
        {this.renderPrintBtn()}
      </Space>
    );
  };

  // Form onValuesChange
  handleItemChange = async (changedValues: any, allValues: any) => {
    const { formDescriptionsWithoutSection, extraEvents } = this.props as any;
    const form = this.form as unknown as FormInstance;
    if (
      (get(changedValues, 'earlyPregnancyCheckMedicalHistory.parity') &&
        get(allValues, 'earlyPregnancyCheckMedicalHistory.conceived')) ||
      (get(changedValues, 'earlyPregnancyCheckMedicalHistory.conceived') &&
        get(allValues, 'earlyPregnancyCheckMedicalHistory.parity'))
    ) {
      if (
        get(changedValues, 'earlyPregnancyCheckMedicalHistory.parity') >
        get(allValues, 'earlyPregnancyCheckMedicalHistory.conceived')
      ) {
        set(formDescriptionsWithoutSection, ['earlyPregnancyCheckMedicalHistory.parity', 'inputProps', 'style'], {
          color: '#ff0000',
          width: 156,
        });
        extraEvents.handleChangeRed(formDescriptionsWithoutSection);
        message.warning('产次＞孕次，请检查孕次、产次输入的内容!');
      } else {
        set(formDescriptionsWithoutSection, ['earlyPregnancyCheckMedicalHistory.parity', 'inputProps', 'style'], {
          color: 'rgba(0,0,0,.85)',
          width: 156,
        });
        extraEvents.handleChangeRed(formDescriptionsWithoutSection);
      }
    }

    /** 根据末次月经计算预产期—B超 和 孕周 */
    if (get(changedValues, 'earlyPregnancyCheckMedicalHistory.lmd')) {
      const dueDate = calEddByLmp(get(changedValues, 'earlyPregnancyCheckMedicalHistory.lmd'));
      const gestationalWeek = calGestationalWeekByLmp(get(changedValues, 'earlyPregnancyCheckMedicalHistory.lmd'));
      form && form.setFieldsValue({ earlyPregnancyCheckMedicalHistory: { dueDate, gestationalWeek } });
    }

    /** 根据几周后计算出日期 */
    if (get(changedValues, 'earlyPregnancyCheckDiagnosisAndTreatment.appointmentWeeksLater')) {
      const appointmentWeeksLater = get(
        changedValues,
        'earlyPregnancyCheckDiagnosisAndTreatment.appointmentWeeksLater',
      );
      if (appointmentWeeksLater === 1) {
        const appointmentSpecificDate = moment().add(7, 'd');
        form && form.setFieldsValue({ earlyPregnancyCheckDiagnosisAndTreatment: { appointmentSpecificDate } });
      }
      if (appointmentWeeksLater === 2) {
        const appointmentSpecificDate = moment().add(14, 'd');
        form && form.setFieldsValue({ earlyPregnancyCheckDiagnosisAndTreatment: { appointmentSpecificDate } });
      }
      if (appointmentWeeksLater === 3) {
        const appointmentSpecificDate = moment().add(21, 'd');
        form && form.setFieldsValue({ earlyPregnancyCheckDiagnosisAndTreatment: { appointmentSpecificDate } });
      }
    }
  };
}
