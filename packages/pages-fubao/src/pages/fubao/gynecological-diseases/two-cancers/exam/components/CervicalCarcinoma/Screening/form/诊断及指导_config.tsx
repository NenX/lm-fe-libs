import { mchcEnv } from "@lm_fe/env";
import { IMchc_FormDescriptions_Field } from "@lm_fe/service";
import { formatDate } from "@lm_fe/utils";

export function 诊断及指导_config(): IMchc_FormDescriptions_Field[] {
    if (mchcEnv.is('建瓯')) {
        return 诊断及指导_config_建瓯()
    }
    return [

        {

            "name": "诊断及指导",

            "sort": 0,
            "fields": [{
                "key": "cervicalCancerDiagnosisAndGuidance.screeningResults__",
                "label": "筛查结果",
                "inputType": "MC",
                // "inputType": "checkbox_with_single_input",
                "inputProps": {
                    options: '正常,异常',
                    inputWidth: 256,
                    sp: [{ label: '异常', inputType: 'MA', props: { options: '外生殖器尖锐湿疣,滴虫性阴道炎,外阴阴道假丝酵母菌病,细菌性阴道病,黏液脓性宫颈炎,宫颈息肉,子宫肌瘤' } }]
                },
                "rules": [{ "required": true, "message": "筛查结果是必填项" }],
                // "specialConfig": {
                //     "type": "single", "options": [{ "value": 1, "label": "正常", "span": 4, "withInput": false }, {
                //         "value": 2, "label": "异常", "withInput": true, "isIssue": true, "span": 4, "inputSpan": 12, "inputType": "autoComplete",
                //         "inputOption": [
                //             { "value": "外生殖器尖锐湿疣" },
                //             { "value": "滴虫性阴道炎" },
                //             { "value": "外阴阴道假丝酵母菌病" },
                //             { "value": "细菌性阴道病" },
                //             { "value": "黏液脓性宫颈炎" },
                //             { "value": "宫颈息肉" },
                //             { "value": "子宫肌瘤" }
                //         ]
                //     }]
                // },
                layout: '1/1',

            }, {
                "key": "cervicalCancerDiagnosisAndGuidance.screeningSuggest",
                "label": "筛查建议",
                "inputType": "MC",
                "rules": [{ "required": true, "message": "筛查建议是必填项" }],
                "inputProps": { marshal: 0, "options": [{ "value": "定期检查", "label": "定期检查", "span": 4 }, { "value": "可疑", "label": "可疑", "span": 4 }, { "value": "活检", "label": "活检", "span": 4 }] },
                layout: '1/1',

            }, {
                "key": "cervicalCancerDiagnosisAndGuidance.checkUnit",
                "label": "检查单位",
                "inputType": "input",
                "rules": [{ "required": true, "message": "检查单位是必填项" }],
                layout: '1/3',

            }, {
                "key": "cervicalCancerDiagnosisAndGuidance.checkDate",
                "label": "检查日期",
                "inputType": "DatePicker",
                "rules": [{ "required": true, "message": "检查日期是必填项" }],
                "inputProps": { format: formatDate.format },
                layout: '1/3',
            }, {
                "key": "cervicalCancerDiagnosisAndGuidance.checkDoctorName",
                "label": "检查医生",
                "inputType": "input",
                "rules": [{ "required": true, "message": "检查医生是必填项" }],
                layout: '1/3',

            }]
        }]

}
export function 诊断及指导_config_建瓯(): IMchc_FormDescriptions_Field[] {
    return [

        {

            "name": '最后诊断',

            "sort": 0,
            "fields": [
                {
                    "key": "cervicalCancerDiagnosisAndGuidance.finalDiagnosisErrorType",
                    "label": "筛查结果",
                    required: true,
                    "inputType": "MC",
                    // "inputType": "checkbox_with_single_input",
                    "inputProps": {
                        options: '正常,异常',
                        marshal: 0
                    },
                    layout: '1/1',
                },
                {
                    "key": "cervicalCancerDiagnosisAndGuidance.finalDiagnosisErrorTypeNote",
                    required: true,
                    "label": "异常结果",
                    "inputType": "MC",
                    // "inputType": "checkbox_with_single_input",
                    "inputProps": {
                        type: 'multiple',
                        options: '低级别鳞状上皮内病变(LSIL),高级别鳞状上皮内病变(HSIL),宫颈原位腺癌(ALS),宫颈微小浸润癌<鳞癌、腺癌>c,宫颈浸润癌<鳞癌、腺癌>c,滴虫性阴道炎,外阴阴道假丝酵母菌病,细菌性阴道病,外生殖器尖锐湿疣,子宫肌瘤,粘液脓性宫颈炎,宫颈息肉,其他生殖系统恶性肿瘤i,其他生殖系统良性疾病i,不详',
                    },
                    showDeps: {
                        "cervicalCancerDiagnosisAndGuidance.finalDiagnosisErrorType": [2]
                    },
                    layout: '1/1',
                },


            ]
        },
        {

            "name": '随访治疗情况',

            "sort": 0,
            "fields": [
                {
                    inputType: 'MC',
                    label: '随访情况',
                    key: 'cervicalCancerDiagnosisAndGuidance.followUpStatus',
                    inputProps: {
                        marshal: 0,
                        options: '已随访,失访'
                    },
                    layout: '1/2',
                },
                {
                    inputType: 'MC',
                    label: '宫颈病变接受治疗情况',
                    key: 'cervicalCancerDiagnosisAndGuidance.cervicalTreatmentStatus',
                    inputProps: {
                        marshal: 0,
                        options: '是,否'
                    },
                    layout: '1/2',

                },


            ]
        },
    ]

}