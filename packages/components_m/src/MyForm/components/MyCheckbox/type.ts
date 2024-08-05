import { FormConfig } from "../../interface";

export interface MyCheckboxProps {
    disabled?: boolean
    onChange: Function;
    dispatch?: Function;
    value: any;
    input_props: CheckboxComponentProps;
}

export interface CheckboxComponentProps {
    type?: string;
    radio?: boolean;
    inputNeedFillWidth?: boolean
    renderData: {
        key: string;
        label: string;
        options: {
            label: string | number;
            value: string | number | boolean;
        }[];
        extraEditors: IExtraEditors[];
    }[];
    // 用于单选的单字段checkbox
    options: {
        label: string | number;
        value: string | number | boolean;
    }[];
    issue?: any;
}

export type IExtraEditors = {
    key: string | number | string;
    editors: IExtraEditor_editor[];
}

export interface IExtraEditor_editor extends FormConfig {


}