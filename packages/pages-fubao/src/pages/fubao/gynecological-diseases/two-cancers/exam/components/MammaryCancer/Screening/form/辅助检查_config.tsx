import { get_check_invert_values } from "@lm_fe/components_m";
import { mchcEnv } from "@lm_fe/env";
import { IMchc_FormDescriptions_Field_Nullable } from "@lm_fe/service";


export function 辅助检查_config(): IMchc_FormDescriptions_Field_Nullable[] {
    if (mchcEnv.in(["建瓯"])) {
        return 辅助检查_config_建瓯()
    }
    return [

        {
            "id": 785,
            "moduleName": "mammary-cancer-screening",
            "name": "辅助检查",
            "flag": "妇女保健-乳腺癌筛查-辅助检查",
            "sort": 4,
            "children": [{
                "id": 18110,
                "key": "breastCancerAuxiliaryExamination.breastUltrasoundExamination",
                "label": "乳腺彩色超声检查",
                "sort": 0,
                "inputType": "checkbox_with_single_input",
                "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "已查", "span": 4, "withInput": false }, { "value": 2, "label": "未查", "withInput": false, "isIssue": true, "span": 4 }] },
                "span": 24,
                "offset": 0,
                "formItemLayout": { "labelCol": { "span": 4 }, "wrapperCol": { "span": 20 } },
            }, {
                "id": 18111,
                "key": "breastCancerAuxiliaryExamination.leftBiRadsClassification",
                "label": "超声评估BI-RADS分级 左乳",
                "sort": 1,
                "inputType": "select_with_options",
                "specialConfig": { "type": "array", "mode": "single", "options": [{ "value": 0, "label": "0级" }, { "value": 1, "label": "Ⅰ级" }, { "value": 2, "label": "Ⅱ级" }, { "value": 3, "label": "Ⅲ级" }, { "value": 4, "label": "Ⅳ级" }, { "value": 5, "label": "Ⅴ级" }] },
                "inputProps": { "placeholder": "请选择" },
                "span": 12,
                "offset": 0,
                "formItemLayout": { "labelCol": { "span": 10 }, "wrapperCol": { "span": 12 } },
            }, {
                "id": 18112,
                "key": "breastCancerAuxiliaryExamination.rightBiRadsClassification",
                "label": "右乳",
                "sort": 2,
                "inputType": "select_with_options",
                "specialConfig": { "type": "array", "mode": "single", "options": [{ "value": 0, "label": "0级" }, { "value": 1, "label": "Ⅰ级" }, { "value": 2, "label": "Ⅱ级" }, { "value": 3, "label": "Ⅲ级" }, { "value": 4, "label": "Ⅳ级" }, { "value": 5, "label": "Ⅴ级" }] },
                "inputProps": { "placeholder": "请选择" },
                "span": 12,
                "offset": 0,
                "formItemLayout": { "labelCol": { "span": 10 }, "wrapperCol": { "span": 12 } },
            }, {
                "id": 18116,
                "key": "breastCancerAuxiliaryExamination.breastXBiRadsExamination",
                "label": "乳腺X线BI-RADS分级",
                "sort": 3,
                "inputType": "checkbox_with_single_input",
                "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "已查", "span": 4, "withInput": false }, { "value": 2, "label": "未查", "withInput": false, "isIssue": true, "span": 4 }] },
                "span": 24,
                "offset": 0,
                "formItemLayout": { "labelCol": { "span": 4 }, "wrapperCol": { "span": 20 } },
            }, {
                "id": 18113,
                "key": "breastCancerAuxiliaryExamination.leftBreastXBiRadsClassification",
                "label": "乳腺X线BI-RADS分级 左乳",
                "sort": 4,
                "inputType": "select_with_options",
                "specialConfig": { "type": "array", "mode": "single", "options": [{ "value": 0, "label": "0级" }, { "value": 1, "label": "Ⅰ级" }, { "value": 2, "label": "Ⅱ级" }, { "value": 3, "label": "Ⅲ级" }, { "value": 4, "label": "Ⅳ级" }, { "value": 5, "label": "Ⅴ级" }] },
                "inputProps": { "placeholder": "请选择" },
                "span": 12,
                "offset": 0,
                "formItemLayout": { "labelCol": { "span": 10 }, "wrapperCol": { "span": 12 } },
            }, {
                "id": 18114,
                "key": "breastCancerAuxiliaryExamination.rightBreastXBiRadsClassification",
                "label": "右乳",
                "sort": 5,
                "inputType": "select_with_options",
                "specialConfig": { "type": "array", "mode": "single", "options": [{ "value": 0, "label": "0级" }, { "value": 1, "label": "Ⅰ级" }, { "value": 2, "label": "Ⅱ级" }, { "value": 3, "label": "Ⅲ级" }, { "value": 4, "label": "Ⅳ级" }, { "value": 5, "label": "Ⅴ级" }] },
                "inputProps": { "placeholder": "请选择" },
                "span": 12,
                "offset": 0,
                "formItemLayout": { "labelCol": { "span": 10 }, "wrapperCol": { "span": 12 } },
            }, {
                "id": 18115,
                "key": "breastCancerAuxiliaryExamination.other",
                "label": "其他",
                "sort": 6,
                "inputType": "input",
                "span": 12,
                "offset": 0,
                "formItemLayout": { "labelCol": { "span": 10 }, "wrapperCol": { "span": 12 } },
            }]
        },
    ]
}
export function 辅助检查_config_建瓯(): IMchc_FormDescriptions_Field_Nullable[] {
    let cache1: IMchc_FormDescriptions_Field_Nullable
    let cache2: IMchc_FormDescriptions_Field_Nullable
    let cache3: IMchc_FormDescriptions_Field_Nullable
    return [

        cache1 = {
            "label": "乳腺彩色超声检查",
            "children": [
                {
                    "label": "左乳",
                    children: [
                        {
                            label: '囊肿',
                            key: 'breastCancerAuxiliaryExamination.leftCyst',
                            inputType: 'MC',
                            required: true,
                            inputProps: {
                                marshal: 0,
                                options: '无,有'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '囊肿类型',
                            key: 'breastCancerAuxiliaryExamination.leftCystOption',
                            inputType: 'MC',
                            required: true,
                            inputProps: {
                                marshal: 0,
                                options: '单纯囊肿,复杂囊肿'
                            },
                            showDeps: {
                                'breastCancerAuxiliaryExamination.leftCyst': [1]
                            },
                            layout: '1/2',
                        },
                        {
                            label: '实性肿块',
                            key: 'breastCancerAuxiliaryExamination.leftSolidMass',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '无,有'
                            },
                            layout: '1/2',

                        },
                        {
                            label: '肿块类型',
                            key: 'breastCancerAuxiliaryExamination.leftSolidMassOption',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '单发,多发'
                            },
                            showDeps: {
                                'breastCancerAuxiliaryExamination.leftSolidMass': [1]
                            },
                            layout: '1/2',

                        },
                        {
                            label: '部位',
                            key: 'breastCancerAuxiliaryExamination.leftPosition',
                            required: true,
                            inputType: 'Input',
                            layout: '1/3',
                            showDeps: {
                                'breastCancerAuxiliaryExamination.leftSolidMass': [1]
                            }
                        },
                        {
                            label: '象限法(可触及者)',
                            key: 'breastCancerAuxiliaryExamination.leftQuadrantMethod',
                            inputType: 'MC',
                            inputProps: {
                                options: '1,2,3,4',
                                type: 'multiple'
                            },
                            layout: '1/3',
                            showDeps: {
                                'breastCancerAuxiliaryExamination.leftSolidMass': [1]
                            }
                        },
                        {
                            label: '时钟法(不可触及者)',
                            key: 'breastCancerAuxiliaryExamination.leftClockMethod',
                            inputType: 'Input',
                            layout: '1/3',
                            showDeps: {
                                'breastCancerAuxiliaryExamination.leftSolidMass': [1]
                            }
                        },
                        {
                            label: '大小',
                            key: 'breastCancerAuxiliaryExamination.leftSize',
                            inputType: 'MArr',
                            required: true,
                            inputProps: {
                                separator: 'x',
                                options: [
                                    { inputType: 'Input', suffix: 'mm' },
                                    { inputType: 'Input', suffix: 'mm' },
                                ]
                            },
                            layout: '1/3',
                            showDeps: {
                                'breastCancerAuxiliaryExamination.leftSolidMass': [1]
                            }
                        },
                        {
                            label: '形态',
                            key: 'breastCancerAuxiliaryExamination.leftForm',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '椭圆形,圆形,不规则,浅分叶'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '方向',
                            key: 'breastCancerAuxiliaryExamination.leftDirection',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '纵横比>=1,纵横比<1'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '边缘',
                            key: 'breastCancerAuxiliaryExamination.leftEdge',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '清晰,不清晰'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '肿块周围晕环',
                            key: 'breastCancerAuxiliaryExamination.leftPeripheralHalo',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '无,规则低回声,不规则高回声晕'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '内部回声性质',
                            key: 'breastCancerAuxiliaryExamination.leftInternalEchoProperty',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '低,等,高,极低回声'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '内部回声分布',
                            key: 'breastCancerAuxiliaryExamination.leftInternalEchoDistribution',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '均匀,不均匀'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '后方回声',
                            key: 'breastCancerAuxiliaryExamination.leftRearEcho',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '无变化,增强,侧方声影,衰减'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '肿块内钙化',
                            key: 'breastCancerAuxiliaryExamination.leftMassCalcificationNote',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                type: 'multiple',
                                options: '无,棒状,环状,沙粒状,簇状'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '血流',
                            key: 'breastCancerAuxiliaryExamination.leftBloodFlow',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '无,少许,丰富'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '腋淋巴结描述',
                            key: 'breastCancerAuxiliaryExamination.leftLymphDesc',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '无,正常影像,异常影像'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '分类',
                            key: 'breastCancerAuxiliaryExamination.leftClassify',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '0类,1类,2类,3类,4类,5类'
                            },
                            layout: '1/2',
                        },
                    ]
                },
                {
                    "label": "右乳",
                    children: [
                        {
                            label: '囊肿',
                            key: 'breastCancerAuxiliaryExamination.rightCyst',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '无,有'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '囊肿类型',
                            key: 'breastCancerAuxiliaryExamination.rightCystOption',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '单纯囊肿,复杂囊肿'
                            },
                            showDeps: {
                                'breastCancerAuxiliaryExamination.rightCyst': [1]
                            },
                            layout: '1/2',
                        },
                        {
                            label: '实性肿块',
                            key: 'breastCancerAuxiliaryExamination.rightSolidMass',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '无,有'
                            },
                            layout: '1/2',

                        },
                        {
                            label: '肿块类型',
                            key: 'breastCancerAuxiliaryExamination.rightSolidMassOption',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '单发,多发'
                            },
                            showDeps: {
                                'breastCancerAuxiliaryExamination.rightSolidMass': [1]
                            },
                            layout: '1/2',

                        },
                        {
                            label: '部位',
                            key: 'breastCancerAuxiliaryExamination.rightPosition',
                            required: true,
                            inputType: 'Input',
                            layout: '1/3',
                            showDeps: {
                                'breastCancerAuxiliaryExamination.rightSolidMass': [1]
                            }
                        },
                        {
                            label: '象限法(可触及者)',
                            key: 'breastCancerAuxiliaryExamination.rightQuadrantMethod',
                            inputType: 'MC',
                            inputProps: {
                                options: '1,2,3,4',
                                type: 'multiple'
                            },
                            layout: '1/3',
                            showDeps: {
                                'breastCancerAuxiliaryExamination.rightSolidMass': [1]
                            }
                        },
                        {
                            label: '时钟法(不可触及者)',
                            key: 'breastCancerAuxiliaryExamination.rightClockMethod',
                            inputType: 'Input',
                            layout: '1/3',
                            showDeps: {
                                'breastCancerAuxiliaryExamination.rightSolidMass': [1]
                            }
                        },
                        {
                            label: '大小',
                            key: 'breastCancerAuxiliaryExamination.rightSize',
                            required: true,
                            inputType: 'MArr',
                            inputProps: {
                                separator: 'x',
                                options: [
                                    { inputType: 'Input', suffix: 'mm' },
                                    { inputType: 'Input', suffix: 'mm' },
                                ]
                            },
                            layout: '1/3',
                            showDeps: {
                                'breastCancerAuxiliaryExamination.rightSolidMass': [1]
                            }
                        },
                        {
                            label: '形态',
                            key: 'breastCancerAuxiliaryExamination.rightForm',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '椭圆形,圆形,不规则,浅分叶'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '方向',
                            key: 'breastCancerAuxiliaryExamination.rightDirection',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '纵横比>=1,纵横比<1'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '边缘',
                            key: 'breastCancerAuxiliaryExamination.rightEdge',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '清晰,不清晰'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '肿块周围晕环',
                            key: 'breastCancerAuxiliaryExamination.rightPeripheralHalo',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '无,规则低回声,不规则高回声晕'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '内部回声性质',
                            key: 'breastCancerAuxiliaryExamination.rightInternalEchoProperty',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '低,等,高,极低回声'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '内部回声分布',
                            key: 'breastCancerAuxiliaryExamination.rightInternalEchoDistribution',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '均匀,不均匀'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '后方回声',
                            key: 'breastCancerAuxiliaryExamination.rightRearEcho',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '无变化,增强,侧方声影,衰减'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '肿块内钙化',
                            key: 'breastCancerAuxiliaryExamination.rightMassCalcificationNote',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                type: 'multiple',
                                options: '无,棒状,环状,沙粒状,簇状'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '血流',
                            key: 'breastCancerAuxiliaryExamination.rightBloodFlow',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '无,少许,丰富'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '腋淋巴结描述',
                            key: 'breastCancerAuxiliaryExamination.rightLymphDesc',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '无,正常影像,异常影像'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '分类',
                            key: 'breastCancerAuxiliaryExamination.rightClassify',
                            required: true,
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '0类,1类,2类,3类,4类,5类'
                            },
                            layout: '1/2',
                        },
                    ]
                },

                {
                    "id": 18115,
                    "key": "breastCancerAuxiliaryExamination.other",
                    "label": "其他",
                    "inputType": "input",
                    layout: '1/1',
                },
                {
                    label: '建议',
                    key: 'breastCancerAuxiliaryExamination.suggestNote',
                    required: true,
                    inputType: 'MC',
                    inputProps: {
                        type: 'multiple',
                        options: '定期检查,乳腺x线检查,活检'
                    },
                    layout: "1/2",
                },
                {
                    "label": "一键勾选",
                    "inputType": "check_invert_button",
                    inputPropsFn() {
                        return {
                            check_invert_values: get_check_invert_values([cache1])
                        }
                    },
                    layout: "1/2",
                }
            ]
        },
        cache2 = {
            "id": 785,
            "label": "乳腺x线检查",
            "children": [
                {
                    "label": "左乳",
                    children: [
                        {
                            label: '肿块',
                            key: 'breastCancerAuxiliaryExamination.leftPhyma',
                            inputType: 'MC',
                            inputProps: {
                                options: '无,有',
                                marshal: 0,
                            },
                            layout: '1/2',

                        },

                        {
                            label: '大小',
                            key: 'breastCancerAuxiliaryExamination.leftPhymaNote',
                            inputType: 'MArr',
                            inputProps: {
                                separator: 'x',
                                options: [
                                    { inputType: 'Input', suffix: 'mm' },
                                    { inputType: 'Input', suffix: 'mm' },
                                ]
                            },
                            layout: '1/2',
                            showDeps: {
                                'breastCancerAuxiliaryExamination.leftPhyma': [1]
                            }
                        },
                        {
                            label: '恶性或可疑钙化',
                            key: 'breastCancerAuxiliaryExamination.leftMalSusCalc',
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '无,有'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '结构紊乱',
                            key: 'breastCancerAuxiliaryExamination.leftStructuralDisorder',
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '无,有'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '部位',
                            key: 'breastCancerAuxiliaryExamination.leftOther',
                            inputType: 'MC',
                            inputProps: {
                                type: 'multiple',
                                options: '外上,外下,内上,内下象限,中央区,乳晕后,其他i'
                            },
                            layout: '1/1',
                        },
                        {
                            label: '分类',
                            key: 'breastCancerAuxiliaryExamination.leftXRaysClassify',
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '0类,1类,2类,3类,4类,5类'
                            },
                            layout: '1/1',
                        },
                    ]
                },
                {
                    "label": "右乳",
                    children: [
                        {
                            label: '肿块',
                            key: 'breastCancerAuxiliaryExamination.rightPhyma',
                            inputType: 'MC',
                            inputProps: {
                                options: '无,有',
                                marshal: 0,
                            },
                            layout: '1/2',

                        },

                        {
                            label: '大小',
                            key: 'breastCancerAuxiliaryExamination.rightPhymaNote',
                            inputType: 'MArr',
                            inputProps: {
                                separator: 'x',
                                options: [
                                    { inputType: 'Input', suffix: 'mm' },
                                    { inputType: 'Input', suffix: 'mm' },
                                ]
                            },
                            layout: '1/2',
                            showDeps: {
                                'breastCancerAuxiliaryExamination.rightPhyma': [1]
                            }
                        },
                        {
                            label: '恶性或可疑钙化',
                            key: 'breastCancerAuxiliaryExamination.rightMalSusCalc',
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '无,有'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '结构紊乱',
                            key: 'breastCancerAuxiliaryExamination.rightStructuralDisorder',
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '无,有'
                            },
                            layout: '1/2',
                        },
                        {
                            label: '部位',
                            key: 'breastCancerAuxiliaryExamination.rightOther',
                            inputType: 'MC',
                            inputProps: {
                                type: 'multiple',
                                options: '外上,外下,内上,内下象限,中央区,乳晕后,其他i'
                            },
                            layout: '1/1',
                        },
                        {
                            label: '分类',
                            key: 'breastCancerAuxiliaryExamination.rightXRaysClassify',
                            inputType: 'MC',
                            inputProps: {
                                marshal: 0,
                                options: '0类,1类,2类,3类,4类,5类'
                            },
                            layout: '1/1',
                        },
                    ]
                },
                {
                    label: '建议',
                    key: 'breastCancerAuxiliaryExamination.xraysSuggestNote',
                    inputType: 'MC',
                    layout: "2/3",
                    inputProps: {
                        type: 'multiple',
                        options: '定期检查,短期随访(6个月后复查乳腺x线),活检,其他i'
                    },
                },
                {
                    "label": "一键勾选",
                    "inputType": "check_invert_button",
                    inputPropsFn() {
                        return {
                            check_invert_values: get_check_invert_values([cache2])
                        }
                    },
                    layout: "1/3",
                }
            ]
        },
        cache3 = {
            "id": 785,
            "label": "组织病理学检查",
            "children": [

                {
                    label: '结果',
                    key: 'breastCancerAuxiliaryExamination.pathologyResultNote',
                    required: true,
                    inputType: 'MC',
                    layout: "1/1",
                    inputProps: {
                        options: '未见异常,异常<良性疾病、不典型增生、小叶原位癌、导管原位癌、浸润性导管癌、浸润性小叶癌、其他乳腺恶性肿瘤>c',
                        sp: [{ label: '未见异常', exclusive: true }]
                    },
                },

            ]
        },
    ]
}