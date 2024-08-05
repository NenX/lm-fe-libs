import { ICommonOption, getPresetOptions, getSimpleOptions, mchcLogger, mchcUtils } from '@lm_fe/env';
import { IMchc_FormDescriptions_Field_Nullable, TIdTypeCompatible } from '@lm_fe/service';
import { safe_json_parse_arr } from '@lm_fe/utils';
import { isNil, isObject } from 'lodash';
import { ICheckboxWithInputOption, ICheckboxWithInputProps } from './types';
import { isObj } from 'src/MyForm/utils/func';
import { get_form_item_name_raw } from 'src/utils';
export function parseValue(value?: string | number | ICommonOption[], marshal?: number, type?: 'single' | 'multiple'): ICommonOption[] {
  if (isNil(value))
    return []

  const isString = typeof value === 'string'
  const isArr = Array.isArray(value)
  if (marshal) {
    const arr = (isString || isArr) ? safe_json_parse_arr(value) : []
    // return arr.map(_ => isObject(_) ? _ : { value: _ })
    return arr
  } else {
    if (type === 'multiple') {
      return isString
        ? (value?.split?.(',')?.filter?.(_ => !isNil(_))?.map?.(value => {
          // const nValue = isNaN(Number(value)) ? value : Number(value)
          return ({ value: value })
        }) ?? [])
        : []
    } else {


      return [{ value }]

    }

  }
}


export function parse_MC_option(props: ICheckboxWithInputProps) {
  if (!props) return []
  const multiple = props.type === 'multiple'
  const marshal = props.marshal ?? 1
  const _options = props.options
  const optionKey: any = props.optionKey
  const uniqueKey: any = props.uniqueKey
  const preOptions = optionKey ? getPresetOptions(optionKey, marshal === 0) : null
  const dicOptions = uniqueKey ? mchcUtils.getDictionariesEnumerations(uniqueKey) : null
  const sp = props.sp ?? []
  const options = preOptions ?? dicOptions ?? (typeof _options === 'string' ? getSimpleOptions(_options, { sp, useString: multiple && !marshal, start: props.startIndex }) : _options) ?? []
  return options as ICheckboxWithInputOption[]
}
export function displayValue(_options: ICheckboxWithInputOption[], value: ICommonOption[]) {
  const _value = _options.filter(o => value.find(v => v.value == o.value))
  return _value.map(_ => _.label).join(',')

}
export function getMarshal(_marshal = 1, value: any) {
  if (typeof _marshal === 'number')
    return _marshal
  const marshal = typeof value !== 'number' && (_marshal ?? true)
  return Number(marshal)
}
export function parse_MC_value(props: ICheckboxWithInputProps, changedValue: ICommonOption[]) {
  const marshal = getMarshal(props.marshal, changedValue)
  const type = props.type
  if (!changedValue.length)
    return null

  if (marshal)
    return marshal === 2 ? changedValue : JSON.stringify(changedValue,)

  if (type === 'multiple')
    return changedValue.map(_ => _.value).join(',')
  return changedValue[0]?.value
}


export function get_check_invert_values(configs: IMchc_FormDescriptions_Field_Nullable[]) {
  if (!Array.isArray(configs)) return {}
  const children = configs.filter(_ => _?.inputType === 'MC' || Array.isArray(_?.children))
  mchcLogger.log('CheckAndCancelButton 000', { children, configs })

  const check_invert_values = children.reduce((a, item, idx) => {
    const name = get_form_item_name_raw(item)
    const props = item?.inputProps! as any
    const options = parse_MC_option(props)
    const firstOption = options[0]
    const cArr = item?.children
    let cObj = {}
    if (Array.isArray(cArr)) {
      cObj = get_check_invert_values(cArr)
      return { ...a, ...cObj }
    } else {
      return { ...a, [`${name}`]: [parse_MC_value(props as any, [firstOption]), null], }
    }
  }, {} as { [x: string]: any[] })
  return check_invert_values
}