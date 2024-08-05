import React, { lazy } from 'react';
import { ConfigComponents_DictionarySelect } from '../../ConfigComponents/DictionarySelect';
import {
    ArrayInput,
    ArrayPanel,
    MyCheckbox,
    CheckboxWithValue,
    HourMinuteInput,
    MyEditTable,
    MyRangeDate,
    MyRangeDateTime,
    MyReferralOrganizationSelect,
} from '../../FU_components';
import { MyAutoComplete } from '../../FU_components/MyAutoComplete';
import { MySelect } from '../../FU_components/MySelect';
import { MyPressure } from '../../FU_components/PressureInput';
// import RowoftireRecordBaby from '../../others/baby-form';
import DictionarySelect from '../../GeneralComponents/DictionarySelect'
import { MyMonaco, MyAddress } from '@lm_fe/components'
import DataSelectWithOptionsOrInput from '../../selects/DataSelectWithOptionsOrInput'
import NativePlace from '../../selects/NativePlace/NativePlace'
import PatientAutoComplete from '../../selects/PatientAutoComplete'
const BirthCertificateChildren = lazy(() => import('../../BusinessComponents/BirthCertificateChildren'))
const Deathclassification1 = lazy(() => import('../../BusinessComponents/TemplateTexDeathclassification1'))
const Deathclassification2 = lazy(() => import('../../BusinessComponents/TemplateTexDeathclassification2'))
const TemplateTextareav3 = lazy(() => import('../../BusinessComponents/TemplateTextareav3'))
const TemplateTextrootcauseDeath = lazy(() => import('../../BusinessComponents/TemplateTextrootcauseDeath'))
const RevertEditInTable = lazy(() => import('../../ConfigComponents/RevertEditInTable'))
const BorderTitle = lazy(() => import('../../GeneralComponents/border-title/border-title'))
const CheckboxGroupObjectCustom = lazy(() => import('../../GeneralComponents/CheckboxGroupObjectCustom'))
const CureState = lazy(() => import('../../special-components/cure-state/cure-state'))
const SyphilisTested = lazy(() => import('../../special-components/syphilis-tested/syphilis-tested'))
const DataSelect = lazy(() => import('../../DataSelect'))
const DataSelectWithAutoInput = lazy(() => import('../../DataSelectWithAutoInput'))
const PressureInputV2 = lazy(() => import('../../BusinessComponents/PressureInput/index-v2'))
const TreatmentProgramBaisc = lazy(() => import('../../BusinessComponents/TreatmentProgram/TreatmentProgramBasic'))
const MultiSelector = lazy(() => import('../../GeneralComponents/Select/MultiSelector'))
const SingleSelector = lazy(() => import('../../GeneralComponents/Select/SingleSelector'))
const OptimizeEditInTable = lazy(() => import('../../MyForm/components/MyTable'))
const Appgar = lazy(() => import('../../BusinessComponents/Appgar'))
const BloodAndThalassemia = lazy(() => import('../../BusinessComponents/BloodAndThalassemia'))
const BloodPressure = lazy(() => import('../../BusinessComponents/BloodPressure'))
const BregmaGroup = lazy(() => import('../../BusinessComponents/BregmaGroup'))
const CaesareanChildren = lazy(() => import('../../BusinessComponents/CaesareanChildren'))
const CalculateScoreTable = lazy(() => import('../../BusinessComponents/CalculateScoreTable'))
const Diagnosis = lazy(() => import('../../BusinessComponents/Diagnosis'))
const DiagnosisList = lazy(() => import('../../BusinessComponents/DiagnosisList'))
const DiagnosisListInduced = lazy(() => import('../../BusinessComponents/DiagnosisListInduced'))
const DiagnosisListv2 = lazy(() => import('../../BusinessComponents/DiagnosisListv2'))
const FamilyTumorHistory = lazy(() => import('../../BusinessComponents/FamilyTumorHistory'))
const FetalNTCheck = lazy(() => import('../../BusinessComponents/FetalNTCheck'))
const FetalUltrasound = lazy(() => import('../../BusinessComponents/FetalUltrasound'))
const FoetalAppendage = lazy(() => import('../../BusinessComponents/FoetalAppendage'))
const GynaecologyOperationTemplateTextarea = lazy(() => import('../../BusinessComponents/GynaecologyOperationTemplateTextarea'))
const GynaecologyTemplateTextarea = lazy(() => import('../../BusinessComponents/GynaecologyTemplateTextarea'))
const HighriskSign = lazy(() => import('../../BusinessComponents/HighriskSign'))
const InducedFetus = lazy(() => import('../../BusinessComponents/InducedFetus'))
const InspectionResultTextarea = lazy(() => import('../../BusinessComponents/InspectionResultTextarea'))
const KnowledgeBase = lazy(() => import('../../BusinessComponents/KnowledgeBase'))
const LaborProcess = lazy(() => import('../../BusinessComponents/LaborProcess'))
// const LaborProcess2 = lazy(() => import('../../BusinessComponents/LaborProcess2'))
const MiddleUltsounds = lazy(() => import('../../BusinessComponents/MiddleUltsounds'))
const MiddleUltsoundsSingle = lazy(() => import('../../BusinessComponents/MiddleUltsoundsSingle'))
const NoenateRecord = lazy(() => import('../../BusinessComponents/NoenateRecord'))
const NurseChildren = lazy(() => import('../../BusinessComponents/NurseChildren'))
const NurseChildren2 = lazy(() => import('../../BusinessComponents/NurseChildren2'))
const NursingFetus = lazy(() => import('../../BusinessComponents/NursingFetus'))
const NursingFetusv2 = lazy(() => import('../../BusinessComponents/NursingFetusv2'))
const NursingFetusv3 = lazy(() => import('../../BusinessComponents/NursingFetusv3'))
// const NursingFetusv4 = lazy(() => import('../../BusinessComponents/NursingFetusv4'))
const OxytocinTable = lazy(() => import('../../BusinessComponents/OxytocinTable'))
const PostpartumFetal = lazy(() => import('../../BusinessComponents/PostpartumFetal'))
const PregnancyHistoryV2 = lazy(() => import('../../BusinessComponents/PregnancyHistoryV2'))
const PressureInput = lazy(() => import('../../BusinessComponents/PressureInput'))
const ProcedureCystocentesis = lazy(() => import('../../BusinessComponents/ProcedureCystocentesis'))
const ProcedureIntrauterine = lazy(() => import('../../BusinessComponents/ProcedureIntrauterine'))
const RecordState = lazy(() => import('../../BusinessComponents/RecordState'))
const ReferralRegister = lazy(() => import('../../BusinessComponents/ReferralRegister'))
const ReferralToRegister = lazy(() => import('../../BusinessComponents/ReferralToRegister'))
const ResultTextarea = lazy(() => import('../../BusinessComponents/ResultTextarea'))
const ShiftPatients = lazy(() => import('../../BusinessComponents/ShiftPatients'))
const SurgicalInspectionReport = lazy(() => import('../../BusinessComponents/SurgicalInspectionReport'))
// const TemplateTextarea = lazy(() => import('../../BusinessComponents/TemplateTextarea'))
const TemplateTextareav2 = lazy(() => import('../../BusinessComponents/TemplateTextareav2'))
const UltrosoundResultTextarea = lazy(() => import('../../BusinessComponents/UltrosoundResultTextarea'))
const BloodSugarNursingTable = lazy(() => import('../../ConfigComponents/BloodSugarNursingTable'))
const CheckboxGroup = lazy(() => import('../../ConfigComponents/CheckboxGroup'))
const CheckboxWithInput = lazy(() => import('../../ConfigComponents/CheckboxWithInput'))
const CheckboxWithInputv2 = lazy(() => import('../../ConfigComponents/CheckboxWithInputv2'))
const CheckboxWithSingleInput = lazy(() => import('../../ConfigComponents/CheckboxWithSingleInput'))
const CustomEditInTable = lazy(() => import('../../ConfigComponents/CustomEditInTable'))
const InputWithLabel = lazy(() => import('../../ConfigComponents/InputWithLabel'))
const InputWithRange = lazy(() => import('../../ConfigComponents/InputWithRange'))
const InputWithRangTip = lazy(() => import('../../ConfigComponents/InputWithRangTip'))
const MultipleInputWithLabel = lazy(() => import('../../ConfigComponents/MultipleInputWithLabel'))
// const NeonatalCareRecordTable = lazy(() => import('../../ConfigComponents/NeonatalCareRecordTable'))
const NormalCheckboxWithInput = lazy(() => import('../../ConfigComponents/NormalCheckboxWithInput'))
const NormalNursingTable = lazy(() => import('../../ConfigComponents/NormalNursingTable'))
const OxytocinNursingTable = lazy(() => import('../../ConfigComponents/OxytocinNursingTable'))
const PastDeliveryNursingTable = lazy(() => import('../../ConfigComponents/PastDeliveryNursingTable'))
const PreDeliverNursingTable = lazy(() => import('../../ConfigComponents/PreDeliverNursingTable'))
const ProcedureRecords = lazy(() => import('../../ConfigComponents/ProcedureRecords'))
const PureCheckbox = lazy(() => import('../../ConfigComponents/PureCheckbox'))
const SpecialNursingTable = lazy(() => import('../../ConfigComponents/SpecialNursingTable'))
const TemperatureNursingTable = lazy(() => import('../../ConfigComponents/TemperatureNursingTable'))
const MySearchSelect = lazy(() => import('../../FU_components/MySearchSelect'))
const AsyncAutoComplete = lazy(() => import('../../GeneralComponents/AsyncAutoComplete'))
const Button = lazy(() => import('../../GeneralComponents/Button'))
const CheckAndCancelButton = lazy(() => import('../../GeneralComponents/CheckAndCancelButton'))
const EditInTable = lazy(() => import('../../GeneralComponents/EditInTable/EditInTable_Inner'))
const CheckboxGroupObject = lazy(() => import('../../GeneralComponents/CheckboxGroupObject'))
const CustomTreeSelect = lazy(() => import('../../GeneralComponents/CustomTreeSelect'))
// const DatePicker = lazy(() => import('../../GeneralComponents/DatePicker'))

const InputWithTitle = lazy(() => import('../../GeneralComponents/FormSectionInput'))
const InputNumber = lazy(() => import('../../GeneralComponents/InputNumber'))
const MultipleInputGroup = lazy(() => import('../../GeneralComponents/MultipleInputGroup'))
const RadioInput = lazy(() => import('../../GeneralComponents/RadioWithInput'))
const RangePicker = lazy(() => import('../../GeneralComponents/RangePicker'))
const TimePicker = lazy(() => import('../../GeneralComponents/TimePicker'))
const UploadFile = lazy(() => import('../../GeneralComponents/UploadFile'))
const UploadFileUrlEdit = lazy(() => import('../../GeneralComponents/UploadFileUrlEdit'))
const AgeSelect = lazy(() => import('../../selects/AgeSelect'))
const ApgarScoreInput = lazy(() => import('../../selects/ApgarScoreInput'))
const AutoCompleteWithRed = lazy(() => import('../../selects/AutoCompleteWithRed'))
const CountrySelect = lazy(() => import('../../selects/CountrySelect'))
const CronSelect = lazy(() => import('../../selects/CronSelect'))
const DeviceStatusSelect = lazy(() => import('../../selects/DeviceStatusSelect'))
const NormalSelect = lazy(() => import('../../selects/NormalSelect'))
const ParentPermissionSelect = lazy(() => import('../../selects/ParentPermissionSelect'))
const PermissionTypeSelect = lazy(() => import('../../selects/PermissionTypeSelect'))
const RadioWithInput = lazy(() => import('../../selects/RadioWithInput'))
const RadioWithInputNumber = lazy(() => import('../../selects/RadioWithInputNumber'))
const ReferralOrganizationSelect = lazy(() => import('../../selects/ReferralOrganizationSelect'))
const SelectTagWithOptions = lazy(() => import('../../selects/SelectTagWithOptions'))
const SelectWithNoneOption = lazy(() => import('../../selects/SelectWithNoneOption'))
const SelectWithOptions = lazy(() => import('../../selects/SelectWithOptions'))
const SelectWithOptionsOrInput = lazy(() => import('../../selects/SelectWithOptionsOrInput'))
const SurgicalBeforeNurseSelect = lazy(() => import('../../selects/SurgicalBeforeNurseSelect'))
const SurgicalBeforeOperatorSelect = lazy(() => import('../../selects/SurgicalBeforeOperatorSelect'))
const TriggerTypeSelect = lazy(() => import('../../selects/TriggerTypeSelect'))
const DataPickWithCheck = lazy(() => import('../../GeneralComponents/datapick_with_check/datapick_with_check'))
const CusDataTimePicker = lazy(() => import('../../GeneralComponents/DataTimePick'))
const HepatitsNewBabyCom = lazy(() => import('../../newly-component/hepatitis-new-baby'))
// const PostpartumCarerecordTable2 = lazy(() => import('../../ConfigComponents/PostpartumCarerecordTable2'))
// const ObserMagnesiumsulphateTable = lazy(() => import('../../ConfigComponents/ObserMagnesiumsulphateTable2'))
// const PostUrinaryretentionTable = lazy(() => import('../../ConfigComponents/PostUrinaryretentionTable2'))
// const NeonatalScaleExamination = lazy(() => import('../../ConfigComponents/NeonatalScaleExamination'))
import { MyInput } from '../../FU_components/MyInput';
import { IdNOButton } from '../../FU_components/IdNOButton';
import VaginaStrumentsRecordForm from '../../ConfigComponents/VaginaStrumentsRecordForm';
import CascaderAddress from '../../selects/CascaderAddress'
import { CalcBmi, TakeInVolumn, TakeOutVolumn, HbvdnaInput, DateTimeInput, TemplateTextarea, FormTabs, ToggleForm } from '../../FU_components'
import { HighRiskGradeSelectPure } from '../../doctor-end';
import { HighriskButton } from '../../FU_components/HighriskButton';
import { MyFormList_必须搭配Form使用 } from 'src/FU_components/FormList';
import DatePicker from '../../GeneralComponents/DatePicker';
import { LoadFlag } from '../LoadFlag';

interface IProps {
    formDescription: any,
    id: String | Number | undefined,
    renderEditItem: (key: string, ReactNode: React.ReactNode, others?: object | undefined) => any,
    disableAll: boolean,
    form: any,
    registrationEvents: any,
    events: any,
    products: any,
    data: any,
    extraData: any
}
export const FormSectionComponent = {
    IdNOButton,
    MyInput,
    MI: MyInput,
    Input: MyInput,
    input: MyInput,
    CalcBmi,
    TakeInVolumn,
    TakeOutVolumn,
    CascaderAddress,
    BirthCertificateChildren,
    Deathclassification1,
    Deathclassification2,
    TemplateTextareav3,
    TemplateTextrootcauseDeath,
    RevertEditInTable,
    BorderTitle,
    CheckboxGroupObjectCustom,
    'custom-checkbox': CheckboxGroupObjectCustom,
    NativePlace,
    CureState,
    SyphilisTested,
    HbvdnaInput,
    DateTimeInput,
    DataSelect,
    DataSelectWithAutoInput,

    PressureInputV2,

    TreatmentProgramBaisc,
    MultiSelector,
    SingleSelector,
    OptimizeEditInTable,

    Appgar,
    BloodAndThalassemia,
    BloodPressure,
    BregmaGroup,
    CaesareanChildren,
    CalculateScoreTable,
    Diagnosis,
    DiagnosisList,
    DiagnosisListInduced,
    DiagnosisListv2,
    FamilyTumorHistory,
    FetalNTCheck,
    FetalUltrasound,
    FoetalAppendage,
    GynaecologyOperationTemplateTextarea,
    GynaecologyTemplateTextarea,
    HighriskSign,
    InducedFetus,
    InspectionResultTextarea,
    KnowledgeBase,
    LaborProcess,
    ToggleForm,
    // LaborProcess2,
    MiddleUltsounds,
    MiddleUltsoundsSingle,
    NoenateRecord,
    NurseChildren,
    NurseChildren2,
    NursingFetus,
    NursingFetusv2,
    NursingFetusv3,
    // NursingFetusv4,
    OxytocinTable,
    FormTabs,
    PostpartumFetal,
    PregnancyHistoryV2,
    PressureInput,
    ProcedureCystocentesis,
    ProcedureIntrauterine,
    RecordState,
    ReferralRegister,
    ReferralToRegister,
    ResultTextarea,
    ShiftPatients,
    SurgicalInspectionReport,
    TemplateTextarea,
    TemplateTextareav2,
    UltrosoundResultTextarea,
    BloodSugarNursingTable,
    CheckboxGroup,
    CheckboxWithInput,
    CheckboxWithInputv2,
    CheckboxWithSingleInput,
    CustomEditInTable,
    InputWithLabel,
    InputWithRange,
    InputWithRangTip,
    MultipleInputWithLabel,
    // NeonatalCareRecordTable,
    NormalCheckboxWithInput,
    NormalNursingTable,
    OxytocinNursingTable,
    PastDeliveryNursingTable,
    PreDeliverNursingTable,
    ProcedureRecords,
    PureCheckbox,
    SpecialNursingTable,
    TemperatureNursingTable,
    MySearchSelect,
    AsyncAutoComplete,
    Button,
    CheckAndCancelButton,
    EditInTable,
    CheckboxGroupObject,
    checkbox_group_object: CheckboxGroupObject,
    CustomTreeSelect,
    DatePicker,
    MyDatePicker: DatePicker,
    InputWithTitle,
    InputNumber,
    input_number: InputNumber,
    MultipleInputGroup,
    RadioInput,
    RangePicker,
    MyRangeDate,
    rangeDate: MyRangeDate,
    MyRangeDateTime,
    rangeDateTime: MyRangeDateTime,
    TimePicker,
    UploadFile,
    UploadFileUrlEdit,
    AgeSelect,
    ApgarScoreInput,
    AutoCompleteWithRed,
    CountrySelect,
    LoadFlag,
    CronSelect,
    DataSelectWithOptionsOrInput,
    DeviceStatusSelect,
    NormalSelect,
    ParentPermissionSelect,
    PatientAutoComplete,
    PermissionTypeSelect,
    RadioWithInput,
    RadioWithInputNumber,
    ReferralOrganizationSelect,
    SelectTagWithOptions,
    SelectWithNoneOption,
    SelectWithOptions,
    SelectWithOptionsOrInput,
    SurgicalBeforeNurseSelect,
    SurgicalBeforeOperatorSelect,
    TriggerTypeSelect,
    DataPickWithCheck,
    CusDataTimePicker,
    HepatitsNewBabyCom,
    // PostpartumCarerecordTable2,
    // ObserMagnesiumsulphateTable,
    // PostUrinaryretentionTable,
    // NeonatalScaleExamination,
    ConfigComponents_DictionarySelect,
    dictionary_select: ConfigComponents_DictionarySelect,
    MyCheckbox,
    Checkbox: MyCheckbox,
    MC: MyCheckbox,
    ArrayInput,
    MArr: ArrayInput,
    HourMinuteInput,
    CheckboxWithValue,
    ArrayPanel,
    MySelect,
    select: MySelect,
    Select: MySelect,
    MS: MySelect,
    // RowoftireRecordBaby,
    MyPressure,
    MyAutoComplete,
    MA: MyAutoComplete,
    VaginaStrumentsRecordForm,
    DictionarySelect,
    MyMonaco,
    MyEditTable,
    HighRiskGradeSelectPure,
    HighriskButton,
    MyReferralOrganizationSelect,
    MyAddress,
    MyFormList_必须搭配Form使用
}
export function getFormSectionComponent(type: keyof typeof FormSectionComponent = 'Input') {
    const C = FormSectionComponent[type] ?? (() => `未知组件:${type}`)

    return C
}