import { Button, Layout, Menu, message } from 'antd'
import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { routesData } from './routes-data'
import { IRequest_ResponseError, request } from '@lm_fe/utils'
import { state } from './valtio'
import { globalStore, useEventStore, logout } from '@lm_fe/pages-mchc'
import { menuItems } from './antd-demo'
const { Header, Content, Sider } = Layout
const AppLayout: React.FC = ({ }) => {
    const snap = useEventStore(globalStore)
    let navigate = useNavigate()

    useEffect(() => {
        const cb = (e?: IRequest_ResponseError) => {
            if (!e) return
            message.info(e.msg)
            if (e.status === 401) {
                navigate('/login', { replace: true })
            }
        }
        request.on('responseErr', cb)
        return () => {
            request.off('responseErr', cb)
        }
    }, [])
    useEffect(() => {
        if (snap.loggedIn) {
            message.info('已登录')
        } else {
            navigate('/login', { replace: true })
        }
        return () => { }
    }, [snap])
    return (
        <Layout style={{ height: '100vh' }}>
            {/* <Navigate to="/login" replace={true} /> */}

            <Header className="header" style={{ height: 48 }}>
                <div className="logo" />
                ~~~~{snap.user?.login}~~~
                <Button onClick={logout}>退出登录</Button>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu mode="inline">
                        {Object.keys(routesData).map((k) => {
                            return (
                                <Menu.Item key={k}>
                                    <Link to={k}>{k}</Link>
                                </Menu.Item>
                            )
                        })}
                        <Menu.Item key={'/playground'}>
                            <Link to={'/playground'}>playground</Link>
                        </Menu.Item>
                        {menuItems}
                    </Menu>
                </Sider>
                <Layout>
                    {/* <Counter /> */}
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 12,
                        }}
                    >
                        <Content
                            style={{
                                height: 'calc(100vh - 72px)',
                                padding: 12,
                                overflow: 'auto',
                                backgroundColor: '#fff',
                            }}
                        >
                            <Outlet />
                        </Content>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}
export default AppLayout
