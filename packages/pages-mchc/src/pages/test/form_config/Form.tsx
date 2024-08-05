
import { mchcEnv } from '@lm_fe/env'
import { MyFormSectionForm } from "@lm_fe/components_m";
import { mchcEvent } from "@lm_fe/env";
import { Form } from "antd";
import React, { useEffect } from "react";
interface IProps { }
interface IDataShape {
    name: string
}
export function load_form_config() {
    if (mchcEnv.is('广三')) return import('./广三')
    if (mchcEnv.is('建瓯')) return import('./建瓯')
    return import('./default')
 }


export default (props: IProps) => {

    const [form] = Form.useForm()

    useEffect(() => {
        const rm = mchcEvent.on_rm('my_form', e => {
            mchcEnv.logger.log('event receive', { e })
            if (e.type === 'onChange') {

            }
            else if (e.type === 'onClick') {

            }
        })
        return rm
    }, [])

    //@ts-ignore
    return <MyFormSectionForm<IDataShape> formDescriptions={load_form_config} form={form} onValuesChange={(changedValues, values) => { }} />

}