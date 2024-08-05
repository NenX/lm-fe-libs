//  产科住院-入院登记-查看登记详情-病历文书-缩宫素静脉点滴观察表
import { Button } from 'antd';
import React, { useState } from 'react';
import { FormSectionForm } from '../../BaseModalForm/FormSectionForm';
import { IToggleFormProps } from './types';
import FormSection from '../../BaseModalForm/FormSection';
export default function ToggleForm<T = any>(props: IToggleFormProps<T>) {
    const { value, onChange, btnProps = {}, defaultValue = {}, formDescriptions, form, plainForm } = props
    console.log('formDescriptions toggle', props)
    const [cache, setCache] = useState<any>(null)
    const formSectionFormProps = props.formSectionFormProps ?? {}

    function onClick() {
        onChange?.(value ? cache : defaultValue)
        if (value) {
            setCache(value)
        }
    }

    return <div style={{}}  >
        <Button onClick={onClick} {...btnProps}>
            {value ? '删除' : '添加'}
        </Button>
        {
            value ? (
                plainForm ? <FormSection formDescriptions={formDescriptions} /> : <FormSectionForm  {...formSectionFormProps} formDescriptions={formDescriptions} data={value} onValuesChange={(a, values) => {
                    onChange?.(a)
                }} />
            )
                :
                null
        }



    </div>
}