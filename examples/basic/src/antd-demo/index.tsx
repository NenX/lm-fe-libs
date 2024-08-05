/**
 * antd demo路由
 */
import React, { Suspense, lazy } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import { Menu, Spin } from 'antd'
import './styles.less'
export const ANTD_DEMO_ROUTE_DATA = [
    {
        name: 'button',
        path: '/antd/button',
        element: lazy(() => import('./button')),
    },
    {
        name: 'input',
        path: '/antd/input',
        element: lazy(() => import('./input')),
    },
    {
        name: 'select',
        path: '/antd/select',
        element: lazy(() => import('./select')),
    },
    {
        name: 'table',
        path: '/antd/table',
        element: lazy(() => import('./table')),
    },
    {
        name: 'radio、checkbox',
        path: '/antd/radio',
        element: lazy(() => import('./radio')),
    },
    {
        name: '日期选择器',
        path: '/antd/date-picker',
        element: lazy(() => import('./date-picker')),
    },
]
export const antdRoutes = () => {
    return (
        <Route path="/antd">
            {ANTD_DEMO_ROUTE_DATA.map((_) => {
                const C = _.element
                return (
                    <Route
                        key={_.path}
                        path={_.path}
                        element={
                            <Suspense fallback={<Spin />}>
                                <C />
                            </Suspense>
                        }
                    ></Route>
                )
            })}
        </Route>
    )
}
export const menuItems = (
    <Menu.SubMenu key="antd" title="antd">
        {ANTD_DEMO_ROUTE_DATA.map((_) => {
            return (
                <Menu.Item key={_.path} title={_.name}>
                    <Link to={_.path}>{_.name}</Link>
                </Menu.Item>
            )
        })}
    </Menu.SubMenu>
)
