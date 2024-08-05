import { APP_CONFIG } from "@lm_fe/components_m";
export const tableColumns = [
  {
    title: '检查类型',
    dataIndex: 'name',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '检查流水号',
    dataIndex: 'checkupNO',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '检查日期',
    dataIndex: 'jcrq',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '主诉',
    dataIndex: 'name',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '诊断',
    dataIndex: 'telephone',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '诊断编码',
    dataIndex: 'insuranceType',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '检查结果',
    dataIndex: 'nationality',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '处理意见',
    dataIndex: 'note',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '医生',
    dataIndex: 'name',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
];
