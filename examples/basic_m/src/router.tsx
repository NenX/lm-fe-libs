import { Spin } from "antd";
import React, { Suspense } from 'react';
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AppLayout from "./AppLayout";
import AppLogin from "./APPLogin";
import { state } from './valtio'
import Playground from './Playground'
export function Router(params: any) {
    let navigate = useNavigate();



    return <Routes>
        <Route path="/" element={<AppLayout />} >

            <Route path="/playground" element={<Playground />} />

        </Route>
        <Route path="/login" element={<AppLogin />} />

    </Routes >
}

