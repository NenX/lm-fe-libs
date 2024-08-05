import React from 'react';
import { Space, Button, message } from 'antd';
import { get } from 'lodash';
import { ArrowRightOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { BaseEditPanelForm } from '@lm_fe/components_m';
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
          handleChangeTabs && handleChangeTabs('SecondSex', 'success');
          //点击保存按钮，就不触发下一页的保存
          subscribeHandleItemChange && subscribeHandleItemChange(false);
        })
        .catch((error) => {
          message.error(get(error, 'errorFields.0.errors.0'));
          form.scrollToField(get(error, 'errorFields.0.name.0'));
          handleChangeTabs && handleChangeTabs('SecondSex', 'error');
        });
  };

  handleNext = () => {
    const { handleClickTab } = this.props as any;
    handleClickTab && handleClickTab('Inspection')();
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
            vulva: { key: 1, keyNote: undefined },
            vagina: { key: 1, keyNote: undefined },
            cervix: { key: 1, keyNote: undefined },
            uterus: { key: 1, keyNote: undefined },
            secretions: { key: 1, keyNote: undefined },
            appendix: { key: 1, keyNote: undefined },
            anus: { key: 1, keyNote: undefined },
          });
      }

      //男方
      if (id === 'selectBtn2' && isCheck) {
        const form = this.form as unknown as FormInstance;
        form &&
          form.setFieldsValue({
            penis: { key: 1, keyNote: undefined },
            prepuce: { key: 1, keyNote: undefined },
            testes: { key: 1, keyNote: undefined },
            epididymides: { key: 1, keyNote: undefined },
            anus: { key: 1, keyNote: undefined },
          });
      }
      // 一键取消
      if (id === 'selectBtn' && !isCheck) {
        const form = this.form as unknown as FormInstance;
        form &&
          form.setFieldsValue({
            vulva: { key: undefined, keyNote: undefined },
            vagina: { key: undefined, keyNote: undefined },
            cervix: { key: undefined, keyNote: undefined },
            uterus: { key: undefined, keyNote: undefined },
            secretions: { key: undefined, keyNote: undefined },
            appendix: { key: undefined, keyNote: undefined },
            anus: { key: undefined, keyNote: undefined },
          });
      }

      //男方
      if (id === 'selectBtn2' && !isCheck) {
        const form = this.form as unknown as FormInstance;
        form &&
          form.setFieldsValue({
            penis: { key: undefined, keyNote: undefined },
            prepuce: { key: undefined, keyNote: undefined },
            testes: { key: undefined, keyNote: undefined },
            epididymides: { key: undefined, keyNote: undefined },
            anus: { key: undefined, keyNote: undefined },
          });
      }
    },
  });
}
