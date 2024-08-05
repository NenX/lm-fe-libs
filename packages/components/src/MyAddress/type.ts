import { ButtonProps, FormInstance } from "antd"


export interface IMyAddressProps {
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
  disabled?: boolean;
  size?: 'large' | 'middle' | 'small';
  getPopupContainer?: any;
  bordered?: boolean;
  // 同上按钮需要用到
  form?: FormInstance
  // 同上按钮配置
  addressBtns?: { name: string, label: string, props: ButtonProps }[]
}