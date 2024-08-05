import { IMchc_FormDescriptions_Field, IMchc_FormDescriptions_Field_Nullable } from "@lm_fe/service";
import { formatDate } from "@lm_fe/utils";
import { 两癌月经史form_config } from "../../../../../edit/form/form_config";
import { mchcEnv } from "@lm_fe/env";
import { 乳房触检_config } from "./乳房触检_config";
import { 辅助检查_config } from "./辅助检查_config";
import { 病史情况_config } from "./病史情况_config";
import { 诊断及指导_config } from "./诊断及指导_config";
import { 体格检查_config } from "../../../CervicalCarcinoma/Screening/form/体格检查_config";

export function form_config_乳腺癌筛查(): IMchc_FormDescriptions_Field_Nullable[] {
    return [
        ...(mchcEnv.in(['建瓯']) ? [] : 体格检查_config()),
        ...(mchcEnv.in(['建瓯']) ? [] : 两癌月经史form_config(true)),
        ...病史情况_config(),

        ...乳房触检_config(),

        ...辅助检查_config(),
        // ...(mchcEnv.in(['建瓯']) ? 建瓯增加_config() : []),
        ...诊断及指导_config(),
    ]
}

