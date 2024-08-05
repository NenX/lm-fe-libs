import { ICommonOption } from "@lm_fe/env";
import { IMySelectProps } from "./types";
export function getMarshal({ uniqueKey, marshal }: IMySelectProps) {

    if (uniqueKey !== undefined) {
        return 0
    }
    if (marshal === undefined) {
        return 1
    }
    return Number(marshal)

}

export function parse_MC_value(props: IMySelectProps, changedValue: ICommonOption[]) {
    const marshal = getMarshal(props,)
    const type = get_mode(props)
    if (!changedValue.length)
        return null

    if (marshal)
        return marshal === 2 ? changedValue : JSON.stringify(changedValue,)

    if (type === 'multiple' || type === 'tags')
        return changedValue.map(_ => _.value).join(',')
    return changedValue[0]?.value
}
export function check_multiple(props: IMySelectProps,) {

    const type = get_mode(props)

    return ['tags', 'multiple'].includes(type!)
}
export function get_mode(props: IMySelectProps,) {

    return props?.mode ?? props.type

}