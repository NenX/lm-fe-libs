import { request } from "@lm_fe/utils"
import { IMchc_FormDescriptions_FormItemLayout } from "./FormItemLayout"
import { IMchc_FormDescriptions_InputType } from "./InputType"
import { IMchc_FormDescriptions_Rules } from "./Rules"
import { IMchc_FormDescriptions_SpecialConfig } from "./SpecialConfig"
import { IMchc_FormDescriptions_TranferRules } from "./TranferRules"
import { ICommonOption } from "@lm_fe/env"
import { ButtonProps, FormInstance } from "antd"
import React, { CSSProperties } from "react"
import { SizeType } from "antd/lib/config-provider/SizeContext"


export interface IMchc_FormDescriptions_InputProps {
    showTime?: boolean
    showEdit?: boolean
    dependency?: {
        show?: { key: string, value: any[] }
        disabled?: { key: string, value: any[] }
        required?: { key: string, value: any[] }
    },
    allowClear?: boolean
    genRowData?: (oldlist?: any[]) => any
    type?: 'multiple' | 'single' | 'tags'
    unit?: string
    span?: number
    labelCol?: number
    wrapperCol?: number
    options?: string | ICommonOption[] | string[],
    optionKey?: string
    uniqueKey?: string
    separator?: string
    sp?: ICommonOption[]
    format?: 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD HH:mm' | 'HH:mm:ss'
    placeholder?: string
    disabled?: boolean
    unknown?: boolean
    style?: CSSProperties
    marshal?: number
    TemplateTextarea_type?: {
        type: number;
        title: string;
    }[]
    defaultData?: { [x: string]: any }
    btnText?: string
    standalone?: boolean
    node?: React.ReactNode
    component?: React.FC<{ value?: any, onChange?(v: any): void, form?: FormInstance }>
    width?: number
    startIndex?: number
    inputWidth?: number
    size?: SizeType
    memorable?: boolean,
    memorieskey?: string,
    memoriesname?: string,
    formDescriptions?: IMchc_FormDescriptions_Field_Nullable[]
    addressBtns?: {
        name: string,
        label: string,
        props?: ButtonProps
    }[]
    check_invert_values?: { [x: string]: [any, any] }

}
type IMchc_FormDescriptions_FilterTypeRaw = 'in' | 'equals' | 'contains' | 'greaterOrEqualThan' | 'lessOrEqualThan';
export type IMchc_FormDescriptions_FilterType = IMchc_FormDescriptions_FilterTypeRaw | `${IMchc_FormDescriptions_FilterTypeRaw},${IMchc_FormDescriptions_FilterTypeRaw}`
export type IMchc_FormDescriptions_Field<RAW = false> = {
    siblings?: IMchc_FormDescriptions_Field_Nullable<RAW>[]
    __format?: boolean
    createdTime?: string
    deletedTime?: string
    id?: number
    inputType?: IMchc_FormDescriptions_InputType
    isActive?: number | boolean
    isNewRow?: number | boolean
    key?: string
    dataIndex?: string | string[]
    label?: string
    title?: string
    width?: number
    offset?: number
    push?: number
    pull?: number
    sort?: number
    align?: 'center'
    fixed?: 'left' | 'right'
    required?: boolean
    ellipsis?: { showTitle?: boolean; } | boolean
    updatedTime?: string
    span?: number
    containerType?: 'section(default)' | 'tabs' | 'plain'
    styles?: RAW extends false ? { [x: string]: any } : string
    props?: RAW extends false ? IMchc_FormDescriptions_InputProps : string
    inputProps?: RAW extends false ? IMchc_FormDescriptions_InputProps : string
    inputPropsFn?(): IMchc_FormDescriptions_InputProps
    formItemLayout?: RAW extends false ? IMchc_FormDescriptions_FormItemLayout : string
    rules?: RAW extends false ? IMchc_FormDescriptions_Rules : string
    specialConfig?: RAW extends false ? IMchc_FormDescriptions_SpecialConfig : string
    tranferRules?: RAW extends false ? IMchc_FormDescriptions_TranferRules : string
    render?(value: any, rowData: any, index: number): React.ReactNode
    // fucking 兼容
    name?: RAW extends false ? string : never
    hidden?: RAW extends false ? boolean : never
    input_type?: RAW extends false ? any : never
    special_config?: RAW extends false ? any : never
    tranfer_rules?: RAW extends false ? any : never
    input_props?: RAW extends false ? any : never
    form_item_layout?: RAW extends false ? any : never
    labelCol?: RAW extends false ? any : never
    wrapperCol?: RAW extends false ? any : never
    layout?: RAW extends false ? string : never
    fields?: IMchc_FormDescriptions_Field_Nullable<RAW>[]
    children?: IMchc_FormDescriptions_Field_Nullable<RAW>[]
    filterType?: IMchc_FormDescriptions_FilterType
    showDeps?: { [x: string]: any[] }
    requiredDeps?: { [x: string]: any[] }
    disabledDeps?: { [x: string]: any[] }
    //  兼容 components MyForm

    // 自定义
    processRemote?(v: any, form?: FormInstance): any
    processLocal?(v: any, form?: FormInstance): any
}
export type IMchc_FormDescriptions_Field_Nullable<RAW = false> = IMchc_FormDescriptions_Field<RAW> | null

type T_FormConfig_Callable = IMchc_FormDescriptions_Field_Nullable[] | (() => IMchc_FormDescriptions_Field_Nullable[])

type T_FormConfig_Loader = () => Promise<{ __lazy_config: IMchc_FormDescriptions_Field_Nullable[] } | T_FormConfig_Callable>

// import commonStyles from '../themes/common.less'
export type IMchc_FormDescriptions_MIX = T_FormConfig_Loader | IMchc_FormDescriptions_Field_Nullable[] | { [x: string]: IMchc_FormDescriptions_Field_Nullable } | undefined


export interface IMchc_FormDescriptions<RAW = false> {
    createdTime?: string
    deletedTime?: string
    fields?: IMchc_FormDescriptions_Field_Nullable<RAW>[]
    children?: IMchc_FormDescriptions_Field_Nullable<RAW>[]
    flag?: string
    id?: number
    moduleName?: string
    name: string
    sort?: number
    updatedTime?: string

}
export const SMchc_FormDescriptions = {
    getModule(moduleName: string,) {
        return request.get<IMchc_FormDescriptions<true>[]>('/api/form-descriptions', { params: { moduleName } })
            .then(res => res.data)
    },
    getModuleCache(moduleName: string,) {
        return request.get<IMchc_FormDescriptions<true>[]>('/api/form-descriptions', { params: { moduleName } })
            .then(res => res.data)
    },
    getModuleParse(moduleName: string,) {
        return request.get<IMchc_FormDescriptions<true>[]>('/api/form-descriptions', { params: { moduleName } })
            .then(res => res.data)
    },
    getModuleParseCache(moduleName: string,) {
        return request.get<IMchc_FormDescriptions<true>[]>('/api/form-descriptions', { params: { moduleName } })
            .then(res => res.data)
    }
}

