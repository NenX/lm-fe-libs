import { IMchc_FormDescriptions_Field_Nullable } from '@lm_fe/service'
import { temp_reander } from '@lm_fe/utils'
import React from 'react'
import { MyFormSection } from 'src/FU_components/FormSection'
export function preload_components(form_config?: IMchc_FormDescriptions_Field_Nullable[]) {
    temp_reander({
        cb() { },
        Comp: () => {
            return <MyFormSection
                formDescriptions={form_config ?? [
                    { inputType: 'MyDatePicker' },
                    { inputType: 'MyAutoComplete' },
                    { inputType: 'MyButton' },
                    { inputType: 'MyRangeDate' },
                    { inputType: 'MySelect' },
                    { inputType: 'TemplateTextarea' },
                    { inputType: 'MyCheckbox' },
                    { inputType: 'ArrayInput' },
                    { inputType: 'LoadFlag' },
                ] as any}
            />
        }
    })
}

