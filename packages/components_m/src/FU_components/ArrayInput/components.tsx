import { AutoComplete, Checkbox, InputNumber } from 'antd';
import MyInputNumber from '../../GeneralComponents/InputNumber';
import CusDatePicker from '../../GeneralComponents/DatePicker';
import InputWithLabel from '../../GeneralComponents/InputWithLabel';
import MultipleInputWithLabel from '../../GeneralComponents/MultipleInputWithLabel';
import { MyInput } from '../MyInput';
import { TOption } from './types';
import { MyAutoComplete } from '../MyAutoComplete';
import { MySelect } from '../../FU_components/MySelect';

import { lazy } from 'react';
import { MyCheckbox_Display, default as MyCheckbox } from '../../GeneralComponents/CheckboxWithInput_gold'
// import MyCheckbox from '../../GeneralComponents/CheckboxWithInput_gold';
// const MyCheckbox = lazy(() => import("../../GeneralComponents/CheckboxWithInput_gold"))
// const MyCheckbox_Display = lazy(() => import("../../GeneralComponents/CheckboxWithInput_gold/Display"))
export const componentMap: { [x in TOption['inputType']]: any } = {
    MyAutoComplete,
    MA: MyAutoComplete,
    InputWithLabel,
    MultipleInputWithLabel,
    CusDatePicker,
    DatePicker: CusDatePicker,
    MyInput,
    Input: MyInput,
    CheckboxGroup: Checkbox.Group,
    InputNumber: MyInputNumber,
    MyInputNumber,
    CheckboxWithInput: MyCheckbox,
    MyCheckbox,
    Checkbox: MyCheckbox,
    MC: MyCheckbox,
    MySelect,
    MS: MySelect,
}
export const displayComponentMap: { [x: string]: any } = {

    // CheckboxWithInput: MyCheckbox,
    MyCheckbox: MyCheckbox_Display,
}


