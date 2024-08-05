export const queryFormDescriptions = {
  outpatientNO: {
    label: '检查日期',
    inputType: 'rangeDate',
    filterType: '',
    paramType: 'startAndEnd',
  },
  name: {
    label: '筛查类型',
    inputType: 'select',
    filterType: '',
    options: [
      {
        label: '全部',
        value: '全部',
      },
      {
        label: '乳腺癌筛查',
        value: '乳腺癌筛查',
      },
      {
        label: '宫颈癌筛查',
        value: '宫颈癌筛查',
      },
    ],
  },
  idNO: {
    label: '是否失访',
    inputType: 'select',
    filterType: '',
    options: [
      {
        label: '全部',
        value: '全部',
      },
      {
        label: '是',
        value: '是',
      },
      {
        label: '否',
        value: '否',
      },
    ],
  },
  idNO2: {
    label: '通知状态',
    inputType: 'select',
    filterType: '',
    options: [
      {
        label: '全部',
        value: '全部',
      },
      {
        label: '待通知',
        value: '待通知',
      },
      {
        label: '通知成功',
        value: '通知成功',
      },
      {
        label: '通知失败',
        value: '通知失败',
      },
    ],
  },
};
export default {
  queryFormDescriptions,
};
