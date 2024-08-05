import { get_check_invert_values } from "@lm_fe/components_m";
import { mchcEnv } from "@lm_fe/env";
import { IMchc_FormDescriptions_Field_Nullable } from "@lm_fe/service";
import { 既往史_pack } from "./既往史";
import { month1_12 } from "./common";





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
                required: mchcEnv.in(['广三']),
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
                required: mchcEnv.in(['广三']),

                "specialConfig": { "type": "aboMapping" },
                "inputProps": { "placeholder": "请选择ABO血型" },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.personalRh",
                "label": "女方Rh血型",
                "inputType": "normal_select",
                required: mchcEnv.in(['广三']),
                "specialConfig": { "type": "rhMapping" },
                "inputProps": { "placeholder": "请选择RH血型", "warningOption": 1 },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.partnerBg",
                "label": "男方ABO血型",
                "inputType": "normal_select",
                required: mchcEnv.in(['广三']),

                "specialConfig": { "type": "aboMapping" },
                "inputProps": { "placeholder": "请选择ABO血型" },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.partnerRh",
                "label": "男方Rh血型",
                "inputType": "normal_select",
                required: mchcEnv.in(['广三']),

                "specialConfig": { "type": "rhMapping" },
                "inputProps": { "placeholder": "请选择RH血型", "warningOption": 1 },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.deliveryPoint",
                "label": mchcEnv.in(['南医增城']) ? '建档医院' : '定点分娩医院',
                "inputType": "MySelect",
                "required": mchcEnv.in(['南医增城','广三']),
                inputProps: { options: '本院、外院、未确定', marshal: 0 },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.checkAmy",
                "label": "是否检查艾梅乙",
                isActive: mchcEnv.in(['广三']),
                required: mchcEnv.in(['广三']),
                "inputType": "MC",
                "inputProps": { "options": "有、无", "marshal": 0 },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.checkHospital",
                "label": "艾梅乙检测方",
                isActive: mchcEnv.in(['广三']),
                required: mchcEnv.in(['广三']),

                "inputType": "MC",
                "inputProps": { "options": '本院,外院i', marshal: 1 },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.hivResult",
                "label": "HIV检测结果",
                isActive: mchcEnv.in(['广三']),
                required: mchcEnv.in(['广三']),

                "inputType": "MC",
                "inputProps": { "options": "阴性、阳性、未查", "marshal": 0 },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.syphilisResult",
                "label": "梅毒检测结果",
                isActive: mchcEnv.in(['广三']),
                required: mchcEnv.in(['广三']),

                "inputType": "MC",
                "inputProps": { "options": "阴性、阳性、未查", "marshal": 0 },
                layout: '1/3',
            }, {
                "key": "pregnancyInfo.hbvResult",
                "label": "乙肝检测结果",
                isActive: mchcEnv.in(['广三']),
                required: mchcEnv.in(['广三']),

                "inputType": "MC",
                "inputProps": { "options": "阴性、阳性、未查", "marshal": 0 },
                layout: '1/3',
            }]
    }
    return config
}
