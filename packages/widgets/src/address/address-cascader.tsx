/**
 * 单纯的省市区选择
 */
import React, { useState, useEffect, useMemo, forwardRef, useRef, useImperativeHandle } from 'react'
import { Cascader, Input, Button } from 'antd'
import { split, join, replace } from 'lodash'
import classnames from 'classnames'
import { concatValue } from './address-select'
import { OPTIONS, PROVINCES, PC_OPTIONS } from './china-division'
import './index.less'
type AddressCascaderProps = {
    /**
     * field name
     */
    name?: string | string[]
    defaultValue?: string
    onChange?: (value?: string) => void
    value?: string
    level?: 1 | 2 | 3
    placeholder?: string
    /**
     * mode 编辑edit  阅读read
     */
    mode?: 'read' | 'edit'
    /**
     * 仅在mode==='read'时有效
     */
    format?: (value?: string) => React.ReactNode
    /**
     * 下划线样式，默认antd四边有边框
     */
    underline?: boolean
    /**
     * 是否有详细地址输入框
     */
    hasInput?: boolean
    /**
     * 后置btn标签
     */
    addonAfterBtns?: any[]
    /**
     * 后置btn标签点击事件
     */
    onAddonAfterBtns?: ({ name, btnKey, value }: { name?: string | string[]; btnKey: string; value?: string }) => void
}
const AddressCascader: React.ForwardRefRenderFunction<any, AddressCascaderProps> = (
    {
        name,
        value,
        defaultValue,
        onChange = () => {},
        addonAfterBtns,
        onAddonAfterBtns = () => {},
        placeholder,
        level = 3,
        underline,
        hasInput,
        mode,
        format,
        ...rest
    },
    ref,
) => {
    const [pca, setPca] = useState<string[]>([])
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

    useImperativeHandle(ref, () => ({
        value: concatValue(pca, detail),
    }))

    const btnsDom = useMemo(() => {
        if (Array.isArray(addonAfterBtns) && addonAfterBtns.length) {
            // 无边框状态下 默认text btn
            const defaultBtnType = underline ? 'text' : ''
            return addonAfterBtns.map(({ key, text, ...rest }) => (
                <Button
                    key={key}
                    type={defaultBtnType}
                    onClick={() => {
                        console.log(`---你点击了${text}按钮---`, {
                            value: concatValue(pca, detail),
                            btnKey: key,
                            name,
                            pca,
                            detail,
                        })
                        onAddonAfterBtns({ value: concatValue(pca, detail), btnKey: key, name })
                    }}
                    {...rest}
                >
                    {text}
                </Button>
            ))
        }
        return null
    }, [addonAfterBtns, pca, detail])

    const inputDom = useMemo(() => {
        if (!hasInput) {
            return null
        }
        return <Input placeholder="请输入详细地址" value={detail} onChange={(e) => handleInputChange(e)} />
    }, [hasInput, detail])

    const _options = useMemo(() => {
        let result: any = OPTIONS
        if (level === 1) {
            result = PROVINCES
        }
        if (level === 2) {
            result = PC_OPTIONS
        }
        return result
    }, [level])

    const _placeholder = useMemo(() => {
        if (placeholder) {
            return placeholder
        }
        if (level === 1) {
            return '请选择省'
        }
        if (level === 2) {
            return '请选择省市'
        }
        return '请选择省市区'
    }, [level])

    const handleChange = (value: any[]) => {
        setPca(value)
        onChange(concatValue(value, detail))
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setDetail(value)
        onChange(concatValue(pca, value))
    }

    if (mode === 'read') {
        let dom = null
        if (value) {
            dom = replace(value, /#/g, ',')
        }
        if (format && value) {
            dom = <>{format(value)}</>
        }
        return <>{dom}</>
    }

    return (
        <Input.Group
            compact
            className={classnames('address-input-group', { 'address-input-group-underline': underline })}
        >
            <Cascader
                showSearch
                placeholder={_placeholder}
                options={_options}
                value={pca}
                title={join(pca, ',')}
                onChange={handleChange}
                {...rest}
            />
            {inputDom}
            {btnsDom}
        </Input.Group>
    )
}
export default forwardRef(AddressCascader)
