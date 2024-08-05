import { APP_CONFIG } from '../../../utils/constants';

// 胎儿囊液穿刺
export const cystocentesisColumns = [
  {
    dataIndex: 'name',
    title: '测量值',
    align: 'center',
    editable: false,
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    dataIndex: 'leftPleuralEffusion',
    title: '左胸腔积液(mm)',
    align: 'center',
    editable: true,
    inputType: 'input',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    dataIndex: 'rightPleuralEffusion',
    title: '右胸腔积液(mm)',
    align: 'center',
    editable: true,
    inputType: 'input',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    dataIndex: 'ascites',
    title: '腹水(mm)',
    align: 'center',
    editable: true,
    inputType: 'input',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    dataIndex: 'hygromata',
    title: '囊肿',
    align: 'center',
    editable: true,
    inputType: 'input',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    dataIndex: 'note',
    title: '备注',
    align: 'center',
    editable: true,
    inputType: 'input',
    width: 300,
  },
];

// 宫内输血血像
export const hemogramExamColumns = [
  {
    dataIndex: 'name',
    title: '',
    align: 'center',
    editable: false,
    width: 120,
  },
  {
    dataIndex: 'wbc',
    title: 'WBC(x10⁹/L)',
    align: 'center',
    editable: true,
    width: 100,
  },
  {
    dataIndex: 'rbc',
    title: 'RBC(x10¹²/L)',
    align: 'center',
    editable: true,
    width: 100,
  },
  {
    dataIndex: 'hgb',
    title: 'HGB(g/L)',
    align: 'center',
    editable: true,
    width: 100,
  },
  {
    dataIndex: 'hct',
    title: 'HCT',
    align: 'center',
    editable: true,
    width: 100,
  },
  {
    dataIndex: 'plt',
    title: 'PLT(x10⁹/L)',
    align: 'center',
    editable: true,
    width: 100,
  },
  {
    dataIndex: 'ret',
    title: '网织红(%)',
    align: 'center',
    editable: true,
    width: 100,
  },
  {
    dataIndex: 'nrbc',
    title: '有核红(x10⁹/L)',
    align: 'center',
    editable: true,
    width: 100,
  },
  {
    dataIndex: 'bilirubin',
    title: '胆红素(mmo/L)',
    align: 'center',
    editable: true,
    width: 100,
  },
  {
    dataIndex: 'coombs',
    title: "Coomb's",
    align: 'center',
    editable: true,
    width: 100,
  },
];

export const tableColumns = [
  {
    dataIndex: 'name',
    editable: true,
    align: 'center',
    inputType: 'input',
    title: '手术名称',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
  },
  {
    dataIndex: 'object',
    editable: true,
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
    title: '穿刺对象',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
  },
  {
    dataIndex: 'punctureTarget',
    editable: true,
    align: 'center',
    inputType: 'select_with_options_or_input',
    inputProps: {
      options: [
        { label: '经脐静脉游离段', value: '经脐静脉游离段' },
        { label: '胸腔', value: '胸腔' },
      ],
    },
    title: '穿刺部位',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
  },
  {
    dataIndex: 'punctureAmount',
    editable: true,
    align: 'center',
    inputType: 'input',
    title: '穿刺次数',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
  },
  {
    dataIndex: 'placentaEntryNote',
    editable: true,
    align: 'center',
    // inputType: 'input',
    inputType: 'dictionary_select_in_table',
    inputProps: {
      type: 'select',
      mode: 'single',
      boxSpan: 6,
      uniqueKey: 'prenatalDiagnosis.placentaEntry',
    },
    title: '经否胎盘',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
  },
  {
    dataIndex: 'placentaHemorrhageNote',
    editable: true,
    align: 'center',
    inputType: 'select_with_options_or_input',
    inputProps: {
      options: [
        { label: '无', value: '无' },
        { label: '有', value: '有' },
      ],
    },

    title: '胎盘出血',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
  },
  {
    dataIndex: ['invasiveNote', 'liquidvolume'],
    editable: true,
    inputType: 'input',
    align: 'center',
    title: '液体量(ml)',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    dataIndex: ['invasiveNote', 'liquidcharacter'],
    editable: true,
    align: 'center',
    inputType: 'select_with_options_or_input',
    inputProps: {
      options: [
        { label: '清亮，金黄色', value: '清亮，金黄色' },
        { label: '血型，浅黄色', value: '血型，浅黄色' },
        { label: '浑浊', value: '浑浊' },
      ],
    },
    title: '液体性质',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    dataIndex: 'medication',
    editable: true,
    align: 'center',
    inputType: 'select_with_options_or_input',
    inputProps: {
      options: [
        { label: '无', value: '无' },
        { label: '有', value: '有' },
      ],
    },
    title: '用药',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    dataIndex: 'fhr',
    editable: true,
    align: 'center',
    inputType: 'input',
    title: '术前胎心率',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    dataIndex: 'postFhr',
    editable: true,
    align: 'center',
    inputType: 'input',
    title: '术后胎心率(bpm)',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    dataIndex: 'fhrdecNote',
    editable: true,
    align: 'center',
    inputType: 'select_with_options_or_input',
    inputProps: {
      options: [
        { label: '无', value: '无' },
        { label: '有', value: '有' },
      ],
    },
    title: '胎心减慢',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    dataIndex: 'processEvaluationNote',
    editable: true,
    align: 'center',
    // inputType: 'input',
    inputType: 'dictionary_select_in_table',
    inputProps: {
      type: 'select',
      mode: 'single',
      boxSpan: 6,
      uniqueKey: 'prenatalDiagnosis.processEvaluationNote',
    },
    title: '过程评估',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    dataIndex: 'otherNote',
    editable: true,
    align: 'center',
    inputType: 'input',
    title: '备注',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
];
