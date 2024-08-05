import React from 'react'
import { createFromIconfontCN } from '@ant-design/icons'
// import './iconfont.js'
// import './custom_iconfont.js'
const AntDesignIcons = createFromIconfontCN({
    scriptUrl: ['/assets/iconfont/iconfont.js', '/assets/iconfont/custom_iconfont.js'],
    extraCommonProps: {},
})
type AntDesignIconsProps = {
    type: string
}
export const IconFont = ({ type, ...rest }: AntDesignIconsProps) => {
    return <AntDesignIcons type={`icon-${type}`} {...rest} />
}
