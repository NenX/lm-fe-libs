import { genEnum } from "@lm_fe/utils";

export const mchcEnums = {
    common: {
        caseType: genEnum({ 妊娠高血压: 1, 妊娠糖尿病: 2, 胎心监护: 3 }),
        period: genEnum({ 空腹: 0, 早餐后: 1, 午餐前: 2, 午餐后: 3, 晚餐前: 4, 晚餐后: 5, 睡前: 6 }),
    },
    EarlyPregnancyCheckSurgeryType: {
        progressStatus: genEnum({ 超时: 0, 待预约: 1, 待签到: 2, 已签到: 3, 已完成: 4, 已取消: 5, }),
    },
    Questionnaire: {
        type: genEnum({ 单选题: 1, 多选题: 2, 下拉题: 3, 填空题: 4, 打分题: 5, 段落说明: 6 }),
    },
    Doctor: {
        modalPopup: genEnum({ 弹窗: 1, 提醒: 2, 无: 3, }),
    },
}


