import { AutoComplete, Checkbox, InputNumber } from 'antd';
import MyCheckbox from '../../GeneralComponents/CheckboxWithInput_gold';
import CusDatePicker from '../../GeneralComponents/DatePicker';
import InputWithLabel from '../../GeneralComponents/InputWithLabel';
import MultipleInputWithLabel from '../../GeneralComponents/MultipleInputWithLabel';
import { MyInput } from '../MyInput';
import { TOption } from './types';
export const componentMap: { [x in TOption['inputType']]: any } = {
    AutoComplete,
    InputWithLabel,
    MultipleInputWithLabel,
    CusDatePicker,
    DatePicker: CusDatePicker,
    MyInput,
    CheckboxGroup: Checkbox.Group,
    InputNumber,
    CheckboxWithInput: MyCheckbox
}



