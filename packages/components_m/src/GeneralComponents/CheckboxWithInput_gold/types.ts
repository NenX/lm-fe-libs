import { AutoCompleteProps, InputProps } from "antd";
import { IMyInputProps } from "../../FU_components/MyInput";
import { IArrayInputProps } from "../../FU_components/ArrayInput";
import { ICusDatePickerProps } from "../DatePicker";
import { IInputWithLabelProps } from "../InputWithLabel";
import { IMultipleInputWithLabelProps } from "../MultipleInputWithLabel";
import { ICommonOption } from "@lm_fe/env";
import React from "react";

export interface ICheckboxWithInputProps {
    value?: string | ICommonOption[];
    options?: ICheckboxWithInputOption[] | string;
    onChange?(v?: any): void;
    type?: 'single' | 'multiple';
    disabled?: boolean;
    inputWidth?: number;
    optionKey?: string
    uniqueKey?: string
    marshal?: number
    sp?: ICheckboxWithInputOption[]
    vertical?: boolean
    startIndex?: number
    onBlur?(e: any): void
    style?: React.CSSProperties
}


type INil = Exclude<ICommonOption, 'props' | 'inputType'>
interface IMyInput extends ICommonOption {
    inputType: 'MyInput';
    props?: IMyInputProps
}
interface IAutoComplete extends ICommonOption {
    inputType: 'AutoComplete';
    props?: AutoCompleteProps
}
interface IInputWithLabel extends ICommonOption {
    inputType: 'InputWithLabel';
    props?: IInputWithLabelProps
}
interface IMultiple_input extends ICommonOption {
    inputType: 'MultipleInputWithLabel';
    props?: IMultipleInputWithLabelProps
}
interface ISelf extends ICommonOption {
    inputType: 'CheckboxWithInput' | 'MyCheckbox';
    props?: ICheckboxWithInputProps
}
interface IArrayInput extends ICommonOption {
    inputType: 'ArrayInput';
    props?: IArrayInputProps
}
interface ISingle_date_picker extends ICommonOption {
    inputType: 'DatePicker';
    props?: ICusDatePickerProps
}
export type ICheckboxWithInputOption = IAutoComplete | IMultiple_input | IMyInput | ISelf | ISingle_date_picker | IArrayInput | INil | IInputWithLabel