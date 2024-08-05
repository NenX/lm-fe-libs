import { FormInstance } from "antd"
import { IBaseType } from "./common"


interface I_onChange extends IBaseType<'onChange'> {
    name: string
    value: any
    values?: { [x: string]: any }
    config?: any
    setValue?(name: string, value: any): void
    setValues?(obj: { [x: string]: any }): void
    setOptions?(obj: any[]): void
}


interface I_onSearch extends IBaseType<'onSearch'> {
    name: string
    value: { text: string, data?: any }
    values?: { [x: string]: any }
    setValue?(name: string, value: any): void
    setValues?(obj: { [x: string]: any }): void
}
interface I_onClick extends IBaseType<'onClick'> {
    btnName: string
    values?: any
    setValue?(name: string, value: any): void
    setValues?(obj: { [x: string]: any }): void

}
interface I_onBlur extends IBaseType<'onBlur'> {
    value?: any
    name?: string
}
interface I_onLoad extends IBaseType<'onLoad'> {
    formName?: string
}
interface I_onTabChange extends IBaseType<'onTabChange'> {
    activeKey: string
    oldKey: string
}

export type IMyForm_Event = [I_onChange | I_onSearch | I_onClick | I_onTabChange | I_onBlur |
    I_onLoad
]