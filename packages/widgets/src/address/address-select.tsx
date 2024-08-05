/**
 * 地址选择输入组件，select+input
 */
import React, { useState, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import { Input, Button } from 'antd'
import { split, replace, indexOf } from 'lodash'
import Select from '../select/single-select'
import Text from '../text'
import { PROVINCES, CITIES, AREAS, MUNICIPALITIES } from './china-division'
import './index.less'
export const concatValue = (pca: string[], detail?: string) => {
    let text = undefined
    if (pca) {
        const pcaText = pca.join(',')
        if (detail) {
            text = `${pcaText}#${detail}`
        }
    }
    return text
}
type AddressSelectInputProps = {
    /**
     * field name
     */
    name?: string | string[]
    defaultValue?: string
    value?: string
    onChange?: (value?: string) => void
    /**
     * 下划线样式，默认antd四边有边框
     */
    underline?: boolean
    /**
     * 是否有详细地址输入框
     */
    hasInput?: boolean
    mode?: 'read' | 'edit'
    format?: (value?: string) => React.ReactNode
    /**
     * 后置btn标签
     */
    addonAfterBtns?: any[]
    /**
     * 后置btn标签点击事件
     */
    onAddonAfterBtns?: ({ name, btnKey, value }: { name?: string | string[]; btnKey: string; value?: string }) => void
    /**
     * level
     */
    level?: 1 | 2 | 3
}
const AddressSelect: React.ForwardRefRenderFunction<any, AddressSelectInputProps> = (
    {
        name,
        defaultValue,
        value,
        onChange = () => {},
        underline,
        hasInput,
        mode,
        format,
        addonAfterBtns,
        onAddonAfterBtns = () => {},
        level = 3,
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
        arr[0] && setPca(split(arr[0], ','))
        arr[1] && setDetail(arr[1])
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
                        console.log(`---你点击了${text}按钮---`, { value: concatValue(pca, detail), btnKey: key, name })
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
        return (
            <Text
                underline={underline}
                placeholder="请输入详细地址"
                value={detail}
                onChange={(e) => handleInputChange(e)}
            />
        )
    }, [hasInput, detail])

    const handleProvinceChange = (value: string) => {
        console.log('----选择省----', value, [value])
        if (value !== pca[0]) {
            setPca([value])
            onChange(concatValue([value], detail))
        }
    }

    const handleCityChange = (value: string) => {
        console.log('----选择市/区----', value, [pca[0], value])
        if (value !== pca[1]) {
            setPca([pca[0], value])
            onChange(concatValue([pca[0], value], detail))
        }
    }

    const handleAreaChange = (value: string) => {
        console.log('----选择县/区----', value, [pca[0], pca[1], value])
        if (value !== pca[2]) {
            setPca([pca[0], pca[1], value])
            onChange(concatValue([pca[0], pca[1], value], detail))
        }
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
        <Input.Group compact className="address-input-group">
            <Select
                showSearch
                placeholder="省/直辖市"
                underline={underline}
                options={PROVINCES}
                value={pca[0]}
                onChange={handleProvinceChange}
            />
            {level === 2 && (
                <Select
                    showSearch
                    placeholder="市/区"
                    underline={underline}
                    options={CITIES[pca[0]]}
                    value={pca[1]}
                    onChange={handleCityChange}
                />
            )}
            {level === 3 && indexOf(MUNICIPALITIES, pca[0]) <= -1 && (
                <Select
                    showSearch
                    placeholder="区/县"
                    underline={underline}
                    options={AREAS[pca[1]]}
                    value={pca[2]}
                    onChange={handleAreaChange}
                />
            )}
            {inputDom}
            {btnsDom}
        </Input.Group>
    )
}
export default forwardRef(AddressSelect)
