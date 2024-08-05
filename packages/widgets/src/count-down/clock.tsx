/**
 * 时间显示器
 */
import React from 'react'
import { Button } from 'antd'
import { INTERVAL, BUTTON_TYPES } from './count-down'
import { dateFormat } from './utils'
type ClockProps = {
    type?: 'outline' | 'solid' | 'text'
    format?: 'YYYY-MM-DD HH:mm:ss' | 'MM-DD HH:mm:ss' | 'HH:mm:ss'
    serverUrl?: string // 从服务器获取时间
    use12Hours?: boolean
}
const Clock = ({ type = 'outline', format = 'YYYY-MM-DD HH:mm:ss', serverUrl, use12Hours, ...rest }: ClockProps) => {
    let timerId: any = null
    const [time, setTime] = React.useState(0)

    React.useEffect(() => {
        let time = new Date().getTime()
        if (serverUrl) {
            time = getServerTime()
        }
        tick(time)
        return () => {
            timerId && clearInterval(timerId)
        }
    }, [])

    const getServerTime = () => {
        // 模拟
        return new Date().getTime()
    }

    const tick = (value?: number) => {
        let t = value ? value : time
        timerId = setInterval(() => {
            t += INTERVAL
            setTime(t)
        }, INTERVAL)
    }

    return (
        <Button type={BUTTON_TYPES[type]} {...rest}>
            {dateFormat(time, format, use12Hours)}
        </Button>
    )
}
Clock.displayName = 'Clock'
export default Clock

// const str = new Date(2022, 1, 1).toLocaleString('en-US', {
//     hour: 'numeric',
//     minute: 'numeric',
//     hour12: true
// })
