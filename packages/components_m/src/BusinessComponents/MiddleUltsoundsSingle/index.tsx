import HOC from '../../GeneralComponents/EditInTable';
const tableColumns = [
  {
    title: '孕周',
    dataIndex: 'gestationalWeek',
    align: 'center',
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
