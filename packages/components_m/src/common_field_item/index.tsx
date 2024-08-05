import { IMchc_FormDescriptions_Field } from "@lm_fe/service";
import { TCommonFieldLabel, createColumn, createFormItem } from "./meta";
import { IMyBaseList_ColumnType } from '../FU_components'
export function getCommonFormItem<T extends TCommonFieldLabel>(label: T, merge?: IMchc_FormDescriptions_Field) {
    const target = createFormItem(label)
    if (merge) {
        merge.inputProps = merge.inputProps ?? {}
        target.inputProps = target.inputProps ?? {}
        const inputProps = { ...target.inputProps, ...merge.inputProps, }
        return { ...target, ...merge, inputProps }
    }
    return target
}
export function getCommonColumn<T extends TCommonFieldLabel>(label: T, merge?: IMyBaseList_ColumnType) {
    const target = createColumn(label)

    if (merge) {

        merge.inputProps = merge.inputProps ?? {}
        target.inputProps = target.inputProps ?? {}
        const inputProps = { ...target.inputProps, ...merge.inputProps, }

        return { ...target, ...merge, inputProps }
    }
    return target
}

