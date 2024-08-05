import { FormConfig } from '@lm_fe/components_m';
import { otherOptions as Options } from '@lm_fe/env';

const config: Array<FormConfig> = [
  { name: '', key: 'basic-medical', label: '基本体检', header_label: true, just_header: true, input_type: '' },
  {
    name: 'bloodPressure',
    key: '.physicalExam.systolic+diastolic',
    input_type: 'bloodPressureInput',
    label: '血压-首测',
    unit: 'mmHg',
    span: 6,
    rules: [{ required: true }],
  },
  {
    name: 'bloodPressure2',
    key: '.physicalExam.systolic2+diastolic2',
    input_type: 'bloodPressureInput',
    label: '血压-二测',
    unit: 'mmHg',
    span: 6,
  },
  {
    name: 'bloodPressure3',
    key: '.physicalExam.systolic3+diastolic3',
    input_type: 'bloodPressureInput',
    label: '血压-三测',
    unit: 'mmHg',
    span: 6,
  },
  {
    name: 'pulse',
    key: '.physicalExam.pulse',
    label: '脉搏',
    input_type: 'input',
    unit: '次/分',
    span: 6,
    rules: [
      {
        required: true,
      },
      {
        type: 'rang',
        min: 60,
        max: 100,
      },
    ],
    input_props: { type: 'number' },
  },
  {
    name: 'personalProfile.preheight',
    key: '.personalProfile.preheight',
    label: '身高',
    input_type: 'input',
    unit: 'cm',
    span: 6,
    rules: [{ required: true }],
    input_props: { type: 'number' },
  },
  {
    name: 'personalProfile.preweight',
    key: '.personalProfile.preweight',
    label: '孕前体重',
    input_type: 'input',
    unit: 'kg',
    span: 6,
    rules: [{ required: true }],
    input_props: { type: 'number' },
  },

  {
    name: 'weight',
    key: '.physicalExam.weight',
    label: '现体重',
    input_type: 'input',
    unit: 'kg',
    span: 6,
    rules: [{ required: true }],
    input_props: { type: 'number' },
  },
  {
    name: 'personalProfile.bmi',
    key: '.personalProfile.bmi',
    label: '孕前BMI',
    input_type: 'input',
    span: 6,
    rules: [
      { required: true },
      {
        type: 'rang',
        min: 18.5,
        max: 24.9,
      },
    ],
    input_props: { type: 'number' },
  },

  { name: '', key: 'physical-examination', label: '内科检查', header_label: true, just_header: true, input_type: '' },
  {
    name: 'heartrate',
    key: '.generalExam.heartrate',
    label: '心率',
    input_type: 'input',
    unit: '次/分',
    span: 6,
    rules: [
      {
        required: true,
      },
      {
        type: 'rang',
        min: 60,
        max: 100,
      },
    ],
    input_props: { type: 'number' },
  },
  {
    name: 'skin',
    key: '.generalExam.skin(Note)',
    label: '皮肤黏膜',
    input_type: 'checkbox',
    span: 8,
    rules: [{ required: true }],
    offset: 2,
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'skin',
          label: '',
          options: Options.zqOptions,
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
    name: 'thyroid',
    key: '.generalExam.thyroid(Note)',
    label: '甲状腺',
    input_type: 'checkbox',
    span: 8,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'thyroid',
          label: '',
          options: Options.zqOptions,
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
    name: 'nipple',
    key: '.generalExam.nipple(Note)',
    label: '乳房乳腺',
    input_type: 'checkbox',
    span: 8,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'nipple',
          label: '',
          options: Options.zqOptions,
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
    name: 'respiratory',
    key: '.generalExam.respiratory(Note)',
    label: '呼吸音',
    input_type: 'checkbox',
    span: 8,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'respiratory',
          label: '',
          options: Options.zqOptions,
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
    name: 'rales',
    key: '.generalExam.rales(Note)',
    label: '啰音',
    input_type: 'checkbox',
    span: 8,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'rales',
          label: '',
          options: Options.nhiOptions,
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
    name: 'heartrhythm',
    key: '.generalExam.heartrhythm(Note)',
    label: '心律',
    input_type: 'checkbox',
    span: 8,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'heartrhythm',
          label: '',
          options: Options.rhythmOptions,
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
    name: 'murmurs',
    key: '.generalExam.murmurs(Note)',
    label: '杂音',
    input_type: 'checkbox',
    span: 8,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'murmurs',
          label: '',
          options: Options.nhiOptions,
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
    name: 'liver',
    key: '.generalExam.liver(Note)',
    label: '肝脏',
    input_type: 'checkbox',
    span: 8,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'liver',
          label: '',
          options: Options.liverOptions,
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
    name: 'spleen',
    key: '.generalExam.spleen(Note)',
    label: '脾脏',
    input_type: 'checkbox',
    span: 8,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'spleen',
          label: '',
          options: Options.liverOptions,
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
    name: 'spine',
    key: '.generalExam.spine(Note)',
    label: '脊柱',
    input_type: 'checkbox',
    span: 8,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'spine',
          label: '',
          options: Options.zqOptions,
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
    name: 'physiologicalreflection',
    key: '.generalExam.physiologicalreflection(Note)',
    label: '生理反射',
    input_type: 'checkbox',
    span: 8,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'physiologicalreflection',
          label: '',
          options: Options.zqOptions,
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
    name: 'pathologicalreflection',
    key: '.generalExam.pathologicalreflection(Note)',
    label: '病理反射',
    input_type: 'checkbox',
    span: 8,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'pathologicalreflection',
          label: '',
          options: Options.nhiOptions,
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
    name: 'edema',
    key: '.generalExam.edema(Note)',
    label: '下肢水肿',
    input_type: 'checkbox',
    span: 12,
    rules: [{ required: true }],
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'edema',
          label: '',
          options: Options.edemaOptions,
        },
      ],
    },
  },
];

export default config;
