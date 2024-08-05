import { InputProps } from 'antd';

export interface IInputWithLabelProps extends InputProps {
  labelBefore?: string;
  labelBeforeStyle?: object;
  labelAfterStyle?: object;
  inputStyle?: object;
  labelAfter?: string;
  value?: any;
  style?: any;
  onChange?: any;
  className?: any;
  type?: 'string' | 'number' | 'single_date_picker';
  maxValue?: any;
  minValue?: any;
}
