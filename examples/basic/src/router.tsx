import { globalStore, useEventStore } from '@lm_fe/pages-mchc'
import { Spin } from 'antd'
import React, { Suspense } from 'react'
import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AppLayout from './AppLayout'
import AppLogin from './APPLogin'
import { routesData } from './routes-data'
import { antdRoutes, ANTD_DEMO_ROUTE_DATA } from './antd-demo'
import { state } from './valtio'
import Playground from './Playground'
export function Router(params: any) {

    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                {Object.keys(routesData).map((k) => {
                    const C = routesData[k]
                    return (
                        <Route
                            path={k}
                            key={k}
                            element={
                                <Suspense fallback={<Spin />}>
                                    <C />
                                </Suspense>
                            }
                        />
                    )
                })}
                <Route path="/playground" element={<Playground />} />
                {antdRoutes()}
            </Route>
            <Route path="/login" element={<AppLogin />} />
        </Routes>
    )
}
