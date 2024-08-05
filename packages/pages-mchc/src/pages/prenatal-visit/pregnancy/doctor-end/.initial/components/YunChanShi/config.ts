import { FormConfig } from '@lm_fe/components_m';
import { otherOptions as Options } from '@lm_fe/env';

const config: Array<FormConfig> = [
  {
    name: 'pregnancyHistories',
    key: '.pregnancyHistories',
    label: '',
    input_type: 'pregnancyHistoryTable',
    input_props: {
      ignoreKeys: [
        'children.childGender',
        'children.childLiving',
        'children.childDeathTime',
        'children.childDeathNote',
        'children.sequelaNote',
        'children.neonateWeight',
      ],
      tableColumns: [
        {
          key: 'gravidityindex',
          title: '孕次',
          width: 30,
          editor: { name: '', key: '', input_type: 'input', unEditable: true },
        },
        { key: 'year', title: '年-月', width: 50, editor: { name: '', key: '', input_type: 'filterDateInput' } },
        {
          title: '流产',
          children: [
            {
              key: 'naturalAbortion',
              title: '自然',
              width: 30,
              editor: { name: '', key: '', input_type: 'checkbox', input_props: { type: 'default' } },
            },
            {
              key: 'medicalAbortion',
              title: '药物',
              width: 30,
              editor: { name: '', key: '', input_type: 'checkbox', input_props: { type: 'default' } },
            },
            {
              key: 'surgicalAbortion',
              title: '人工',
              width: 30,
              editor: { name: '', key: '', input_type: 'checkbox', input_props: { type: 'default' } },
            },
            {
              key: 'currettage',
              title: '清宫',
              width: 30,
              editor: { name: '', key: '', input_type: 'checkbox', input_props: { type: 'default' } },
            },
          ],
        },
        {
          key: 'inducedLabor',
          title: '引产',
          width: 30,
          editor: { name: '', key: '', input_type: 'checkbox', input_props: { type: 'default' } },
        },
        {
          key: 'fetusdeath',
          title: '死胎',
          width: 30,
          editor: { name: '', key: '', input_type: 'checkbox', input_props: { type: 'default' } },
        },
        {
          key: 'preterm',
          title: '早产',
          width: 30,
          editor: { name: '', key: '', input_type: 'checkbox', input_props: { type: 'default' } },
        },
        {
          key: 'term',
          title: '足月产',
          width: 40,
          editor: { name: '', key: '', input_type: 'checkbox', input_props: { type: 'default' } },
        },
        {
          title: '分娩方式',
          children: [
            {
              key: 'vaginalDelivery',
              title: '顺产',
              width: 30,
              editor: { name: '', key: '', input_type: 'checkbox', input_props: { type: 'default' } },
            },
            {
              key: 'operationType',
              title: '手术产式',
              width: 50,
              editor: { name: '', key: '', input_type: 'select', input_props: { options: Options.operationOptions } },
            },
          ],
        },
        {
          title: '产后情况',
          children: [
            {
              key: 'hemorrhage',
              title: '出血',
              width: 30,
              editor: { name: '', key: '', input_type: 'checkbox', input_props: { type: 'default' } },
            },
            {
              key: 'puerperalFever',
              title: '产褥热',
              width: 40,
              editor: { name: '', key: '', input_type: 'checkbox', input_props: { type: 'default' } },
            },
          ],
        },
        {
          key: 'gestationalWeek',
          title: '孕周',
          width: 40,
          editor: { name: '', key: '', input_type: 'input' },
        },
        {
          key: 'fetalcount',
          title: '胎数',
          width: 35,
          editor: { name: '', key: '', input_type: 'input', input_props: { type: 'number' } },
        },
        {
          title: '小孩情况',
          children: [
            {
              key: 'children.childGender',
              title: '性别',
              width: 30,
              editor: { name: '', key: '', input_type: 'select', input_props: { options: Options.genderOptions } },
            },
            {
              key: 'children.childLiving',
              title: '生存',
              width: 30,
              editor: { name: '', key: '', input_type: 'select', input_props: { options: Options.livingOptions } },
            },
            {
              key: 'children.childDeathTime',
              width: 100,
              title: '死亡时间',
              editor: { name: '', key: '', input_type: 'filterDateInput' },
            },
            {
              key: 'children.childDeathNote',
              width: 100,
              title: '死亡原因',
              editor: { name: '', key: '', input_type: 'input' },
            },
            {
              key: 'children.sequelaNote',
              title: '后遗症',
              width: 30,
              editor: { name: '', key: '', input_type: 'input' },
            },
            {
              key: 'children.neonateWeight',
              title: '出生体重(kg)',
              width: 60,
              editor: { name: '', key: '', input_type: 'input', input_props: { type: 'number' } },
            },
          ],
        },
        { key: 'hospital', title: '分娩医院', width: 80, editor: { name: '', key: '', input_type: 'input' } },
        { key: 'exceptionalcase', title: '特殊情况', width: 200, editor: { name: '', key: '', input_type: 'input' } },
      ],
    },
  },
];

export default config;
