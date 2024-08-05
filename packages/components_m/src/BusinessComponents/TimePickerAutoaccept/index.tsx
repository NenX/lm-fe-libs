import moment, { Moment } from 'moment';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import { TimePicker } from 'antd';
export const TimePickerAutoaccept = (props: PickerProps<Moment>) => {
  const onBlur = (elem: React.FocusEvent<HTMLInputElement>) => {
    let value = moment(elem.target.value, props.format as string);
    if (value && value.isValid() && props.onChange) {
      props.onChange(value, elem.target.value);
    }
  };
  return <TimePicker {...props} onBlur={onBlur} />;
};
