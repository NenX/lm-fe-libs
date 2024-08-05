import { formatDateTime, } from '@lm_fe/utils';
import { MODAL_TEMPLATE_TYPES } from '@lm_fe/env';
import HOC from '../../GeneralComponents/EditInTable';
import { APP_CONFIG } from '../../utils/constants';
const tableColumns = [
  {
    title: '日期',
    dataIndex: 'recordTime',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
    editable: true,
    inputType: 'DateTimeInput',
    inputProps: { showTime: true, format: formatDateTime.format },
    render: formatDateTime,
    // sortType: 'date',
    filterType: 'date',
    showSorter: true,
    defaultSortOrder: 'descend',
    fixed: 'left',
  },
  // {
  //   title: '时间',
  //   dataIndex: 'nurseTime',
  //   inputType: 'single_time_picker',
  //   inputProps: { format: 'HH:mm' },
  //   editable: true,
  //   render: (value: any) => value?.format( 'HH:mm'),
  //   width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  //   sortType: 'date',
  //   filterType: 'date',
  //   // showSorter: true,
  //   // defaultSortOrder: 'descend',
  // },
  {
    title: '催产素浓度(U/500ml)',
    dataIndex: 'concentration',
    editable: true,
    inputType: 'input_number',
    inputProps: { min: 0 },
    //render: (value: any) => value && `${value} mmHg`,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    render: (value: any) => value && value,
  },
  {
    title: '催产素用量(U)',
    dataIndex: 'concentrationCount',
    editable: true,
    inputType: 'input_number',
    inputProps: { min: 0 },
    //render: (value: any) => value && `${value} mmHg`,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    render: (value: any) => value && value,
  },
  {
    title: '滴速(滴/分)',
    dataIndex: 'speed',
    editable: true,
    inputType: 'input_number',
    inputProps: { min: 0 },
    //render: (value: any) => value && `${value} mmHg`,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    render: (value: any) => value && value,
  },
  {
    title: '宫缩持续(秒)',
    dataIndex: 'cerShrinkPersist',
    editable: true,
    inputType: 'input_number',
    inputProps: { min: 0 },
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    render: (value: any) => value && value,
  },
  {
    title: '宫缩间隔(分)',
    dataIndex: 'cerShrinkCycle',
    editable: true,
    inputType: 'input_number',
    inputProps: { min: 0 },
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    render: (value: any) => value && value,
  },
  {
    title: '胎心(bpm)',
    dataIndex: 'fetalHeart',
    editable: true,
    inputType: 'input_number',
    inputProps: { min: 0 },
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    render: (value: any) => value && value,
  },
  {
    title: '宫口扩张(cm)',
    dataIndex: 'cervixDilatation',
    editable: true,
    inputType: 'input_number',
    inputProps: { min: 0 },
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    render: (value: any) => value && value,
  },
  {
    title: '先露高低(cm)',
    dataIndex: 'fetalPresentationPosition',
    editable: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    inputType: 'MyAutoComplete',
    inputProps: {
      options: [
        '-5', '-4', '-3', '-2', '-1', '0', '+1', '+2', '+3', '+4', '+5',
      ],
    },
  },
  {
    title: '收缩压(mmHg)',
    dataIndex: 'systolicPressure',
    editable: true,
    inputType: 'input_number',
    inputProps: { min: 0 },
    //render: (value: any) => value && `${value} mmHg`,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    render: (value: any) =>
      value &&
      (value > 130 ? (
        <div style={{ color: 'red' }}>{value}</div>
      ) : value < 90 ? (
        <div style={{ color: 'red' }}>{value}</div>
      ) : (
        `${value}`
      )),
  },
  {
    title: '舒张压(mmHg)',
    dataIndex: 'diastolicPressure',
    editable: true,
    inputType: 'input_number',
    inputProps: { min: 0 },
    //render: (value: any) => value && `${value} mmHg`,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    render: (value: any) =>
      value &&
      (value > 90 ? (
        <div style={{ color: 'red' }}>{value}</div>
      ) : value < 60 ? (
        <div style={{ color: 'red' }}>{value}</div>
      ) : (
        `${value}`
      )),
  },
  {
    title: '特殊记录',
    dataIndex: 'note',
    editable: true,
    inputType: 'TextArea',
    inputProps: { type: MODAL_TEMPLATE_TYPES.产前产后, isPop: true, rows: 10 },

    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '签名/审签',
    dataIndex: 'signer',
    inputType: 'TextArea',
    inputProps: { type: MODAL_TEMPLATE_TYPES.科室个人, isPop: true, rows: 10 },
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
];
export default HOC({ tableColumns });
