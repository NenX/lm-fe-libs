//  产科住院-入院登记-查看登记详情-病历文书-缩宫素静脉点滴观察表
import { IMchc_FormDescriptions_Field } from '@lm_fe/service';
import React from 'react';
import { FormSectionForm } from '../../BaseModalForm/FormSectionForm';
import CommonFormTabs from './CommonFormTabs';
import { ICommonFormTabsProps } from './types';
import { FormInstance, FormProps } from 'antd';
interface IFormTabsProps<T = any> extends ICommonFormTabsProps<T> {
    fds?: IMchc_FormDescriptions_Field[]
    forms?: FormInstance[]
    FormSize?: FormProps['size']

}
export default function FormTabs<T = any>(props: IFormTabsProps<T>) {
    const { value = [], fds = [], onChange, forms = [], FormSize, disabled } = props






    return <div style={{}}  >

        <CommonFormTabs<any>
            renderTabNode={(data, index) => {
                return (
                    <FormSectionForm disableAll={disabled} size={FormSize} form={forms[index]} data={data} formDescriptions={fds} onValuesChange={(changedValues, values) => {
                        console.log('www', data, values)
                        debugger
                        value[index] = { ...data, ...values } as any
                        onChange?.([...value], index, changedValues)
                    }} />
                )
            }}
            {...props}

        />



    </div>
}