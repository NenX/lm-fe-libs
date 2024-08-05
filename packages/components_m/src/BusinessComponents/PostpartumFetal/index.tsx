import HOC from '../../GeneralComponents/EditInTable';
const tableColumns = [
  {
    title: '新生儿',
    dataIndex: 'name',
    align: 'center',
    inputType: 'select_with_options_or_input',
    inputProps: {
      options: [
        {
          label: '单胎',
          value: '单胎',
        },
        {
          label: 'F1',
          value: 'F1',
        },
        {
          label: 'F2',
          value: 'F2',
        },
        {
          label: 'F3',
          value: 'F3',
        },
        {
          label: 'F4',
          value: 'F4',
        },
      ],
    },
    editable: true,
  },
  {
    title: '分娩孕周',
    dataIndex: 'deliveryGestationalWeek',
    align: 'center',
    editable: true,
  },
  {
    title: '分娩日期',
    dataIndex: 'deliveryDate',
    inputType: 'single_date_picker',
    align: 'center',
    editable: true,
  },
  {
    title: '分娩方式',
    dataIndex: 'deliveryModeNote',
    inputType: 'select_with_options_or_input',
    inputProps: {
      options: [
        {
          label: '阴道产',
          value: '阴道产',
        },
        {
          label: '剖宫产',
          value: '剖宫产',
        },
        {
          label: '引产',
          value: '引产',
        },
        {
          label: '流产',
          value: '流产',
        },
      ],
    },
    align: 'center',
    editable: true,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    inputType: 'select_with_options',
    inputProps: {
      options: [
        {
          label: '男',
          value: 1,
        },
        {
          label: '女',
          value: 2,
        },
        {
          label: '不详',
          value: 3,
        },
      ],
    },
    align: 'center',
    editable: true,
  },
  {
    title: '体重(kg)',
    dataIndex: 'neonateWeight',
    inputType: 'input_number',
    align: 'center',
    editable: true,
  },
  {
    title: '身长(cm)',
    dataIndex: 'neonateHeight',
    inputType: 'input_number',
    align: 'center',
    editable: true,
  },
  {
    title: '并发症',
    dataIndex: 'complicationNote',
    inputType: 'select_with_options_or_input',
    inputProps: {
      options: [
        {
          label: '无',
          value: '无',
        },
      ],
    },
    align: 'center',
    editable: true,
  },
  {
    title: '筛查结果',
    dataIndex: 'screenResult',
    align: 'center',
    editable: true,
  },
  {
    title: '复查结果',
    dataIndex: 'reviewResult',
    align: 'center',
    editable: true,
  },
  {
    title: '其他',
    dataIndex: 'fetusOther',
    align: 'center',
    editable: true,
  },
];
export default HOC({ tableColumns });
