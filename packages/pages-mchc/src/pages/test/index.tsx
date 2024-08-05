import { MyImageEditor } from "@lm_fe/components";
import { FormSection, MyFormSectionForm, MyFormSection } from "@lm_fe/components_m";
import { mchcLogger } from "@lm_fe/env";
import { IMchc_FormDescriptions_Field_Nullable } from "@lm_fe/service";
import { Form } from "antd";
import React from "react";
import FF, { load_form_config } from "./form_config/Form";
const cb = (changedValues, values) => {
    mchcLogger.log('aax', { a: changedValues, b: values })
}
export default (props) => {
    const [form] = Form.useForm()
    const [form1] = Form.useForm()
    let cache: IMchc_FormDescriptions_Field_Nullable[]
    return <>
        <Form form={form} onValuesChange={cb}>
            <MyFormSection
                formDescriptions={load_form_config}
                form={form}
            />
        </Form>

        <FF />



    </>
}