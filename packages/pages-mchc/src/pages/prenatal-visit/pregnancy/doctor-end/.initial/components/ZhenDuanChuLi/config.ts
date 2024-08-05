import { FormConfig } from '@lm_fe/components_m';
import { otherOptions as Options } from '@lm_fe/env';

const config: Array<FormConfig> = [
  {
    name: 'prescription',
    key: '.prescription',
    label: '处理措施',
    input_type: 'input',
    span: 24,
    input_props: { type: 'textarea' },
  },
  {
    name: 'template',
    key: '',
    label: '模板',
    input_type: 'button',
    span: 24,
    input_props: { btn_text: ['糖尿病日间门诊', '更多'] },
  },
  {
    name: 'appointmentType',
    key: '.appointmentType',
    label: '下次复诊',
    input_type: 'select',
    span: 8,
    input_props: { options: Options.appointmentTypeOptions },
  },
  {
    name: 'appointmentWeek',
    key: '.appointmentWeek',
    label: '',
    input_type: 'select',
    span: 3,
    input_props: {
      options: Options.appointmentCycleOptions,
    },
  },
  {
    name: 'appointmentDate',
    key: '.appointmentDate',
    label: '',
    input_type: 'date',
    span: 4,
    rules: [{ required: true }],
  },
  {
    name: 'appointmentPeriod',
    key: '.appointmentPeriod',
    label: '',
    input_type: 'select',
    span: 3,
    input_props: { options: Options.appointmentPeriodOptions },
  },
  { name: 'visitDate', key: '.visitDate', label: '初诊日期', input_type: 'date', span: 8, is_new_row: true },
  { name: 'doctorName', key: '.doctor.name', label: '初诊医生', input_type: 'input', span: 8 },
];

export default config;
