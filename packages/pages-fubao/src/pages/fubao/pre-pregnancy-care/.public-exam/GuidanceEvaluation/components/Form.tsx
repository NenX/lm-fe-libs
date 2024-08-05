import React from 'react';
import { Space, Modal, message, Popconfirm, Button } from 'antd';
import { get } from 'lodash';
import { CloseOutlined, SaveOutlined, PrinterOutlined } from '@ant-design/icons';
import {BaseEditPanelForm} from '@lm_fe/components_m';
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
  state = {
    importModalVisible: false,
    renderModal: false,
    changeFlag: false,
  };

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
          handleChangeTabs && handleChangeTabs('GuidanceEvaluation', 'success');
          //点击保存按钮，就不触发下一页的保存
          subscribeHandleItemChange && subscribeHandleItemChange(false);
        })
        .catch((error) => {
          message.error(get(error, 'errorFields.0.errors.0'));
          form.scrollToField(get(error, 'errorFields.0.name.0'));
          handleChangeTabs && handleChangeTabs('GuidanceEvaluation', 'error');
        });
  };

  renderBtns = () => {
    return (
      <>
        <Space>
          {this.renderPrintBtn()}
          {this.renderSubmitBtn()}
        </Space>
      </>
    );
  };

  onOk = () => {
    this.setState({ renderModal: false });
  };

  cancel = (e: any) => {
    console.log(e);
  };

  confirm = async (e: any) => {
    const form = this.form as unknown as FormInstance;
    const { onFinish, data } = this.props;
    form &&
      form
        .validateFields()
        .then(() => {
          const params = {
            ...form.getFieldsValue(),
            id: get(data, 'id'),
            isPrint: true,
          };
          onFinish && onFinish(params);
        })
        .catch((error) => {
          message.error(get(error, 'errorFields.0.errors.0'));
          form.scrollToField(get(error, 'errorFields.0.name.0'));
        });
  };

  renderPrintBtn = () => {
    const { changeFlag } = this.state;
    const { printId, extraEvents, data } = this.props as any;

    return changeFlag ? (
      <Popconfirm
        title="当前存在新数据，是否保存并打印？"
        onConfirm={this.confirm}
        onCancel={this.cancel}
        okText="确定"
        cancelText="取消"
      >
        <Button type="primary" size="large" icon={<PrinterOutlined />}>
          打印
        </Button>
      </Popconfirm>
    ) : (
      <Button
        type="primary"
        size="large"
        icon={<PrinterOutlined />}
        disabled={!printId}
        onClick={() => {
          extraEvents.handlePrint();
        }}
      >
        打印
      </Button>
    );
  };
}
