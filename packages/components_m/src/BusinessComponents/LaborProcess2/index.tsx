// import BaseFormComponent from '../../BaseFormComponent';
// import { Col, Form, Row } from 'antd';
// import { get, isEmpty } from 'lodash';
// import { Component } from 'react';
// import { safe_json_parse } from '@lm_fe/utils';
// import { ArrayInput, HourMinuteInput } from '../../FU_components';

// interface IProps {
//   label: string;
//   name?: string;
//   value?: string;
//   inputType?: string;
//   labelSpan?: Number;
//   wrapperSpan?: Number;
//   inputProps?: object;
// }

// export default class LaborProcess2 extends Component {
//   state = {
//     firstProcess: undefined,
//     sumProcess: undefined,
//     secondAndThirdProcess: [
//       {
//         key: Math.random(),
//         secondProcess: undefined,
//         thridProcess: undefined,
//       },
//     ],
//   };

//   componentDidMount() {
//     const { secondAndThirdProcess } = this.state;

//     const { value } = this.props;
//     const _value = typeof value === 'string' ? safe_json_parse(value, {}) : value
//     if (!isEmpty(_value)) {
//       if (!isEmpty(_value.fetus2Secondstage) || !isEmpty(_value.fetus2Thirdstage)) {
//         secondAndThirdProcess.push({
//           key: Math.random(),
//           secondProcess: undefined,
//           thridProcess: undefined,
//         });
//       }
//       if (!isEmpty(_value.fetus3Secondstage) || !isEmpty(_value.fetus3Thirdstage)) {
//         secondAndThirdProcess.push({
//           key: Math.random(),
//           secondProcess: undefined,
//           thridProcess: undefined,
//         });
//       }
//       if (!isEmpty(_value.fetus4Secondstage) || !isEmpty(_value.fetus4Thirdstage)) {
//         secondAndThirdProcess.push({
//           key: Math.random(),
//           secondProcess: undefined,
//           thridProcess: undefined,
//         });
//       }
//       if (!isEmpty(_value.fetus5Secondstage) || !isEmpty(_value.fetus5Thirdstage)) {
//         secondAndThirdProcess.push({
//           key: Math.random(),
//           secondProcess: undefined,
//           thridProcess: undefined,
//         });
//       }
//       if (!isEmpty(_value.fetus6Secondstage) || !isEmpty(_value.fetus6Thirdstage)) {
//         secondAndThirdProcess.push({
//           key: Math.random(),
//           secondProcess: undefined,
//           thridProcess: undefined,
//         });
//       }
//     }
//     this.setState({ secondAndThirdProcess });
//   }

//   handleAdd = () => {
//     const { secondAndThirdProcess } = this.state;
//     this.setState({
//       secondAndThirdProcess: [
//         ...secondAndThirdProcess,
//         {
//           key: Math.random(),
//           secondProcess: undefined,
//           thridProcess: undefined,
//         },
//       ],
//     });
//   };

//   renderFieldItem = ({ name, label, labelSpan = 12, wrapperSpan = 12, }: IProps) => {
//     return (

//       <Form.Item
//         label={label}
//         name={name}
//         labelCol={{ span: 12 }}
//         wrapperCol={{ span: 12 }}
//       >
//         <HourMinuteInput />

//       </Form.Item>
//       // <Row className="nurse-children__field">
//       //   <Col className="nurse-children__field-label" span={labelSpan}>
//       //     <span>{label}：</span>
//       //   </Col>
//       //   <Col className="nurse-children__field-input" span={wrapperSpan}>

//       //     <HourMinuteInput />

//       //   </Col>
//       // </Row>
//     );
//   };
//   handleChange = (e: any, name: any) => {
//     const { onChange, value } = this.props as any;
//     let changedValue = e;

//     if (changedValue?.indexOf?.('{') > -1) {
//       changedValue = JSON.parse(changedValue);
//       const arr = [get(changedValue, '0'), get(changedValue, '1')];
//       changedValue = arr;
//     }
//     const _value = typeof value === 'string' ? safe_json_parse(value, {}) : value

//     const data = {
//       ..._value,
//       [name]: changedValue,
//     }
//     console.log('??', changedValue, data)

//     onChange?.(JSON.stringify(data));
//   }


//   render() {
//     const { secondAndThirdProcess } = this.state;
//     const { value } = this.props;
//     const _value = typeof value === 'string' ? safe_json_parse(value, {}) : value
//     return (
//       <div className="base-edit-panel-form_section border" style={{ margin: '16px 23px' }}>
//         <span className="base-edit-panel-form_section_title">产程经过</span>
//         <Row>
//           <Col span={9}>
//             {this.renderFieldItem({
//               label: '第一产程',
//               inputType: 'multiple_input_with_label',
//               name: 'firststage',
//               value: get(_value, 'firststage'),
//               inputProps: {
//                 config: {
//                   special_config: JSON.stringify({
//                     type: 'number',
//                     options: [
//                       { min: 0, labelBefore: '', labelAfter: '时', maxValue: 15 },
//                       { min: 0, max: 59, labelBefore: '', labelAfter: '分' },
//                     ],
//                   }),
//                 },
//               },
//             })}
//           </Col>
//           <Col span={9}>
//             {this.renderFieldItem({
//               label: '第二产程',
//               inputType: 'multiple_input_with_label',
//               name: 'secondstage',
//               value: get(_value, 'secondstage'),
//               inputProps: {
//                 config: {
//                   special_config: JSON.stringify({
//                     type: 'number',
//                     options: [
//                       { min: 0, labelBefore: '', labelAfter: '时', maxValue: 2 },
//                       { min: 0, max: 59, labelBefore: '', labelAfter: '分' },
//                     ],
//                   }),
//                 },
//               },
//             })}
//           </Col>
//         </Row>

//         <Row style={{ alignItems: 'center' }}>
//           <Col span={9}>
//             {this.renderFieldItem({
//               label: '第三产程',
//               inputType: 'multiple_input_with_label',
//               name: 'thirdstage',
//               value: get(_value, 'thirdstage'),
//               inputProps: {
//                 config: {
//                   special_config: JSON.stringify({
//                     type: 'number',
//                     options: [
//                       { min: 0, labelBefore: '', labelAfter: '时', maxValue: 0 },
//                       { min: 0, max: 59, labelBefore: '', labelAfter: '分', maxValue: 29 },
//                     ],
//                   }),
//                 },
//               },
//             })}
//           </Col>
//           <Col span={9}>
//             {this.renderFieldItem({
//               label: '总产程',
//               inputType: 'multiple_input_with_label',
//               name: 'totalstage',
//               value: get(_value, 'totalstage'),
//               inputProps: {
//                 config: {
//                   special_config: JSON.stringify({
//                     type: 'number',
//                     options: [
//                       { labelBefore: '', labelAfter: '时' },
//                       { labelBefore: '', labelAfter: '分' },
//                     ],
//                   }),
//                 },
//               },
//             })}
//           </Col>
//         </Row>

//       </div>
//     );
//   }
// }
