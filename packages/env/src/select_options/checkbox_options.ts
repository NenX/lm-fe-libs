import { ICommonOption } from "./types";

const 否是i: () => ICommonOption[] = () => [
    { label: "否", value: 0, },
    { label: "是", value: 1, inputType: 'MyInput' },
]
const 无有i: () => ICommonOption[] = () => [
    { label: "否", value: 0, },
    { label: "是", value: 1, inputType: 'MyInput' },
]
const 无异常i: () => ICommonOption[] = () => [
    { label: "否", value: 0, },
    { label: "是", value: 1, inputType: 'MyInput' },
]

export const checkbox_options = {
    否是i,
    无有i,
    无异常i
}