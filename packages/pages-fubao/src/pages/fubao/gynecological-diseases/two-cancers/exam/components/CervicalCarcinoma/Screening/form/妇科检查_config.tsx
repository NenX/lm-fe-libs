import { get_check_invert_values } from "@lm_fe/components_m";
import { mchcEnv } from "@lm_fe/env";
import { IMchc_FormDescriptions_Field } from "@lm_fe/service";
import { 乳房触检_config } from "../../../MammaryCancer/Screening/form/乳房触检_config";

export function 妇科检查_config() {
    if (mchcEnv.in(["建瓯"])) {
        return 妇科检查_config_建瓯()
    }
    const cache: IMchc_FormDescriptions_Field[] = [
        {
            "name": "妇科检查",
            "sort": 0,
            "children": [{
                "key": "cervicalCancerGynecologicExamination.vulva__",
                "label": "外阴",
                "inputType": "MC",

                "inputProps": {
                    options: '未见异常,异常',
                    sp: [{ label: '异常', inputType: 'MA', props: { options: '白斑,溃疡,疱疹,肿物' } }]
                },
                layout: "1/3",
            }, {
                "key": "cervicalCancerGynecologicExamination.secretions__",
                "label": "分泌物",
                "inputType": "MC",
                "inputProps": {
                    options: '未见异常,异常',
                    sp: [{ label: '异常', inputType: 'MA', props: { options: '异位,血性,脓性,泡沫样,豆腐渣' } }]
                },
                layout: "1/3",

            }, {
                "key": "cervicalCancerGynecologicExamination.vaginal__",
                "label": "阴道",
                "inputType": "MC",
                "inputProps": {
                    options: '未见异常,异常',
                    sp: [{ label: '异常', inputType: 'MA', props: { options: '充血,溃疡,湿疣,疱疹,肿物' } }]
                },
                layout: "1/3",

            }, {
                "key": "cervicalCancerGynecologicExamination.cervix__",
                "label": "子宫颈",
                "inputType": "MC",


                "inputProps": {
                    options: '未见异常,异常',
                    sp: [{ label: '异常', inputType: 'MA', props: { options: '触血,息肉,糜烂样,菜花样' } }]
                },
                layout: "1/3",

            }, {
                "key": "cervicalCancerGynecologicExamination.zg__",
                "label": "子宫",
                "inputType": "MC",
                "inputProps": {
                    options: '未见异常,异常',
                    sp: [{ label: '异常', inputType: 'MA', props: { options: '大小,肿物' } }]
                },
                layout: "1/3",

            }, {
                "key": "cervicalCancerGynecologicExamination.appendix__",
                "label": "附件",
                "inputType": "MC",
                "inputProps": {
                    options: '未见异常,异常',
                    sp: [{ label: '异常', inputType: 'MA', props: { options: '压痛,肿物' } }]
                },
                layout: "1/3",

            }, {
                "key": "cervicalCancerGynecologicExamination.other",
                "label": "其他",
                "inputType": "input",
                "inputProps": {},
                layout: "1/3",

            }, {
                "key": "selectBtn",
                "label": "一键勾选",
                "inputType": "check_invert_button",
                inputPropsFn() {
                    return {
                        check_invert_values: get_check_invert_values(cache)
                    }
                },
                layout: "1/3",

            }]
        }]
    return cache
}


function 妇科检查_config_建瓯() {
    const cache: IMchc_FormDescriptions_Field[] = [
        {
            "name": "妇科检查",
            "children": [{
                "key": "cervicalCancerGynecologicExamination.vulvaNote",
                "label": "外阴",
                "inputType": "MC",
                required: true,

                "inputProps": {
                    options: '正常,白斑,溃疡,疱疹,肿物,其他i',
                    sp: [{ label: '正常', exclusive: true }],
                    type: 'multiple',
                },
                layout: "1/1",
            },
            {
                "key": "cervicalCancerGynecologicExamination.secretionsNote",
                "label": "分泌物",
                required: true,
                "inputType": "MC",
                "inputProps": {
                    options: '正常,异位,血性,脓性,泡沫样,豆腐渣,其他i',
                    sp: [{ label: '正常', exclusive: true }],
                    type: 'multiple',
                },
                layout: "1/1",

            },
            {
                "key": "cervicalCancerGynecologicExamination.vaginalNote",
                "label": "阴道",
                required: true,
                "inputType": "MC",
                "inputProps": {
                    options: '正常,异常,充血,溃疡,湿疣,疱疹,肿物,其他i',
                    sp: [{ label: '正常', exclusive: true }],
                    type: 'multiple',
                },
                layout: "1/1",

            }, {
                "key": "cervicalCancerGynecologicExamination.cervixNote",
                "label": "子宫颈",
                "inputType": "MC",
                required: true,


                "inputProps": {
                    options: '正常,异常,触血,息肉,糜烂样,菜花样,其他i',
                    sp: [{ label: '正常', exclusive: true }],
                    type: 'multiple',
                },
                layout: "1/1",

            }, {
                "key": "cervicalCancerGynecologicExamination.zgNote",
                "label": "子宫",
                required: true,
                "inputType": "MC",
                "inputProps": {
                    type: 'multiple',
                    sp: [{ label: '正常', exclusive: true }],
                    inputWidth: 96,
                    options: '正常,大小<正常、孕周i>c,肿物(大小、性质、位置)i,脱垂,压痛,其他i',
                },
                layout: "1/1",

            }, {
                "key": "cervicalCancerGynecologicExamination.appendixNote",
                "label": "附件",
                required: true,
                "inputType": "MC",
                "inputProps": {
                    type: 'multiple',
                    options: '正常,压痛,肿物,大小,其他i',
                    sp: [
                        { label: '大小', inputType: 'MC', props: { options: '正常,孕周i' } },
                        { label: '压痛', inputType: 'MC', props: { options: '左,右' } },
                        { label: '正常', exclusive: true },
                        { label: '肿物', inputType: 'MC', props: { options: '左,右' } },
                    ]
                },
                layout: "1/1",

            },
            {
                "key": "cervicalCancerGynecologicExamination.secretionNote",
                "label": "分泌物检查",
                required: true,
                "inputType": "MC",
                "inputProps": {
                    type: 'multiple',
                    options: '正常,清洁度,滴虫,假丝酵母菌,加德纳菌,线索细胞,其他i',
                    sp: [
                        { label: '正常', exclusive: true },
                        { label: '清洁度', inputType: 'MC', props: { options: 'Ⅰ度,Ⅱ度,Ⅲ度,Ⅳ度' } }
                    ]
                },
                layout: "1/1",

            },
            {
                "key": "cervicalCancerGynecologicExamination.diagnosisNote",
                "label": "妇科临床诊断",
                required: true,
                "inputType": "MC",
                "inputProps": {

                    options: '未见异常,异常',
                    sp: [
                        { label: '异常', inputType: 'MC', props: { options: '外生殖器尖锐湿疣,滴虫性阴道炎,外阴阴道假丝酵母菌病,细菌性阴道病,黏液脓性宫颈炎,宫颈息肉,子宫肌瘤,其他i', type: 'multiple', } }
                    ]
                },
                layout: "1/1",
            },



            {
                "label": "一键勾选",
                "inputType": "check_invert_button",
                inputPropsFn() {
                    return {
                        check_invert_values: get_check_invert_values([cache[0]])
                    }
                },
                layout: "1/3",

            }]
        },
        ...乳房触检_config()
    ]
    return cache
}