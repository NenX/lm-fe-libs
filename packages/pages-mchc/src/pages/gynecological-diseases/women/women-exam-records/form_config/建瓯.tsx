import { getSameOptions } from "@lm_fe/env";
import { IMchc_FormDescriptions_Field_Nullable } from "@lm_fe/service";
import { ROMAN_NUMERALS } from "@lm_fe/utils";
export const __lazy_config: IMchc_FormDescriptions_Field_Nullable[] = [
    {
        isActive: 0,
        title: '建瓯'
    },
    {
        label: '基本信息',
        children: [
            {
                "key": "gynecologicalPatient.occupation",
                "label": "职业",
                "inputType": "MS",
                inputProps: { optionKey: '职业s', marshal: 0, disabled: true },
                layout: '1/4',

            },

            {
                "key": "gynecologicalPatient.telephone",
                "label": "联系电话",
                "inputType": "MyInput",
                inputProps: { optionKey: '职业s', marshal: 0, disabled: true },
                layout: '1/4',

            },
            {
                "key": "gynecologicalPatient.maritalAge",
                "label": "结婚年龄",
                "inputType": 'input_number',
                inputProps: {
                    disabled: true
                },
                layout: '1/4',

            },
            {
                "key": "archivist",
                "label": "建档人",
                "inputType": "MyInput",
                inputProps: { optionKey: '职业s', marshal: 0, disabled: true },
                layout: '1/4',

            },
            {
                "key": "gynecologicalPatient.workplace",
                "label": "单位或地址",
                // "inputType": "MyAddress",
                "inputType": 'MyInput',
                inputProps: { optionKey: '职业s', marshal: 0, disabled: true },
                layout: '1/1',

            },

        ]
    },

    {
        label: '实验室检查',
        children: [
            {
                layout: '1/4',
                "key": "gynecologicalLabExam.hpvDate",
                "label": "HPV筛查日期",

                "inputType": "single_date_picker",

            },
            {
                layout: '1/4',

                "key": "gynecologicalLabExam.hpvResult",
                "label": "结果",

                "inputType": "normal_select",
                "specialConfig": { "type": "premaritalExamResultMapping" },

            },
            {
                layout: '1/4',

                "key": "gynecologicalLabExam.hpvNote",
                "label": "备注",

                "inputType": "input",

            },
            {
                layout: '1/4',

                "key": "gynecologicalLabExam.hpvReport",
                "label": "报告",

                "inputType": "input",

            },
            {
                layout: '1/4',
                "key": "gynecologicalLabExam.tctDate",
                "label": "TCT积液薄层细胞学筛查日期",

                "inputType": "single_date_picker",

            },
            {
                layout: '1/4',

                "key": "gynecologicalLabExam.tctResult",
                "label": "结果",

                "inputType": "normal_select",
                "specialConfig": { "type": "premaritalExamResultMapping" },

            },
            {
                layout: '1/4',

                "key": "gynecologicalLabExam.tctNote",
                "label": "备注",

                "inputType": "input",

            },
            {
                layout: '1/4',

                "key": "gynecologicalLabExam.tctReport",
                "label": "报告",

                "inputType": "input",

            },
            {
                "label": "镜检",
                children: [
                    {
                        label: '检查日期',
                        "key": "gynecologicalLabExam.microscopeDate",
                        "inputType": "single_date_picker",
                        layout: '1/3',
                    },
                    {
                        label: '清洁度',
                        "key": "gynecologicalLabExam.microscopeCleanliness",
                        layout: '1/3',
                        inputType: 'MC',
                        inputProps: {
                            options: getSameOptions('I、II、III、IV'),
                            marshal: 0
                        }
                    },
                    {
                        label: '脓球',
                        "key": "gynecologicalLabExam.microscopePusCells",
                        layout: '1/3',
                        inputType: 'MC',
                        inputProps: {
                            options: getSameOptions('未发现、阴性、阳性'),
                            marshal: 0
                        }
                    },
                    {
                        label: '滴虫',
                        "key": "gynecologicalLabExam.microscopeTrichomonad",
                        layout: '1/3',
                        inputType: 'MC',
                        inputProps: {
                            options: getSameOptions('未发现、阴性、阳性'),
                            marshal: 0
                        }
                    },
                    {
                        label: '假丝酵母菌',
                        "key": "gynecologicalLabExam.microscopeCandida",
                        layout: '1/3',
                        inputType: 'MC',
                        inputProps: {
                            options: getSameOptions('未发现、阴性、阳性'),
                            marshal: 0
                        }
                    },
                    {
                        label: '加德纳菌',
                        "key": "gynecologicalLabExam.microscopeGardnerella",
                        layout: '1/3',
                        inputType: 'MC',
                        inputProps: {
                            options: getSameOptions('未发现、阴性、阳性'),
                            marshal: 0
                        }
                    },
                    {
                        label: '线索细胞',
                        "key": "gynecologicalLabExam.microscopeClueCell",
                        layout: '1/3',
                        inputType: 'MC',
                        inputProps: {
                            options: getSameOptions('未发现、阴性、阳性'),
                            marshal: 0
                        }
                    },
                    {
                        label: '其他',
                        "key": "gynecologicalLabExam.microscopeOther",
                        layout: '1/3',
                        inputType: 'Input',
                        inputProps: {

                        }
                    },
                ]

            },

            // {
            //     layout: '3/4',
            //     "key": "gynecologicalLabExam.microscope",
            //     "label": "镜检",
            //     inputType: 'MC',
            //     "inputProps": {
            //         type: 'multiple',
            //         options: '清洁度<I、II、III、IV>c,脓球<未发现、阴性、阳性>c,滴虫<未发现、阴性、阳性>c,假丝酵母菌<未发现、阴性、阳性>c,加德纳菌<未发现、阴性、阳性>c,线索细胞<未发现、阴性、阳性>c,其他i'
            //     },
            // },
        ]
    },
    {
        label: '妇科检查',
        containerType: 'section(default)',
        children: [
            {
                layout: '1/1',
                "key": "gynecologicalExam.vulva",
                "label": "外阴",
                inputType: 'MC',
                "inputProps": {
                    options: '正常<exclusive>#,白斑,溃疡,湿疣,疱疹,肿物,其他i',
                    type: 'multiple',
                },

            },
            {
                layout: '1/1',
                "key": "gynecologicalExam.vagina",
                "label": "阴道",
                inputType: 'MC',
                "inputProps": {
                    type: 'multiple',
                    options: '正常<exclusive>#,充血,松弛'
                },
            },
            {
                layout: '1/1',
                "key": "gynecologicalExam.vaginaProtrusion",
                "label": "阴道膨出",
                inputType: 'MC',
                "inputProps": {
                    options: `${ROMAN_NUMERALS[1]},${ROMAN_NUMERALS[2]},${ROMAN_NUMERALS[3]},其他i`
                },
            },
            {
                layout: '1/1',
                "key": "gynecologicalExam.secretion",
                "label": "分泌物",
                inputType: 'MC',
                "inputProps": {
                    type: 'multiple',
                    options: '正常<exclusive>#,过多,异味,血性,脓性,泡沫性,豆渣样,其他i'
                },
            },

            {
                layout: '1/1',
                "key": "gynecologicalExam.cervix",
                "label": "宫颈",
                inputType: 'MC',
                "inputProps": {
                    type: 'multiple',
                    options: '正常<exclusive>#,肥大,萎缩,触血,纳囊,息肉,溃疡,糜烂,菜花样,充血,IUD尾丝,缺失,其他i'
                },

            },

            {
                layout: '1/1',

                "key": "gynecologicalExam.uterusSize",
                "label": "子宫大小",
                inputType: 'MC',
                "inputProps": {
                    // options: [
                    //     { value: 1, label: '正常' },
                    //     { value: 1, label: '增大', inputType: 'MyInput', prefix: '如孕', suffix: '周', parentheses: true },
                    // ]
                    options: '正常,增大<|parentheses|如孕|周>MyInput#'
                },

            },

            {
                layout: '1/1',

                "key": "gynecologicalExam.uterusNote",
                "label": "子宫",
                inputType: 'MC',
                "inputProps": {
                    type: 'multiple',
                    options: '肿物,脱垂,压痛,其它i'
                },

            },
            {
                layout: '1/1',

                "key": "gynecologicalExam.adnexa",
                "label": "附件",
                inputType: 'MC',
                "inputProps": {
                    type: 'multiple',
                    options: '正常<exclusive>#,缺失,压痛<左、右>c,增厚<左、右>c,肿物'
                },

            },
            {
                layout: '1/1',

                "key": "gynecologicalExam.breastNote",
                "label": "乳房",
                inputType: 'MC',
                "inputProps": {
                    type: 'multiple',
                    options: '正常<exclusive>#,结节<左、右>c,肿物<左、右>c'
                },

            },





        ]
    },
    {
        label: '妇科病史',
        children: [
            {
                layout: '1/4',
                "key": "gynecologicalNote.contactBleeding",
                "label": "接触性出血",

                "inputType": "MC",
                inputProps: {
                    options: getSameOptions('有,无'),
                    marshal: 0
                }

            },
            {
                layout: '1/4',
                "key": "gynecologicalNote.vaginaBlood",
                "label": "阴道不规则出血",

                "inputType": "MC",
                inputProps: {
                    options: getSameOptions('有,无'),
                    marshal: 0
                }


            },
            {
                layout: '1/4',
                "key": "gynecologicalNote.procedureHistory",
                "label": "手术史",
                "inputType": "MC",
                "inputProps": {
                    options: getSameOptions('有,无'),
                    marshal: 0
                },

            },
            {
                layout: '1/4',
                "key": "gynecologicalNote.procedureHistoryNote",
                "label": "手术史备注",
                "inputType": "input",

            },
            {
                layout: '1/4',
                "key": "gynecologicalNote.tumour",
                "label": "家族肿瘤史",
                "inputType": "MC",
                "inputProps": {
                    options: getSameOptions('有,无'),
                    marshal: 0
                },


            },
            {
                layout: '1/4',
                "key": "gynecologicalNote.tumourNote",
                "label": "家族肿瘤史备注",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入家族肿瘤史备注" },


            },

            {
                layout: '1/4',
                "key": "gynecologicalNote.contraception",
                "label": "避孕方式",

                "inputType": "MC",
                inputProps: {
                    options: getSameOptions('避孕套,上环,服药,结扎'),
                    type: 'multiple',
                    marshal: 0
                }

            },
            {
                layout: '1/4',
                "key": "gynecologicalNote.contraceptionNote",
                "label": "其他避孕方式备注",
                "inputType": "input",
                "inputProps": { "placeholder": "请输入避孕方式备注" },


            },


        ]
    },
    {
        label: '月经史',
        children: [
            {
                layout: '1/4',
                "key": "menstrualHistory.menarche",
                "label": "初潮年龄",

                "inputType": "input",


            }, {
                layout: '1/4',
                "key": "menstrualHistory.menstrualCycle",
                "label": "周期",

                "inputType": "MC",
                "inputProps": {
                    options: getSameOptions('有,无'),
                    marshal: 0
                },


            },

            {
                layout: '1/4',
                "key": "menstrualHistory.menstrualVolume",
                "label": "经量",

                "inputType": "MC",
                "inputProps": {
                    options: getSameOptions('多,中,少'),
                    marshal: 0
                },


            }, {
                layout: '1/4',
                "key": "menstrualHistory.lmd",
                "label": "末次月经",

                "inputType": "single_date_picker",
                "inputProps": { "placeholder": "请输入末次月经" },


            }, {
                layout: '1/4',
                "key": "menstrualHistory.menopause",
                "label": "停经年龄",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入停经" },


            }, {
                layout: '1/4',
                "key": "menstrualHistory.dysmenorrhea",
                "label": "痛经",

                "inputType": "pregnant_radio",
                "inputProps": { "placeholder": "请输入痛经" },


            },]
    },
    {
        label: '婚育史',
        children: [
            {
                layout: '1/4',
                "key": "maritalHistory.graviditycount",
                "label": "孕数",

                "inputType": 'input_number',
                "inputProps": { "placeholder": "请输入孕数" },
            },
            {
                layout: '1/4',
                "key": "maritalHistory.parityycount",
                "label": "产数",

                "inputType": 'input_number',

                "inputProps": { "placeholder": "请输入产数" },
            }, {
                layout: '1/4',
                "key": "maritalHistory.term",
                "label": "足月产",

                "inputType": 'input_number',

                "inputProps": { "placeholder": "请输入足月产" },
            }, {
                layout: '1/4',
                "key": "maritalHistory.preterm",
                "label": "早产",

                "inputType": "input_number",
                "inputProps": { "placeholder": "请输入早产" },
            }, {
                layout: '1/4',
                "key": "maritalHistory.vaginalDelivery",
                "label": "顺产",

                "inputType": "input_number",
                "inputProps": { "placeholder": "请输入顺产" },
            }, {
                layout: '1/4',
                "key": "maritalHistory.cesareanSection",
                "label": "剖宫产",

                "inputType": "input_number",
                "inputProps": { "placeholder": "请输入剖宫产" },
            }, {
                layout: '1/4',
                "key": "maritalHistory.abortion",
                "label": "流产",

                "inputType": "input_number",
                "inputProps": { "placeholder": "请输入流产" },
            }, {
                layout: '1/4',
                "key": "maritalHistory.birthdefect",
                "label": "出生缺陷",

                "inputType": "input_number",
                "inputProps": { "placeholder": "请输入出生缺陷" },
            }, {
                layout: '1/4',
                "key": "maritalHistory.child",
                "label": "孩子",

                "inputType": "input_number",
                "inputProps": { "placeholder": "请输入孩子" },
            }, {
                layout: '1/4',
                "key": "maritalHistory.note",
                "label": "备注",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入备注" },
            }]
    },
    {
        label: '检查结论',
        children: [
            {
                "key": "visitDate",
                "label": "检查日期",
                "inputType": "single_date_picker",
                layout: '1/4',
            },
            {
                "key": "doctorName",
                "label": "检查人",
                "inputType": "input",
                layout: '1/4',
            },
            {
                "key": "advice",
                "label": "保健指导",
                "inputType": "input",
                layout: '1/1',
            },
            {
                "key": "treatmentRecords",
                "label": "治疗记录",
                "inputType": "input",
                layout: '1/1',
            },

        ]
    },
]

__lazy_config.forEach(_ => {
    _!.containerType = 'tabs'
})