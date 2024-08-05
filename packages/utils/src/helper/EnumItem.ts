export interface IGlobalEnumItem<T = string> {
    label: T
    value: number
}
export class EnumItem<T, V = any> extends Array<IGlobalEnumItem<T>> {
    declare t: T
    declare v: V
    constructor(...data: any[]) {
        super(...data);
    }
    getValue(label?: T) {
        return this.find(_ => _.label === label)?.value as number
    }
    getValues(labels?: T[]) {
        return this.filter(_ => labels?.includes(_.label)).map(_ => _.value) as number[]
    }
    getLabel(value?: number) {
        return this.find(_ => _.value === value)?.label as T
    }
    getLabels(value2?: number[]) {
        return this.filter(_ => value2?.includes(_.value)).map(_ => _.label) as T[]
    }
    getMultiLabel(value?: string) {
        if (!value) return []
        return value.split(',').map(_ => +_).filter(_ => _ !== NaN).map(_ => this.getLabel(_))
    }
};
export function genEnum<T extends Object>(data: T) {
    return new EnumItem<keyof T, T[keyof T]>(...Object.keys(data).map((_: any) => ({ label: _, value: data[_] })))
};


