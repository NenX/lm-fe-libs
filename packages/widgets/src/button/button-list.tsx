import React, { useState } from 'react'
import classNames from 'classnames'
import { Button, Dropdown, Menu } from 'antd'
import { MoreOutlined, DownOutlined } from '@ant-design/icons'
import { ButtonSize, ButtonProps } from 'antd/lib/button'
import './index.less'
export interface ActionButtonProps extends ButtonProps {
    key: string
    text: string
    onClick: (params?: unknown) => void
}
export interface ButtonListProps {
    prefixCls?: string
    className?: string
    style?: React.CSSProperties
    list: ActionButtonProps[]
    // button 大小
    size?: ButtonSize
    maxCount?: number
    // 自定义更多操作节点
    more?: React.ReactNode
    moreType?: 'text' | 'icon'
    isLink?: boolean
    compact?: boolean
    onClick?: (key: string) => void
}
const ButtonList: React.FC<ButtonListProps> = (props) => {
    const {
        prefixCls,
        className,
        style,
        list = [],
        size,
        isLink,
        more,
        moreType,
        maxCount = 3,
        compact,
        onClick,
    } = props
    const [buttons, setButtons] = useState<ActionButtonProps[]>([])
    const [menus, setMenus] = useState<ActionButtonProps[]>([])

    React.useEffect(() => {
        if (list.length > maxCount) {
            let buttons = list.slice(0, maxCount)
            buttons = buttons.map((item) => Object.assign(item, { size }))
            setButtons(buttons)
            setMenus(list.slice(maxCount))
        } else {
            setButtons(list)
        }
    }, [props.list])

    const moreRender = () => {
        if (more) {
            return more
        }
        if (moreType === 'text') {
            return (
                <>
                    更多操作
                    <DownOutlined />
                </>
            )
        }
        return <MoreOutlined />
    }

    return (
        <div
            className={classNames(className, {
                [`${prefixCls}`]: true,
                ['ant-btn-group']: compact,
                [`is-link`]: isLink,
            })}
            style={style}
        >
            {buttons.length > 0 &&
                buttons.map((item, index) => {
                    const { key, text, type, className, onClick: onItemClick, ...buttonProps } = item

                    return (
                        <Button
                            key={key || index}
                            type={isLink ? 'link' : type}
                            className={classNames(className, {
                                [`${prefixCls}__button-${type}`]: isLink,
                            })}
                            onClick={() => {
                                onClick && onClick(key)
                                onItemClick && onItemClick()
                            }}
                            {...buttonProps}
                        >
                            {text}
                        </Button>
                    )
                })}
            {menus.length > 0 && (
                <Dropdown
                    overlay={
                        <Menu
                            className={classNames(className, {
                                [`${prefixCls}-dropdown`]: true,
                                ['small']: size === 'small',
                            })}
                        >
                            {menus.map((item, index) => (
                                <Menu.Item
                                    key={item.key || index}
                                    onClick={() => {
                                        onClick && onClick(item.key)
                                        item.onClick()
                                    }}
                                    disabled={item.disabled}
                                >
                                    {item.text}
                                </Menu.Item>
                            ))}
                        </Menu>
                    }
                >
                    <Button size={size} type={isLink ? 'link' : 'default'}>
                        {moreRender()}
                    </Button>
                </Dropdown>
            )}
        </div>
    )
}
ButtonList.defaultProps = {
    prefixCls: 'ant-button-list',
    maxCount: 3,
    size: 'middle',
    isLink: false,
    moreType: 'text',
}
export default ButtonList
