import React from 'react';
import moment from 'moment';
import { Input, InputNumber, DatePicker, Checkbox, AutoComplete, TreeSelect, Form } from 'antd';
import { AsyncSingleSelector, AsyncMultiSelector, AsyncInputSelector } from '../GeneralComponents/Select';
import CascaderAddress from '../selects/CascaderAddress';
import RangeInputNumber from '../GeneralComponents/RangeInputNumber';
import DataSelect from '../DataSelect';
import PatientAutoComplete from '../selects/PatientAutoComplete'
const RangePicker = DatePicker.RangePicker;
const tplMap = {
  PatientAutoComplete: (props) => {
    return <PatientAutoComplete allowClear style={{ width: 138 }} {...props} />;
  },
  input: (props) => {
    return <Input allowClear style={{ width: 138 }} {...props} />;
  },
  number: (props) => {
    return <InputNumber {...props} />;
  },
  rangeInputNumber: (props) => {
    return <RangeInputNumber {...props} />;
  },
  select: (props) => {
    return <AsyncSingleSelector style={{ minWidth: 98 }} {...props} />;
  },
  multiselect: (props) => {
    return <AsyncMultiSelector style={{ minWidth: 135 }} {...props} />;
  },
  inputSelect: (props) => {
    return <AsyncInputSelector style={{ minWidth: 135 }} {...props}></AsyncInputSelector>;
  },
  autoComplete: (props) => {
    return <AutoComplete style={{ minWidth: 135 }} {...props} />;
  },
  treeSelect: ({ options, ...rest }) => {
    return (
      <TreeSelect
        allowClear
        // treeDefaultExpandAll
        dropdownMatchSelectWidth={false}
        style={{ minWidth: 135 }}
        treeData={options}
        {...rest}
      />
    );
  },
  checkbox: (props) => {
    return <Checkbox {...props} />;
  },
  date: (props) => {
    return <DatePicker allowClear {...props} />;
  },
  address: (props) => {
    return <CascaderAddress id={props.name} {...props} />;
  },
  rangeDate: ({ placeholder, ...rest }) => {
    return (
      <RangePicker
        ranges={{
          昨天: [moment().add(-1, 'day'), moment().add(-1, 'day')],
          今天: [moment(), moment()],
          明天: [moment().add(1, 'day'), moment().add(1, 'day')],
          这个星期: [moment().subtract(7, 'day'), moment()],
          这个月: [moment().startOf('month'), moment().endOf('month')],
          下个星期: [moment().add(1, 'day'), moment().add(7, 'day')],
        }}
        format="YYYY-MM-DD"
        style={{ width: 216 }}
        {...rest}
      />
    );
  },
  rangeDateTime: ({ placeholder, ...rest }) => {
    return (
      <RangePicker
        ranges={{
          今天: [moment().startOf('day'), moment().endOf('day')],
          明天: [moment().add(1, 'day').startOf('day'), moment().add(1, 'day').endOf('day')],
          这个星期: [moment().subtract(7, 'day').startOf('day'), moment().endOf('day')],
          这个月: [moment().startOf('month'), moment().endOf('month')],
          下个星期: [moment().add(1, 'day').startOf('day'), moment().add(7, 'day').endOf('day')],
        }}
        showTime={{
          defaultValue: [moment('00:00', 'HH:mm'), moment('23:59', 'HH:mm')],
        }}
        format="YYYY-MM-DD HH:mm"
        style={{ width: 282 }}
        placeholder={['开始时间', '结束时间']}
        {...rest}
      />
    );
  },
  symbol: (props) => {
    return (
      <span style={{ display: 'inline-block', lineHeight: '32px', padding: '0 5px', marginRight: '-12px' }}>
        {props.label || '~'}
      </span>
    );
  },
  dataSelect: (props) => {
    return <DataSelect {...props} style={{ width: '120px' }} />;
  },
};
export default function RenderInputComponent({ inputType = 'input', name, label = '', rules = [], ...rest }: any) {
  const Component = tplMap[inputType];
  let placeholder = ['elect', 'icker'].includes(inputType) ? `请选择${label}` : `请输入${label}`;
  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      noStyle={inputType === 'symbol'}
      valuePropName={inputType === 'checkbox' ? 'checked' : 'value'}
    >
      {Component ? (
        <Component placeholder={placeholder} name={name} {...rest} />
      ) : (
        <span style={{ color: '#999' }}>{`请补充${inputType}组件`}</span>
      )}
    </Form.Item>
  );
}

// export default function RenderInputComponent({ inputType, name, label = '', rules = [], ...rest }: any) {
//   const renderInput = (type: string, props: object) => {
//     let placeholder = `请输入${label}`;
//     switch (inputType) {
//       case 'number':
//         return <InputNumber placeholder={placeholder} {...props} />;
//         break;
//       case 'rangeInputNumber':
//         return <RangeInputNumber placeholder={placeholder} {...props} />;
//         break;
//       case 'select':
//         placeholder = `请选择${label}`;
//         return <AsyncSingleSelector style={{ minWidth: 98 }} placeholder={placeholder} {...props} />;
//         break;
//       case 'multiselect':
//         placeholder = `请选择${label}`;
//         return <AsyncMultiSelector style={{ minWidth: 135 }} placeholder={placeholder} {...props} />;
//         break;
//       case 'autoComplete':
//         placeholder = `请选择${label}`;
//         return <AutoComplete style={{ minWidth: 135 }} placeholder={placeholder} {...props} />;
//         break;
//       case 'treeSelect':
//         placeholder = `请选择${label}`;
//         return (
//           <TreeSelect
//             allowClear
//             // treeDefaultExpandAll
//             dropdownMatchSelectWidth={false}
//             style={{ minWidth: 135 }}
//             treeData={rest.options}
//             placeholder={placeholder}
//             {...props}
//           />
//         );
//         break;
//       case 'checkbox':
//         return <Checkbox {...props} />;
//         break;
//       case 'date':
//         return <DatePicker placeholder={placeholder} {...props} />;
//         break;
//       case 'address':
//         return <CascaderAddress id={name} {...props} />;
//         break;
//       case 'rangeDate':
//         return (
//           <RangePicker
//             ranges={{
//               今天: [moment(), moment()],
//               明天: [moment().add(1, 'day'), moment().add(1, 'day')],
//               这个星期: [moment().subtract(7, 'day'), moment()],
//               这个月: [moment().startOf('month'), moment().endOf('month')],
//               下个星期: [moment().add(1, 'day'), moment().add(7, 'day')],
//             }}
//             format="YYYY-MM-DD"
//             style={{ width: 228 }}
//             {...props}
//           />
//         );
//         break;
//       case 'symbol':
//         return <span style={{ display: 'inline-block', lineHeight: '32px', padding: '0 5px' }}>{label}</span>;
//         break;
//       default:
//         return <Input id={name} placeholder={placeholder} style={{ width: 128 }} {...props} />;
//         break;
//     }
//   };

//   return (
//     <Form.Item
//       name={name}
//       label={label}
//       rules={rules}
//       noStyle={inputType === 'symbol'}
//       valuePropName={inputType === 'checkbox' ? 'checked' : 'value'}
//     >
//       {renderInput(inputType, rest)}
//     </Form.Item>
//   );
// }
