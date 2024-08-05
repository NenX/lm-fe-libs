import { parseFormDescriptions } from "@lm_fe/service";

export const form_config = parseFormDescriptions([
    {
        "id": 271,
        "moduleName": "premarital-care-file-management",
        "name": "女方信息",
        "flag": "婚前保健-档案管理-女方信息",
        "sort": 0,

        "fields": [{
            "id": 13284,
            "key": "womanName",
            "label": "姓名",
            "sort": 0,
            "inputType": "input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"姓名是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入姓名\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13285,
            "key": "womanOutpatientNo",
            "label": "门诊号",
            "sort": 0,
            "inputType": "input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"门诊号是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入门诊号\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13286,
            "key": "womanTelephone",
            "label": "电话号码",
            "sort": 0,
            "inputType": "input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"电话号码是必填项\"},{\"type\":\"string\",\"min\":11,\"message\":\"请输入11位手机号码\"},{\"max\":11,\"message\":\"请输入正确的手机号码格式\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入电话号码\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13287,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.idType",
            "label": "证件类型",
            "sort": 0,
            "inputType": "normal_select",
            "tranferRules": "{\"type\": \"IDCardMapping\"}",
            "rules": "[{\"required\":true,\"message\":\"证件类型是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入证件类型\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13288,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.idNO",
            "label": "证件号码",
            "sort": 0,
            "inputType": "input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"证件号码是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入证件号码\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13289,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.dob",
            "label": "出生日期",
            "sort": 0,
            "inputType": "single_date_picker",
            "tranferRules": "{\"type\": \"moment\"}",
            "rules": "[{\"required\":true,\"message\":\"出生日期是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入出生日期\",\"maxDate\":\"now\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13290,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.ethnic",
            "label": "民族",
            "sort": 0,
            "inputType": "normal_select",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"民族是必填项\"}]",
            "specialConfig": "{\"type\": \"ethnicMapping\"}",
            "inputProps": "{\"placeholder\": \"请输入民族\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13291,
            "key": "womanAge",
            "label": "年龄",
            "sort": 0,
            "inputType": "input_number",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"年龄是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入年龄\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13292,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.permanentResidence",
            "label": "籍贯",
            "sort": 0,
            "inputType": "normal_select",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"籍贯是必填项\"}]",
            "specialConfig": "{\"type\": \"provinceMapping\"}",
            "inputProps": "{\"placeholder\": \"请输入籍贯\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13293,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.education",
            "label": "文化程度",
            "sort": 0,
            "inputType": "normal_select",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"文化程度是必填项\"}]",
            "specialConfig": "{\"type\": \"cultureMapping\"}",
            "inputProps": "{\"placeholder\": \"请输入文化程度\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13294,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.profession",
            "label": "职业",
            "sort": 0,
            "inputType": "normal_select",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"职业是必填项\"}]",
            "specialConfig": "{\"type\": \"jobMapping\"}",
            "inputProps": "{\"placeholder\": \"请输入职业\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13295,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.nationality",
            "label": "国籍",
            "sort": 0,
            "inputType": "country_select",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"国籍是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入国籍\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13296,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.menarche",
            "label": "初潮(岁)",
            "sort": 0,
            "inputType": "input_number",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"初潮(岁)是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入初潮\"}",
            "span": 6,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":8},\"wrapperCol\":{\"span\":14}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13297,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.menstrualCycle",
            "label": "月经周期(天)",
            "sort": 0,
            "inputType": "input_number",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"月经周期(天)是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入月经周期\"}",
            "span": 6,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":8},\"wrapperCol\":{\"span\":14}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13298,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.menstrualPeriod",
            "label": "月经持续天数",
            "sort": 0,
            "inputType": "input_number",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"月经持续天数是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入月经持续天数\"}",
            "span": 6,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":8},\"wrapperCol\":{\"span\":14}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13299,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.menstrualVolume",
            "label": "经量",
            "sort": 0,
            "inputType": "checkbox_group",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"经量是必填项\"}]",
            "specialConfig": "{\"type\":\"single\",\"options\":[{\"value\":\"多\",\"label\":\"多\",\"withInput\":false,\"span\":6},{\"value\":\"中\",\"label\":\"中\",\"withInput\":false,\"span\":6},{\"value\":\"少\",\"label\":\"少\",\"withInput\":false,\"span\":6}]}",
            "inputProps": "{\"placeholder\": \"请输入经量\"}",
            "span": 6,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13300,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.dysmenorrhea",
            "label": "痛经",
            "sort": 0,
            "inputType": "checkbox_with_single_input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"痛经是必填项\"}]",
            "specialConfig": "{\"type\":\"single\",\"options\":[{\"value\":1,\"label\":\"无\",\"span\":6,\"withInput\":false},{\"value\":2,\"label\":\"有\",\"withInput\":true,\"isIssue\":true,\"span\":6,\"inputSpan\":12}]}",
            "inputProps": "{\"placeholder\": \"请输入痛经\"}",
            "span": 6,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":8},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13301,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.gravidity",
            "label": "孕次",
            "sort": 0,
            "inputType": "input_number",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"孕次是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入孕次\"}",
            "span": 6,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":8},\"wrapperCol\":{\"span\":14}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13302,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.parity",
            "label": "产次",
            "sort": 0,
            "inputType": "input_number",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"产次是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入产次\"}",
            "span": 6,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":8},\"wrapperCol\":{\"span\":14}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13303,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.whetherPregnancy",
            "label": "是否怀孕",
            "sort": 1,
            "inputType": "checkbox_with_input",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"是否怀孕是必填项\"}]",
            "specialConfig": "{\"type\":\"single\",\"options\":[{\"value\":1,\"label\":\"否\",\"span\":6,\"withInput\":false},{\"value\":2,\"label\":\"是\",\"withInput\":false,\"span\":6,\"inputSpan\":12,\"inputType\":\"single_date_picker\",\"labelBefore\":\"末次月经:\"}]}",
            "inputProps": "{\"placeholder\": \"请输入是否怀孕\"}",
            "span": 6,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 14532,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.lmd",
            "label": "末次月经",
            "sort": 2,
            "inputType": "single_date_picker",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"末次月经是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"dependency\":{\"show\":{\"key\":\"womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.whetherPregnancy\",\"value\":[2]}}}",
            "span": 6,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":8},\"wrapperCol\":{\"span\":14}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13306,
            "key": "grs",
            "label": "个人史",
            "sort": 3,
            "inputType": "button",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"个人史是必填项\"}]",
            "specialConfig": "{\"label\":\"个人史\"}",
            "inputProps": "{\"type\":\"text\",\"size\":\"large\",\"style\":{\"fontSize\":16,\"fontWeight\":600}}",
            "span": 24,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":undefined},\"wrapperCol\":{\"span\":undefined}}",
            "styles": "",
            "isActive": 1,



        }, {
            "id": 13309,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.previousHistory",
            "label": "既往史",
            "sort": 3,
            "inputType": "checkbox_with_single_input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"既往史是必填项\"}]",
            "specialConfig": "{\"type\":\"single\",\"options\":[{\"value\":1,\"label\":\"无\",\"span\":6,\"withInput\":false},{\"value\":2,\"label\":\"有\",\"withInput\":true,\"isIssue\":true,\"span\":6,\"inputSpan\":12}]}",
            "inputProps": "{\"placeholder\": \"请输入既往史\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13310,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.surgeryHistory",
            "label": "手术史",
            "sort": 3,
            "inputType": "checkbox_with_single_input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"手术史是必填项\"}]",
            "specialConfig": "{\"type\":\"single\",\"options\":[{\"value\":1,\"label\":\"无\",\"span\":6,\"withInput\":false},{\"value\":2,\"label\":\"有\",\"withInput\":true,\"isIssue\":true,\"span\":6,\"inputSpan\":12}]}",
            "inputProps": "{\"placeholder\": \"请输入手术史\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13311,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.presentIllness",
            "label": "现病史",
            "sort": 3,
            "inputType": "checkbox_with_single_input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"现病史是必填项\"}]",
            "specialConfig": "{\"type\":\"single\",\"options\":[{\"value\":1,\"label\":\"无\",\"span\":6,\"withInput\":false},{\"value\":2,\"label\":\"有\",\"withInput\":true,\"isIssue\":true,\"span\":6,\"inputSpan\":12}]}",
            "inputProps": "{\"placeholder\": \"请输入现病史\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13312,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.contactHazardousSubstances",
            "label": "接触有害物质",
            "sort": 3,
            "inputType": "checkbox_with_single_input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"接触有害物质是必填项\"}]",
            "specialConfig": "{\"type\":\"single\",\"options\":[{\"value\":1,\"label\":\"无\",\"span\":6,\"withInput\":false},{\"value\":2,\"label\":\"有\",\"withInput\":true,\"isIssue\":true,\"span\":6,\"inputSpan\":12}]}",
            "inputProps": "{\"placeholder\": \"请输入接触有害物质\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13313,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.contactRadioactiveRays",
            "label": "接触放射线",
            "sort": 3,
            "inputType": "checkbox_with_single_input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"接触放射线是必填项\"}]",
            "specialConfig": "{\"type\":\"single\",\"options\":[{\"value\":1,\"label\":\"无\",\"span\":6,\"withInput\":false},{\"value\":2,\"label\":\"有\",\"withInput\":true,\"isIssue\":true,\"span\":6,\"inputSpan\":12}]}",
            "inputProps": "{\"placeholder\": \"请输入接触放射线\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13314,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.personalOther",
            "label": "其他",
            "sort": 3,
            "inputType": "input",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"其他是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入其他\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13315,
            "key": "jzs",
            "label": "家族史",
            "sort": 3,
            "inputType": "button",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"家族史是必填项\"}]",
            "specialConfig": "{\"label\":\"家族史\"}",
            "inputProps": "{\"type\":\"text\",\"size\":\"large\",\"style\":{\"fontSize\":16,\"fontWeight\":600}}",
            "span": 24,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":undefined},\"wrapperCol\":{\"span\":undefined}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13316,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.familyHeritableDisease",
            "label": "遗传疾病",
            "sort": 3,
            "inputType": "checkbox_with_single_input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"遗传疾病是必填项\"}]",
            "specialConfig": "{\"type\":\"single\",\"options\":[{\"value\":1,\"label\":\"无\",\"span\":8,\"withInput\":false},{\"value\":2,\"label\":\"有\",\"withInput\":true,\"isIssue\":true,\"span\":8,\"inputSpan\":8}]}",
            "inputProps": "{\"placeholder\": \"请输入遗传疾病\"}",
            "span": 6,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":8},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13317,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.familyPsychosis",
            "label": "精神病",
            "sort": 3,
            "inputType": "checkbox_with_single_input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"精神病是必填项\"}]",
            "specialConfig": "{\"type\":\"single\",\"options\":[{\"value\":1,\"label\":\"无\",\"span\":8,\"withInput\":false},{\"value\":2,\"label\":\"有\",\"withInput\":true,\"isIssue\":true,\"span\":8,\"inputSpan\":8}]}",
            "inputProps": "{\"placeholder\": \"请输入精神病\"}",
            "span": 6,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":8},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13318,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.birthDefects",
            "label": "先天畸形",
            "sort": 3,
            "inputType": "checkbox_with_single_input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"先天畸形是必填项\"}]",
            "specialConfig": "{\"type\":\"single\",\"options\":[{\"value\":1,\"label\":\"无\",\"span\":8,\"withInput\":false},{\"value\":2,\"label\":\"有\",\"withInput\":true,\"isIssue\":true,\"span\":8,\"inputSpan\":8}]}",
            "inputProps": "{\"placeholder\": \"请输入先天畸形\"}",
            "span": 6,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":8},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13319,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.familyHistoryOther",
            "label": "其他",
            "sort": 3,
            "inputType": "input",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"其他是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入其他\"}",
            "span": 6,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13320,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.permanentResidenceAddress",
            "label": "户口地址",
            "sort": 3,
            "inputType": "address",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"户口地址是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入户口地址\"}",
            "span": 16,
            "offset": 0,
            "isNewRow": 1,
            "formItemLayout": "{\"labelCol\":{\"span\":3},\"wrapperCol\":{\"span\":20}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13321,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.residenceAddress",
            "label": "居住地址",
            "sort": 3,
            "inputType": "address",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"居住地址是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入居住地址\",\"extra\":\"同上\"}",
            "span": 16,
            "offset": 0,
            "isNewRow": 1,
            "formItemLayout": "{\"labelCol\":{\"span\":3},\"wrapperCol\":{\"span\":20}}",
            "styles": null,
            "isActive": 1,



        }]
    },
    {
        "id": 273,
        "moduleName": "premarital-care-file-management",
        "name": "女方体格检查",
        "flag": "婚前保健-档案管理-女方体格检查",
        "sort": 1,



        "fields": [{
            "id": 13322,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.weight",
            "label": "体重(kg)",
            "sort": null,
            "inputType": "input_number",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"体重(kg)是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入体重\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13323,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.height",
            "label": "身高(cm)",
            "sort": null,
            "inputType": "input_number",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"身高(cm)是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入身高\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13324,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.bmi",
            "label": "BMI",
            "sort": null,
            "inputType": "input_with_range",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"BMI是必填项\"}]",
            "specialConfig": "{\"tip\": \"BMI的正常范围值是18.5~24.9kg/㎡\", \"min\": 18.5, \"max\": 24.9}",
            "inputProps": "{\"placeholder\": \"请输入BMI\",\"disabled\":true}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13325,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.systolic",
            "label": "血压(mmHg)",
            "sort": null,
            "inputType": "pressure",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"血压(mmHg)是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入血压\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13326,
            "key": "womanPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.heartRate",
            "label": "心率(次/分钟)",
            "sort": null,
            "inputType": "input_number",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"心率(次/分钟)是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入心率\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }]
    },
    {
        "id": 274,
        "moduleName": "premarital-care-file-management",
        "name": "男方信息",
        "flag": "婚前保健-档案管理-男方信息",
        "sort": 2,



        "fields": [{
            "id": 13327,
            "key": "manName",
            "label": "姓名",
            "sort": null,
            "inputType": "input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"姓名是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入姓名\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13328,
            "key": "manOutpatientNo",
            "label": "门诊号",
            "sort": null,
            "inputType": "input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"门诊号是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入门诊号\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13329,
            "key": "manTelephone",
            "label": "电话号码",
            "sort": null,
            "inputType": "input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"电话号码是必填项\"},{\"type\":\"string\",\"min\":11,\"message\":\"请输入11位手机号码\"},{\"max\":11,\"message\":\"请输入正确的手机号码格式\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入电话号码\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13330,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.idType",
            "label": "证件类型",
            "sort": null,
            "inputType": "normal_select",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"证件类型是必填项\"}]",
            "specialConfig": "{\"type\": \"IDCardMapping\"}",
            "inputProps": "{\"placeholder\": \"请输入证件类型\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13331,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.idNO",
            "label": "证件号码",
            "sort": null,
            "inputType": "input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"证件号码是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入证件号码\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13332,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.dob",
            "label": "出生日期",
            "sort": null,
            "inputType": "single_date_picker",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"出生日期是必填项\"}]",
            "specialConfig": "{\"type\": \"moment\"}",
            "inputProps": "{\"placeholder\": \"请输入出生日期\",\"maxDate\":\"now\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13333,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.ethnic",
            "label": "民族",
            "sort": null,
            "inputType": "normal_select",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"民族是必填项\"}]",
            "specialConfig": "{\"type\": \"ethnicMapping\"}",
            "inputProps": "{\"placeholder\": \"请输入民族\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13334,
            "key": "manAge",
            "label": "年龄",
            "sort": null,
            "inputType": "input_number",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"年龄是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入年龄\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13335,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.permanentResidence",
            "label": "籍贯",
            "sort": null,
            "inputType": "normal_select",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"籍贯是必填项\"}]",
            "specialConfig": "{\"type\": \"provinceMapping\"}",
            "inputProps": "{\"placeholder\": \"请输入籍贯\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13336,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.education",
            "label": "文化程度",
            "sort": null,
            "inputType": "normal_select",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"文化程度是必填项\"}]",
            "specialConfig": "{\"type\": \"cultureMapping\"}",
            "inputProps": "{\"placeholder\": \"请输入文化程度\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13337,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.profession",
            "label": "职业",
            "sort": null,
            "inputType": "normal_select",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"职业是必填项\"}]",
            "specialConfig": "{\"type\": \"jobMapping\"}",
            "inputProps": "{\"placeholder\": \"请输入职业\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13338,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.nationality",
            "label": "国籍",
            "sort": null,
            "inputType": "country_select",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"国籍是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入国籍\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13339,
            "key": "grs2",
            "label": "个人史",
            "sort": null,
            "inputType": "button",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"个人史是必填项\"}]",
            "specialConfig": "{\"label\":\"个人史\"}",
            "inputProps": "{\"type\":\"text\",\"size\":\"large\",\"style\":{\"fontSize\":16,\"fontWeight\":600}}",
            "span": 24,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":undefined},\"wrapperCol\":{\"span\":undefined}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13340,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.previousHistory",
            "label": "既往史",
            "sort": null,
            "inputType": "checkbox_with_single_input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"既往史是必填项\"}]",
            "specialConfig": "{\"type\":\"single\",\"options\":[{\"value\":1,\"label\":\"无\",\"span\":6,\"withInput\":false},{\"value\":2,\"label\":\"有\",\"withInput\":true,\"isIssue\":true,\"span\":6,\"inputSpan\":12}]}",
            "inputProps": "{\"placeholder\": \"请输入既往史\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13341,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.surgeryHistory",
            "label": "手术史",
            "sort": null,
            "inputType": "checkbox_with_single_input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"手术史是必填项\"}]",
            "specialConfig": "{\"type\":\"single\",\"options\":[{\"value\":1,\"label\":\"无\",\"span\":6,\"withInput\":false},{\"value\":2,\"label\":\"有\",\"withInput\":true,\"isIssue\":true,\"span\":6,\"inputSpan\":12}]}",
            "inputProps": "{\"placeholder\": \"请输入手术史\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13342,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.presentIllness",
            "label": "现病史",
            "sort": null,
            "inputType": "checkbox_with_single_input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"现病史是必填项\"}]",
            "specialConfig": "{\"type\":\"single\",\"options\":[{\"value\":1,\"label\":\"无\",\"span\":6,\"withInput\":false},{\"value\":2,\"label\":\"有\",\"withInput\":true,\"isIssue\":true,\"span\":6,\"inputSpan\":12}]}",
            "inputProps": "{\"placeholder\": \"请输入现病史\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13343,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.contactHazardousSubstances",
            "label": "接触有害物质",
            "sort": null,
            "inputType": "checkbox_with_single_input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"接触有害物质是必填项\"}]",
            "specialConfig": "{\"type\":\"single\",\"options\":[{\"value\":1,\"label\":\"无\",\"span\":6,\"withInput\":false},{\"value\":2,\"label\":\"有\",\"withInput\":true,\"isIssue\":true,\"span\":6,\"inputSpan\":12}]}",
            "inputProps": "{\"placeholder\": \"请输入接触有害物质\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13344,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.contactRadioactiveRays",
            "label": "接触放射线",
            "sort": null,
            "inputType": "checkbox_with_single_input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"接触放射线是必填项\"}]",
            "specialConfig": "{\"type\":\"single\",\"options\":[{\"value\":1,\"label\":\"无\",\"span\":6,\"withInput\":false},{\"value\":2,\"label\":\"有\",\"withInput\":true,\"isIssue\":true,\"span\":6,\"inputSpan\":12}]}",
            "inputProps": "{\"placeholder\": \"请输入接触放射线\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13345,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.personalOther",
            "label": "其他",
            "sort": null,
            "inputType": "input",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"其他是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入其他\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13346,
            "key": "jzs2",
            "label": "家族史",
            "sort": null,
            "inputType": "button",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"家族史是必填项\"}]",
            "specialConfig": "{\"label\":\"家族史\"}",
            "inputProps": "{\"type\":\"text\",\"size\":\"large\",\"style\":{\"fontSize\":16,\"fontWeight\":600}}",
            "span": 24,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":undefined},\"wrapperCol\":{\"span\":undefined}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13347,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.familyHeritableDisease",
            "label": "遗传疾病",
            "sort": null,
            "inputType": "checkbox_with_single_input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"遗传疾病是必填项\"}]",
            "specialConfig": "{\"type\":\"single\",\"options\":[{\"value\":1,\"label\":\"无\",\"span\":8,\"withInput\":false},{\"value\":2,\"label\":\"有\",\"withInput\":true,\"isIssue\":true,\"span\":8,\"inputSpan\":8}]}",
            "inputProps": "{\"placeholder\": \"请输入遗传疾病\"}",
            "span": 6,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":8},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13348,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.familyPsychosis",
            "label": "精神病",
            "sort": null,
            "inputType": "checkbox_with_single_input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"精神病是必填项\"}]",
            "specialConfig": "{\"type\":\"single\",\"options\":[{\"value\":1,\"label\":\"无\",\"span\":8,\"withInput\":false},{\"value\":2,\"label\":\"有\",\"withInput\":true,\"isIssue\":true,\"span\":8,\"inputSpan\":8}]}",
            "inputProps": "{\"placeholder\": \"请输入精神病\"}",
            "span": 6,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":8},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13349,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.birthDefects",
            "label": "先天畸形",
            "sort": null,
            "inputType": "checkbox_with_single_input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"先天畸形是必填项\"}]",
            "specialConfig": "{\"type\":\"single\",\"options\":[{\"value\":1,\"label\":\"无\",\"span\":8,\"withInput\":false},{\"value\":2,\"label\":\"有\",\"withInput\":true,\"isIssue\":true,\"span\":8,\"inputSpan\":8}]}",
            "inputProps": "{\"placeholder\": \"请输入先天畸形\"}",
            "span": 6,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":8},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13350,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesMedicalHistory.familyHistoryOther",
            "label": "其他",
            "sort": null,
            "inputType": "input",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"其他是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入其他\"}",
            "span": 6,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13351,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.permanentResidenceAddress",
            "label": "户口地址",
            "sort": null,
            "inputType": "address",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"户口地址是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入户口地址\",\"extra\":\"同女方\"}",
            "span": 16,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":3},\"wrapperCol\":{\"span\":20}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13352,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesBasicInformation.residenceAddress",
            "label": "居住地址",
            "sort": null,
            "inputType": "address",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"居住地址是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入居住地址\",\"extra\":\"同女方\"}",
            "span": 16,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":3},\"wrapperCol\":{\"span\":20}}",
            "styles": null,
            "isActive": 1,



        }]
    },
    {
        "id": 275,
        "moduleName": "premarital-care-file-management",
        "name": "男方体格检查",
        "flag": "婚前保健-档案管理-男方体格检查",
        "sort": 3,



        "fields": [{
            "id": 13353,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.weight",
            "label": "体重(kg)",
            "sort": null,
            "inputType": "input_number",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"体重(kg)是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入体重\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13354,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.height",
            "label": "身高(cm)",
            "sort": null,
            "inputType": "input_number",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"身高(cm)是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入身高\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13355,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.bmi",
            "label": "BMI",
            "sort": null,
            "inputType": "input_with_range",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"BMI是必填项\"}]",
            "specialConfig": "{\"tip\": \"BMI的正常范围值是18.5~24.9kg/㎡\", \"min\": 18.5, \"max\": 24.9}",
            "inputProps": "{\"placeholder\": \"请输入BMI\",\"disabled\":true}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13356,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.systolic",
            "label": "血压(mmHg)",
            "sort": null,
            "inputType": "pressure",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"血压(mmHg)是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入血压\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13357,
            "key": "manPremaritalCheckArchivesDetailVM.premaritalCheckArchivesPhysicalExamination.heartRate",
            "label": "心率(次/分钟)",
            "sort": null,
            "inputType": "input_number",
            "tranferRules": null,
            "rules": "[{\"required\":false,\"message\":\"心率(次/分钟)是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入心率\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }]
    },
    {
        "id": 276,
        "moduleName": "premarital-care-file-management",
        "name": "其他信息",
        "flag": "婚前保健-档案管理-其他信息",
        "sort": 4,



        "fields": [{
            "id": 13359,
            "key": "nearRelation",
            "label": "近亲结婚",
            "sort": null,
            "inputType": "checkbox_with_single_input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"近亲结婚是必填项\"}]",
            "specialConfig": "{\"type\":\"single\",\"options\":[{\"value\":1,\"label\":\"否\",\"span\":6,\"withInput\":false},{\"value\":2,\"label\":\"是\",\"withInput\":true,\"isIssue\":true,\"span\":6,\"inputSpan\":12}]}",
            "inputProps": "{\"placeholder\": \"请输入近亲结婚\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13360,
            "key": "filingDay",
            "label": "建档日期",
            "sort": null,
            "inputType": "single_date_picker",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"建档日期是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入建档日期\",\"maxDate\":\"now\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }, {
            "id": 13361,
            "key": "auditor",
            "label": "审核人",
            "sort": null,
            "inputType": "input",
            "tranferRules": null,
            "rules": "[{\"required\":true,\"message\":\"审核人是必填项\"}]",
            "specialConfig": null,
            "inputProps": "{\"placeholder\": \"请输入审核人\"}",
            "span": 8,
            "offset": 0,
            "isNewRow": 0,
            "formItemLayout": "{\"labelCol\":{\"span\":6},\"wrapperCol\":{\"span\":16}}",
            "styles": null,
            "isActive": 1,



        }]
    }
])