/**
 * 最基本的组件，就是个普通的 Input
 */
import React, { useEffect, useImperativeHandle, useRef } from 'react'
import Input, { InputProps } from 'antd/es/input'
import TypographyText, { TextProps as TypographyTextProps } from 'antd/es/typography/Text'
import classnames from 'classnames'
import './index.less'
type TextProps = InputProps & {
    underline?: boolean
    mode?: 'read' | 'edit'
    emptyText?: React.ReactNode
    readProps?: TypographyTextProps
}
const Text: React.ForwardRefRenderFunction<any, TextProps> = (
    {
        className,
        placeholder = '请输入',
        underline,
        mode = 'edit',
        autoFocus,
        emptyText,
        readProps,
        ...rest
    }: TextProps,
    ref,
) => {
    const inputRef = useRef<HTMLInputElement>()

    useImperativeHandle(ref, () => inputRef?.current)

    useEffect(() => {
        if (autoFocus) {
            inputRef.current?.focus()
        }
    }, [autoFocus])

    if (mode === 'read') {
        const { prefix = '', suffix = '', value } = rest
        const dom = (
            <TypographyText {...readProps}>
                {prefix}
                {value ?? emptyText}
                {suffix}
            </TypographyText>
        )
        return dom
    }

    return (
        <Input
            allowClear
            ref={inputRef}
            className={classnames({ 'ant-input-underline': underline, ...(className && { [className]: true }) })}
            placeholder={placeholder}
            {...rest}
        />
    )
}
export default React.forwardRef(Text)
