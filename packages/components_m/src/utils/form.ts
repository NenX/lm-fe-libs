import { IMchc_FormDescriptions_Field_Nullable } from "@lm_fe/service"
import { isArray, isNumber, isString } from "lodash"


export function set_form_item_name(item: IMchc_FormDescriptions_Field_Nullable, name?: number | string | string[]) {
    if (!item) return

    const arr = parse_form_item_name_raw(name)
    const str = arr.join('.')
    item.name = str
    item.key = str
    return str

}
export function format_form_item_name_and_label(item: IMchc_FormDescriptions_Field_Nullable) {
    if (!item) return null
    const arr = parse_form_item_name(item).filter(_ => _)
    const str = arr.join('.')
    item.name = str
    item.key = str
    // item.dataIndex = str

    const title = get_form_item_title(item)
    item.label = title
    item.title = title
    return str

}
export function get_form_item_name_raw(item: IMchc_FormDescriptions_Field_Nullable) {
    return item?.name ?? item?.key ?? item?.dataIndex
}
export function get_form_item_name_str(item: IMchc_FormDescriptions_Field_Nullable, separator = '.') {
    const arr = parse_form_item_name(item).filter(_ => _)
    const str = arr.join(separator)
    return str
}
export function get_form_item_title(item: IMchc_FormDescriptions_Field_Nullable) {
    return item?.label ?? item?.title
}
export function parse_form_item_name(item: IMchc_FormDescriptions_Field_Nullable) {
    const key = get_form_item_name_raw(item)
    return parse_form_item_name_raw(key)
}


function parse_form_item_name_raw(name?: number | string | string[]) {
    if (isArray(name)) return name as string[]
    if (isNumber(name)) return [name.toString()]

    if (!isString(name)) return []

    let __name = name?.includes('.') ? name.split('.') : name;

    return Array.isArray(__name) ? __name : [__name]
}
