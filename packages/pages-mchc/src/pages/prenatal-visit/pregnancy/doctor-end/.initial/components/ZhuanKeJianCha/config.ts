import { FormConfig } from '@lm_fe/components_m';
import { otherOptions as Options } from '@lm_fe/env';

const config: Array<FormConfig> = [
  {
    name: 'fetuses',
    key: '.fetuses',
    label: '胎儿信息',
    input_type: 'array-custom',
    header_label: true,
    input_props: {
      array_title: '胎儿',
      config: [
        { name: 'id', key: '.id', label: 'id', input_type: 'input', hidden: true, span: 5 },
        {
          name: 'fetalHeartRate',
          key: '.fetalHeartRate',
          label: '胎心率',
          input_type: 'input',
          span: 5,
          unit: 'bpm',
        },
        {
          name: 'presentation',
          key: '.presentation',
          label: '先露',
          input_type: 'select',
          span: 5,
          input_props: { options: Options.presentationOptions },
        },
        {
          name: 'fetalPosition',
          key: '.fetalPosition',
          label: '位置',
          input_type: 'select',
          span: 5,
          input_props: { options: Options.positonOptions },
        },
      ],
    },
  },

  { name: '', key: '', label: '妇科检查', header_label: true, just_header: true, input_type: '' },
  { name: 'fundalHeight', key: '.gynecologicalExam.fundalHeight', label: '宫高', input_type: 'input', span: 5 },
  {
    name: 'vulva',
    key: '.gynecologicalExam.vulva',
    label: '外阴',
    input_type: 'autoComplete',
    span: 5,
    input_props: { options: Options.wjycOptions },
  },
  {
    name: 'vagina',
    key: '.gynecologicalExam.vagina',
    label: '阴道',
    input_type: 'autoComplete',
    span: 5,
    input_props: { options: Options.wjycOptions },
  },
  {
    name: 'cervix',
    key: '.gynecologicalExam.cervix',
    label: '宫颈',
    input_type: 'autoComplete',
    span: 5,
    input_props: { options: Options.wjycOptions },
  },
  {
    name: 'uterus',
    key: '.gynecologicalExam.uterus',
    label: '子宫',
    input_type: 'autoComplete',
    span: 5,
    input_props: { options: Options.wjycOptions },
  },
  {
    name: 'adnexa',
    key: '.gynecologicalExam.adnexa',
    label: '附件',
    input_type: 'autoComplete',
    span: 5,
    input_props: { options: Options.wjycOptions },
  },
];

export default config;
