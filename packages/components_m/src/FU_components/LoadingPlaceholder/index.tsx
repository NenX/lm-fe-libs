import { Spin } from "antd";
import React from "react";


export function LoadingPlaceholder(props: { height?: number }) {
    const { height = 120 } = props
    return <div style={{ height, lineHeight: `${height}px`, textAlign: 'center' }}>
        <Spin />
    </div>
}