import { mchcEnv } from "@lm_fe/env";
import { IMchc_FormDescriptions_Field } from "@lm_fe/service";

export function 病史情况_config(): IMchc_FormDescriptions_Field[] {
    return mchcEnv.in(['建瓯']) ? 病史情况_config_建瓯() : [

        {
            "moduleName": "cervical-carcinoma-screening",
            "name": "病史情况",
            "flag": "妇女保健-宫颈癌筛查-病史情况",
            "sort": 0,
            "fields": [{
                "key": "cervicalCancerMedicalHistory.previousCervicalScreening__",
                "label": "既往接受宫颈癌筛查",
                inputType: 'MC',
                inputProps: { options: [{ label: '否', value: 1 }, { label: '是', value: 2, inputType: 'Input' }] },
                // "inputType": "checkbox_with_single_input",
                // "specialConfig": {
                //     "type": "single", "options": [
                //         { "value": 1, "label": "否", "span": 4, "withInput": false },
                //         { "value": 2, "label": "是", "withInput": true, "isIssue": true, "span": 4, "inputSpan": 12 }
                //     ]
                // },
                layout: '1/1',
            },
            {
                "key": "cervicalCancerMedicalHistory.discomfortItems",
                "label": "不适症状",
                "inputType": "MC",
                inputProps: {
                    type: 'multiple',
                    options: `无,月经不规律,外阴瘙痒,宫颈出血,性交疼痛,性交出血,绝经后阴道出血,下腹不适,失眠,其他i`
                },
                // "inputType": "checkbox_with_inputv2",
                // "specialConfig": {
                //     "type": "multiple",
                //     "options": [
                //         { "value": 0, "label": "无",  "along": true, "span": 4 },
                //         { "value": 1, "label": "月经不规律",  "span": 4 },
                //         { "value": 2, "label": "外阴瘙痒",  "span": 4 },
                //         { "value": 3, "label": "宫颈出血",  "span": 4 },
                //         { "value": 4, "label": "性交疼痛",  "span": 4 },
                //         { "value": 5, "label": "性交出血",  "span": 4 },
                //         { "value": 6, "label": "绝经后阴道出血",  "span": 4 },
                //         { "value": 7, "label": "下腹不适",  "span": 4 },
                //         { "value": 8, "label": "失眠",  "span": 4 },
                //         { "value": 9, "label": "其他", "withInput": true, "span": 4 }
                //     ]
                // },
                layout: '1/1',

            }, {
                "key": "cervicalCancerMedicalHistory.contraceptiveMethodItems",
                "label": "避孕方式",
                "inputType": "MC",
                inputProps: {
                    type: 'multiple',
                    options: `无,避孕药物i,避孕工具i,皮下埋植i,IUDi,结扎手术i,安全期i,其他i`
                },
                // "inputType": "checkbox_with_inputv2",
                // "specialConfig": {
                //     "type": "multiple",
                //     "options": [
                //         { "value": 0, "label": "无",  "along": true, "span": 4 },
                //         { "value": 1, "label": "避孕药物", "withInput": true, "span": 4, "inputSpan": 4 },
                //         { "value": 2, "label": "避孕工具", "withInput": true, "span": 4, "inputSpan": 4 },
                //         { "value": 3, "label": "皮下埋植", "withInput": true, "span": 4, "inputSpan": 4 },
                //         { "value": 4, "label": "IUD", "withInput": true, "span": 4, "inputSpan": 4 },
                //         { "value": 5, "label": "结扎手术", "withInput": true, "span": 4, "inputSpan": 4 },
                //         { "value": 6, "label": "安全期", "withInput": true, "span": 4, "inputSpan": 4 },
                //         { "value": 7, "label": "其他", "withInput": true, "span": 4, "inputSpan": 4 }
                //     ]
                // },
                layout: '1/1',

            }, {
                "key": "cervicalCancerMedicalHistory.gynecologicalDiseasesHistory__",
                "label": "妇科疾病史",
                inputType: 'MC',
                inputProps: { options: [{ label: '无', value: 1 }, { label: '有', value: 2, inputType: 'Input' }] },

                // "inputType": "checkbox_with_single_input",
                // "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "无", "span": 4, "withInput": false }, { "value": 2, "label": "有", "withInput": true, "isIssue": true, "span": 4, "inputSpan": 12 }] },

                layout: '1/1',

            }, {
                "key": "cervicalCancerMedicalHistory.familyTumorHistoryVOS",
                "label": "家族肿瘤史!!",
                "inputType": "family_tumor_history",
                "inputProps": null,
                layout: '1/1',
            }]
        },

    ]
}

// "inputProps": { "placeholder": "请输入联系人", "dependency": { "show": { "key": "baseInfo.maritalStatus", "value": [2, 3, 5] } } },


function 病史情况_config_建瓯(): IMchc_FormDescriptions_Field[] {
    return [

        {
            "name": "病史情况",
            "fields": [
                {
                    "key": "cervicalCancerMedicalHistory.previousCervicalScreening",
                    "label": "既往接受宫颈癌筛查",
                    required: true,
                    inputType: 'MC',
                    inputProps: { options: '否,是', marshal: 0 },
                    layout: '1/3',
                },
                {
                    "key": "cervicalCancerMedicalHistory.lastScreeningTime",
                    "label": "最近一次筛查时间",
                    required: true,
                    inputType: 'DatePicker',
                    inputProps: { "dependency": { "show": { "key": "cervicalCancerMedicalHistory.previousCervicalScreening", "value": [1] } } },
                    layout: '1/3',
                },
                {
                    "key": "cervicalCancerMedicalHistory.threeYearsScreening",
                    "label": "三年前是否接受过筛查",
                    required: true,
                    inputType: 'MC',
                    inputProps: { marshal: 0, options: '否,是', "dependency": { "show": { "key": "cervicalCancerMedicalHistory.previousCervicalScreening", "value": [1] } } },
                    layout: '1/3',
                },
                {
                    "key": "cervicalCancerMedicalHistory.hasPreviousHPVVaccination",
                    "label": "既往是否接种过HPV疫苗",
                    required: true,
                    inputType: 'MC',
                    inputProps: { marshal: 0, options: '否,是' },
                    layout: '1/3',
                },
                {
                    "key": "cervicalCancerMedicalHistory.hpvVaccinationDate",
                    "label": "接种HPV疫苗时间",
                    required: true,
                    inputType: 'DatePicker',
                    inputProps: { "dependency": { "show": { "key": "cervicalCancerMedicalHistory.hasPreviousHPVVaccination", "value": [1] } } },
                    layout: '1/3',
                },
                {
                    "key": "cervicalCancerMedicalHistory.hpvVaccinationTypeNote",
                    "label": "接种HPV疫苗类型",
                    required: true,
                    inputType: 'MC',
                    isNewRow: 1,
                    inputProps: { type: 'multiple', options: '进口二价,进口四价,进口九价,国产二价,其他i', "dependency": { "show": { "key": "cervicalCancerMedicalHistory.hasPreviousHPVVaccination", "value": [1] } } },
                    layout: '1/1',
                },

            ]
        },

    ]
}