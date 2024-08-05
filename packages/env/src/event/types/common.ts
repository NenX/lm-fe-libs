import { FormInstance } from "antd"

export interface IBaseType<T extends string> {
    readonly type: T
    form?: FormInstance

}