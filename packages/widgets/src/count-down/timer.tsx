/**
 * 计时器
 */
import React from 'react'
import { Button } from 'antd'
import { INTERVAL, BUTTON_TYPES } from './count-down'
import { timerFormat, defaultFormat } from './utils'
type TimerProps = {
    autoStart?: boolean
    type?: 'outline' | 'solid' | 'text'
}
const Timer = ({ autoStart, type = 'outline', ...rest }: TimerProps) => {
    let timerId: any = null
    const [time, setTime] = React.useState(0)
    const [on, setOn] = React.useState(false)

    React.useEffect(() => {
        autoStart && tick()
        return () => {
            timerId && clearInterval(timerId)
        }
    }, [])

    // TODO
    const start = () => {
        setOn(true)
        tick(time)
    }

    const stop = () => {
        setOn(false)
        timerId && clearInterval(timerId)
    }

    const clean = () => {}

    const tick = (value?: number) => {
        let t = value ? value : time
        timerId = setInterval(() => {
            t += INTERVAL
            setTime(t)
        }, INTERVAL)
    }

    return (
        <span>
            <Button type={BUTTON_TYPES[type]} onClick={on ? stop : start} {...rest}>
                {defaultFormat(time)}
            </Button>
        </span>
    )
}
Timer.displayName = 'Timer'
export default Timer
