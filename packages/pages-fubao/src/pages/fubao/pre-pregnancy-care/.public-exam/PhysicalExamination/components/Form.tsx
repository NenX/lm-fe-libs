import React from 'react';
import { Space, Button, message } from 'antd';
import { BaseEditPanelForm, getBMI } from '@lm_fe/components_m';
import { ArrowRightOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import { FormInstance } from 'antd/lib/form';
export const formItemLayout = {
  // layout: 'horizontal',
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};
export default class Form extends BaseEditPanelForm {
  componentDidMount() {
    const { data, formDescriptionsWithoutSection, onRef } = this.props as any;
    onRef && onRef(this);
    this.form = this.formRef.current;
    this.form && this.form.setFieldsValue(data);
    this.renderEditItem = this.generateRenderEditItem(formDescriptionsWithoutSection, {
      formItemLayout,
    });
    // 强制渲染获取 form
    this.forceUpdate();
  }
  // Form onValuesChange
  handleItemChange = async (changedValues: any, allValues: any) => {
    //判断是否触发表单修改，触发就要保存
    const { changeFlag } = this.state as any;
    const { subscribeHandleItemChange } = this.props as any;
    if (!changeFlag) {
      subscribeHandleItemChange && subscribeHandleItemChange(true);
      this.setState({
        changeFlag: true,
      });
    }

    const form = this.form as unknown as FormInstance;
    if (
      (get(changedValues, 'weight') && get(allValues, 'height')) ||
      (get(changedValues, 'height') && get(allValues, 'weight'))
    ) {
      const bmi = getBMI(get(allValues, 'weight'), get(allValues, 'height'));
      form && form.setFieldsValue({ bmi: bmi });
    }
  };

  handleSave = async () => {
    const form = this.form as unknown as FormInstance;
    const { onFinish, data } = this.props as any;
    const params = {
      ...form.getFieldsValue(),
      id: get(data, 'id'),
    };
    onFinish && onFinish(params);
  };

  handleFinish = async () => {
    const form = this.form as unknown as FormInstance;
    const { onFinish, data, handleChangeTabs, subscribeHandleItemChange } = this.props as any;
    form &&
      form
        .validateFields()
        .then(() => {
          const params = {
            ...form.getFieldsValue(),
            id: get(data, 'id'),
          };
          onFinish && onFinish(params);
          handleChangeTabs && handleChangeTabs('PhysicalExamination', 'success');
          //点击保存按钮，就不触发下一页的保存
          subscribeHandleItemChange && subscribeHandleItemChange(false);
        })
        .catch((error) => {
          message.error(get(error, 'errorFields.0.errors.0'));
          form.scrollToField(get(error, 'errorFields.0.name.0'));
          handleChangeTabs && handleChangeTabs('PhysicalExamination', 'error');
        });
  };

  handleNext = () => {
    const { handleClickTab } = this.props as any;
    handleClickTab && handleClickTab('SecondSex')();
  };

  renderBtns = () => {
    return (
      <>
        <Space>
          {this.renderSubmitBtn()}
          <Button size="large" type="primary" onClick={this.handleNext}>
            <ArrowRightOutlined /> 下一页
          </Button>
        </Space>
      </>
    );
  };

  // 地址组件 触发按钮
  getEvents = () => ({
    handleButton: (id: string, isCheck: boolean) => {
      // 一键勾选
      if (id === 'selectBtn' && isCheck) {
        const form = this.form as unknown as FormInstance;
        form &&
          form.setFieldsValue({
            specialBody: { key: 1, keyNote: undefined },
            specialFace: { key: 1, keyNote: undefined },
            mentalState: { key: 1, keyNote: undefined },
            skinHair: { key: 1, keyNote: undefined },
            intelligence: { key: 1, keyNote: undefined },
            limbsSpinal: { key: 1, keyNote: undefined },
          });
      }
      if (id === 'selectBtn2' && isCheck) {
        const form = this.form as unknown as FormInstance;
        form &&
          form.setFieldsValue({
            skinMucousMembrane: { key: 1, keyNote: undefined },
            thyroid: { key: 1, keyNote: undefined },
            breast: { key: 1, keyNote: undefined },
            breathSounds: { key: 1, keyNote: undefined },
            rale: { key: 1, keyNote: undefined },
            heartrhythm: { key: 1, keyNote: undefined },
            noise: { key: 1, keyNote: undefined },
            liver: { key: 1, keyNote: undefined },
            spleen: { key: 1, keyNote: undefined },
            spine: { key: 1, keyNote: undefined },
            physiologicalReflection: { key: 1, keyNote: undefined },
            pathologicalReflection: { key: 1, keyNote: undefined },
            lowerLimbEdema: { key: 1, keyNote: undefined },
          });
      }
      // 一键取消
      if (id === 'selectBtn' && !isCheck) {
        const form = this.form as unknown as FormInstance;
        form &&
          form.setFieldsValue({
            specialBody: { key: undefined, keyNote: undefined },
            specialFace: { key: undefined, keyNote: undefined },
            mentalState: { key: undefined, keyNote: undefined },
            skinHair: { key: undefined, keyNote: undefined },
            intelligence: { key: undefined, keyNote: undefined },
            limbsSpinal: { key: undefined, keyNote: undefined },
          });
      }
      if (id === 'selectBtn2' && !isCheck) {
        const form = this.form as unknown as FormInstance;
        form &&
          form.setFieldsValue({
            skinMucousMembrane: { key: undefined, keyNote: undefined },
            thyroid: { key: undefined, keyNote: undefined },
            breast: { key: undefined, keyNote: undefined },
            breathSounds: { key: undefined, keyNote: undefined },
            rale: { key: undefined, keyNote: undefined },
            heartrhythm: { key: undefined, keyNote: undefined },
            noise: { key: undefined, keyNote: undefined },
            liver: { key: undefined, keyNote: undefined },
            spleen: { key: undefined, keyNote: undefined },
            spine: { key: undefined, keyNote: undefined },
            physiologicalReflection: { key: undefined, keyNote: undefined },
            pathologicalReflection: { key: undefined, keyNote: undefined },
            lowerLimbEdema: { key: undefined, keyNote: undefined },
          });
      }
    },
  });
}
