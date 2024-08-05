

import React, { useState, useEffect } from 'react';
import { Radio, Checkbox, Input, InputNumber, AutoComplete } from 'antd';
import classnames from 'classnames';
import { get } from 'lodash';
import styles from './index.less';

interface IProps {
  value?: object;
  inputType?: 'text' | 'number' | 'autoComplete';
  type?: 'radio' | 'checkbox'; // 选择框样式
  suffix?: string;
  onChange: (e: object) => void;
  [propName: string]: any;
}

export interface optionProps {
  label: string;
  value: boolean | string | number;
  withInput?: boolean;
  warning?: boolean;
}

export const OPTIONS: optionProps[] = [
  { label: '无', value: false },
  { label: '有', value: true, withInput: true, /* 是否带input输入框 */ warning: true /* warnig样式提醒 */ },
];

export default function RadioWithInput({
  name,
  value = {},
  onChange,
  options = OPTIONS,
  suffix,
  type = 'radio',
  inputType = 'text',
  inputWidth = 86,
  ...restProps
}: IProps) {
  const [focus, setFocus] = useState(false);
  const key = name.split('.').pop();
  useEffect(() => {
    // console.log('---------89---------', value, restProps);
  }, []);
  const handleChange = (e) => {
    e.preventDefault();
    const val = e.target.value;
    if (val) {
      setFocus(true);
    }
    const newVal = { ...value, [key]: val };
    onChange(newVal);
  };

  const inputChange = (e) => {
    e.preventDefault();
    const val = e.target.value;
    const newVal = { ...value, [`${key}Note`]: val };
    onChange(newVal);
  };

  const inputNumberChange = (val: number | string | undefined) => {
    const newVal = { ...value, [`${key}Note`]: val };
    onChange(newVal);
  };

  const renderInput = (type: string, warning: boolean = false, options = []) => {
    if (type === 'number') {
      return (
        <span className={classnames(styles['radio-group-with-input-wrapper-inputNumber'], { warning })}>
          <InputNumber autoFocus={focus} onChange={inputNumberChange} style={{ width: inputWidth }} />
          <span className={styles["radio-group-with-input-wrapper-inputNumber-suffix"]}>{suffix}</span>
        </span>
      );
    }
    if (type === 'autoComplete') {
      return (
        <AutoComplete
          autoFocus={focus}
          options={options}
          value={get(value, `${key}Note`)}
          placeholder=""
          value={get(value, `${key}Note`)}
          onChange={inputNumberChange}
          style={{ width: inputWidth }}
          className={classnames(styles['radio-group-with-input-wrapper-complete'], { [styles["warning"]]: warning })}
          filterOption={(inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        />
      );
    }
    return (
      <Input
        autoFocus={focus}
        value={get(value, `${key}Note`)}
        onChange={inputChange}
        suffix={suffix}
        className={classnames(styles['radio-group-with-input-wrapper-input'], { warning })}
        style={{ width: inputWidth }}
      />
    );
  };

  if (type === 'checkbox') {
    return (
      <Checkbox.Group value={[get(value, key)]} className={styles["radio-group-with-input-wrapper"]}>
        {options.map((_: optionProps) => {
          return (
            <React.Fragment key={_.value}>
              <Checkbox
                value={_.value}
                onChange={handleChange}
                className={classnames({
                  'global-issue-checkbox': _.warning && [get(value, key)] && [get(value, key)].indexOf(_.value) > -1,
                })}
              >
                {_.label}
              </Checkbox>
              {_.withInput && get(value, key) === _.value && renderInput(inputType, _.warning, _.options)}
            </React.Fragment>
          );
        })}
      </Checkbox.Group>
    );
  }

  return (
    <Radio.Group value={get(value, key)} className={styles["radio-group-with-input-wrapper"]}>
      {options.map((_: optionProps) => {
        return (
          <Radio key={_.value} value={_.value} onChange={handleChange}>
            {_.label}
            {_.withInput && get(value, key) === _.value && renderInput(inputType, _.warning, _.options)}
          </Radio>
        );
      })}
    </Radio.Group>
  );
}
