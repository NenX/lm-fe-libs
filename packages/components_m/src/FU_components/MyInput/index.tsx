import React from 'react';
import { Input } from 'antd';
import { forwardRef, useState, useEffect } from 'react';
import { IMyInputProps } from './types';
import { getInputStyle } from '../../utils';
import { mchcEvent } from '@lm_fe/env';
export * from './types';
export const MyInput = forwardRef<Input, IMyInputProps>((props, myRef) => {
    const { value, onChange, width, style = {}, placeholder, name, form, onBlur, ...others } = props
    const [_value, set_value] = useState(value)

    useEffect(() => {
        set_value(value)
    }, [value])
    const _style = getInputStyle(props)

    return <Input ref={myRef} value={_value}
        onChange={e => {
            const v = e.target.value
            set_value(v)
            onChange?.(v)
        }}
        onBlur={e => {
            onBlur?.(e)
            mchcEvent.emit('my_form', {
                type: 'onBlur',
                name,
                value,
                form,
            })
        }}
        style={_style}

        {...others}

        placeholder={placeholder ?? '请输入'}
    />
})


