import { IMchc_FormDescriptions_Field } from "@lm_fe/service";


export function 检验检查_config(): IMchc_FormDescriptions_Field[] {
    return [

        {
            "moduleName": "cervical-carcinoma-screening",
            "name": "检验检查",
            "flag": "妇女保健-宫颈癌筛查-检验检查",
            "sort": 0,
            "fields": [{
                "key": "cervicalCancerInspection.vaginalCleanliness",
                "label": "阴道清洁度",
                "inputType": "MC",
                "inputProps": { marshal: 0, "options": [{ "value": 1, "label": "Ⅰ°", "span": 4 }, { "value": 2, "label": "Ⅱ°", "span": 4 }, { "value": 3, "label": "Ⅲ°", "span": 4 }, { "value": 4, "label": "Ⅳ°", "span": 4 }, { "value": 5, "label": "未查", "span": 4 }] },
                layout: '1/1',
            }, {
                "key": "cervicalCancerInspection.trichomonas",
                "label": "滴虫",
                "inputType": "MC",
                "inputProps": { marshal: 0, "options": [{ "value": 1, "label": "正常", "span": 6 }, { "value": 2, "label": "异常", "span": 6, "isIssue": true }, { "value": 3, "label": "未查", "span": 6 }] },
                layout: '1/3',
            }, {
                "key": "cervicalCancerInspection.candida",
                "label": "假丝酵母菌",
                "inputType": "MC",
                "inputProps": { marshal: 0, "options": [{ "value": 1, "label": "正常", "span": 6 }, { "value": 2, "label": "异常", "span": 6, "isIssue": true }, { "value": 3, "label": "未查", "span": 6 }] },
                layout: '1/3',

            }, {
                "key": "cervicalCancerInspection.gardnerella",
                "label": "加德纳菌",
                "inputType": "MC",
                "inputProps": { marshal: 0, "options": [{ "value": 1, "label": "正常", "span": 6 }, { "value": 2, "label": "异常", "span": 6, "isIssue": true }, { "value": 3, "label": "未查", "span": 6 }] },
                layout: '1/3',

            }, {
                "key": "cervicalCancerInspection.clueCell",
                "label": "线索细胞",
                "inputType": "MC",
                "inputProps": { marshal: 0, "options": [{ "value": 1, "label": "正常", "span": 6 }, { "value": 2, "label": "异常", "span": 6, "isIssue": true }, { "value": 3, "label": "未查", "span": 6 }] },
                layout: '1/3',

            }, {
                "key": "cervicalCancerInspection.other",
                "label": "其他",
                "inputType": "input",
                layout: '1/3',

            }, {
                "key": "cervicalCancerInspection.hpv",
                "label": "HPV",
                "inputType": "MC",
                "rules": [{ "required": true, "message": "HPV是必填项" }],
                "inputProps": { marshal: 0, "options": [{ "value": 1, "label": "阴性", "span": 6 }, { "value": 2, "label": "阳性", "span": 6, "isIssue": true }, { "value": 3, "label": "未查", "span": 6 }] },
                layout: '1/3',

            }, {
                "key": "cervicalCancerInspection.visualObservationAfterAceticIodineStaining",
                "label": "醋酸/碘染色后肉眼观察",
                "inputType": "MC",
                "rules": [{ "required": true, "message": "醋酸/碘染色后肉眼观察是必填项" }],
                "inputProps": { marshal: 0, "options": [{ "value": 1, "label": "未见异常", "span": 4 }, { "value": 2, "label": "阳性", "span": 4, "isIssue": true }, { "value": 3, "label": "未查", "span": 4 }] },
                layout: '1/1',

            }, {
                "key": "cervicalCancerInspection.uterineCytology",
                "label": "宫颈细胞学检查结果",
                "inputType": "MC",
                "inputProps": { marshal: 0, "options": [{ "value": 1, "label": "已查", "span": 4 }, { "value": 2, "label": "未查", "span": 4 }] },
                layout: '1/1',

            }, {
                "key": "cervicalCancerInspection.uterineCytologyObtainingMaterialsWay",
                "label": "宫颈细胞取材方式",
                "inputType": "MC",
                "inputProps": { marshal: 0, "options": [{ "value": 1, "label": "巴氏涂片", "span": 4 }, { "value": 2, "label": "液基/薄层细胞学检查", "span": 4 }, { "value": 3, "label": "其他", "span": 4 }] },
                layout: '1/1',

            }, {
                "key": "cervicalCancerInspection.papClassification",
                "label": "巴氏分级",
                "inputType": "MC",
                "inputProps": { marshal: 0, "options": [{ "value": 1, "label": "Ⅰ级", "span": 4 }, { "value": 2, "label": "ⅡA", "span": 4 }, { "value": 3, "label": "ⅡB", "span": 4 }, { "value": 4, "label": "Ⅲ级", "span": 4 }, { "value": 5, "label": "Ⅳ级", "span": 4 }, { "value": 6, "label": "Ⅴ级", "span": 4 }] },
                layout: '1/1',

            }, {
                "key": "cervicalCancerInspection.tbsResult",
                "label": "TBS分类报告结果",
                "inputType": "MC",
                "rules": [{ "required": true, "message": "TBS分类报告结果是必填项" }],
                "inputProps": { marshal: 0, "options": [{ "value": 1, "label": "未见异常", "span": 4 }, { "value": 2, "label": "异常", "span": 4, "isIssue": true }] },
                layout: '1/1',

            }]
        },
    ]
}