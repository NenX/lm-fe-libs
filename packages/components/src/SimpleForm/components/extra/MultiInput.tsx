import { Select, SelectProps, Radio } from "antd"
export function MultiInput(props: Omit<SelectProps<any>, 'value'> & { optionsArr: string[], value: string }) {
    const { optionsArr, value = "", onChange, ...others } = props
    const _value = value ? value.split(',').filter(_ => _) : []
    return <Select mode="tags" value={_value} onChange={v => onChange?.call(null, v.join(','), [])} {...others} />
}
