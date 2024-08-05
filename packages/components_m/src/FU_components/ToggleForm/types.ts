
import { ButtonProps, FormInstance } from 'antd';
import { IFormSectionFormProps } from '../../BaseModalForm/FormSectionForm';
import { IMchc_FormDescriptions, IMchc_FormDescriptions_Field } from '@lm_fe/service';


export interface IToggleFormProps<T = any> {
    value?: T
    title?: string,
    onChange(data: T): void
    btnProps?: ButtonProps
    formSectionFormProps: IFormSectionFormProps
    formDescriptions: IMchc_FormDescriptions_Field[]
    defaultValue?: any
    form?: FormInstance
    plainForm?: boolean
}


