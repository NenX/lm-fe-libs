import { APP_CONFIG } from "@lm_fe/components_m"
export const tableColumns = [
  {
    title: '门诊号',
    dataIndex: 'outpatientNO',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    ellipsis: true,
  },
  {
    title: '检查编号',
    dataIndex: 'checkupNO',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    ellipsis: true,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 86,
    ellipsis: true,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 42,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 42,
  },
  {
    title: '出生日期',
    dataIndex: 'dob',
    width: APP_CONFIG.CELL_WIDTH_SMALL - 10,
  },
  {
    title: '证件类型',
    dataIndex: 'idType',
    width: 80,
  },
  {
    title: '证件号码',
    dataIndex: 'idNO',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE + 20,
    ellipsis: true,
  },
  {
    title: '联系电话',
    dataIndex: 'telephone',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    ellipsis: true,
  },
];
