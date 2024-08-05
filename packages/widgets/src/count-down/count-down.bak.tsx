/**
 * 倒计时
 */
import React, { Component } from 'react'
import { Button } from 'antd'
import { initTime, defaultFormat } from './utils'
const BUTTON_TYPES = {
    outline: 'default',
    solid: 'primary',
    text: 'text',
}
export default class CountDown extends Component {
    timer = 0
    interval = 1000

    constructor(props) {
        super(props)
        const lastTime = initTime(props.target)
        this.state = {
            lastTime,
        }
    }

    static getDerivedStateFromProps(nextProps, preState) {
        const lastTime = initTime(nextProps.target)
        if (preState.lastTime !== lastTime) {
            return {
                lastTime,
            }
        }
        return null
    }

    componentDidMount() {
        this.tick()
    }

    componentDidUpdate(prevProps) {
        const { target } = this.props
        if (target !== prevProps.target) {
            clearTimeout(this.timer)
            this.tick()
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    tick = () => {
        const { onEnd } = this.props
        let { lastTime } = this.state

        this.timer = setTimeout(() => {
            if (lastTime < this.interval) {
                clearTimeout(this.timer)
                this.setState(
                    {
                        lastTime: 0,
                    },
                    () => {
                        if (onEnd) {
                            onEnd()
                        }
                    },
                )
            } else {
                lastTime -= this.interval
                this.setState(
                    {
                        lastTime,
                    },
                    () => {
                        this.tick()
                    },
                )
            }
        }, this.interval)
    }

    render() {
        const { format = defaultFormat, onEnd, type = 'outline', ...rest } = this.props
        const { lastTime } = this.state
        const result = format(lastTime)

        return (
            <Button type={BUTTON_TYPES[type]} {...rest}>
                {result}
            </Button>
        )
    }
}
