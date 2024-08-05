import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/es/button'
import { sendCodeLocale, getTemplateText } from './utils'

export interface SendCodeProps extends ButtonProps {
    // 倒计时时长（秒）默认60
    second?: number
    // 初始化按钮显示文本
    initText?: string
    // 运行时显示文本
    // 自己设置必须包含{%s}
    runText?: string
    // 运行结束后显示文本
    resetText?: string
    // 储存倒计时剩余时间sessionStorage的键值，设置不为空后，刷新页面倒计时将继续
    storageKey?: string
    // 倒计时开始执行函数
    onStart?: () => void
    // 倒计时结束执行函数
    onEnd?: () => void
}

export interface SendCodeLocale {
    initText: string
    runText: string
    resetText: string
}

/**
 * 状态 0: 初始 1: 运行  2: 结束
 */
export type SendCodeStatus = 0 | 1 | 2

const SendCode: React.FC<SendCodeProps> = ({
    // start,
    initText,
    resetText,
    runText,
    onEnd,
    onStart,
    second,
    storageKey,
    onClick,
    ...rest
}) => {
    const [status, setStatus] = useState<SendCodeStatus>(0)
    const [runSecond, setRunSecond] = useState<number | undefined>(second)
    const timer = useRef<NodeJS.Timer>(null)

    useEffect(() => {
        // 获取存储的倒计时时间
        const storageLastSecond = ~~((+window.sessionStorage.getItem(storageKey) - new Date().getTime()) / 1000)
        // 执行剩下的倒计时
        if (storageLastSecond > 0 && storageKey) {
            startCountdown(storageLastSecond)
        }

        return () => {
            if (timer.current) {
                clearInterval(timer.current)
            }
        }
    }, [])

    const startCountdown = (value?: number) => {
        let second = value ? value : runSecond

        setStatus(1)
        setRunSecond(second)

        if (storageKey) {
            const runSecond = new Date().getTime() + second * 1000
            window.sessionStorage.setItem(storageKey, runSecond + '')
        }

        timer.current = setInterval(() => {
            second -= 1

            setRunSecond(second)

            if (second <= 0) {
                timeout()
            }
        }, 1000)
    }

    const timeout = () => {
        // 设置为运行结束后状态
        setStatus(2)
        setRunSecond(second)
        if (timer.current) {
            clearInterval(timer.current)
        }
        if (storageKey) {
            window.sessionStorage.removeItem(storageKey)
        }
        // 发出倒计时结束事件
        onEnd?.()
    }

    const getText = (sendCodeLocale: SendCodeLocale) => {
        switch (status) {
            case 1:
                return getTemplateText(runText || sendCodeLocale.runText, runSecond)
            case 2:
                return resetText || sendCodeLocale.resetText
            default:
                return initText || sendCodeLocale.initText
        }
    }

    const handleClick = (e: any) => {
        startCountdown()
        onClick && onClick(e)
    }

    return (
        <Button disabled={status === 1} onClick={handleClick} {...rest}>
            {getText(sendCodeLocale)}
        </Button>
    )
}

SendCode.displayName = 'SendCode'
SendCode.defaultProps = {
    second: 60,
}

export default SendCode
