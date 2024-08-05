export const queryFormDescriptions = {
  checkDate: {
    label: '检查日期',
    inputType: 'rangeDate',
    filterType: '',
    //paramType: 'startAndEnd',
  },
  screeningType: {
    label: '筛查类型',
    inputType: 'select',
    filterType: 'equals',
    options: [
      {
        label: '乳腺癌筛查',
        value: '乳腺癌筛查',
      },
      {
        label: '宫颈癌筛查',
        value: '宫颈癌筛查',
      },
      { label: '全部', value: '' },
    ],
  },
  loseTrack: {
    label: '是否失访',
    inputType: 'select',
    filterType: 'equals',
    options: [
      {
        label: '是',
        value: '1',
      },
      {
        label: '否',
        value: '0',
      },
      { label: '全部', value: '' },
    ],
  },
  notificationStatus: {
    label: '通知状态',
    inputType: 'select',
    filterType: 'equals',
    options: [
      {
        label: '待通知',
        value: '0',
      },
      {
        label: '通知成功',
        value: '1',
      },
      {
        label: '通知失败',
        value: '2',
      },
      { label: '全部', value: '' },
    ],
  },
};
export default {
  queryFormDescriptions,
};
