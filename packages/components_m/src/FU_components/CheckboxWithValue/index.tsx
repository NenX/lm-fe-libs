import React, { useEffect, useState } from 'react';
import { Checkbox, CheckboxProps, Switch } from 'antd'
export interface ICheckboxWithValueProps extends CheckboxProps {
    onChange?(v: any): void,
    checkedValue: any
    uncheckedValue: any
    type?: 'checkbox' | 'switch'
}
export function CheckboxWithValue(props: ICheckboxWithValueProps) {
    const { value, onChange, children, checkedValue = true, uncheckedValue = false, type = 'checkbox' } = props
    if (type === 'switch') {
        return <Switch
            checked={value === checkedValue}
            onChange={e => {
                onChange?.(e ? checkedValue : uncheckedValue)
            }}
        />
    }
    return <Checkbox
        checked={value === checkedValue}
        onChange={e => {
            onChange?.(e.target.checked ? checkedValue : uncheckedValue)
        }}
    > {children} </Checkbox>
}