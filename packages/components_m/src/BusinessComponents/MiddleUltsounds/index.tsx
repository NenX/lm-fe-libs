import HOC from '../../GeneralComponents/EditInTable';
const tableColumns = [
  {
    title: '孕周',
    dataIndex: 'gestationalWeek',
    align: 'center',
    editable: true,
  },
  {
    title: '胎儿',
    dataIndex: 'fetal',
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
    title: 'BPD(mm)',
    dataIndex: 'bpd',
    align: 'center',
    editable: true,
  },
  {
    title: 'HC(mm)',
    dataIndex: 'hc',
    align: 'center',
    editable: true,
  },
  {
    title: 'AC(mm)',
    dataIndex: 'ac',
    align: 'center',
    editable: true,
  },
  {
    title: 'FL(mm)',
    dataIndex: 'fl',
    align: 'center',
    editable: true,
  },
  {
    title: 'AFV(mm)',
    dataIndex: 'afv',
    align: 'center',
    editable: true,
  },
  {
    title: '脐血流',
    dataIndex: 'ubf',
    align: 'center',
    editable: true,
  },
  {
    title: '其他异常描述',
    dataIndex: 'note',
    align: 'center',
    editable: true,
  },
];
export default HOC({ tableColumns });
