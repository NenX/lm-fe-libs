export const queryFormDescriptions = {
  outpatientNO: {
    label: '下次筛查时间',
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
    label: '手机号码',
    inputType: 'input',
    filterType: '',
  },
  idNO2: {
    label: '姓名',
    inputType: 'input',
    filterType: '',
  },
};
export default {
  queryFormDescriptions,
};
