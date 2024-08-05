import { Button, Form, Input, Layout } from 'antd';
import React from 'react';
const AppLogin: React.FC = () => {
  const [form] = Form.useForm()
  return <Layout style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Form form={form} style={{ background: '#fff', padding: 24 }}

    >
      <Form.Item name="username" label="账号">
        <Input />
      </Form.Item>
      <Form.Item name="password" label="密码">
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit" block>
        提交
      </Button>
    </Form>

  </Layout >
};
export default AppLogin;
