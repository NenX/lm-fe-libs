import React from 'react';
import BaseEditPanelForm, { formItemLayout } from '../../../BaseEditPanel/BaseEditPanelForm';
import { get } from 'lodash';
import { FormInstance } from 'antd/lib/form';
import { Form } from 'antd';
import { mchcEvent } from '@lm_fe/env';
export default class AdmissionForm extends BaseEditPanelForm {
  handleFieldsChange = async (changedFields: any, allFields: any) => {
    const form = this.form as unknown as FormInstance;
    const name = get(changedFields[0], 'name.0');
    if (name === 'appgar') {
      const value = get(changedFields[0], 'value');

      // form?.setFieldsValue({
      //   appgar: {
      //     apgar1HeartrateScore: get(value, 'apgar1Heartrate'),
      //     apgar1BreathScore: get(value, 'apgar1Breath'),
      //     apgar1ReflexScore: get(value, 'apgar1Reflex'),
      //     apgar1MuscletensionScore: get(value, 'apgar1Muscletension'),
      //     apgar1SkincolorScore: get(value, 'apgar1Skincolor'),
      //     apgar1:
      //       (get(value, 'apgar1Heartrate') || 0) +
      //       (get(value, 'apgar1Breath') || 0) +
      //       (get(value, 'apgar1Reflex') || 0) +
      //       (get(value, 'apgar1Muscletension') || 0) +
      //       (get(value, 'apgar1Skincolor') || 0),

      //     apgar5HeartrateScore: get(value, 'apgar5Heartrate'),
      //     apgar5BreathScore: get(value, 'apgar5Breath'),
      //     apgar5ReflexScore: get(value, 'apgar5Reflex'),
      //     apgar5MuscletensionScore: get(value, 'apgar5Muscletension'),
      //     apgar5SkincolorScore: get(value, 'apgar5Skincolor'),
      //     apgar5:
      //       (get(value, 'apgar5Heartrate') || 0) +
      //       (get(value, 'apgar5Breath') || 0) +
      //       (get(value, 'apgar5Reflex') || 0) +
      //       (get(value, 'apgar5Muscletension') || 0) +
      //       (get(value, 'apgar5Skincolor') || 0),

      //     apgar10HeartrateScore: get(value, 'apgar10Heartrate'),
      //     apgar10BreathScore: get(value, 'apgar10Breath'),
      //     apgar10ReflexScore: get(value, 'apgar10Reflex'),
      //     apgar10MuscletensionScore: get(value, 'apgar10Muscletension'),
      //     apgar10SkincolorScore: get(value, 'apgar10Skincolor'),
      //     apgar10:
      //       (get(value, 'apgar10Heartrate') || 0) +
      //       (get(value, 'apgar10Breath') || 0) +
      //       (get(value, 'apgar10Reflex') || 0) +
      //       (get(value, 'apgar10Muscletension') || 0) +
      //       (get(value, 'apgar10Skincolor') || 0),
      //   },
      // });
    }
  };

  render() {
    return (
      <Form
        autoComplete="off"
        ref={this.formRef}
        onBlur={this.handleItemBlur}
        onValuesChange={(a, b) => {
          const k = Object.keys(a)[0]
          const v = Object.values(a)[0]
          mchcEvent.emit('my_form', { type: 'onChange', value: v, name: k, values: b })
          console.log('jjx 00', a)

          const form = this.form as unknown as FormInstance;

          const preamnioticfluidvolume = Number(b.preamnioticfluidvolume) ?? 0 // 前羊水
          const amnioticfluidvolume = Number(b.amnioticfluidvolume) ?? 0 // 后羊水
          //羊水总量
          form.setFieldsValue({ amnioticfluidtotalvolume: preamnioticfluidvolume + amnioticfluidvolume })
        }}
        onFieldsChange={this.handleFieldsChange}
        {...formItemLayout}
      >
        {this.renderEditContent()}
      </Form>
    );
  }
}
