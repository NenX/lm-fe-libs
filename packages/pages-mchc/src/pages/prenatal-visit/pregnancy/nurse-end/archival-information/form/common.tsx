import { IMchc_FormDescriptions_Field } from "@lm_fe/service";

export const __obdriver_read: IMchc_FormDescriptions_Field = {
    "key": "__obdriver_read",
    "inputType": 'IdNOButton',
    label: '外设读取',
    "inputProps": {

    },
    layout: '1/3',
}



export const month1_12 = Array(24).fill(0).map((_, idx) => {
    const isOdd = idx % 2 === 1
    const _idx = Math.floor(idx / 2)
    return `${_idx + 1}${isOdd ? '+' : ''}`
}).join(',')




