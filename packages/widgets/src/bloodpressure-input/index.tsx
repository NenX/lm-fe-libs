/**
 * Created by ZhongJun on 20/06/2022.
 * Desc: 血压值组合输入组件
 */
import React from 'react'
import { RangeInputNumber } from '../range-input-number'
type BloodPressureInputProps = {}
export const BloodPressureInput = ({ ...rest }: BloodPressureInputProps) => {
    return <RangeInputNumber {...rest} />
}
