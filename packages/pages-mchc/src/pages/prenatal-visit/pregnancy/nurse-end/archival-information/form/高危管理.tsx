import { IMchc_FormDescriptions_Field_Nullable } from "@lm_fe/service";
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
            "inputProps": { "marshal": 0 },
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
