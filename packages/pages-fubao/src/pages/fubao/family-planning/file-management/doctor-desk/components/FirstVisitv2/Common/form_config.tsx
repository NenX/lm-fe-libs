import { IMchc_FormDescriptions_Field_Nullable } from "@lm_fe/service";

export const form_config: IMchc_FormDescriptions_Field_Nullable[] = [{
    "id": 738,
    "moduleName": "family-planning-detail-common",
    "name": "病史情况",
    "flag": "专科病例-常规接诊-病史情况",
    "sort": 0,
    "createdTime": "2024-01-29T17:50:20+08:00",
    "updatedTime": "2024-01-29T17:50:20+08:00",

    "fields": [{
        "id": 19454,
        "key": "earlyPregnancyCheckMedicalHistory.familyHistory",
        "label": "家族史",

        "inputType": "checkbox_with_single_input",

        "rules": [{ 'required': false, 'message': '家族史是必填项' }],
        "specialConfig": { 'type': 'single', 'options': [{ 'value': 1, 'label': '否', 'span': 6, 'withInput': false }, { 'value': 2, 'label': '是', 'withInput': true, 'isIssue': true, 'span': 6, 'inputSpan': 12 }] },

        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19455,
        "key": "earlyPregnancyCheckMedicalHistory.chiefComplaint",
        "label": "主诉",

        "inputType": "gynaecology_template_textarea",

        "rules": [{ 'required': false, 'message': '主诉是必填项' }],


        "span": 16,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 4 }, 'wrapperCol': { 'span': 20 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19456,
        "key": "earlyPregnancyCheckMedicalHistory.medicalHistoryNow",
        "label": "现病史",

        "inputType": "checkbox_with_single_input",

        "rules": [{ 'required': false, 'message': '现病史是必填项' }],
        "specialConfig": { 'type': 'single', 'options': [{ 'value': 1, 'label': '否', 'span': 6, 'withInput': false }, { 'value': 2, 'label': '是', 'withInput': true, 'isIssue': true, 'span': 6, 'inputSpan': 12 }] },

        "span": 8,
        "offset": 0,
        "isNewRow": 1,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19457,
        "key": "earlyPregnancyCheckMedicalHistory.personalHistory",
        "label": "个人史",

        "inputType": "checkbox_with_single_input",

        "rules": [{ 'required': false, 'message': '个人史是必填项' }],
        "specialConfig": { 'type': 'single', 'options': [{ 'value': 1, 'label': '否', 'span': 6, 'withInput': false }, { 'value': 2, 'label': '是', 'withInput': true, 'isIssue': true, 'span': 6, 'inputSpan': 12 }] },

        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }]
}, {
    "id": 739,
    "moduleName": "family-planning-detail-common",
    "name": "体格情况",
    "flag": "专科病例-常规接诊-体格情况",
    "sort": 0,
    "createdTime": "2024-01-29T17:50:20+08:00",
    "updatedTime": "2024-01-29T17:50:20+08:00",

    "fields": [{
        "id": 19458,
        "key": "womenHealthcarePhysicalExamination.weight",
        "label": "体重(kg)",

        "inputType": "input_number",

        "rules": [{ 'required': true, 'message': '体重(kg)是必填项' }],

        "inputProps": { 'placeholder': '请输入体重', 'style': { 'width': 156 } },
        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19459,
        "key": "womenHealthcarePhysicalExamination.systolic",
        "label": "血压(mmHg)",

        "inputType": "pressure",

        "rules": [{ 'required': true, 'message': '血压(mmHg)是必填项' }],

        "inputProps": { 'style': { 'width': 156 } },
        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19460,
        "key": "womenHealthcarePhysicalExamination.bodyTemperature",
        "label": "体温(°C)",

        "inputType": "input_number",

        "rules": [{ 'required': true, 'message': '体温(°C)是必填项' }],

        "inputProps": { 'placeholder': '请输入体温', 'style': { 'width': 156 } },
        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }]
}, {
    "id": 740,
    "moduleName": "family-planning-detail-common",
    "name": "检验检查",
    "flag": "专科病例-常规接诊-检验检查",
    "sort": 0,
    "createdTime": "2024-01-29T17:50:20+08:00",
    "updatedTime": "2024-01-29T17:50:20+08:00",

    "fields": [{
        "id": 19461,
        "key": "earlyPregnancyCheckInspection.checkInspection",
        "label": "检验检查",

        "inputType": "text_area",

        "rules": [{ 'required': false, 'message': '检验检查是必填项' }],


        "span": 16,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 4 }, 'wrapperCol': { 'span': 20 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19462,
        "key": "earlyPregnancyCheckInspection.ultrasoundDiagnosis",
        "label": "B超诊断",

        "inputType": "text_area",

        "rules": [{ 'required': false, 'message': 'B超诊断是必填项' }],


        "span": 16,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 4 }, 'wrapperCol': { 'span': 20 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }]
}, {
    "id": 741,
    "moduleName": "family-planning-detail-common",
    "name": "诊断及处理",
    "flag": "专科病例-常规接诊-诊断及处理",
    "sort": 0,
    "createdTime": "2024-01-29T17:50:20+08:00",
    "updatedTime": "2024-01-29T17:50:20+08:00",

    "fields": [{
        "id": 19463,
        "key": "earlyPregnancyCheckDiagnosisAndTreatment.earlyPregnancyCheckDiagnosisInformations",
        "label": "诊断",

        "inputType": "diagnosis_list_v2",

        "rules": [{ 'required': false, 'message': '诊断是必填项' }],
        "specialConfig": { 'isShow': true },

        "span": 16,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 4 }, 'wrapperCol': { 'span': 20 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19464,
        "key": "earlyPregnancyCheckDiagnosisAndTreatment.treatmentMeasures",
        "label": "处理措施",

        "inputType": "gynaecology_template_textarea",

        "rules": [{ 'required': false, 'message': '处理措施是必填项' }],

        "inputProps": { 'autoSize': { 'minRows': 7, 'maxRows': 7 }, 'placeholder': '请输入处理措施.' },
        "span": 16,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 4 }, 'wrapperCol': { 'span': 20 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19465,
        "key": "earlyPregnancyCheckDiagnosisAndTreatment.appointmentWeeksLater",
        "label": "预约复诊",

        "inputType": "select_with_options",

        "rules": [{ 'required': false, 'message': '预约复诊是必填项' }],
        "specialConfig": { 'type': 'array', 'mode': 'single', 'options': [{ 'value': 1, 'label': '1周后' }, { 'value': 2, 'label': '2周后' }, { 'value': 3, 'label': '3周后' }] },
        "inputProps": { 'placeholder': '请选择' },
        "span": 8,
        "offset": 0,
        "isNewRow": 1,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19466,
        "key": "earlyPregnancyCheckDiagnosisAndTreatment.appointmentSpecificDate",
        "label": "",

        "inputType": "DatePicker",
        inputProps: { format: 'YYYY-MM-DD' },


        "span": 4,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 0 }, 'wrapperCol': { 'span': 24 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19467,
        "key": "earlyPregnancyCheckDiagnosisAndTreatment.appointmentMorningOrAfternoon",
        "label": "",

        "inputType": "select_with_options",

        "rules": [{ 'required': false, 'message': 'null是必填项' }],
        "specialConfig": { 'type': 'array', 'mode': 'single', 'options': [{ 'value': '上午', 'label': '上午' }, { 'value': '下午', 'label': '下午' }] },
        "inputProps": { 'placeholder': '请选择' },
        "span": 4,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 0 }, 'wrapperCol': { 'span': 24 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19468,
        "key": "earlyPregnancyCheckDiagnosisAndTreatment.registrationDate",
        "label": "登记日期.",

        "inputType": 'DatePicker',

        inputProps: { format: 'YYYY-MM-DD' },

        "span": 8,
        "offset": 0,
        "isNewRow": 1,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19469,
        "key": "earlyPregnancyCheckDiagnosisAndTreatment.diagnoseDoctor",
        "label": "接诊医生",

        "inputType": "input",

        "rules": [{ 'required': false, 'message': '接诊医生是必填项' }],


        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }]
}]