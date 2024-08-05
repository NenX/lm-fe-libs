import { mchcEnv } from "@lm_fe/env";
import { IMchc_FormDescriptions_Field, IMchc_FormDescriptions_Field_Nullable } from "@lm_fe/service";
import { __obdriver_read } from "./common";





export const 孕妇基本信息_config = () => {

    const config: IMchc_FormDescriptions_Field_Nullable = {
        "name": "孕妇基本信息",
        "children": [
            {
                "key": "baseInfo.outpatientNO",
                "label": "就诊卡号",
                "inputType": "input",
                "rules": [{ "required": true, "message": "就诊卡号是必填项" }],
                layout: '1/3',
            },
            mchcEnv.is('南医增城')
                ? {
                    "key": "baseInfo.patientNO",
                    "label": "ID号",
                    "inputType": "input",
                    "rules": [{ "required": true, "message": "就诊卡号是必填项" }],
                    layout: '1/3',
                }
                : null,
            {
                "key": "baseInfo.name",
                "label": "姓名",
                "inputType": "input",
                "rules": [{ "required": true, "message": "姓名是必填项" }],
                "inputProps": { "placeholder": "请输入姓名" },
                layout: '1/3',
            },
            __obdriver_read,


            {
                "key": "baseInfo.telephone",
                "label": "手机号码",
                "inputType": "input",
                "rules": [{ "required": true, "message": "手机号码是必填项" }, { "type": "string", "min": 11, "message": "请输入11位手机号码" }, { "max": 11, "message": "请输入正确的手机号码格式" }],
                "inputProps": { "placeholder": "请输入手机号码" },
                layout: '1/3',
            },
            {
                "key": "baseInfo.workPhone",
                "label": "固定电话",
                "inputType": "input",

                "inputProps": { "placeholder": "请输入固定电话" },
                layout: '1/3',
            },
            {
                "key": "baseInfo.birthInsurance",
                "label": "生育保险",
                "inputType": "pure_checkbox",
                required: mchcEnv.in(['南医增城']) ? false : true,

                // "rules": [{ "required": true, "message": "生育保险是必填项" }],
                "specialConfig": { "type": "single", "options": [{ "value": true, "label": "是", "withInput": false, "span": 6 }, { "value": false, "label": "否", "span": 6, "withInput": false, "isIssue": true }] },
                layout: '1/3',
            },

            {
                "key": "baseInfo.idType",
                "label": "证件类型",
                "inputType": "MS",
                "rules": [{ "required": true, "message": "证件类型是必填项" }],
                "inputProps": { optionKey: '证件类型', marshal: 0 },
                layout: '1/3',
            }, {
                "key": "baseInfo.idNO",
                "label": "证件号码",
                "inputType": "id_number_input",
                "rules": [{ "required": true, "message": "证件号码是必填项" }],
                "inputProps": { "placeholder": "请输入证件号码" },
                layout: '1/3',
            },
            {
                "key": "baseInfo.checkIdNO",
                "label": "人证相符",
                "inputType": "pure_checkbox",

                "specialConfig": { "type": "single", "options": [{ "value": true, "label": "是", "withInput": false, "span": 6 }, { "value": false, "label": "否", "span": 6, "withInput": false, "isIssue": true }] },
                layout: '1/3',
            },
            {
                "key": "baseInfo.workplace",
                "label": "工作单位",
                "inputType": "input",
                isActive: mchcEnv.is('广三'),
                layout: '1/3',
            },
            {
                "key": "baseInfo.dob",
                "label": "出生日期",
                "inputType": "DatePicker",

                // "inputProps": { "placeholder": "请输入出生日期", "maxDate": "now", "dependency": { "disabled": { "key": "idType", "value": [1] } } },
                disabledDeps: {
                    'baseInfo.idType': [1]
                },
                layout: '1/3',
                // "isNewRow": 1,
            }, {
                "key": "baseInfo.age",
                "label": "年龄",
                "inputType": "input_number",
                disabledDeps: {
                    'baseInfo.idType': [1]
                },
                // "inputProps": { "placeholder": "请输入年龄", "style": { "width": 145 }, "dependency": { "disabled": { "key": "idType", "value": [1] } } },
                layout: '1/3',
            }, {
                "key": "baseInfo.payment",
                "label": "是否缴费",
                "inputType": "pure_checkbox",

                "specialConfig": { "type": "single", "options": [{ "value": true, "label": "是", "withInput": false, "span": 6 }, { "value": false, "label": "否", "span": 6, "withInput": false, "isIssue": true }] },
                layout: '1/3',
            }, {
                "key": "baseInfo.nativeplace",
                "label": "籍贯",
                "inputType": "normal_select",

                "specialConfig": { "type": "provinceMapping", "showSearch": true },
                "inputProps": { "placeholder": "请输入籍贯" },
                layout: '1/3',
            }, {
                "key": "baseInfo.nationality",
                "label": "国籍",
                "inputType": "country_select",

                "inputProps": { "placeholder": "请输入国籍" },
                layout: '1/3',
            }, {
                "key": "baseInfo.paymentDate",
                "label": "缴费时间",
                "inputType": "single_date_picker",

                "inputProps": { "disabled": true },
                layout: '1/3',
            }, {
                "key": "baseInfo.ethnic",
                "label": "民族",
                "inputType": "normal_select",

                "specialConfig": { "type": "ethnicMapping", "showSearch": true },
                "inputProps": { "placeholder": "请输入民族" },
                layout: '1/3',
            }, {
                "key": "baseInfo.occupation",
                "label": "职业",
                "inputType": "MS",
                "inputProps": { optionKey: '职业s', marshal: 0 },
                layout: '1/3',
            }, {
                "key": "baseInfo.firstRecord",
                "label": "首次建档",
                "inputType": "pure_checkbox",

                "specialConfig": { "type": "single", "options": [{ "value": true, "label": "是", "withInput": false, "span": 6 }, { "value": false, "label": "否", "span": 6, "withInput": false, "isIssue": true }] },
                layout: '1/3',
            },
            {
                "key": "baseInfo.birthPermit",
                "label": "准生证号",
                "inputType": "input",

                "inputProps": { "placeholder": "请输入准生证号" },
                layout: '1/3',
            },
            {
                "key": "baseInfo.maritalStatus",
                "label": "婚姻状况",
                "inputType": "MS",

                "inputProps": { optionKey: '婚姻', marshal: 0 },
                layout: '1/3',
            }, {
                "key": "baseInfo.education",
                "label": "文化程度",
                "inputType": "MS",
                required: mchcEnv.in(['广三']),
                "inputProps": { optionKey: '文化程度s', marshal: 0 },
                layout: '1/3',
            }, {
                "key": "baseInfo.spinsterhoodName",
                "label": "联系人",
                "inputType": "input",
                // "rules": [{ "required": true, "message": "联系人是必填项" }],
                // "inputProps": { "placeholder": "请输入联系人", "dependency": { "show": { "key": "baseInfo.maritalStatus", "value": [2, 3, 5] } } },
                showDeps: {
                    "baseInfo.maritalStatus": [2, 3, 5]
                },
                layout: '1/3',
            }, {
                "key": "baseInfo.spinsterhoodTelephone",
                "label": "联系电话",
                "inputType": "input",
                // "rules": [{ "required": true, "message": "联系电话是必填项" }, { "type": "string", "min": 11, "message": "请输入11位手机号码" }, { "max": 11, "message": "请输入正确的手机号码格式" }],
                // "inputProps": { "placeholder": "请输入联系人电话", "dependency": { "show": { "key": "baseInfo.maritalStatus", "value": [2, 3, 5] } } },
                showDeps: {
                    "baseInfo.maritalStatus": [2, 3, 5]
                },
                layout: '1/3',
            },
            {
                "key": "baseInfo.spinsterhoodRelation",
                "label": "关系",
                "inputType": "input",
                // "rules": [{ "required": true, "message": "关系是必填项" }],
                // "inputProps": { "placeholder": "请输入与孕妇关系", "dependency": { "show": { "key": "baseInfo.maritalStatus", "value": [2, 3, 5] } } },
                showDeps: {
                    "baseInfo.maritalStatus": [2, 3, 5]
                },
                layout: '1/3',
            },
            {
                "key": "baseInfo.permanentResidenceAddress",
                "label": "身份证地址",
                "inputType": "MyAddress",

                "inputProps": { "placeholder": "请输入户口地址" },
                layout: '2/3',
                "isNewRow": 1,
            }, {
                "key": "baseInfo.maritalAge",
                "label": "结婚年龄",
                "inputType": "input_number",
                "rules": [{ "required": true, "message": "结婚年龄是必填项" }],
                // "inputProps": { "placeholder": "请输入结婚年龄", "dependency": { "show": { "key": "maritalStatus", "value": [1, 4] } } },
                showDeps: {
                    "baseInfo.maritalStatus": [1, 4]
                },
                layout: '1/3',
            }, {
                "key": "baseInfo.residenceAddress",
                "label": "居住地址",
                "inputType": "MyAddress",

                "inputProps": {
                    addressBtns: [
                        { name: 'baseInfo.permanentResidenceAddress', label: '同上' },
                    ]
                },
                layout: '2/3',
                "isNewRow": 1,
            }, {
                "key": "baseInfo.postpartumAddress",
                "label": "产休地址",
                "inputType": "MyAddress",

                "inputProps": {
                    addressBtns: [
                        { name: 'baseInfo.permanentResidenceAddress', label: '同户籍地' },
                        { name: 'baseInfo.residenceAddress', label: '同居住地' },
                    ]
                },
                layout: '2/3',
                "isNewRow": 1,
            }]
    }
    return config
}


