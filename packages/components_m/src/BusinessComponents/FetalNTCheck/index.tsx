import HOC from '../../GeneralComponents/EditInTable';
const tableColumns = [
  {
    title: '胎儿位置',
    dataIndex: 'placentalocation',
    align: 'center',
    inputType: 'select_with_options_or_input',
    inputProps: {
      options: [
        {
          label: '上',
          value: '上',
        },
        {
          label: '下',
          value: '下',
        },
        {
          label: '左',
          value: '左',
        },
        {
          label: '右',
          value: '右',
        },
        {
          label: '左上',
          value: '左上',
        },
        {
          label: '左下',
          value: '左下',
        },
        {
          label: '右上',
          value: '右上',
        },
        {
          label: '右下',
          value: '右下',
        },
      ],
    },
    editable: true,
  },
  {
    title: 'CRL',
    dataIndex: 'crl',
    align: 'center',
    editable: true,
  },
  {
    title: 'NT',
    dataIndex: 'nt',
    align: 'center',
    editable: true,
  },
];
export default HOC({ tableColumns });
