import React, { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import TemplateSelect from './components/TemplateSelect';
import { MODAL_NAVS } from './index';
import { get, map } from 'lodash';
export default function EditModal(props: any) {
  const { onCancel, onSubmit, visible, templateType, userid, data, depid } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form &&
      form.setFieldsValue({
        ...data,
        pid: get(data, 'pid') || 0,
        type: templateType,
      });
  }, []);

  const handleSubmit = async () => {
    await form.validateFields();
    const formData = form && form.getFieldsValue();
    onSubmit && onSubmit(formData);
  };

  return (
    <Modal
      visible={visible}
      className="textarea-with-template__modal-edit"
      onCancel={onCancel}
      onOk={handleSubmit}
      closable={false}
      width={500}
    >
      <Form autoComplete="off" form={form} labelAlign="right" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Form.Item label="所属模块" name="type">
          <Select>
            {map(MODAL_NAVS, (nav, key) => {
              return (
                <Select.Option value={nav.type} key={key}>
                  {nav.label}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="上级模板" name="pid">
          <TemplateSelect templateType={templateType} userid={userid} depid={depid} />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: '模板内容是必填项' }]} label="模板内容" name="val">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
