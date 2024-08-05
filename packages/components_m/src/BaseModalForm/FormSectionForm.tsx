import { mchcEvent } from '@lm_fe/env';
import { IMchc_FormDescriptions_Field_Nullable } from '@lm_fe/service';
import { Form, FormInstance, FormProps } from 'antd';
import { FieldData } from 'rc-field-form/lib/interface';
import React, { useEffect } from 'react';
import { FormSection } from './index';
import { IFormSectionProps } from './FormSection';
type IBase = Omit<FormProps<any>, 'labelCol' | 'onFieldsChange' | 'onValuesChange' | 'wrapperCol'> & IFormSectionProps
export interface IFormSectionFormProps<T = any> extends IBase {
    onFieldsChange?(changedFields: FieldData[], allFields: FieldData[], form: FormInstance): void
    onValuesChange?(changedValues: { [x in keyof T]: any }, values: T, form: FormInstance): void;
    data?: T
}
export function FormSectionForm<T extends Object>(props: IFormSectionFormProps<T>) {
    const { onFieldsChange, onValuesChange, data, style = {}, ...others } = props
    const [_form] = Form.useForm<any>()
    const form = props.form ?? _form


    useEffect(() => {
        form.resetFields()
        form.setFieldsValue(data ?? {} as any);


        return () => {

        }
    }, [data])

    function renderEditContent() {
        return <FormSection form={form} {...others} />;
    };
    return (


        <Form
            {...others}

            onFieldsChange={(a, b) => {
                onFieldsChange?.(a, b, form)
            }}
            onValuesChange={(changedValues, values) => {
                onValuesChange?.(changedValues, values, form)
                mchcEvent.emit('my_form', {
                    type: 'onChange',
                    name: Object.keys(changedValues)[0],
                    value: Object.values(changedValues)[0],
                    values,
                    setValue: (name, value) => {
                        debugger
                        const a = { [name]: value } as any
                        form.setFieldsValue(a)
                    },
                })
            }}

            autoComplete="off"
            // {...formItemLayout}
            style={{ padding: 12, paddingBottom: 48, ...style }}
            form={form}

        >
            {renderEditContent()}
        </Form>
    );

};