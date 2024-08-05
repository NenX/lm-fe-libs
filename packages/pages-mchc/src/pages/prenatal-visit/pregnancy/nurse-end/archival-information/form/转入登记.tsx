import { IMchc_FormDescriptions_Field_Nullable } from "@lm_fe/service";
var referralInFd: any = [{
    "id": 12573,
    "key": "referralInInfo.reason",
    "label": "转入原因",
    "inputType": "text_area",
    "rules": [{ "required": true, "message": "转入原因是必填项" }],
    "span": 16,
    "formItemLayout": { "labelCol": { "span": 3 }, "wrapperCol": { "span": 20 } },
}, {
    "id": 12574,
    "key": "referralInInfo.referralDate",
    "label": "转入时间",
    "inputType": "single_date_picker",
    "rules": [{ "required": true, "message": "转入时间是必填项" }],
    "span": 8,
    "formItemLayout": { "labelCol": { "span": 6 }, "wrapperCol": { "span": 16 } },
}, {
    "id": 12575,
    "key": "referralInInfo.organizationId",
    "label": "原单位",
    "inputType": "MyReferralOrganizationSelect",
    "rules": [{ "required": true, "message": "原单位是必填项" }],
    "span": 8,
    "formItemLayout": { "labelCol": { "span": 6 }, "wrapperCol": { "span": 16 } },
}, {
    "id": 12616,
    "key": "referralInInfo.referralDept",
    "label": "原科室",
    "inputType": "input",
    
    "span": 8,
    "formItemLayout": { "labelCol": { "span": 6 }, "wrapperCol": { "span": 16 } },
}, {
    "id": 12576,
    "key": "referralInInfo.referralDirection",
    "label": "转诊类型",
    "inputType": "checkbox_group",
    
    "specialConfig": { "type": "single", "options": [{ "value": 1, "label": "平级", "span": 6, "withInput": false }, { "value": 2, "label": "上级", "withInput": false, "span": 6 }, { "value": 3, "label": "下级", "withInput": false, "span": 6 }] },
    "inputProps": { "disabled": true },
    "span": 8,
    "formItemLayout": { "labelCol": { "span": 6 }, "wrapperCol": { "span": 16 } },
}, {
    "id": 12617,
    "key": "referralInInfo.referralDoctor",
    "label": "申请者",
    "inputType": "input",
    
    "span": 8,
    "formItemLayout": { "labelCol": { "span": 6 }, "wrapperCol": { "span": 16 } },
}, {
    "id": 12618,
    "key": "referralInInfo.referralContactNumber",
    "label": "原科室联系电话",
    "inputType": "input",
    
    "span": 8,
    "formItemLayout": { "labelCol": { "span": 6 }, "wrapperCol": { "span": 16 } },
}, {
    "id": 12577,
    "key": "referralInInfo.recorder",
    "label": "记录者",
    "inputType": "input",
    "rules": [{ "required": true, "message": "记录者是必填项" }],
    "span": 8,
    "formItemLayout": { "labelCol": { "span": 6 }, "wrapperCol": { "span": 16 } },
}]
export const 转入登记_config = () => {
    const config: IMchc_FormDescriptions_Field_Nullable = {
        "name": "转入登记",
        "children": [{
            "key": "referralInInfo",
            "label": "",
            // "inputType": "referral_register",
            "inputType": "ToggleForm",
            inputProps: {
                formDescriptions: referralInFd,
                plainForm: true
            },
            
            layout: '1/1',
        }]
    }
    return config
}
