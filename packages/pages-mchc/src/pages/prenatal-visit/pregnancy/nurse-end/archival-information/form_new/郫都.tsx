import { get_check_invert_values } from "@lm_fe/components_m";
import { getPresetOptions, getSameOptions } from "@lm_fe/env";
import { mchcEnv } from "@lm_fe/env";
import { IMchc_FormDescriptions_Field, IMchc_FormDescriptions_Field_Nullable } from "@lm_fe/service";
import { __obdriver_read } from "../form/common";


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
                required: true,

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
            },
            {
                "key": "baseInfo.place",
                "label": "户口类型",
                "inputType": "MySelect",
                inputProps: {
                    options: '城市,农村'
                },
                layout: '1/3',
                // "isNewRow": 1,
            },
            {
                "key": "baseInfo.isMove",
                "label": "流动人口",
                "inputType": "MySelect",
                inputProps: {
                    options: '本地常住,省内常住,省外常住,省内流动,省外流动'
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
export const 丈夫基本信息_config = () => {
    const config: IMchc_FormDescriptions_Field_Nullable = {
        "name": "丈夫基本信息",
        "children": [{
            "key": "partnerInfo.partnerName",
            "label": "姓名",
            "inputType": "input",

            "inputProps": {},
            layout: '1/3',
        }, {
            "key": "partnerInfo.partnerTelephone",
            "label": "手机号码",
            "inputType": "input",

            "inputProps": {},
            layout: '1/3',
        }, {
            "key": "partnerInfo.partnerPatientNO",
            "label": "就诊卡号",
            "inputType": "input",

            "inputProps": {},
            layout: '1/3',
        },
        {
            "key": "partnerInfo.partnerWorkplace",
            "label": "工作单位",
            "inputType": "Input",

            "inputProps": {},
            isActive: mchcEnv.is('建瓯'),
            isNewRow: 1,
            layout: '1/3',
        },
        {
            "key": "partnerInfo.partnerHealthStatus",
            "label": "健康状况",
            "inputType": "MS",

            "inputProps": { options: '好、良好、差', marshal: 0 },
            isActive: mchcEnv.is('建瓯'),
            layout: '1/3',
        },

        mchcEnv.in(['建瓯']) ? {
            "key": "partnerInfo.hfmh",
            "label": "家族史",
            "inputType": "checkbox_group_object",

            "inputProps": {
                optionKey: '家族史',

            },
            layout: '1/1',
            "isNewRow": 1,
        }
            : null,
        {
            "key": "partnerInfo.partnerIdType",
            "label": "证件类型",
            "inputType": "normal_select",

            "specialConfig": { "type": "IDCardMapping" },
            "inputProps": {},
            isNewRow: 1,
            layout: '1/3',
        },
        {
            "key": "partnerInfo.partnerIdNO",
            "label": "证件号码",
            "inputType": "input",

            "inputProps": {},
            layout: '1/3',
        }, {
            "key": "partnerInfo.partnerDob",
            "label": "出生日期",
            "inputType": "single_date_picker",

            "inputProps": { "maxDate": "now" },
            layout: '1/3',
            "isNewRow": 1,
        }, {
            "key": "partnerInfo.partnerAge",
            "label": "年龄",
            "inputType": "input_number",

            "inputProps": { "style": { "width": 156 } },
            layout: '1/3',
        }, {
            "key": "partnerInfo.partnerNationality",
            "label": "国籍",
            "inputType": "country_select",

            "inputProps": {},
            layout: '1/3',
        }, {
            "key": "partnerInfo.partnerNativeplace",
            "label": "籍贯",
            "inputType": "normal_select",

            "specialConfig": { "type": "provinceMapping", "showSearch": true },
            "inputProps": {},
            layout: '1/3',
        }, {
            "key": "partnerInfo.partnerEthnic",
            "label": "民族",
            "inputType": "normal_select",

            "specialConfig": { "type": "ethnicMapping", "showSearch": true },
            "inputProps": {},
            layout: '1/3',
        }, {
            "key": "partnerInfo.partnerOccupation",
            "label": "职业",
            "inputType": "normal_select",

            "specialConfig": { "type": "jobMapping" },
            "inputProps": {},
            layout: '1/3',
        }, {
            "key": "partnerInfo.smoke__",
            "label": "吸烟",
            "inputType": "MyCheckbox",

            "inputProps": { marshal: 1, options: [{ value: false, label: '无' }, { value: true, label: '有', warning: true, inputType: 'Input', sufix: '支/天' }] },
            layout: '1/3',
        }, {
            "key": "partnerInfo.alcohol__",
            "label": "饮酒",
            "inputType": "MyCheckbox",
            "inputProps": { marshal: 1, options: [{ value: false, label: '无' }, { value: true, label: '有', warning: true, inputType: 'Input', sufix: 'ml' }] },

            layout: '1/3',
        }, {
            "key": "partnerInfo.disease__",
            "label": "疾病史",
            "inputType": "MyCheckbox",
            "inputProps": {
                marshal: 1,
                options: [
                    { value: false, label: '无' },
                    { value: true, label: '有', warning: true, inputType: 'Input', }
                ]
            },

            layout: '1/3',
        }, {
            "key": "partnerInfo.partnerPermanentResidenceAddress",
            "label": "男方身份证地址",
            "inputType": "MyAddress",

            "inputProps": {
                addressBtns: [
                    { name: 'baseInfo.permanentResidenceAddress', label: '同女方户籍地' },
                ]
            },
            layout: '2/3',
            "isNewRow": 1,
        }, {
            "key": "partnerInfo.partnerResidenceAddress",
            "label": "男方居住地址",
            "inputType": "MyAddress",

            "inputProps": {
                addressBtns: [
                    { name: 'partnerInfo.partnerPermanentResidenceAddress', label: '同上' },
                    { name: 'baseInfo.residenceAddress', label: '同女方居住地' },
                ]
            },
            layout: '2/3',
            "isNewRow": 1,
        }]
    }
    return config
}
export const 体征检查_config = () => {
    if (mchcEnv.is('建瓯')) return null
    const config: IMchc_FormDescriptions_Field_Nullable = {
        "name": "体征检查",
        "children": [{
            "key": "physicalExam.MyPressure1__",
            "label": "血压-首测(mmHg)",
            "inputType": "MyPressure",
            "rules": [{ "required": undefined, "message": "血压-首测(mmHg)是必填项" }],
            "inputProps": { "style": { "width": 156 }, marshal: false },
            layout: '1/3',
        }, {
            "key": "physicalExam.MyPressure2__",
            "label": "血压-二测(mmHg)",
            "inputType": "MyPressure",
            "rules": [{ "required": undefined, "message": "血压-二测(mmHg)是必填项" }],
            "inputProps": { "style": { "width": 156 }, marshal: false },
            layout: '1/3',
        }, {
            "key": "physicalExam.MyPressure3__",
            "label": "血压-三测(mmHg)",
            "inputType": "MyPressure",
            "rules": [{ "required": undefined, "message": "血压-三测(mmHg)是必填项" }],
            "inputProps": { "style": { "width": 156 }, marshal: false },
            layout: '1/3',
        }, {
            "key": "physicalExam.height",
            "label": "身高(cm)",
            "inputType": "input_number",
            "rules": [{ "required": undefined, "message": "身高(cm)是必填项" }],
            "inputProps": { "placeholder": "请输入身高", "style": { "width": 156 } },
            layout: '1/3',
        }, {
            "key": "physicalExam.weight",
            "label": "体重(kg)",
            "inputType": "input_number",
            "rules": [{ "required": undefined, "message": "体重(kg)是必填项" }],
            "inputProps": { "placeholder": "请输入体重", "style": { "width": 156 } },
            layout: '1/3',
        }, {
            "key": "physicalExam.pulse",
            "label": "脉搏(bpm)",
            "inputType": "input_number",
            "rules": [{ "required": undefined, "message": "脉搏(bpm)是必填项" }],
            "inputProps": { "placeholder": "请输入脉搏", "style": { "width": 156 } },
            layout: '1/3',
        }]
    }
    return config
}

export function 既往史_pack(isPure = false, needOther = false) {
    const res = [
        nurse_既往史_高血压(isPure),
        nurse_既往史_糖尿病(isPure),
        nurse_既往史_心脏病(isPure),
        nurse_既往史_结核(isPure),
        nurse_既往史_肝炎(isPure),
        nurse_既往史_肾病(isPure),
        nurse_既往史_甲亢(isPure),
        nurse_既往史_性病(isPure),
        nurse_既往史_传染病(isPure),
        nurse_既往史_手术史(isPure),
        nurse_既往史_输血史(isPure),
        nurse_既往史_过敏史(isPure),
    ]
    if (needOther) {
        res.push(nurse_既往史_其他(isPure))
    }
    return res
}

const trueFalseOptions = [{ value: false, label: '否', }, { value: true, label: '是', inputType: 'Input' }]
export function nurse_既往史_高血压(isPure = false): IMchc_FormDescriptions_Field_Nullable {
    return {
        "key": `${isPure ? '' : 'pregnancyInfo.'}hypertension__`,
        "label": "高血压",
        "inputType": "MC",
        required: isPure,
        "inputProps": { marshal: 1, options: trueFalseOptions },

        layout: '1/3',
    }
}
export function nurse_既往史_糖尿病(isPure = false): IMchc_FormDescriptions_Field_Nullable {
    return {
        // "key": "pregnancyInfo.diabetes__",
        "key": `${isPure ? '' : 'pregnancyInfo.'}diabetes__`,
        required: isPure,

        "label": "糖尿病",

        "inputType": "MC",
        "inputProps": { marshal: 1, options: trueFalseOptions },

        layout: '1/3',
    }
}
export function nurse_既往史_心脏病(isPure = false): IMchc_FormDescriptions_Field_Nullable {
    return {
        // "key": "pregnancyInfo.cardiacDisease__",
        "key": `${isPure ? '' : 'pregnancyInfo.'}cardiacDisease__`,

        required: isPure,

        "label": "心脏病",
        "inputType": "MC",
        "inputProps": { marshal: 1, options: trueFalseOptions },

        layout: '1/3',
    }
}
export function nurse_既往史_过敏史(isPure = false): IMchc_FormDescriptions_Field_Nullable {
    return {
        // "key": "pregnancyInfo.amh__", 
        "key": `${isPure ? '' : 'pregnancyInfo.'}${isPure ? 'allergy__' : 'amh___'}`,

        required: isPure,

        "label": "过敏史",
        "inputType": "MC",

        "inputProps": {
            marshal: 1, options: '无,药物i,食物i,其他i,不详', type: 'multiple',
            sp: [{
                label: '药物', inputType: 'Select', props: {
                    mode: 'multiple',
                    marshal: 0,
                    options: getPresetOptions('过敏药物s')
                }
            }]
        },
        layout: '1/1',
    }
}
export function nurse_既往史_输血史(isPure = false): IMchc_FormDescriptions_Field_Nullable {
    return {
        // "key": "pregnancyInfo.transfusionHistory__",
        "key": `${isPure ? '' : 'pregnancyInfo.'}transfusionHistory__`,

        "label": "输血史",

        "inputType": "MC",
        required: isPure,

        "inputProps": { marshal: 1, options: trueFalseOptions },

        layout: '1/3',
    }
}
export function nurse_既往史_手术史(isPure = false): IMchc_FormDescriptions_Field_Nullable {
    return {
        // "key": "pregnancyInfo.operationmh__",  
        "key": `${isPure ? '' : 'pregnancyInfo.'}${isPure ? 'operationHistory__' : 'operationmh__'}`,

        "label": "手术史",
        required: isPure,

        "inputType": "MC",
        "inputProps": { marshal: 1, options: trueFalseOptions },

        layout: '1/3',
    }
}
export function nurse_既往史_结核(isPure = false): IMchc_FormDescriptions_Field_Nullable {
    return {
        // "key": "pregnancyInfo.tuberculosis__",
        "key": `${isPure ? '' : 'pregnancyInfo.'}tuberculosis__`,
        isActive: mchcEnv.in(['广三']),
        required: isPure,
        "label": "结核",

        "inputType": "MC",
        "inputProps": { marshal: 1, options: trueFalseOptions },

        layout: '1/3',
    }
}
export function nurse_既往史_肝炎(isPure = false): IMchc_FormDescriptions_Field_Nullable {
    return {
        // "key": "pregnancyInfo.hepaticDisease__",
        "key": `${isPure ? '' : 'pregnancyInfo.'}hepaticDisease__`,

        "label": "肝炎",
        required: isPure,
        isActive: mchcEnv.in(['广三']),

        "inputType": "MC",
        "inputProps": { marshal: 1, options: trueFalseOptions },

        layout: '1/3',
    }
}
export function nurse_既往史_肾病(isPure = false): IMchc_FormDescriptions_Field_Nullable {
    return {
        // "key": "pregnancyInfo.nephropathy__",
        "key": `${isPure ? '' : 'pregnancyInfo.'}nephropathy__`,
        required: isPure,

        "label": "肾病",
        isActive: mchcEnv.in(['广三']),

        "inputType": "MC",
        "inputProps": { marshal: 1, options: trueFalseOptions },

        layout: '1/3',
    }
}
export function nurse_既往史_甲亢(isPure = false): IMchc_FormDescriptions_Field_Nullable {
    return {
        // "key": "pregnancyInfo.thyroidDisease__",
        "key": `${isPure ? '' : 'pregnancyInfo.'}thyroidDisease__`,
        required: isPure,

        "label": "甲亢",
        isActive: mchcEnv.in(['广三']),

        "inputType": "MC",
        "inputProps": { marshal: 1, options: trueFalseOptions },

        layout: '1/3',
    }
}
export function nurse_既往史_性病(isPure = false): IMchc_FormDescriptions_Field_Nullable {
    return {
        // "key": "pregnancyInfo.std__",
        "key": `${isPure ? '' : 'pregnancyInfo.'}std__`,
        required: isPure,

        "label": "性病",
        isActive: mchcEnv.in(['广三']),

        "inputType": "MC",
        "inputProps": { marshal: 1, options: trueFalseOptions },

        layout: '1/3',
    }
}
export function nurse_既往史_传染病(isPure = false): IMchc_FormDescriptions_Field_Nullable {
    return {
        // "key": "pregnancyInfo.infection__",
        "key": `${isPure ? '' : 'pregnancyInfo.'}infection__`,

        "label": "传染病",
        required: isPure,
        isActive: mchcEnv.in(['广三']),

        "inputType": "MC",
        "inputProps": { marshal: 1, options: trueFalseOptions },

        layout: '1/3',
    }
}
export function nurse_既往史_其他(isPure = false): IMchc_FormDescriptions_Field_Nullable {
    return {

        // "key": "pregnancyInfo.otherNote",
        "key": `${isPure ? '' : 'pregnancyInfo.'}otherNote`,
        required: isPure,

        "label": "其他",
        "inputType": 'text_area',
        isNewRow: 1,
        layout: '2/3',
    }
}
export const 本次孕产信息_config = () => {
    const jws = 既往史_pack() as any
    const config: IMchc_FormDescriptions_Field_Nullable = {
        "name": "本次孕产信息",
        "children": [
            {
                "key": "pregnancyInfo.validateDate",
                "label": "建档日期",
                "inputType": "single_date_picker",

                "inputProps": { "placeholder": "请输入建档日期", "maxDate": "now" },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.checkupNO",
                "label": "产检编号",
                "inputType": "input",

                "inputProps": { "placeholder": "请输入产检编号", "disabled": false },
                layout: '1/3',
            },
            // {
            //     "key": "pregnancyInfo.healthHandbookNO",
            //     "label": "保健手册号",
            //     "inputType": "input",
            //     "inputProps": { "placeholder": "请输入保健手册号" },
            //     layout: '1/3',
            // },
            {
                "key": "pregnancyInfo.lmp",
                "label": "末次月经",
                "inputType": "single_date_picker",

                "inputProps": { "placeholder": "请输入末次月经", "maxDate": "now" },
                layout: '1/3',
                "isNewRow": 1,
            }, {
                "key": "pregnancyInfo.edd",
                "label": "预产期-日期",
                "inputType": "single_date_picker",

                "inputProps": { "placeholder": "请输入预产期-日期", "minDate": "now" },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.sureEdd",
                "label": "预产期-B超",
                "inputType": "single_date_picker",
                "rules": [{ "required": true, "message": "预产期-B超是必填项" }],
                "inputProps": { "placeholder": "请输入预产期-B超", "minDate": "now" },
                layout: '1/3',
            },


            {
                "key": "pregnancyInfo.preweight",
                "label": "孕前体重(kg)",
                "inputType": "input_number",

                "inputProps": { "placeholder": "请输入孕前体重(kg)", "style": { "width": 156 } },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.preheight",
                "label": "孕前身高(cm)",
                "inputType": "input_number",

                "inputProps": { "placeholder": "请输入孕前身高(cm)", "style": { "width": 156 } },
                layout: '1/3',
            },
            {
                "key": "pregnancyInfo.bmi",
                "label": "BMI",
                "inputType": "input_with_range",

                "specialConfig": { "tip": "BMI的正常范围值是18.5~24.9kg/㎡", "min": 18.5, "max": 24.9 },
                "inputProps": { "placeholder": "请输入BMI", "style": { "width": 156 }, "disabled": true },
                layout: '1/3',
            },

            {
                "key": "pregnancyInfo.conceiveMode__",
                "label": "受孕方式",
                "inputType": "MC",
                "rules": [{ "required": true, "message": "受孕方式是必填项" }],
                "inputProps": {
                    marshal: 1,
                    options: [
                        { value: 2, label: '自然' },
                        {
                            value: 1, label: 'IVF', parentheses: true, inputType: 'ArrayInput', props: {
                                options: [
                                    { inputType: 'DatePicker', prefix: '移植时间' },
                                    { inputType: 'Input', prefix: '第', suffix: '天胚胎' },
                                    { inputType: 'Input', prefix: '胚胎数', },
                                ]
                            }
                        },
                        { "value": 4, "label": "ICSI", },
                        { "value": 5, "label": "PGT", },
                        { "value": 6, "label": "AIH", },
                        { "value": 7, "label": "AID", },
                        {
                            "value": 3, "label": "其他", inputType: 'Input',
                        }
                    ]
                },
                layout: '1/1',
            },
            {
                "key": "pregnancyInfo.maritalAge",
                "label": "结婚年龄",
                "inputType": "input_number",

                "inputProps": { "placeholder": "请输入结婚年龄", "style": { "width": 156 } },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.menarche",
                "label": "初潮(岁)",
                "inputType": "input_number",

                "inputProps": { "placeholder": "请输入初潮(岁)", "style": { "width": 156 } },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.menstrualCycle",
                "label": "月经周期",
                "inputType": "input_number",

                "inputProps": { "placeholder": "请输入月经周期", "style": { "width": 156 } },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.menstrualPeriod",
                "label": "月经持续天数",
                "inputType": "input_number",

                "inputProps": { "placeholder": "请输入痛经持续天数", "style": { "width": 156 } },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.menstrualVolume",
                "label": "经量",
                "inputType": "checkbox_group",

                "specialConfig": { "type": "single", "options": [{ "value": "多", "label": "多", "withInput": false, "span": 6 }, { "value": "中", "label": "中", "withInput": false, "span": 6 }, { "value": "少", "label": "少", "withInput": false, "span": 6 }] },
                "inputProps": { "placeholder": "请输入经量" },
                layout: '1/3',
            },
            {
                "key": "本次孕产信息一键勾选",
                "label": "一键勾选",
                "inputType": "check_invert_button",
                inputPropsFn() {
                    return {
                        check_invert_values: {
                            ...get_check_invert_values([config]),
                            'pregnancyInfo.fmh': [{ nothing: true }, null]
                        }
                    }
                },
                layout: '1/3',
            },
            {
                "key": "pregnancyInfo.dysmenorrhea__",
                "label": "痛经",
                "inputType": "MC",

                "inputProps": { marshal: 1, options: [{ value: false, label: '否' }, { value: true, label: '是', inputType: 'MyInput' }] },
                layout: '1/3',
            },
            {
                "key": "pregnancyInfo.nearRelation",
                "label": "近亲结婚",
                "inputType": "MC",

                "inputProps": { marshal: 0, options: [{ value: false, label: '否' }, { value: true, label: '是', }] },


                layout: '1/3',
            }, {
                "key": "pregnancyInfo.smoke__",
                "label": "吸烟",
                "inputType": "MC",
                "inputProps": { marshal: 1, options: '否,是i', sp: [{ label: '否', value: false }, { value: true, label: '是', suffix: '支/天' },] },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.alcohol__",
                "label": "饮酒",
                "inputType": "MC",
                "inputProps": { marshal: 1, options: '否,是i', sp: [{ label: '否', value: false }, { value: true, label: '是', suffix: 'ml' },] },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.hazardoussubstances__",
                "label": "接触有害物质",
                "inputType": "MC",
                "inputProps": { marshal: 1, options: '否,是i', sp: [{ label: '否', value: false }, { value: true, label: '是' }] },

                layout: '1/3',
            }, {
                "key": "pregnancyInfo.medicine__",
                "label": "近期是否服药",
                "inputType": "MC",
                "inputProps": { marshal: 1, options: '否,是i', sp: [{ label: '否', value: false }, { value: true, label: '是' }] },

                layout: '1/3',
            }, {
                "key": "pregnancyInfo.radioactivity__",
                "label": "接触放射性",
                "inputType": "MC",
                "inputProps": { marshal: 1, options: '否,是i', sp: [{ label: '否', value: false }, { value: true, label: '是' }] },
                layout: '1/3',
            },








            ...jws,



            {
                "key": "pregnancyInfo.fmh",
                "label": "家族史",
                "inputType": "checkbox_group_object",

                "inputProps": {
                    optionKey: '家族史',
                },
                layout: '1/1',
                "isNewRow": 1,
            },


            {
                "key": "pregnancyInfo.personalBg",
                "label": "女方ABO血型",
                "inputType": "normal_select",

                "specialConfig": { "type": "aboMapping" },
                "inputProps": { "placeholder": "请选择ABO血型" },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.personalRh",
                "label": "女方Rh血型",
                "inputType": "normal_select",

                "specialConfig": { "type": "rhMapping" },
                "inputProps": { "placeholder": "请选择RH血型", "warningOption": 1 },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.partnerBg",
                "label": "男方ABO血型",
                "inputType": "normal_select",

                "specialConfig": { "type": "aboMapping" },
                "inputProps": { "placeholder": "请选择ABO血型" },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.partnerRh",
                "label": "男方Rh血型",
                "inputType": "normal_select",

                "specialConfig": { "type": "rhMapping" },
                "inputProps": { "placeholder": "请选择RH血型", "warningOption": 1 },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.deliveryPoint",
                "label": mchcEnv.in(['南医增城']) ? '建档医院' : '定点分娩医院',
                "inputType": "MySelect",
                "required": mchcEnv.in(['南医增城']),
                inputProps: { options: '本院、外院、未确定', marshal: 0 },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.checkAmy",
                "label": "是否检查艾梅乙",
                isActive: mchcEnv.in(['广三']),
                "inputType": "MC",
                "inputProps": { "options": "有、无", "marshal": 0 },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.checkHospital",
                "label": "艾梅乙检测方",
                isActive: mchcEnv.in(['广三']),

                "inputType": "MC",
                "inputProps": { "options": '本院,外院i', marshal: 1 },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.hivResult",
                "label": "HIV检测结果",
                isActive: mchcEnv.in(['广三']),

                "inputType": "MC",
                "inputProps": { "options": "阴性、阳性、未查", "marshal": 0 },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.syphilisResult",
                "label": "梅毒检测结果",
                isActive: mchcEnv.in(['广三']),

                "inputType": "MC",
                "inputProps": { "options": "阴性、阳性、未查", "marshal": 0 },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.hbvResult",
                "label": "乙肝检测结果",
                isActive: mchcEnv.in(['广三']),

                "inputType": "MC",
                "inputProps": { "options": "阴性、阳性、未查", "marshal": 0 },
                layout: '1/3',
            }]
    }
    return config
}
export const 孕产史_config = () => {

    const config: IMchc_FormDescriptions_Field_Nullable = {
        "name": "孕产史",
        "children": [
            {
                "key": "pregnancymh",
                "label": "",
                "inputType": "pregnancy_history_v2",

                span: 24,
                // layout: '1/1',
            },
            {
                "key": "comorbiditiesHistory",
                "label": "妊娠合并症史",
                "inputType": 'MC',
                inputProps: { options: '无,有i', marshal: 1 },
                isActive: mchcEnv.is('建瓯'),
                // required: true,
                layout: '1/3',
            },
            {
                "key": "complicationHistory",
                "label": "妊娠并发症史",
                "inputType": "MC",
                inputProps: {
                    options: '无,有i', marshal: 1
                },
                // required: true,
                isActive: mchcEnv.is('建瓯'),
                layout: '1/3',
            },
            {
                "key": "pregnancyHistory",
                "label": "备注",
                "inputType": "text_area",
                isActive: mchcEnv.is('建瓯'),
                // required: true,
                layout: '2/3',
            },
        ]
    }
    return config
}
export const 高危管理_config = () => {
    const config: IMchc_FormDescriptions_Field_Nullable = {
        "name": "高危管理",
        "children": [{
            "key": "highRiskInfo.highriskNote",
            "label": "高危因素",
            "inputType": "input",

            "inputProps": { "disabled": true },
            layout: '2/3',
        }, {
            "key": "highRiskInfo",
            "label": "",
            "inputProps": { "marshal": false },
            "inputType": "HighriskButton",

            layout: '1/3',
        }, {
            "key": "highRiskInfo.highriskGrade",
            "label": "高危等级",
            "inputType": "HighRiskGradeSelectPure",

            "inputProps": { "disabled": true },
            layout: '1/3',
        }, {
            "key": "highRiskInfo.infectionNote",
            "label": "传染病",
            "inputType": "input",

            "inputProps": { "disabled": true },
            layout: '1/3',
        }]
    }
    return config
}
var referralInFd: any = [{
    "id": 12573,
    "key": "referralInInfo.reason",
    "label": "转入原因",
    "inputType": "text_area",
    "rules": [{ "required": true, "message": "转入原因是必填项" }],
    "span": 16,
    "formItemLayout": { "labelCol": { "span": 3 }, "wrapperCol": { "span": 20 } },
}, {
    "id": 12574,
    "key": "referralInInfo.referralDate",
    "label": "转入时间",
    "inputType": "single_date_picker",
    "rules": [{ "required": true, "message": "转入时间是必填项" }],
    "span": 8,
    "formItemLayout": { "labelCol": { "span": 6 }, "wrapperCol": { "span": 16 } },
}, {
    "id": 12575,
    "key": "referralInInfo.organizationId",
    "label": "原单位",
    "inputType": "MyReferralOrganizationSelect",
    "rules": [{ "required": true, "message": "原单位是必填项" }],
    "span": 8,
    "formItemLayout": { "labelCol": { "span": 6 }, "wrapperCol": { "span": 16 } },
}, {
    "id": 12616,
    "key": "referralInInfo.referralDept",
    "label": "原科室",
    "inputType": "input",

    "span": 8,
    "formItemLayout": { "labelCol": { "span": 6 }, "wrapperCol": { "span": 16 } },
}, {
    "id": 12576,
    "key": "referralInInfo.referralDirection",
    "label": "转诊类型",
    "inputType": "checkbox_group",

    "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "平级", "span": 6, "withInput": false }, { "value": 2, "label": "上级", "withInput": false, "span": 6 }, { "value": 3, "label": "下级", "withInput": false, "span": 6 }] },
    "inputProps": { "disabled": true },
    "span": 8,
    "formItemLayout": { "labelCol": { "span": 6 }, "wrapperCol": { "span": 16 } },
}, {
    "id": 12617,
    "key": "referralInInfo.referralDoctor",
    "label": "申请者",
    "inputType": "input",

    "span": 8,
    "formItemLayout": { "labelCol": { "span": 6 }, "wrapperCol": { "span": 16 } },
}, {
    "id": 12618,
    "key": "referralInInfo.referralContactNumber",
    "label": "原科室联系电话",
    "inputType": "input",

    "span": 8,
    "formItemLayout": { "labelCol": { "span": 6 }, "wrapperCol": { "span": 16 } },
}, {
    "id": 12577,
    "key": "referralInInfo.recorder",
    "label": "记录者",
    "inputType": "input",
    "rules": [{ "required": true, "message": "记录者是必填项" }],
    "span": 8,
    "formItemLayout": { "labelCol": { "span": 6 }, "wrapperCol": { "span": 16 } },
}]
export const 转入登记_config = () => {
    const config: IMchc_FormDescriptions_Field_Nullable = {
        "name": "转入登记",
        "children": [{
            "key": "referralInInfo",
            "label": "",
            // "inputType": "referral_register",
            "inputType": "ToggleForm",
            inputProps: {
                formDescriptions: referralInFd,
                plainForm: true
            },

            layout: '1/1',
        }]
    }
    return config
}

export const __lazy_config: IMchc_FormDescriptions_Field_Nullable[] = [
    孕妇基本信息_config(),
    丈夫基本信息_config(),
    本次孕产信息_config(),
    孕产史_config(),
    高危管理_config(),
    体征检查_config(),
    转入登记_config(),
]