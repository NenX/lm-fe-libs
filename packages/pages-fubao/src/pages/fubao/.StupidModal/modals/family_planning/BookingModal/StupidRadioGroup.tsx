import React, { FC, CSSProperties } from 'react'
import { CheckboxOptionType, Form, Input, Radio, RadioGroupProps } from "antd";
export type TStupidRadioOptions = (CheckboxOptionType & { activeStyle?: CSSProperties, withFuckedInput?: boolean })[]
export const StupidRadioGroup: FC<Omit<RadioGroupProps, 'options'> & { options?: TStupidRadioOptions, name: string }> = (props) => {
    const { options, name, value, disabled, ...others } = props
    const fuckInputNode = <Form.Item name={`${name}Note`} noStyle>
        <Input size="small" disabled={disabled} style={{ border: 'none', borderBottom: '2px solid red', borderRadius: 0, width: 60 }} ></Input>
    </Form.Item>
    return <Radio.Group {...others} value={value} disabled={disabled}>
        {
            options?.map(_ => {
                const isActive = value == _.value
                const style = Object.assign({}, isActive ? _.activeStyle : {})
                return <Radio key={_.value.toString()} value={_.value} >
                    <span style={style}>
                        {_.label}
                        {
                            (_.withFuckedInput && _.value === value) ? fuckInputNode : null
                        }
                    </span>

                </Radio>
            })
        }

    </Radio.Group>
}