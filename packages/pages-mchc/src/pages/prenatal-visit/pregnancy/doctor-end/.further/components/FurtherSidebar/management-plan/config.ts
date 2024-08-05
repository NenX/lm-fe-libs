import { FormConfig } from "@lm_fe/components_m";

export const config: Array<FormConfig> = [
  {
    name: 'plan',
    key: '.*',
    label: '',
    input_type: 'prenatalReturnTable',
    input_props: {
      editable: true,
      hiddenSelection: true,
      tableColumns: [
        {
          key: 'no',
          title: '编号',
          width: 10,
          editor: { name: '', key: '', input_type: 'input', unEditable: false },
          render: (value, rowData, index) => index + 1,
        },
        {
          key: 'gestationalWeek',
          title: '孕周',
          width: 20,
          editor: { name: '', key: '', input_type: 'input', input_props: { type: 'number' }, max: 42 },
        },
        {
          key: 'remind',
          title: '提醒事件',
          width: 100,
          editor: { name: '', key: '', input_type: 'input' },
        },
      ],
    },
  },
];
