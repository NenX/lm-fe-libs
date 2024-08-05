import { Layout, Menu, message } from 'antd';
import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IRequest_ResponseError, request } from "@lm_fe/utils";
import { state } from './valtio'
const { Header, Content, Sider } = Layout;
const AppLayout: React.FC = () => {
  let navigate = useNavigate();

  useEffect(() => {
    const cb = (e?: IRequest_ResponseError) => {
      if (!e) return
      message.info(e.msg)
      if (e.status === 401) {
        navigate("/login", { replace: true })
      }
    }
    request.on('responseErr', cb)
    return () => {
      request.off('responseErr', cb)

    };
  }, [])

  return (
    <Layout style={{ height: '100vh' }}>
      {/* <Navigate to="/login" replace={true} /> */}

      <Header className="header" style={{ height: 48 }}>
        <div className="logo" />

      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu>

            <Menu.Item key={"/playground"}>
              <Link to={"/playground"}>playground</Link>
            </Menu.Item>

          </Menu>;
        </Sider>
        <Layout >
          {/* <Counter /> */}
          <Content
            className="site-layout-background"
            style={{
              padding: 12,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>

    </Layout >
  )
};
export default AppLayout;
