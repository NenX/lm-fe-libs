import { getPresetOptions, getSimpleOptions, mchcUtils } from '@lm_fe/env';
import { numberLikeCompare, safe_json_parse_arr } from '@lm_fe/utils';
import { Col, Row, Select } from 'antd';
import { isBoolean, isNil, isNumber, isString } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { getInputStyle } from '../../utils';
import { ICommonOption } from '../../utils/select_options';
import { TCommonComponent } from '../types';
import { componentMap } from './components';
import { IMySelectProps } from './types';
import { check_multiple, getMarshal, get_mode, parse_MC_value } from './utils';
export { IMySelectProps };
function RenderComponent(p: { target?: IMySelectProps['options'][0], handleInputChange(a: any, b: any): void }) {
  const { target, handleInputChange } = p
  if (!target) return null


  const inputType = target.inputType as keyof typeof componentMap
  const props = target.props ?? {}


  const C = useMemo(() => {
    return componentMap[inputType!]
  }, [inputType])
  return <span key="aa" style={{ display: 'flex', alignItems: 'center', }}>
    {target.prefix ? <span style={{ margin: '0 2px', whiteSpace: 'nowrap' }}>{target.prefix}</span> : null}
    {C ? <C {...props} value={target.text} onChange={(e: any) => { handleInputChange(e, target) }} /> : '未知组件'}
    {target.suffix ? <span style={{ margin: '0 2px', whiteSpace: 'nowrap' }}>{target.suffix}</span> : null}


  </span>
}
const defaultOptions: IMySelectProps['options'] = []
export const MySelect: TCommonComponent<IMySelectProps, string | number> = (props) => {


  const { onChange, value, marshal: _marshal, ...others } = props

  const _style = getInputStyle(props)

  const marshal = getMarshal(props)
  const options = getOpt(props)
  const [__data, setData] = useState<ICommonOption[]>([]);
  const needToRenderComponent = options.some(_ => _.inputType);
  const type = get_mode(props)
  const is_multiple = check_multiple(props)
  useEffect(() => {
    const safeData = getData(value, options, marshal, type)
    setData(safeData)
  }, [value]);
  function isChecked(value: any) {
    // return __data.some(d => d.value === value)
    return __data.some(d => numberLikeCompare(d.value, value))

  }
  function safe_onChange(changedValue: ICommonOption[]) {
    // if (!changedValue.length) {
    //   return onChange?.(undefined)
    // }
    // const v = marshal ? (Number(marshal) == 2 ? changedValue : JSON.stringify(changedValue,)) : (type === 'single' ? (changedValue[0]?.value ?? null) : changedValue.map(_ => _.value).join(','))
    // console.log('abc', changedValue, marshal, v)
    const v = parse_MC_value(props, changedValue)
    onChange?.(v)
  }
  function handleChange(rawValue: any) {
    const checkedValues = (Array.isArray(rawValue) ? rawValue : [rawValue])

    const hasExclusiveItem = checkedValues
      .filter(v => {
        return !isChecked(v)
      })
      .find(v => {
        const option = options.find(o => o.value === v)
        return option?.exclusive
      })
    const values = !isNil(hasExclusiveItem) ? [hasExclusiveItem] : checkedValues.filter(v => !options.find(_ => _.value === v)?.exclusive)
    const changedData: ICommonOption[] = values
      .filter(v => is_multiple ? true : !isChecked(v))
      .map(v => {
        const option = options.find(o => o.value === v) ?? { label: v, value: v }
        const old = __data.find(d => d.value === v)
        return { value: option?.value, label: option?.label, text: old?.text ?? undefined }
      })

    setData(changedData)
    safe_onChange(changedData);
  };


  function handleInputChange(e: any, target: IMySelectProps['options'][0]) {

    target.text = e;
    onChange?.(JSON.stringify(__data));


  };
  const _value = is_multiple ? __data.map(_ => _.value) : __data[0]?.value

  const target = (Array.isArray(__data) ? __data : []).find(_ => _.inputType)
  // 多选不支持 非 marshal 不支持
  const isR = !is_multiple && marshal && target
  return (
    isR ? <Row gutter={needToRenderComponent ? 6 : 0} >
      <Col span={needToRenderComponent ? 12 : 24}>
        <Select
          //  bordered={false} 
          style={_style} allowClear value={_value} onChange={handleChange} mode={type}   {...others} options={options} />

      </Col>

      <Col span={needToRenderComponent ? 12 : 0}>
        {
          isR && <RenderComponent target={target} handleInputChange={handleInputChange} />
        }
      </Col>
    </Row> : <Select
      //  bordered={false} 
      allowClear style={_style} value={_value} onChange={handleChange} mode={type}   {...others} options={options} />
  );
}
MySelect.DisplayFC = (props) => {


  const { value, } = props
  const marshal = getMarshal(props)
  const options = getOpt(props)
  const [data, setData] = useState<ICommonOption[]>([]);
  const type = get_mode(props)
  const is_multiple = check_multiple(props)
  useEffect(() => {
    const safeData = getData(value, options, marshal, type)
    setData(safeData)
  }, [value]);

  const node = is_multiple ? data.map(_ => _.label).join(',') : data[0]?.label
  const devNode = node ?? (__DEV__ ? JSON.stringify({ props, data, marshal }) : '')
  return (
    <span title={devNode}>
      {
        devNode
      }
    </span>
  );
}
function getOpt({ optionKey, options, uniqueKey }: { optionKey?: any, uniqueKey?: any, options?: any }) {
  const preOptions = optionKey ? getPresetOptions(optionKey) : null
  const _option = typeof options === 'string' ? getSimpleOptions(options) : options
  const a: ICommonOption[] = preOptions ?? _option ?? (uniqueKey && mchcUtils.getDictionariesEnumerations(uniqueKey)) ?? defaultOptions;
  return a
}
function getData(value: any, options: ICommonOption[], marshal: number, type: "multiple" | "tags" | undefined) {
  const unMarshalData = safe_json_parse_arr(value, value)
  const splitValue = () => isString(value) ? value.split(',').filter(_ => _) : []
  const v =
    [1, 2].includes(marshal)
      ? unMarshalData :
      (
        (type === 'multiple' || type === 'tags') && isString(value)

          ? (
            splitValue().map(value => options.find(_ => numberLikeCompare(value, _.value)) ?? ({ value, label: value }))
          )

          : value
      )
  const safeData = (Array.isArray(v))
    ? v
    : ((isNumber(v) || isString(v) || isBoolean(v))
      // ? options.filter(_ => _.value === v)
      ? options.filter(_ => numberLikeCompare(_.value, v))
      : [])
  // console.log('safeData', value, safeData, options)
  return safeData
}

