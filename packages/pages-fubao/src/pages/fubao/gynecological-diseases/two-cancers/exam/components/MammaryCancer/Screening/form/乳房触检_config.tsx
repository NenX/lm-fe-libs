import { get_check_invert_values } from "@lm_fe/components_m";
import { mchcEnv } from "@lm_fe/env";
import { IMchc_FormDescriptions_Field } from "@lm_fe/service";

export function 乳房触检_config() {
    if (mchcEnv.in(["建瓯"])) {
        return 乳房触检_config_建瓯()
    }
    const cache: IMchc_FormDescriptions_Field[] = [
        {
            "id": 784,
            "name": "乳房触检",
            "children": [
                {
                    "id": 18104,
                    "key": "breastCancerBreastPalpation.leftBreastSignsNote",
                    "label": "左乳体征",
                    "inputType": "checkbox_with_inputv2",
                    "specialConfig": { "type": "multiple", "options": [{ "value": 0, "label": "未见异常", "withInput": false, "along": true, "span": 4 }, { "value": 1, "label": "乳房肿块或团块", "withInput": true, "isIssue": true, "span": 4, "inputType": "autoComplete", "inputOption": [{ "value": "最大直径   cm" }] }, { "value": 2, "label": "不对称性增厚或结节", "withInput": true, "isIssue": true, "span": 4 }, { "value": 3, "label": "皮肤改变", "withInput": true, "isIssue": true, "span": 4 }, { "value": 4, "label": "腋淋巴结节肿大", "withInput": true, "isIssue": true, "span": 4 }, { "value": 5, "label": "其他", "withInput": true, "isIssue": true, "span": 4 }] },
                    "span": 24,
                    "offset": 0,
                    "formItemLayout": { "labelCol": { "span": 4 }, "wrapperCol": { "span": 20 } },
                },
                {
                    "id": 18105,
                    "key": "breastCancerBreastPalpation.leftBreastSymptomsNote",
                    "label": "左乳症状",
                    "inputType": "checkbox_with_inputv2",
                    "specialConfig": { "type": "multiple", "options": [{ "value": 0, "label": "无", "withInput": false, "along": true, "span": 4 }, { "value": 1, "label": "乳腺疼痛", "withInput": true, "isIssue": true, "span": 4, "inputType": "autoComplete", "inputOption": [{ "value": "周期性" }, { "value": "非周期性" }] }, { "value": 2, "label": "乳头溢液", "withInput": true, "isIssue": true, "span": 4, "inputType": "autoComplete", "inputOption": [{ "value": "血性" }, { "value": "浆液性" }] }] },
                    "span": 24,
                    "offset": 0,
                    "formItemLayout": { "labelCol": { "span": 4 }, "wrapperCol": { "span": 20 } },
                },
                {
                    "id": 18106,
                    "key": "breastCancerBreastPalpation.rightBreastSignsNote",
                    "label": "右乳体征",
                    "inputType": "checkbox_with_inputv2",
                    "specialConfig": { "type": "multiple", "options": [{ "value": 0, "label": "未见异常", "withInput": false, "along": true, "span": 4 }, { "value": 1, "label": "乳房肿块或团块", "withInput": true, "isIssue": true, "span": 4, "inputType": "autoComplete", "inputOption": [{ "value": "最大直径   cm" }] }, { "value": 2, "label": "不对称性增厚或结节", "withInput": true, "isIssue": true, "span": 4 }, { "value": 3, "label": "皮肤改变", "withInput": true, "isIssue": true, "span": 4 }, { "value": 4, "label": "腋淋巴结节肿大", "withInput": true, "isIssue": true, "span": 4 }, { "value": 5, "label": "其他", "withInput": true, "isIssue": true, "span": 4 }] },
                    "span": 24,
                    "offset": 0,
                    "formItemLayout": { "labelCol": { "span": 4 }, "wrapperCol": { "span": 20 } },
                },
                {
                    "id": 18107,
                    "key": "breastCancerBreastPalpation.rightBreastSymptomsNote",
                    "label": "右乳症状",
                    "inputType": "checkbox_with_inputv2",
                    "specialConfig": { "type": "multiple", "options": [{ "value": 0, "label": "无", "withInput": false, "along": true, "span": 4 }, { "value": 1, "label": "乳腺疼痛", "withInput": true, "isIssue": true, "span": 4, "inputType": "autoComplete", "inputOption": [{ "value": "周期性" }, { "value": "非周期性" }] }, { "value": 2, "label": "乳头溢液", "withInput": true, "isIssue": true, "span": 4, "inputType": "autoComplete", "inputOption": [{ "value": "血性" }, { "value": "浆液性" }] }] },
                    "span": 24,
                    "offset": 0,
                    "formItemLayout": { "labelCol": { "span": 4 }, "wrapperCol": { "span": 20 } },
                },
                {
                    "id": 18108,
                    "key": "breastCancerBreastPalpation.other",
                    "label": "其他",
                    "inputType": "input",
                    "span": 12,
                    "offset": 0,
                    "formItemLayout": { "labelCol": { "span": 8 }, "wrapperCol": { "span": 12 } },
                },
                {
                    "id": 18109,
                    "key": "selectBtn",
                    "label": "一键勾选",
                    "inputType": "check_invert_button",
                    "inputProps": { "type": "primary", "size": "middle" },
                    "span": 6,
                    "offset": 0,
                    "isNewRow": 1,
                    "formItemLayout": { "labelCol": { "span": 2 }, "wrapperCol": { "span": 2 } },
                }
            ]
        },
    ]
    return cache
}


function 乳房触检_config_建瓯() {
    const cache: IMchc_FormDescriptions_Field[] = [
        {
            "id": 784,
            "name": "乳房触检",
            "children": [
                {
                    label: '左乳',
                    children: [
                        {
                            "key": "breastCancerBreastPalpation.leftBreastSymptomsNote",
                            "label": "症状",
                            required: true,
                            "inputType": "MC",
                            inputProps: {
                                inputWidth: 120,

                                options: '无,有',
                                sp: [{ label: '有', "inputType": "MC", parentheses: true, props: { type: 'multiple', options: '乳腺疼痛<周期性、非周期性>a,乳头溢液<血性、浆液性、其它>a' } }]
                            },
                            layout: '1/1',

                        },
                        {
                            "key": "breastCancerBreastPalpation.leftBreastSignsNote",
                            "label": "体征",
                            required: true,
                            "inputType": "MC",
                            inputProps: {
                                type: 'multiple',
                                options: '未见异常,乳房肿块或团块i,不对称性增厚或结节,皮肤改变i,腋淋巴结肿大,其他i',
                                sp: [{ label: '未见异常', exclusive: true }, { label: '乳房肿块或团块', parentheses: true, prefix: '最大径', suffix: 'CM' }]
                            },
                            layout: '1/1',
                        },

                    ]
                },
                {
                    label: '右乳',
                    children: [
                        {
                            "key": "breastCancerBreastPalpation.rightBreastSymptomsNote",
                            "label": "症状",
                            required: true,
                            "inputType": "MC",
                            inputProps: {
                                inputWidth: 120,

                                options: '无,有',
                                sp: [{ label: '有', "inputType": "MC", parentheses: true, props: { type: 'multiple', options: '乳腺疼痛<周期性、非周期性>a,乳头溢液<血性、浆液性、其它>a' } }]
                            },
                            layout: '1/1',
                        },
                        {
                            "key": "breastCancerBreastPalpation.rightBreastSignsNote",
                            required: true,
                            "label": "体征",
                            "inputType": "MC",
                            inputProps: {
                                type: 'multiple',
                                options: '未见异常,乳房肿块或团块i,不对称性增厚或结节,皮肤改变i,腋淋巴结肿大,其他i',
                                sp: [{ label: '未见异常', exclusive: true }, { label: '乳房肿块或团块', parentheses: true, prefix: '最大径', suffix: 'CM' }]
                            },
                            layout: '1/1',
                        },


                    ]
                },

                {
                    "key": "breastCancerBreastPalpation.other",
                    "label": "临床检查结果",
                    required: true,
                    "inputType": "MC",
                    inputProps: { options: '未见异常(阴性),阳性i' },
                    layout: '1/1',
                },
                {
                    "key": "breastCancerBreastPalpation.furtherExaminationNote",
                    "label": "进一步检查",
                    required: true,
                    "inputType": "MC",
                    inputProps: { options: '否,是<乳腺彩超检查、乳腺x线检查、乳腺彩超和乳腺x线联合筛查、组织病理检查、其他i|1|multiple>c' },
                    layout: '1/1',
                },
                {
                    "label": "一键勾选",
                    inputType: 'check_invert_button',
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