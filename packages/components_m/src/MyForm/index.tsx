import React, { lazy } from 'react'
import { MyLazyComponent } from '../MyLazyComponent'
import { MyFormProp } from './interface'
export * from './utils'
export * from './interface'
const MyFormInner = lazy(() => import('./_MyForm'))
export function MyForm(props: MyFormProp) {
    return <MyLazyComponent>
        <MyFormInner {...props} />
    </MyLazyComponent>
}