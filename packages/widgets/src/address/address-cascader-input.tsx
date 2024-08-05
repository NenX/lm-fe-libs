/**
 * 地址选择输入组件,级联+input
 */
import React, { useState, useEffect, useMemo } from 'react'
import { Input, Cascader, Button } from 'antd'
import { split, join } from 'lodash'
import classnames from 'classnames'
import { OPTIONS } from './china-division'
import './index.less'
type AddressCascaderInputProps = {
    addonAfterBtns?: any[]
    defaultValue?: string
    value?: string
    underline?: boolean
}
const AddressCascaderInput = ({
    addonAfterBtns,
    defaultValue,
    value,
    underline,
    ...rest
}: AddressCascaderInputProps) => {
    const [pca, setPca] = useState<(string | number)[]>([])
    const [detail, setDetail] = useState<string | undefined>(undefined)

    useEffect(() => {
        let address = defaultValue
        if (value) {
            address = value
        }
        const arr = split(address, '#')
        arr[1] && setDetail(arr[1])
        arr[0] && setPca(split(arr[0], ','))
    }, [])

    const BtnsDom = useMemo(() => {
        if (Array.isArray(addonAfterBtns) && addonAfterBtns.length) {
            // 无边框状态下 默认text btn
            const defaultBtnType = underline ? 'text' : ''
            return addonAfterBtns.map(({ key, text, ...rest }) => (
                <Button key={key} type={defaultBtnType} {...rest}>
                    {text}
                </Button>
            ))
        }
        return null
    }, [addonAfterBtns])

    const handleChange = (value: (string | number)[]) => {
        setPca(value)
    }

    return (
        <Input.Group
            compact
            className={classnames('lm-input-group-compact', { 'lm-input-group-underline': underline })}
        >
            <Cascader
                showSearch
                placeholder="请选择省市区"
                options={OPTIONS}
                value={pca}
                title={join(pca, ',')}
                onChange={handleChange}
            />
            <Input placeholder="请输入详细居住地址" value={detail} />
            {BtnsDom}
        </Input.Group>
    )
}
export default AddressCascaderInput
