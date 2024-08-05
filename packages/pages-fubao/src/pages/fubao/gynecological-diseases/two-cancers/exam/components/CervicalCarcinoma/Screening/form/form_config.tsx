import { mchcEnv } from "@lm_fe/env";
import { IMchc_FormDescriptions_Field } from "@lm_fe/service";
import { 两癌月经史form_config } from "../../../../../edit/form/form_config";
import { 体格检查_config } from "./体格检查_config";
import { 妇科检查_config } from "./妇科检查_config";
import { 建瓯增加_config } from "./建瓯增加_config";
import { 检验检查_config } from "./检验检查_config";
import { 病史情况_config } from "./病史情况_config";
import { 诊断及指导_config } from "./诊断及指导_config";

export function form_config(): IMchc_FormDescriptions_Field[] {
    return [
        ...(mchcEnv.in(['建瓯']) ? [] : 体格检查_config()),
        ...(mchcEnv.in(['建瓯']) ? [] : 两癌月经史form_config()),
        ...病史情况_config(),
        ...妇科检查_config(),
        ...(mchcEnv.in(['建瓯']) ? [] : 检验检查_config()),

        ...(mchcEnv.in(['建瓯']) ? 建瓯增加_config() : []),
        ...诊断及指导_config(),

    ]
}