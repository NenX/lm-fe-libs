import { ICommonOption, mchcEnv } from '@lm_fe/env';
import { numberLikeCompare } from '@lm_fe/utils';
import { Checkbox } from 'antd';
import { default as classNames, default as classnames } from 'classnames';
import { cloneDeep, isNil, map, size } from 'lodash';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { TCommonComponent } from '../../FU_components/types';
import MyCheckbox_DisplayFC from './Display';
import { components } from './components';
import styles from './index.module.less';
import { ICheckboxWithInputOption, ICheckboxWithInputProps } from './types';
import { getMarshal, parseValue, parse_MC_option, parse_MC_value } from './utils';
const MyCheckbox: TCommonComponent<ICheckboxWithInputProps, string | number | ICommonOption[]> = (MyCheckboxProps) => {
  const { type = 'single', value, onChange, disabled = false, onBlur, inputWidth = 64, vertical = false } = MyCheckboxProps;
  const options = parse_MC_option(MyCheckboxProps)
  const longOptions = options.length > 2
  const [__data, setData] = useState<ICommonOption[]>([]);
  const marshal = getMarshal(MyCheckboxProps.marshal, value)
  const forcusInfo = useRef<{ index?: number, type?: 'child' | 'parent' }>({})
  // mchcEnv.logger.log('MyCheckbox', { MyCheckboxProps, options, __data })
  useEffect(() => {
    const _value = parseValue(value, marshal, type)
    setData(_value);
    // if (isNil(value)) {
    //   setData([]);
    // } else {
    //   const d = marshal ? safe_json_parse(value, []) : (type === 'single' ? [{ value }] : (value?.split?.(',')?.filter?.(_ => !isNil(_))?.map?.(value => ({ value })) ?? []))
    //   setData(Array.isArray(d) ? d : []);
    // }
  }, [value]);
  function safe_onChange(changedValue: ICommonOption[]) {
    // if (!changedValue.length) {
    //   return onChange?.(undefined)
    // }
    // const v = marshal ? (Number(marshal) == 2 ? changedValue : JSON.stringify(changedValue,)) : (type === 'single' ? (changedValue[0]?.value ?? null) : changedValue.map(_ => _.value).join(','))
    // console.log('abc', changedValue, marshal, v)
    const v = parse_MC_value(MyCheckboxProps, changedValue)
    onChange?.(v)
  }


  const handleBoxGroupChange = (checkedValues: any[] = []) => {
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
      .filter(v => type === 'multiple' ? true : !isChecked(v))
      .map(v => {
        const option = options.find(o => o.value === v)
        const old = __data.find(d => d.value === v)
        return { value: option?.value, label: option?.label, text: old?.text ?? undefined }
      })

    setData(changedData)
    safe_onChange(changedData);
  };

  const handleInputChange = (option: ICheckboxWithInputOption) => (inputValue: any) => {
    const tempData = cloneDeep(__data);
    const target = tempData.find(d => d.value === option.value)
    if (!target) return




    target.text = inputValue


    setData(tempData);
    safe_onChange(tempData);
  };



  const renderInput = (option: ICheckboxWithInputOption) => {
    const {
      inputType,
    } = option;
    const targetData = __data.find(d => d.value === option.value)
    if (!targetData || !inputType) return null
    let C = components[inputType]
    C = C === '_' ? MyCheckbox : C
    const inputValue = targetData.text;

    const props: any = option.props ?? {}
    let style: CSSProperties = props.style ?? {}
    if (['MyInput', 'Input', 'MA', 'MyAutoComplete'].includes(inputType)) {
      style = { width: inputWidth * (longOptions ? 1 : 2), ...style }
    }
    if (['Select', 'MS', 'MySelect'].includes(inputType)) {
      style = { minWidth: inputWidth * (longOptions ? 1 : 2), ...style }
    }
    return C ? <C
      size="small"
      disabled={disabled}
      marshal={marshal}
      inputWidth={inputWidth}
      // onBlur={onBlur}
      className={classnames({
        // 'global-issue-input': option.warning,
      })}
      style={style}
      {...props}

      onChange={handleInputChange(option)}
      value={inputValue}

    /> : null

  };
  function isChecked(value: any) {
    // return __data.some(d => d.value === value)
    return __data.some(d => numberLikeCompare(d.value, value))

  }
  if (!size(options)) return null
  return (
    <Checkbox.Group className={classNames([styles['wrapper'], vertical ? styles['block-box'] : styles['flex-box']])} disabled={disabled} value={__data.map(_ => _.value)} onChange={handleBoxGroupChange}
      style={{ width: '100%', flexWrap: 'wrap' }}>
      {map(options, (option, index) => {
        const { prefix, sufix, suffix, parentheses } = option
        const _parentheses = parentheses ?? (['MC', 'MArr'].includes(option.inputType!) && !!option?.props?.options)
        const _suffix = sufix ?? suffix
        const checked = isChecked(option.value)
        const node = checked ? renderInput(option) : null

        const surround_node = <>
          {_parentheses && checked ? <span style={{ margin: "0 2px", }}>(</span> : null}
          {prefix && checked ? <span style={{ margin: "0 2px", whiteSpace: 'nowrap', }}>{prefix}</span> : null}
          {node ? <span
            onFocus={(e) => {
              forcusInfo.current = { index, type: 'child' }
            }}
            onBlur={(e) => {
              forcusInfo.current = { index: undefined, type: undefined }
              onBlur?.(e)
            }}

            style={{
              // margin: "0 2px",
            }}>{node}</span> : null}
          {_suffix && checked ? <span style={{ margin: "0 2px", }}>{_suffix}</span> : null}
          {_parentheses && checked ? <span style={{ margin: "0 2px", whiteSpace: 'nowrap', }}>)</span> : null}
        </>
        return (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginRight: 2 }} className={(option.warning && checked) ? styles['warning'] : undefined}>
            <span
              onFocus={(e) => {

                setTimeout(() => {
                  forcusInfo.current = { index, type: 'parent' }
                }, 10);
              }}
              onBlur={(e) => {

                setTimeout(() => {
                  if (forcusInfo.current.index === index && forcusInfo.current.type === 'child')
                    return
                  forcusInfo.current = { index: undefined, type: undefined }
                  onBlur?.(e)
                }, 10);
              }}
            >
              <Checkbox value={option.value} >
                {option.label}
              </Checkbox>
            </span>
            {
              surround_node
            }

          </div>
        );


      })}
    </Checkbox.Group>

  );
};
MyCheckbox.DisplayFC = MyCheckbox_DisplayFC
export default MyCheckbox