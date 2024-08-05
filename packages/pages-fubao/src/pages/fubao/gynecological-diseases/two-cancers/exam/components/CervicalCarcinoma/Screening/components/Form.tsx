import { BaseEditPanelForm, getBMI } from '@lm_fe/components_m'
import { Space, message, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { get, isEqual } from 'lodash';
import React from 'react';
export default class AdmissionForm extends BaseEditPanelForm {
  static defaultProps = {
    targetLabelCol: 4
  }
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
    console.log('handleItemChange', changedValues, allValues)
    const form = this.form as unknown as FormInstance;
    if (
      (get(changedValues, 'womenHealthcarePhysicalExamination.weight') &&
        get(allValues, 'womenHealthcarePhysicalExamination.height')) ||
      (get(changedValues, 'womenHealthcarePhysicalExamination.height') &&
        get(allValues, 'womenHealthcarePhysicalExamination.weight'))
    ) {
      const bmi = getBMI(
        get(allValues, 'womenHealthcarePhysicalExamination.weight'),
        get(allValues, 'womenHealthcarePhysicalExamination.height'),
      );
      form && form.setFieldsValue({ womenHealthcarePhysicalExamination: { bmi: bmi } });
    }

    if (get(allValues, 'womenHealthcareMenstrualHistory.parity')) {
      if (
        get(allValues, 'womenHealthcareMenstrualHistory.parity') >
        get(allValues, 'womenHealthcareMenstrualHistory.conceived')
      ) {
        message.warning('产次＞孕次，请检查孕次、产次输入的内容!');
      }
    }

    // 1、当筛查建议勾选【定期筛查】时，若患者检验检测项目【HPV】勾选【阳性】；且【醋酸/碘染色后肉眼观察】选【异常或可疑癌】；且【TBS分类报告结果】勾选【异常】时；弹窗提示
    // 2、当筛查建议勾选【活检】时，若患者检验检测项目【HPV】勾选【未查】\【阴性】；且【醋酸/碘染色后肉眼观察】选【未查】\【未见异常】；且【TBS分类报告结果】勾选【未见异常】时；弹窗提示
    if (get(allValues, 'cervicalCancerDiagnosisAndGuidance.screeningSuggest')) {
      let content1 = '';
      let content2 = '';
      const screeningSuggest = get(allValues, 'cervicalCancerDiagnosisAndGuidance.screeningSuggest');
      const hpv = get(allValues, 'cervicalCancerInspection.hpv');
      const tbsResult = get(allValues, 'cervicalCancerInspection.tbsResult');
      const visualObservationAfterAceticIodineStaining = get(
        allValues,
        'cervicalCancerInspection.visualObservationAfterAceticIodineStaining',
      );

      if (hpv === 1) {
        content1 += `
          <span>
            患者<span style="color: rgb(61, 139, 247)">【HPV】</span>检查结果
            <span style="color: rgb(61, 139, 247)">【阴性】</span>；
          </span>`;
      }

      if (hpv === 3) {
        content1 += `
          <span>
            患者<span style="color: rgb(61, 139, 247)">【HPV】</span>检查结果
            <span style="color: rgb(61, 139, 247)">【未查】</span>；
          </span>`;
      }

      if (hpv === 2) {
        content2 += `
          <span>
            患者<span style="color: rgb(61, 139, 247)">【HPV】</span>检查结果
            <span style="color: rgb(61, 139, 247)">【阳性】</span>；
          </span>`;
      }

      if (tbsResult === 1) {
        content1 += `
          <span>
            患者<span style="color: rgb(61, 139, 247)">【TBS分类报告结果】</span>检查结果
            <span style="color: rgb(61, 139, 247)">【未见异常】</span>；
          </span>`;
      }

      if (tbsResult === 2) {
        content2 += `
          <span>
            患者<span style="color: rgb(61, 139, 247)">【TBS分类报告结果】</span>检查结果
            <span style="color: rgb(61, 139, 247)">【异常】</span>；
          </span>`;
      }

      if (visualObservationAfterAceticIodineStaining === 1) {
        content1 += `
          <span>
            患者<span style="color: rgb(61, 139, 247)">【醋酸/碘染色后肉眼观察】</span>检查结果
            <span style="color: rgb(61, 139, 247)">【未见异常】</span>；
          </span>`;
      }

      if (visualObservationAfterAceticIodineStaining === 3) {
        content1 += `
          <span>
            患者<span style="color: rgb(61, 139, 247)">【醋酸/碘染色后肉眼观察】</span>检查结果
            <span style="color: rgb(61, 139, 247)">【未查】</span>；
          </span>`;
      }

      if (visualObservationAfterAceticIodineStaining === 2) {
        content2 += `
          <span>
            患者<span style="color: rgb(61, 139, 247)">【醋酸/碘染色后肉眼观察】</span>检查结果
            <span style="color: rgb(61, 139, 247)">【阳性】</span>；
          </span>`;
      }

      if (
        screeningSuggest === '定期检查' &&
        hpv === 2 &&
        visualObservationAfterAceticIodineStaining === 2 &&
        tbsResult === 2
      ) {
        Modal.warning({
          title: '提示信息',
          content: (
            <>
              <span dangerouslySetInnerHTML={{ __html: content2 }} />
              <span>请核对筛查建议！</span>
            </>
          ),
        });
      }

      if (
        screeningSuggest === '活检' &&
        (hpv === 1 || hpv === 3) &&
        (visualObservationAfterAceticIodineStaining === 1 || visualObservationAfterAceticIodineStaining === 3) &&
        tbsResult === 1
      ) {
        Modal.warning({
          title: '提示信息',
          content: (
            <>
              <span dangerouslySetInnerHTML={{ __html: content1 }} />
              <span>请核对筛查建议！</span>
            </>
          ),
        });
      }
    }
  };

  // 地址组件 触发按钮
  getEvents = () => ({
    handleButton: (id: string, isCheck: boolean) => {
      // 一键勾选
      if (id === 'selectBtn' && isCheck) {
        const form = this.form as unknown as FormInstance;
        form &&
          form.setFieldsValue({
            cervicalCancerGynecologicExamination: {
              vulva: { key: 1, keyNote: undefined },
              secretions: { key: 1, keyNote: undefined },
              vaginal: { key: 1, keyNote: undefined },
              cervix: { key: 1, keyNote: undefined },
              zg: { key: 1, keyNote: undefined },
              appendix: { key: 1, keyNote: undefined },
            },
          });
      }
      // 一键取消
      if (id === 'selectBtn' && !isCheck) {
        const form = this.form as unknown as FormInstance;
        form &&
          form.setFieldsValue({
            cervicalCancerGynecologicExamination: {
              vulva: { key: undefined, keyNote: undefined },
              secretions: { key: undefined, keyNote: undefined },
              vaginal: { key: undefined, keyNote: undefined },
              cervix: { key: undefined, keyNote: undefined },
              zg: { key: undefined, keyNote: undefined },
              appendix: { key: undefined, keyNote: undefined },
            },
          });
      }
    },
  });
}
