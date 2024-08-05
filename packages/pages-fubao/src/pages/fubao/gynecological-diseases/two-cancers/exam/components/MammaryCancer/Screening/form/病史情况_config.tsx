import { mchcEnv } from "@lm_fe/env";
import { IMchc_FormDescriptions_Field } from "@lm_fe/service";
import { get_check_invert_values } from '@lm_fe/components_m'
export function 病史情况_config() {
    if (mchcEnv.in(['建瓯'])) {
        return 病史情况_config_建瓯()
    }
    const cache: IMchc_FormDescriptions_Field[] = [

        {
            "id": 783,
            "name": "病史情况",
            "children": [{
                "id": 18097,
                "key": "breastCancerMedicalHistory.previousBreastScreening__",
                "label": "既往接受乳腺癌筛查",
                "inputType": "MC",
                inputProps: { options: [{ label: '否', value: 1 }, { label: '是', value: 2, inputType: 'Input' }] },
                // "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "否", "span": 4, "withInput": false }, { "value": 2, "label": "是", "withInput": true, "isIssue": true, "span": 4, "inputSpan": 12 }] },
                "span": 24,
                "offset": 0,
                "formItemLayout": { "labelCol": { "span": 4 }, "wrapperCol": { "span": 20 } },
            }, {
                "id": 18098,
                "key": "breastCancerMedicalHistory.breastSurgeryOrBiopsy__",
                "label": "乳腺手术或活检史",
                "inputType": "MC",
                inputProps: { options: [{ label: '否', value: 1 }, { label: '是', value: 2, inputType: 'Input' }] },
                // "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "无", "span": 4, "withInput": false }, { "value": 2, "label": "有", "withInput": true, "isIssue": true, "span": 4, "inputSpan": 12, "inputType": "autoComplete", "inputOption": [{ "value": "病历结果良性" }, { "value": "病历结构恶性" }] }] },
                "span": 24,
                "offset": 0,
                "formItemLayout": { "labelCol": { "span": 4 }, "wrapperCol": { "span": 20 } },
            }, {
                "id": 18099,
                "key": "breastCancerMedicalHistory.hormoneReplacementTherapyHistory__",
                "label": "激素替代治疗史",
                "inputType": "MC",
                inputProps: { options: [{ label: '否', value: 1 }, { label: '是', value: 2, inputType: 'Input' }] },
                // "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "无", "span": 4, "withInput": false }, { "value": 2, "label": "有", "withInput": true, "isIssue": true, "span": 4, "inputSpan": 12, "placeholder": "请输入用药时长" }] },
                layout: '1/1',
            }, {
                "id": 18103,
                "key": "breastCancerMedicalHistory.familyTumorHistoryVOS",
                "label": "家族肿瘤史",
                "inputType": "family_tumor_history",
                "span": 24,
                "offset": 0,
                "formItemLayout": { "labelCol": { "span": 4 }, "wrapperCol": { "span": 20 } },
            }]
        },
    ]
    return cache
}



function 病史情况_config_建瓯() {

    const cache: IMchc_FormDescriptions_Field[] = [

        {
            "id": 783,
            "name": "病史情况",
            "children": [
                {
                    "key": "breastCancerMedicalHistory.previousBreastScreening__",
                    "label": "既往接受乳腺癌筛查",
                    "inputType": "MC",
                    required: true,
                    inputProps: {
                        // marshal: 0,
                        options:
                            [
                                { label: '否', value: 1 },
                                {
                                    label: '是', value: 2, inputType: 'MArr', props: {
                                        options: [
                                            { label: '最近一次筛查时间', inputType: 'DatePicker' },
                                            { label: '检查内容', inputType: 'MC', props: { options: '手诊,超声,x线,其他i,不详', type: 'multiple' } },
                                        ]
                                    }
                                }
                            ],
                    },
                    layout: '1/1',
                },
                {
                    "key": "breastCancerMedicalHistory.breastSurgeryOrBiopsy__",
                    "label": "乳腺手术或活检史",
                    required: true,
                    "inputType": "MC",
                    inputProps: {
                        options: [
                            { label: '无', value: 1 },
                            {
                                label: '有', value: 2, inputType: 'MArr', props: {
                                    options: [
                                        { inputType: 'Input', suffix: '次' },
                                        { inputType: 'MC', prefix: '病理结果', props: { options: '良性,恶性', marshal: 0 } },
                                    ]
                                }
                            }
                        ]
                    },
                    layout: '1/1'
                },
                {
                    "key": "breastCancerMedicalHistory.hormoneReplacementTherapyHistory__",
                    "label": "激素替代治疗史",
                    "inputType": "MC",
                    required: true,
                    inputProps: { options: [{ label: '无', value: 1 }, { label: '有', value: 2, inputType: 'Input', prefix: '用药时间', suffix: '年', parentheses: true }] },
                    // "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "无", "span": 4, "withInput": false }, { "value": 2, "label": "有", "withInput": true, "isIssue": true, "span": 4, "inputSpan": 12, "placeholder": "请输入用药时长" }] },
                    layout: '1/1',

                },

                {
                    "key": "breastCancerMedicalHistory.breastCancer",
                    "label": "乳腺癌家族史",
                    "inputType": "MC",
                    required: true,
                    inputProps: {
                        options: '无,有<母亲、女儿、亲姐妹、其他i|1|multiple>c',
                        sp: [
                            {
                                label: '有',
                                prefix: '患者与自己的关系:',
                            }
                        ]
                    },
                    layout: '1/1'
                },
                {
                    "key": "breastCancerMedicalHistory.ovarianCancer",
                    "label": "卵巢癌家族史",
                    "inputType": "MC",
                    required: true,
                    inputProps: {
                        options: '无,有<母亲、女儿、亲姐妹、其他i|1|multiple>c',
                        sp: [
                            {
                                label: '有',
                                prefix: '患者与自己的关系:',
                            }
                        ]
                    },
                    layout: '1/1'
                },
                {
                    inputType: 'check_invert_button',
                    label: '一键勾选',
                    inputPropsFn() {
                        return {
                            check_invert_values: get_check_invert_values(cache)
                        }
                    }
                }

            ]
        },

    ]
    return cache
}