import { FC } from "react";
type TBase<T = any, V = any, D = { disabled?: boolean, value?: V, onChange?(v?: V | null): void, isDisplay?: boolean } & T> = FC<D>

export type TCommonComponentDisplay<T = any, V = any> = TBase<T, V>
export type TCommonComponent<T = any, V = any,> = TBase<T, V> & { DisplayFC?: TBase<T, V> }