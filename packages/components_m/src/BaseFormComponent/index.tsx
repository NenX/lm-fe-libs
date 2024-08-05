import React, { lazy, useCallback } from 'react';
import { get } from 'lodash';
import { Input, Checkbox, InputNumber, TimePicker, DatePicker as AntDatePicker, Radio, AutoComplete, Select } from 'antd';
import { CheckboxWithInput_lm as CheckboxWithInput } from '../ConfigComponents/CheckboxWithInput';
import { TimePickerAutoaccept } from '../BusinessComponents/TimePickerAutoaccept';
import InputWithLabel from '../GeneralComponents/InputWithLabel'
import InputWithRange from '../GeneralComponents/InputWithRange'
import PressureInput from '../BusinessComponents/PressureInput'
import NormalSelect from '../selects/NormalSelect'
import SelectWithNo from '../selects/SelectWithNo'
import SelectTagWithOptions from '../selects/SelectTagWithOptions'
import MyTreeSelect from '../MyForm/components/MyTreeSelect'
import SelectWithOptionsOrInput from '../selects/SelectWithOptionsOrInput'
import DataSelectWithOptionsOrInput from '../selects/DataSelectWithOptionsOrInput'
import PatientAutoComplete from '../selects/PatientAutoComplete'
import DictionarySelect from '../GeneralComponents/DictionarySelect'
import DictionarySelectInTable from '../ConfigComponents/DictionarySelectInTable'
import BloodPressure from '../BusinessComponents/BloodPressure'
import CustomTreeSelect from '../GeneralComponents/CustomTreeSelect'
import PureCheckbox from '../ConfigComponents/PureCheckbox'
import MyCheckbox from '../GeneralComponents/CheckboxWithInput_gold'
import SelectWithOptionsFromApi from '../selects/SelectWithOptionsFromApi'
import DatePicker from '../GeneralComponents/DatePicker'
import MultipleInputWithLabel from '../ConfigComponents/MultipleInputWithLabel'
import { MyPressure } from '../FU_components/PressureInput';
import MyInputNumber from '../GeneralComponents/InputNumber';
import { MySelect, DateTimeInput, ArrayPanel } from '../FU_components';
import { MyInput } from '../FU_components/MyInput';
import { MyAutoComplete, HourMinuteInput, CheckboxWithValue, ArrayInput, TakeInVolumn, TemplateTextarea, TakeOutVolumn, MyEditTable } from '../FU_components'
import { InterceptComponent } from 'src/utils/InterceptComponent';
const Radio_Group = Radio.Group
const AntDatePicker_MonthPicker = AntDatePicker.MonthPicker
export const componentMap = {
  'input': MyInput,
  'MyInput': MyInput,
  'Input': MyInput,
  'text_area': TemplateTextarea,
  TextArea: TemplateTextarea,
  InputNumber: MyInputNumber,
  TakeInVolumn,
  DateTimeInput,
  TakeOutVolumn,
  'patient_auto_complete': PatientAutoComplete,
  'input_with_label': InputWithLabel,
  'input_with_range': InputWithRange,
  'month_picker': AntDatePicker_MonthPicker,
  'single_date_picker': DatePicker,
  DatePicker,
  MyDatePicker: DatePicker,
  'single_time_picker': TimePicker,
  'date_picker_auto_accept': TimePickerAutoaccept,
  'checkbox': Checkbox,
  'CheckboxWithValue': CheckboxWithValue,
  MyCheckbox,
  MC: MyCheckbox,
  'dictionary_select': DictionarySelect,
  'pure_checkbox': PureCheckbox,
  'dictionary_select_in_table': DictionarySelectInTable,
  'radio_group': Radio_Group,
  'select': SelectTagWithOptions,
  'select_tag_with_options': SelectTagWithOptions,
  'normal_select': NormalSelect,
  'tree_select': MyTreeSelect,
  'tree_select_v2': CustomTreeSelect,
  'input_number': MyInputNumber,
  'select_with_no': SelectWithNo,
  'select_with_options': Select,
  'MA': MyAutoComplete,
  'MyAutoComplete': MyAutoComplete,
  'select_with_options_or_input': SelectWithOptionsOrInput,
  'data_select_with_options_or_input': DataSelectWithOptionsOrInput,
  'select_with_options_from_api': SelectWithOptionsFromApi,
  'pressure': PressureInput,
  'blood_pressure': BloodPressure,
  'MyPressure': MyPressure,
  'HourMinuteInput': HourMinuteInput,
  'auto_complete': AutoComplete,
  'checkbox_with_input': CheckboxWithInput,
  'template_textarea': TemplateTextarea,
  TemplateTextarea,
  MyTemplateTextarea: TemplateTextarea,
  'multiple_input_with_label': MultipleInputWithLabel,
  MySelect,
  Select: MySelect,
  MS: MySelect,
  ArrayInput,
  ArrayPanel,
  MyEditTable

}
export default function BaseFormComponent(props: any) {
  const { config } = props
  const type: 'Input' = get(props, 'inputType') || get(props, 'config.inputType');
  const inputProps = props.inputProps ?? {}
  const C = useCallback(
    componentMap[type] ?? (() => 'Unkown Component!'),
    [type],
  )
  return <InterceptComponent config={config} C={C} {...props} {...inputProps} />

};
