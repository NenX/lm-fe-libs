import { mchcEnv } from "@lm_fe/env";
import { IMchc_FormDescriptions_Field_Nullable } from "@lm_fe/service";
export const 孕产史_config = () => {

    const config: IMchc_FormDescriptions_Field_Nullable = {
        "name": "孕产史",
        "children": [
            {
                "key": "pregnancymh",
                "label": "",
                "inputType": "pregnancy_history_v2",

                span: 24,
                // layout: '1/1',
            },
 
    
  
        ]
    }
    return config
}
