import { Form } from "antd";
import React from "react";
import { ComponentMapping } from "../components";
import { GetProps } from "./help";




type OptionsWithType<T extends keyof typeof ComponentMapping, V extends any> = {
    type?: T,
    customNode?: React.ReactNode
    isLayout?: boolean
    innerOptions?: GetProps<typeof ComponentMapping[T]>[0],
    outerOptions?: Omit<GetProps<typeof Form.Item>[0], 'name'> & { name: keyof V }
    chosen?: boolean
    remote?: boolean
    readonly?: boolean,
    showLabel?: boolean
    remoteOptions?: any[],
    width?: number
    remoteFunc?: string
    onChangeFunc?: string
    id?: string
    icon?: string
    key?: string
    model?: string
    required?: boolean
    customClass?: string
}

export type AllTypes<V = any> = OptionsWithType<'Input', V>
    | OptionsWithType<'Select', V>
    | OptionsWithType<'Radio', V>
    | OptionsWithType<'TextArea', V>
    | OptionsWithType<'InputNumber', V>
    | OptionsWithType<'Checkbox', V>
    | OptionsWithType<'TimePicker', V>
    | OptionsWithType<'DatePicker', V>
    | OptionsWithType<'Switch', V>
    | OptionsWithType<'Rate', V>
    | OptionsWithType<'Color', V>
    | OptionsWithType<'CheckboxGroup', V>
    | OptionsWithType<'Text', V>
    | OptionsWithType<'Divider', V>
    | OptionsWithType<'Grid', V>
    // | OptionsWithType<'HospitalTreeSelect',V>
    | OptionsWithType<'SwitchSelect', V>
    | OptionsWithType<'SimpleSelect', V>
    | OptionsWithType<'Custom', V>
    | OptionsWithType<'TabForm', V>
    | OptionsWithType<'MultiInput', V>
    | OptionsWithType<'RangePicker', V>
    | null


