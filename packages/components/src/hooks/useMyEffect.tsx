import { mchcEnv } from "@lm_fe/env";
import { IMchc_FormDescriptions_Field_Nullable } from "@lm_fe/service";
import { useEffect, useState } from "react";
import { load_form_config } from "./form_config";
import { useKeepAliveEffect } from "react-keep-alive-pro";
const useMyEffect = mchcEnv.isSp ? useEffect : useKeepAliveEffect

export { useMyEffect }