import { FormConfig } from '@lm_fe/components_m';
import { otherOptions as Options } from '@lm_fe/env';
const config: Array<FormConfig> = [
  {
    name: 'partnerBg',
    key: '.prenatalExam.partnerBg',
    label: '男方血型',
    input_type: 'select',
    span: 3,
    input_props: { options: Options.aboOptions },
  },
  {
    name: 'partnerRh',
    key: '.prenatalExam.partnerRh',
    label: '',
    input_type: 'select',
    span: 2,
    input_props: { options: Options.rhOptions },
  },
  {
    name: 'partnerThalassemia',
    key: '.prenatalExam.partnerThalassemia(Note)',
    label: '男方地贫',
    input_type: 'checkbox',
    span: 12,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'partnerThalassemia',
          label: '',
          options: Options.dpOptions,
          extraEditors: [
            {
              key: '异常',
              editors: [{ name: '', key: '', label: '', input_type: 'input' }],
            },
            {
              key: '其他',
              editors: [{ name: '', key: '', label: '', input_type: 'input' }],
            },
          ],
        },
      ],
    },
  },
  {
    name: 'personalBg',
    key: '.prenatalExam.personalBg',
    label: '女方血型',
    input_type: 'select',
    span: 3,
    is_new_row: true,
    input_props: { options: Options.aboOptions },
  },
  {
    name: 'personalRh',
    key: '.prenatalExam.personalRh',
    label: '',
    input_type: 'select',
    span: 2,
    input_props: { options: Options.rhOptions },
  },
  {
    name: 'personalThalassemia',
    key: '.prenatalExam.personalThalassemia(Note)',
    label: '女方地贫',
    input_type: 'checkbox',
    span: 12,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'personalThalassemia',
          label: '',
          options: Options.dpOptions,
          extraEditors: [
            {
              key: '异常',
              editors: [{ name: '', key: '', label: '', input_type: 'input' }],
            },
            {
              key: '其他',
              editors: [{ name: '', key: '', label: '', input_type: 'input' }],
            },
          ],
        },
      ],
    },
  },
  {
    name: 'tsh',
    key: '.prenatalExam.tsh',
    label: 'TSH',
    input_type: 'input',
    unit: 'uIU/ml',
    input_props: { type: 'number' },
    span: 5,
    rules: [{ type: 'rang', min: 0.56, max: 5.91 }],
    is_new_row: true,
  },
  {
    name: 't3',
    key: '.prenatalExam.t3',
    label: '游离T3',
    input_type: 'input',
    unit: 'pmol/L',
    input_props: { type: 'number' },
    span: 5,
  },
  {
    name: 't4',
    key: '.prenatalExam.t4',
    label: '游离T4',
    input_type: 'input',
    unit: 'pmol/L',
    input_props: { type: 'number' },
    span: 5,
    rules: [{ type: 'rang', min: 5.92, max: 15.7 }],
  },
  {
    name: 'hb',
    key: '.prenatalExam.hb',
    label: 'HB',
    input_type: 'input',
    unit: 'g/L',
    input_props: { type: 'number' },
    span: 5,
    is_new_row: true,
  },
  {
    name: 'mcv',
    key: '.prenatalExam.mcv',
    label: 'MCV',
    input_type: 'input',
    unit: 'fL',
    input_props: { type: 'number' },
    span: 5,
  },
  {
    name: 'plt',
    key: '.prenatalExam.plt',
    label: 'PLT',
    input_type: 'input',
    unit: 'x10^9/L',
    input_props: { type: 'number' },
    span: 5,
  },

  {
    name: 'hcvResult',
    key: '.prenatalExam.hcvResult(Note)',
    label: '丙肝抗体',
    input_type: 'checkbox',
    span: 24,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'hcvResult',
          label: '',
          options: Options.yywOptions,
          extraEditors: [
            {
              key: 2,
              editors: [{ name: '', key: '', label: '', input_type: 'input' }],
            },
          ],
        },
      ],
    },
  },
  {
    name: 'hcvrnaResult',
    key: '.prenatalExam.hcvrnaResult(Note)',
    label: '丙肝RNA',
    input_type: 'checkbox',
    span: 24,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'hcvrnaResult',
          label: '',
          options: Options.yywOptions,
          extraEditors: [
            {
              key: 2,
              editors: [{ name: '', key: '', label: '', input_type: 'input' }],
            },
          ],
        },
      ],
    },
  },

  {
    name: 'syphilisResult',
    key: '.prenatalExam.syphilisResult(Note)',
    label: '梅毒',
    input_type: 'checkbox',
    span: 24,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'syphilisResult',
          label: '',
          options: Options.yywOptions,
          extraEditors: [
            {
              key: 2,
              editors: [{ name: '', key: '', label: '', input_type: 'input' }],
            },
          ],
          // extraEditors: [
          //   {
          //     key: 2,
          //     editors: [
          //       { name: '', key: 'syphilisExam.trust', label: 'TPPA滴度', input_type: 'input' },
          //       { name: '', key: '', label: 'TRUST滴度', input_type: 'input' },
          //     ],
          //   },
          //   { key: 4, editors: [{ name: '', key: '', label: '', input_type: 'input' }] },
          // ],
        },
      ],
    },
  },

  {
    name: 'hivResult',
    key: '.prenatalExam.hivResult(Note)',
    label: 'HIV',
    input_type: 'checkbox',
    span: 24,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'hivResult',
          label: '',
          options: Options.yywOptions,
          extraEditors: [
            {
              key: 2,
              editors: [{ name: '', key: '', label: '', input_type: 'input' }],
            },
          ],
        },
      ],
    },
  },

  {
    name: 'gbsResult',
    key: '.prenatalExam.gbsResult(Note)',
    label: 'GBS',
    input_type: 'checkbox',
    span: 24,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'gbsResult',
          label: '',
          options: Options.yywOptions,
          extraEditors: [
            {
              key: 2,
              editors: [{ name: '', key: '', label: '', input_type: 'input' }],
            },
          ],
        },
      ],
    },
  },
  {
    name: 'ogttResult',
    key: '.prenatalExam.ogttResult(Note)',
    label: 'OGTT',
    input_type: 'checkbox',
    span: 24,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'ogttResult',
          label: '',
          options: Options.ogttOptions,
          extraEditors: [
            {
              key: 2,
              editors: [{ name: '', key: '', label: '', input_type: 'input' }],
            },
          ],
          // extraEditors: [
          //   {
          //     key: 2,
          //     editors: [
          //       { name: '', key: '', label: '（空腹血糖', input_type: 'input' },
          //       { name: '', key: '', label: '餐后1H血糖', input_type: 'input' },
          //       { name: '', key: '', label: '餐后1H血糖）', input_type: 'input' },
          //     ],
          //   },
          // ],
        },
      ],
    },
  },
];

export default config;
