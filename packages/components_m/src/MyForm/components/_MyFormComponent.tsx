import { lazy } from 'react'; // lazy(() => import('./formItem'));
import { MyForm_Business_PregnancyHistory } from './business/PregnancyHistory';
import React from 'react'
import AddressCascader from '../../selects/CascaderAddress'
import MyInput from './MyInput'
import MyInputWithRed from './MyInputWithRed'
import MyDateTime from './MyDateTime'
import MySelect from './MySelect'
import MyTable from './MyTable'
import MyButton from './MyButton'
import MyCustom from './MyCustom'
import ArrayCustom from './MyCustom/ArrayCustom'
import ArrayCustomTab from './MyCustom/ArrayCustomTab'
import MyCascader from './MyCascader'
import MyTreeSelect from './MyTreeSelect'
import MyAutoCompleteOld from './MyAutoComplete'
import { MyAutoComplete } from '../../FU_components/MyAutoComplete'
import BloodPressureInput from './business/BloodPressure'
import DoubleInput from './business/DoubleInput'
import FilterDateInput from './business/FilterDateInput'
import NormalButton from './business/NormalButton'
import TextareaWithBtn from './business/TextareaWithBtn'
import TextareaWithTemplate from './business/TextareaWithTemplate'
import FundalHeightInput from './business/FundalHeightInput'
import BloodAndThalassemia from './business/BloodAndThalassemia'
import PdProcedure from './business/PdProcedure'
import IntrauterineBloodTransfusion from './business/PdProcedure/IntrauterineBloodTransfusion'
import Cystocentesis from './business/PdProcedure/Cystocentesis'
import InputWithLabel from '../../GeneralComponents/InputWithLabel'
import BloodFlows from './business/BloodFlows'
import HemogramExam from './business/HemogramExam'
import CheckboxWithInput_lm from '../../ConfigComponents/CheckboxWithInput'
import CheckAndCancelButton from '../../GeneralComponents/CheckAndCancelButton'
import NativePlace from '../../selects/NativePlace/NativePlace'
import PrenatalReturnTable from './business/prenatalReturnTable'
import { HbvdnaInput, TemplateTextarea, DateTimeInput, MyCheckbox, MyEditTable } from '../../FU_components'
const MyCheckboxOld = lazy(() => import('./MyCheckbox'))
const MyComponent = {
  MyEditTable,
  input: MyInput,
  Input: MyInput,
  MyInput,
  date: MyDateTime,
  select: MySelect,
  Select: MySelect,
  MS: MySelect,
  MySelect,
  checkbox: MyCheckboxOld,
  Checkbox: MyCheckboxOld,
  MyCheckbox: MyCheckbox,
  MC: MyCheckbox,
  table: MyTable,
  cascader: MyCascader,
  treeselect: MyTreeSelect,
  autoComplete: MyAutoCompleteOld,
  MyAutoComplete,
  MA: MyAutoComplete,
  // "simple-object": SimpleObject,
  // 功能性的button组件
  button: MyButton,
  normalButton: NormalButton,
  textareaWithBtn: TextareaWithBtn,
  textareaWithTemplate: TextareaWithTemplate,
  custom: MyCustom,
  'array-custom': ArrayCustom,
  'array-custom-tab': ArrayCustomTab,
  // 业务类组件
  addressCascader: AddressCascader,
  bloodPressureInput: BloodPressureInput,
  doubleInput: DoubleInput,
  // 产前的孕产史组件
  pdPrenancyHistoriesTable: MyForm_Business_PregnancyHistory,
  // 带有template的textarea
  'template-textarea': TemplateTextarea,
  TemplateTextarea,
  // 产科门诊孕产史
  pregnancyHistoryTable: MyForm_Business_PregnancyHistory,
  // 孕产史年月组件
  filterDateInput: FilterDateInput,
  fundalHeightInput: FundalHeightInput,
  prenatalReturnTable: PrenatalReturnTable,
  input_with_label: InputWithLabel,
  my_input_with_red: MyInputWithRed,

  'blood-and-thalassemia': BloodAndThalassemia,
  'blood-flows': BloodFlows,
  'pd-procedure': PdProcedure,
  'intrauterine-blood-transfusion': IntrauterineBloodTransfusion,
  cystocentesis: Cystocentesis,
  'hemogram-exam': HemogramExam,
  'native-place': NativePlace,
  blank: () => <div style={{ height: 32 }}></div>,
  check_invert_button: CheckAndCancelButton,
  'checkbox_with_input': CheckboxWithInput_lm,
  hbvdna_input: HbvdnaInput,
  DateTimeInput,
};
export default MyComponent
