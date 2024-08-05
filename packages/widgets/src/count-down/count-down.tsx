/**
 * 计时器、倒计时
 */
import React from 'react'
import { Button } from 'antd'
import { initTime, defaultFormat } from './utils'
export const INTERVAL = 1000
export enum BUTTON_TYPES {
    outline = 'default',
    solid = 'primary',
    text = 'text',
}
type CountDownProps = {
    format?: (value: number) => React.ReactNode
    onEnd?: (value?: any) => void
    type?: 'outline' | 'solid' | 'text'
    target?: number
}
const CountDown = ({ format = defaultFormat, target, type = 'outline', onEnd, ...rest }: CountDownProps) => {
    let timer: any = null

    const [time, setTime] = React.useState<number>(initTime(new Date().getTime()))

    React.useEffect(() => {
        if (target) {
            const t = initTime(target)
            setTime(t)
            tick(t)
        }
        return () => {
            clearTimeout(timer)
        }
    }, [])

    const tick = (t: number) => {
        timer = setTimeout(() => {
            if (t < INTERVAL) {
                clearTimeout(timer)
                setTime(0)
                onEnd?.()
            } else {
                t -= INTERVAL
                setTime(t)
                tick(t)
            }
        }, INTERVAL)
    }

    return (
        <Button type={BUTTON_TYPES[type]} {...rest}>
            {format(time)}
        </Button>
    )
}
CountDown.displayName = 'CountDown'
export default CountDown
