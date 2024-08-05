import { map } from 'lodash';
import React, { useState, useEffect } from 'react';
import { Checkbox } from 'antd';
import { get } from '@antv/util';
export default function SingleCheckbox({ options, checked, onChange }: any) {
  function onHandleChange(value: any) {
    return () => {
      onChange(value);
    };
  }
  return (
    <>
      {map(options, (item, index) => {
        return (
          <Checkbox onChange={onHandleChange(get(item, `value`))} checked={checked == get(item, `value`)}>
            {get(item, `label`)}
          </Checkbox>
        );
      })}
    </>
  );
}
