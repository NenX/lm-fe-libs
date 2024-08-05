/**
 * 普通的 Input.TextArea
 */
import React from 'react'

import AntdTextArea, { TextAreaProps as AntTextAreaProps } from 'antd/es/input/TextArea'
import Paragraph, { ParagraphProps } from 'antd/es/typography/Paragraph'
import classnames from 'classnames'
import './index.less'

type TextAreaProps = AntTextAreaProps & {
    underline?: boolean
    mode?: 'read' | 'edit'
    emptyText?: React.ReactNode
    /**
     * // 阅读模式下的属性，参考antd typography
     */
    readProps?: ParagraphProps
}

const TextArea: React.ForwardRefRenderFunction<any, TextAreaProps> = (
    { underline, mode, emptyText, placeholder = '请输入', readProps, ...rest },
    ref,
) => {
    if (mode === 'read') {
        const { value } = rest
        const dom = (
            <Paragraph className="ant-textarea-paragraph" {...readProps}>
                {value ?? emptyText}
            </Paragraph>
        )

        return dom
    }
    return (
        <AntdTextArea
            ref={ref}
            className={classnames({ 'ant-input-underline': underline })}
            placeholder={placeholder}
            onKeyPress={(e) => {
                if (e.key === 'Enter') e.stopPropagation()
            }}
            {...rest}
        />
    )
}

export default React.forwardRef(TextArea)
