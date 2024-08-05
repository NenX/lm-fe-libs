import { IMchc_FormDescriptions_Field_Nullable } from "@lm_fe/service";

export const form_config: IMchc_FormDescriptions_Field_Nullable[] = [{
    "id": 710,
    "moduleName": "family-planning-detail-early-pregnancy",
    "name": "体格情况",
    "flag": "专科病例-早孕检查-体格情况",
    "sort": 1,
    "createdTime": "2024-01-29T17:50:20+08:00",
    "updatedTime": "2024-01-29T17:50:20+08:00",

    "fields": [{
        "id": 19164,
        "key": "womenHealthcarePhysicalExamination.weight",
        "label": "体重(kg)",
        "sort": 1,
        "inputType": "input_number",
        "tranferRules": { 'path': 'physicalExamMeasure.weight' },
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
        "id": 19163,
        "key": "womenHealthcarePhysicalExamination.systolic",
        "label": "血压(mmHg)",
        "sort": 2,
        "inputType": "pressure",
        "tranferRules": { 'path': 'physicalExamMeasure.bloodPressure' },
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
        "id": 19162,
        "key": "womenHealthcarePhysicalExamination.bodyTemperature",
        "label": "体温(°C)",
        "sort": 3,
        "inputType": "input_number",
        "tranferRules": { 'path': 'physicalExamMeasure.weight' },
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
    "id": 711,
    "moduleName": "family-planning-detail-early-pregnancy",
    "name": "病史情况",
    "flag": "专科病例-早孕检查-病史情况",
    "sort": 2,
    "createdTime": "2024-01-29T17:50:20+08:00",
    "updatedTime": "2024-01-29T17:50:20+08:00",

    "fields": [{
        "id": 19177,
        "key": "earlyPregnancyCheckMedicalHistory.chiefComplaint",
        "label": "主诉",
        "sort": 1,
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
        "id": 19178,
        "key": "earlyPregnancyCheckMedicalHistory.lmd",
        "label": "末次月经",
        "sort": 2,
        "inputType": "DatePicker",
        inputProps: { format: 'YYYY-MM-DD' },



        "span": 8,
        "offset": 0,
        "isNewRow": 1,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19181,
        "key": "earlyPregnancyCheckMedicalHistory.dueDate",
        "label": "预产期-日期",
        "sort": 3,
        "inputType": "DatePicker",
        inputProps: { format: 'YYYY-MM-DD' },



        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19182,
        "key": "earlyPregnancyCheckMedicalHistory.gestationalWeek",
        "label": "孕周",
        "sort": 4,
        "inputType": "input",

        "rules": [{ 'required': false, 'message': '孕周是必填项' }],


        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19167,
        "key": "earlyPregnancyCheckMedicalHistory.menarche",
        "label": "初潮(岁)",
        "sort": 5,
        "inputType": "input_number",
        "tranferRules": { 'path': 'menstrualHistory.menarche' },
        "rules": [{ 'required': false, 'message': '初潮(岁)是必填项' }],

        "inputProps": { 'style': { 'width': 156 } },
        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19179,
        "key": "earlyPregnancyCheckMedicalHistory.menstrualCycle",
        "label": "月经周期(天)",
        "sort": 6,
        "inputType": "input_number",
        "tranferRules": { 'path': 'menstrualHistory.menstrualCycle' },
        "rules": [{ 'required': false, 'message': '月经周期(天)是必填项' }],

        "inputProps": { 'style': { 'width': 156 } },
        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19171,
        "key": "earlyPregnancyCheckMedicalHistory.menstrualPeriod",
        "label": "月经持续天数(天)",
        "sort": 7,
        "inputType": "input_number",
        "tranferRules": { 'path': 'menstrualHistory.menstrualPeriod' },
        "rules": [{ 'required': false, 'message': '月经持续天数(天)是必填项' }],

        "inputProps": { 'style': { 'width': 156 } },
        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19176,
        "key": "earlyPregnancyCheckMedicalHistory.menstrualVolume",
        "label": "经量",
        "sort": 8,
        "inputType": "checkbox_group",
        "tranferRules": { 'path': 'menstrualHistory.menstrualVolume' },
        "rules": [{ 'required': false, 'message': '经量是必填项' }],
        "specialConfig": { 'type': 'single', 'options': [{ 'value': '多', 'label': '多', 'withInput': false, 'span': 6 }, { 'value': '中', 'label': '中', 'withInput': false, 'span': 6 }, { 'value': '少', 'label': '少', 'withInput': false, 'span': 6 }] },

        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19172,
        "key": "earlyPregnancyCheckMedicalHistory.dysmenorrhea",
        "label": "痛经",
        "sort": 9,
        "inputType": "checkbox_with_single_input",
        "tranferRules": { 'type': 'key_and_keyNote', 'path': 'menstrualHistory.dysmenorrhea' },
        "rules": [{ 'required': false, 'message': '痛经是必填项' }],
        "specialConfig": { 'type': 'single', 'options': [{ 'value': 1, 'label': '无', 'span': 6, 'withInput': false }, { 'value': 2, 'label': '有', 'withInput': true, 'isIssue': true, 'span': 6, 'inputSpan': 12 }] },

        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19170,
        "key": "earlyPregnancyCheckMedicalHistory.takingFolicAcid",
        "label": "是否服用叶酸",
        "sort": 10,
        "inputType": "checkbox_with_input",
        "tranferRules": { 'type': 'key_and_keyNote', 'path': 'personalProfile.medicine' },
        "rules": [{ 'required': false, 'message': '是否服用叶酸是必填项' }],
        "specialConfig": { 'type': 'single', 'options': [{ 'value': 1, 'label': '否', 'span': 6, 'withInput': false }, { 'value': 2, 'label': '是', 'withInput': true, 'isIssue': true, 'span': 6, 'inputSpan': 12 }] },

        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19180,
        "key": "earlyPregnancyCheckMedicalHistory.conceived",
        "label": "孕次",
        "sort": 11,
        "inputType": "input_number",
        "tranferRules": { 'path': 'menstrualHistory.menstrualPeriod' },
        "rules": [{ 'required': false, 'message': '孕次是必填项' }],

        "inputProps": { 'style': { 'width': 156 } },
        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19165,
        "key": "earlyPregnancyCheckMedicalHistory.parity",
        "label": "产次",
        "sort": 12,
        "inputType": "input_number",
        "tranferRules": { 'path': 'menstrualHistory.menstrualPeriod' },
        "rules": [{ 'required': false, 'message': '产次是必填项' }],

        "inputProps": { 'style': { 'width': 156 } },
        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19166,
        "key": "earlyPregnancyCheckMedicalHistory.marriageHistory",
        "label": "婚姻状况",
        "sort": 13,
        "inputType": "normal_select",

        "rules": [{ 'required': false, 'message': '婚姻状况是必填项' }],
        "specialConfig": { 'type': 'maritalMapping' },

        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19168,
        "key": "earlyPregnancyCheckMedicalHistory.medicalHistoryNow",
        "label": "现病史",
        "sort": 14,
        "inputType": "checkbox_with_single_input",
        "tranferRules": { 'type': 'key_and_keyNote', 'path': 'procedureHistory.other' },
        "rules": [{ 'required': false, 'message': '现病史是必填项' }],
        "specialConfig": { 'type': 'single', 'options': [{ 'value': 1, 'label': '否', 'span': 6, 'withInput': false }, { 'value': 2, 'label': '是', 'withInput': true, 'isIssue': true, 'span': 6, 'inputSpan': 12 }] },

        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19174,
        "key": "earlyPregnancyCheckMedicalHistory.personalHistory",
        "label": "个人史",
        "sort": 15,
        "inputType": "checkbox_with_single_input",
        "tranferRules": { 'type': 'key_and_keyNote', 'path': 'procedureHistory.other' },
        "rules": [{ 'required': false, 'message': '个人史是必填项' }],
        "specialConfig": { 'type': 'single', 'options': [{ 'value': 1, 'label': '否', 'span': 6, 'withInput': false }, { 'value': 2, 'label': '是', 'withInput': true, 'isIssue': true, 'span': 6, 'inputSpan': 12 }] },

        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19175,
        "key": "earlyPregnancyCheckMedicalHistory.familyHistory",
        "label": "家族史",
        "sort": 16,
        "inputType": "checkbox_with_single_input",
        "tranferRules": { 'type': 'key_and_keyNote', 'path': 'procedureHistory.other' },
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
        "id": 19169,
        "key": "earlyPregnancyCheckInspection.takingFolicAcid",
        "label": "叶酸服用",
        "sort": 17,
        "inputType": "checkbox_with_input",

        "rules": [{ 'required': false, 'message': '叶酸服用是必填项' }],
        "specialConfig": { 'type': 'single', 'options': [{ 'value': '规律', 'label': '规律', 'span': 8, 'withInput': false }, { 'value': '间服', 'label': '间服', 'withInput': false, 'span': 8 }, { 'value': '未服', 'label': '未服', 'withInput': false, 'span': 8 }] },
        "inputProps": { 'dependency': { 'show': { 'key': 'earlyPregnancyCheckMedicalHistory.takingFolicAcid', 'value': [2] } } },
        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19173,
        "key": "earlyPregnancyCheckInspection.takingFolicSource",
        "label": "叶酸来源",
        "sort": 18,
        "inputType": "checkbox_with_single_input",

        "rules": [{ 'required': false, 'message': '叶酸来源是必填项' }],
        "specialConfig": { 'type': 'single', 'options': [{ 'value': '免费领取', 'label': '免费领取', 'span': 12, 'withInput': false }, { 'value': '自行购买', 'label': '自行购买', 'withInput': false, 'span': 12 }] },
        "inputProps": { 'dependency': { 'show': { 'key': 'earlyPregnancyCheckMedicalHistory.takingFolicAcid', 'value': [2] } } },
        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }]
}, {
    "id": 712,
    "moduleName": "family-planning-detail-early-pregnancy",
    "name": "检验检查",
    "flag": "专科病例-早孕检查-检验检查",
    "sort": 3,
    "createdTime": "2024-01-29T17:50:20+08:00",
    "updatedTime": "2024-01-29T17:50:20+08:00",

    "fields": [{
        "id": 19184,
        "key": "earlyPregnancyCheckInspection.hcg",
        "label": "HCG(IU/L)",
        "sort": 1,
        "inputType": "input_number",

        "rules": [{ 'required': false, 'message': 'HCG(IU/L)是必填项' }],

        "inputProps": { 'style': { 'width': 156 } },
        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19185,
        "key": "earlyPregnancyCheckInspection.gestationalSac",
        "label": "孕囊(个)",
        "sort": 2,
        "inputType": "input_number",

        "rules": [{ 'required': false, 'message': '孕囊(个)是必填项' }],

        "inputProps": { 'style': { 'width': 156 } },
        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19183,
        "key": "earlyPregnancyCheckInspection.yolkSac",
        "label": "卵黄囊(个)",
        "sort": 3,
        "inputType": "input_number",

        "rules": [{ 'required': false, 'message': '卵黄囊(个)是必填项' }],

        "inputProps": { 'style': { 'width': 156 } },
        "span": 8,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19186,
        "key": "earlyPregnancyCheckInspection.ultrasoundDiagnosis",
        "label": "B超诊断",
        "sort": 4,
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
    "id": 717,
    "moduleName": "family-planning-detail-early-pregnancy",
    "name": "诊断及处理",
    "flag": "专科病例-早孕检查-诊断及处理",
    "sort": 4,
    "createdTime": "2024-01-29T17:50:20+08:00",
    "updatedTime": "2024-01-29T17:50:20+08:00",

    "fields": [{
        "id": 19236,
        "key": "earlyPregnancyCheckDiagnosisAndTreatment.earlyPregnancyCheckDiagnosisInformations",
        "label": "诊断",
        "sort": 0,
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
        "id": 19238,
        "key": "earlyPregnancyCheckDiagnosisAndTreatment.treatmentMeasures",
        "label": "处理措施",
        "sort": 1,
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
        "id": 19239,
        "key": "earlyPregnancyCheckDiagnosisAndTreatment.appointmentWeeksLater",
        "label": "预约复诊",
        "sort": 2,
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
        "id": 19240,
        "key": "earlyPregnancyCheckDiagnosisAndTreatment.appointmentSpecificDate",
        "label": "",
        "sort": 2,
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
        "id": 19241,
        "key": "earlyPregnancyCheckDiagnosisAndTreatment.appointmentMorningOrAfternoon",
        "label": "",
        "sort": 2,
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
        "id": 19242,
        "key": "earlyPregnancyCheckDiagnosisAndTreatment.registrationDate",
        "label": "登记日期",
        "sort": 4,
        "inputType": "DatePicker",
        inputProps: { format: 'YYYY-MM-DD' },



        "span": 8,
        "offset": 0,
        "isNewRow": 1,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },

        "isActive": 1,
        "createdTime": "2024-01-29T17:50:20+08:00",
        "updatedTime": "2024-01-29T17:50:20+08:00",

    }, {
        "id": 19243,
        "key": "earlyPregnancyCheckDiagnosisAndTreatment.diagnoseDoctor",
        "label": "接诊医生",
        "sort": 5,
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