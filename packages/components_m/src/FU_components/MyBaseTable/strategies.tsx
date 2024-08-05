// import { ILmFormItemConfigMixin } from "@/lmTypes"
import React, { } from "react";
import { Form, Select, DatePicker, TimePicker, Input, Space, Switch, SwitchProps, SelectProps, FormInstance } from "antd";
import { ILmFormItemConfigMixin } from "../SimpleForm/types/lmTypes";
import CusDatePicker from "../../GeneralComponents/DatePicker";
import { IMchc_FormDescriptions_Field, IMchc_FormDescriptions_Field_Nullable } from "@lm_fe/service";
import { FormSection } from "../../BaseModalForm";
import { MyFormSection } from "../FormSection";
// import { ArrayInput } from "../ArrayInput";

// import { HospitalTreeSelect } from "../../demain-components/HospitalTreeSelect";
const m = {
    Input,
    Select,
    // HospitalTreeSelect,
    // ArrayInput: ArrayInput,
    RangePicker: DatePicker.RangePicker,
    DatePicker,
    MyDatePicker: CusDatePicker,
    TimePicker,
    Switch,
    SwitchSelect
}
export function MyBaseListRenderFormItem({ searchSchema, disabled }: { searchSchema: ILmFormItemConfigMixin[], disabled?: boolean }) {

    return (
        <Space>
            {
                searchSchema?.map((config) => {
                    const { type, innerOptions, outerOptions } = config
                    const C = m[type]
                    if (C) {
                        return <Form.Item style={{ margin: 0, }} {...outerOptions}><C disabled={disabled} allowClear placeholder="请选择" style={{ minWidth: 120 }} {...innerOptions} /></Form.Item>
                    }

                    return (
                        <Form.Item style={{ margin: 0, }}>{"type error " + config?.type}</Form.Item>
                    )
                }) || null
            }
        </Space>
    )
}
export function MyBaseListRenderFormSection({ config, disabled, form }: { config: IMchc_FormDescriptions_Field_Nullable[], disabled?: boolean, form?: FormInstance }) {

    return (
        <MyFormSection form={form} defaultOptions={{}} inline formDescriptions={config.map(_ => {
            if (!_) return _
            const props = _.inputProps ?? _.props ?? {}
            props.allowClear = true
            if (['Select', 'select', 'MySelect', 'MS'].includes(_.inputType!) && !_.inputProps?.width) {
                props.width = 180
            }
            _.inputProps = props

            return _
        })} disableAll={disabled} />

    )
}
function SwitchSelect(props: SelectProps<any>) {
    const { value } = props
    return <Select {...props} value={typeof value === 'undefined' ? value : +value} options={['否', '是'].map((_, idx) => ({ label: _, value: idx }))} onChange={(a, b) => {
        props.onChange?.(typeof a === 'undefined' ? a : !!a, b)
    }} />
}