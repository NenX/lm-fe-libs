import { ReactNode } from 'react';

import { IMchc_FormDescriptions_Field } from '@lm_fe/service';
export interface IFormTabsProps<T = any> extends ICommonFormTabsProps<T> {
    fds?: IMchc_FormDescriptions_Field[]
}

export interface ICommonFormTabsProps<T = any> {
    value?: T[]
    onTabChange(data: T[]): void
    title?: string,
    renderTabNode?(data: T, index: number): ReactNode
    onIdxChange?(v: number): void
    onChange(data: T[], index: number, changedValues: any): void
    disabled?:boolean
}


