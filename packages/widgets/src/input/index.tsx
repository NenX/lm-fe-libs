/**
 * 基于antd Input
 */
import React from 'react'
import Input, { InputProps } from 'antd/es/input'
import classnames from 'classnames'
import './index.less'
type LmInputProps = InputProps & {
    underline?: boolean
}
export const LmInput = ({ underline, className, ...rest }: LmInputProps) => {
    return <Input className={classnames({ 'ant-input-underline': underline, className: !!className })} {...rest} />
}
