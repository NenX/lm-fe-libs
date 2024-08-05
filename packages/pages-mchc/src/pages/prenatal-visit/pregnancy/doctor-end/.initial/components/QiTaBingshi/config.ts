import { FormConfig } from '@lm_fe/components_m';
import { otherOptions as Options } from '@lm_fe/env';

const config: Array<FormConfig> = [
  {
    name: 'menarche',
    key: '.menstrualHistory.menarche',
    label: '初潮',
    input_type: 'input',
    span: 5,
    rules: [{ required: true }],
    unit: '岁',
    input_props: { type: 'number' },
  },
  {
    name: 'menstrualCycle',
    key: '.menstrualHistory.menstrualCycle',
    label: '周期',
    input_type: 'input',
    span: 5,
    rules: [{ required: true }],
    unit: '天',
    input_props: { type: 'number' },
  },
  {
    name: 'menstrualPeriod',
    key: '.menstrualHistory.menstrualPeriod',
    label: '持续天数',
    input_type: 'input',
    span: 5,
    rules: [{ required: true }],
    unit: '天',
    input_props: { type: 'number' },
  },
  {
    name: 'dysmenorrhea',
    key: '.menstrualHistory.dysmenorrhea',
    label: '痛经',
    input_type: 'checkbox',
    span: 7,
    rules: [{ required: true }],
    input_props: {
      type: 'group',
      options: Options.nhOptions,
    },
  },
  {
    name: 'maritalStatus',
    key: '.maritalStatus',
    label: '婚姻史',
    input_type: 'checkbox',
    span: 10,
    rules: [{ required: true }],
    input_props: {
      type: 'group',
      options: Options.maritalStatusOptions,
    },
  },
  {
    name: 'maritalYears',
    key: '.maritalYears',
    label: '本次结婚年龄',
    input_type: 'input',
    span: 5,
    rules: [{ required: true }],
    unit: '岁',
    input_props: { type: 'number' },
  },
  {
    name: 'nearRelation',
    key: '.nearRelation',
    label: '近亲结婚',
    input_type: 'checkbox',
    span: 7,
    rules: [{ required: true }],
    input_props: {
      type: 'group',
      options: Options.nyOptions,
    },
  },

  { name: '', key: '', label: '个人史', header_label: true, just_header: true, input_type: '' },
  {
    name: 'smoke',
    key: '.personalProfile.smoke(Note)',
    label: '吸烟',
    input_type: 'checkbox',
    span: 18,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      inputNeedFillWidth: true,
      renderData: [
        {
          key: 'smoke',
          label: '',
          options: Options.nhOptions,
          extraEditors: [
            {
              key: true,
              editors: [{ name: '', key: '', label: '', input_type: 'input' }],
            },
          ],
        },
      ],
    },
  },
  {
    name: 'alcohol',
    key: '.personalProfile.alcohol(Note)',
    label: '饮酒',
    input_type: 'checkbox',
    span: 18,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      inputNeedFillWidth: true,
      renderData: [
        {
          key: 'alcohol',
          label: '',
          options: Options.nhOptions,
          extraEditors: [
            {
              key: true,
              editors: [{ name: '', key: '', label: '', input_type: 'input' }],
            },
          ],
        },
      ],
    },
  },
  {
    name: 'hazardoussubstances',
    key: '.personalProfile.hazardoussubstances(Note)',
    label: '接触有害物质',
    input_type: 'checkbox',
    span: 18,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      inputNeedFillWidth: true,
      renderData: [
        {
          key: 'hazardoussubstances',
          label: '',
          options: Options.nhOptions,
          extraEditors: [
            {
              key: true,
              editors: [{ name: '', key: '', label: '', input_type: 'input' }],
            },
          ],
        },
      ],
    },
  },
  {
    name: 'radioactivity',
    key: '.personalProfile.radioactivity(Note)',
    label: '接触放射线',
    input_type: 'checkbox',
    span: 18,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      inputNeedFillWidth: true,
      renderData: [
        {
          key: 'radioactivity',
          label: '',
          options: Options.nhOptions,
          extraEditors: [
            {
              key: true,
              editors: [{ name: '', key: '', label: '', input_type: 'input' }],
            },
          ],
        },
      ],
    },
  },
  {
    name: 'personalProfileOther',
    key: '.personalProfile.other(Note)',
    label: '其他',
    input_type: 'checkbox',
    span: 18,
    input_props: {
      type: 'custom',
      inputNeedFillWidth: true,
      renderData: [
        {
          key: 'other',
          label: '',
          options: Options.nhOptions,
          extraEditors: [
            {
              key: true,
              editors: [{ name: '', key: '', label: '', input_type: 'input' }],
            },
          ],
        },
      ],
    },
  },

  { name: '', key: '', label: '家族史', header_label: true, just_header: true, input_type: '' },
  {
    name: 'hypertension',
    key: '.familyHistory.hypertension(Note)',
    label: '高血压',
    input_type: 'checkbox',
    span: 18,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      inputNeedFillWidth: true,
      renderData: [
        {
          key: 'hypertension',
          label: '',
          options: Options.nhOptions,
          extraEditors: [
            {
              key: true,
              editors: [{ name: '', key: '', label: '', input_type: 'input' }],
            },
          ],
        },
      ],
    },
  },
  {
    name: 'diabetes',
    key: '.familyHistory.diabetes(Note)',
    label: '糖尿病',
    input_type: 'checkbox',
    span: 18,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      inputNeedFillWidth: true,
      renderData: [
        {
          key: 'diabetes',
          label: '',
          options: Options.nhOptions,
          extraEditors: [
            {
              key: true,
              editors: [{ name: '', key: '', label: '', input_type: 'input' }],
            },
          ],
        },
      ],
    },
  },
  {
    name: 'birthdefects',
    key: '.familyHistory.birthdefects(Note)',
    label: '先天畸形',
    input_type: 'checkbox',
    span: 18,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      inputNeedFillWidth: true,
      renderData: [
        {
          key: 'birthdefects',
          label: '',
          options: Options.nhOptions,
          extraEditors: [
            {
              key: true,
              editors: [{ name: '', key: '', label: '', input_type: 'input' }],
            },
          ],
        },
      ],
    },
  },
  {
    name: 'familyHistoryOther',
    key: '.familyHistory.other(Note)',
    label: '其他',
    input_type: 'checkbox',
    span: 18,
    input_props: {
      type: 'custom',
      inputNeedFillWidth: true,
      renderData: [
        {
          key: 'other',
          label: '',
          options: Options.nhOptions,
          extraEditors: [
            {
              key: true,
              editors: [{ name: '', key: '', label: '', input_type: 'input' }],
            },
          ],
        },
      ],
    },
  },
];

export default config;
