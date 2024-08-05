import { AutoCompleteProps, InputNumberProps, InputProps, SelectProps } from 'antd';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import { ICheckboxWithInputProps } from '../../GeneralComponents/CheckboxWithInput_gold';
import { ICusDatePickerProps } from '../../GeneralComponents/DatePicker';
import { IInputWithLabelProps } from '../../GeneralComponents/InputWithLabel';
import { IMultipleInputWithLabelProps } from '../../GeneralComponents/MultipleInputWithLabel';
import { IMyInputProps } from '../MyInput';
import { ICommonOption } from '@lm_fe/env';




interface IBase<T, P> {
    inputType: T
    props: P
    text: string
}


export type TOption =
    IBase<'AutoComplete', AutoCompleteProps> |
    IBase<'InputWithLabel', IInputWithLabelProps> |
    IBase<'MultipleInputWithLabel', IMultipleInputWithLabelProps> |
    IBase<'CusDatePicker', ICusDatePickerProps> |
    IBase<'DatePicker', ICusDatePickerProps> |
    IBase<'MyInput', IMyInputProps> |
    IBase<'CheckboxGroup', CheckboxGroupProps> |
    IBase<'InputNumber', InputNumberProps> |
    IBase<'CheckboxWithInput', ICheckboxWithInputProps>



export interface IMySelectProps extends Omit<SelectProps<any>, 'options'> {
    // options?: (Partial<TOption> & { prefix?: string, suffix?: string, label: string, value: any, warning?: boolean })[]
    type?: 'multiple' | 'tags';
    options?: ICommonOption[]
    optionKey?: string
    uniqueKey?: string
    value?: any;
    onChange?(v: any): void;
    marshal?: number
}