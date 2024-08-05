import { mchcEnv } from "@lm_fe/env";



export function load_form_config_nurse_end() {

    if (mchcEnv.is('郫都'))
        return import('./郫都')
    if (mchcEnv.is('建瓯'))
        return import('./建瓯')

    return import('../form/form_config')


}