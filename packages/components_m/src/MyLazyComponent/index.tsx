import React from 'react'
import { Spin, Skeleton } from 'antd'
import { FC, Suspense, SuspenseProps } from 'react'
export const MyLazyComponent: FC<Partial<SuspenseProps>> = function MyLazyComponent(props) {
    const { children, fallback } = props
    return <Suspense fallback={
        fallback ??
        <div style={{ padding: 24 }}>
            <Skeleton paragraph={{ rows: 4 }} />
        </div>
    }>
        {children}
    </Suspense>
}