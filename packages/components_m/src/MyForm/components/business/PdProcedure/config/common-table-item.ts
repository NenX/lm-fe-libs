import {
  inspectionOptions,
  punctureTargetOptions,
  punctureObjectOptions,
  amnioticfluidcharacter,
  instrumentOptions,
  bleddMapping,
  instrumentOptions2,
  cordbloodcharacterOptions,
} from './options';

export const CELL_WIDTH_SMALL = 80;
export const CELL_WIDTH_MIDDLE = 140;
export const CELL_WIDTH_LARGE = 200;

export const punctureAmount = {
  dataIndex: 'punctureAmount',
  title: '穿刺次数',
  editable: true,
  align: 'center',
  inputType: 'input',
  width: CELL_WIDTH_SMALL,
};

export const fetalPosition = {
  dataIndex: 'fetalPosition',
  title: '胎儿位置',
  editable: true,
  align: 'center',
  inputType: 'input',
  width: CELL_WIDTH_MIDDLE,
};

export const punctureObjects = {
  dataIndex: 'object',
  editable: true,
  align: 'center',
  inputType: 'select_with_options_or_input',
  title: '穿刺对象',
  width: CELL_WIDTH_MIDDLE,
  inputProps: {
    options: punctureObjectOptions,
  },
};

export const punctureSite = {
  dataIndex: 'punctureTarget',
  editable: true,
  align: 'center',
  title: '穿刺部位',
  width: CELL_WIDTH_LARGE,
  inputType: 'select_with_options_or_input',
  inputProps: {
    options: punctureTargetOptions,
  },
};

export const numberOfInjections = {
  dataIndex: 'punctureAmount',
  editable: true,
  align: 'center',
  inputType: 'input',
  title: '进针次数',
  width: CELL_WIDTH_SMALL,
};

export const placentaOrNot = {
  dataIndex: 'placentaEntryNote',
  editable: true,
  align: 'center',
  title: '经否胎盘',
  inputType: 'normal_select',
  width: CELL_WIDTH_SMALL,
  inputProps: {
    type: 'jingfouMapping',
  },
};

export const placentaHemorrhage = {
  dataIndex: 'placentaHemorrhageNote',
  editable: true,
  align: 'center',
  width: CELL_WIDTH_SMALL,
  inputType: 'select_with_no',
  title: '胎盘出血',
};

export const inspectionItems = {
  dataIndex: 'sampleInspection',
  editable: true,
  align: 'center',
  title: '送检项目',
  width: 300,
  inputType: 'tree_select',
  inputProps: {
    options: inspectionOptions,
  },
};

export const apparatus = {
  dataIndex: 'instrument',
  editable: true,
  width: CELL_WIDTH_SMALL,
  align: 'center',
  title: '器械',
  inputType: 'select_with_options_or_input',
  inputProps: {
    options: instrumentOptions,
  },
};

export const apparatus2 = {
  dataIndex: 'instrument',
  editable: true,
  width: CELL_WIDTH_LARGE,
  align: 'center',
  title: '器械',
  inputType: 'select_with_options_or_input',
  inputProps: {
    options: instrumentOptions2,
  },
};

export const negativePressure = {
  dataIndex: ['invasiveNote', 'negativepressure'],
  editable: true,
  align: 'center',
  width: CELL_WIDTH_SMALL,
  inputType: 'input',
  title: '负压(ml)',
};

export const bleedOrNote = {
  dataIndex: ['invasiveNote', 'hemorrhageNote'],
  editable: true,
  align: 'center',
  width: CELL_WIDTH_SMALL,
  inputType: 'select_with_options_or_input',
  inputProps: {
    options: bleddMapping,
  },
  title: '出血',
};

export const stabTimes = {
  dataIndex: 'hitAmount',
  editable: true,
  align: 'center',
  width: CELL_WIDTH_SMALL,
  inputType: 'input',
  title: '刺中次数',
};

export const amnioticFluid = {
  dataIndex: ['invasiveNote', 'amnioticfluidcharacter'],
  editable: true,
  align: 'center',
  title: '羊水性状',
  width: CELL_WIDTH_MIDDLE,
  inputType: 'select_with_options_or_input',
  inputProps: {
    options: amnioticfluidcharacter,
  },
};

export const preoperativeAFV = {
  dataIndex: ['invasiveNote', 'amnioticfluidvolume'],
  editable: true,
  align: 'center',
  inputType: 'input',
  width: CELL_WIDTH_SMALL,
  title: '术前AFV(mm)',
};

export const postoperativeAFV = {
  dataIndex: ['invasiveNote', 'postamnioticfluidvolume'],
  editable: true,
  align: 'center',
  inputType: 'input',
  width: CELL_WIDTH_SMALL,
  title: '术后AFV(mm)',
};

// export const liquidProperties = {
//   dataIndex: 'postamnioticfluidvolume',
//   editable: true,
// align: 'center',
//   inputType: 'input',
//   title: '术后AFV',
// };

export const liquidcharacter = {
  dataIndex: ['invasiveNote', 'liquidcharacter'],
  editable: true,
  align: 'center',
  inputType: 'select_with_options_or_input',
  inputProps: {
    options: amnioticfluidcharacter,
  },
  width: CELL_WIDTH_SMALL,
  title: '液体性质',
};

export const liquidVolume = {
  dataIndex: ['invasiveNote', 'liquidvolume'],
  editable: true,
  align: 'center',
  inputType: 'input',
  width: CELL_WIDTH_SMALL,
  title: '液体量',
};

export const specialRecord = {
  dataIndex: 'exception',
  editable: true,
  align: 'center',
  inputType: 'select_with_options_or_input',
  // inputProps: {
  //   options: selectWithNo,
  // },
  title: '特殊记录',
  width: 200,
};

export const heartRate = {
  dataIndex: 'postFhr',
  editable: true,
  align: 'center',
  inputType: 'input',
  width: CELL_WIDTH_MIDDLE,
  title: '术后胎心率(bpm)',
};

export const slowFetalHeartRate = {
  dataIndex: 'fhrdecNote',
  editable: true,
  align: 'center',
  // inputType: 'input',
  inputType: 'select_with_no',
  // inputProps: {
  //   options: selectWithNo,
  // },
  width: CELL_WIDTH_SMALL,
  title: '胎心减慢',
};

export const processEvaluation = {
  dataIndex: 'processEvaluationNote',
  editable: true,
  align: 'center',
  title: '过程评估',
  width: CELL_WIDTH_SMALL,
  inputType: 'normal_select',
  inputProps: {
    type: 'processMapping',
  },
};

export const medication = {
  dataIndex: 'medication',
  editable: true,
  align: 'center',
  width: CELL_WIDTH_SMALL,
  inputType: 'select_with_no',
  title: '用药',
};

export const umbilicalHemorrhage = {
  dataIndex: ['invasiveNote', 'umbilicalHemorrhageNote'],
  editable: true,
  inputType: 'select_with_no',
  width: CELL_WIDTH_SMALL,
  align: 'center',
  title: '脐带出血',
};

export const uterusHemorrhage = {
  dataIndex: ['invasiveNote', 'uterusHemorrhageNote'],
  editable: true,
  inputType: 'select_with_no',
  width: CELL_WIDTH_SMALL,
  align: 'center',
  title: '宫壁出血',
};

export const cordbloodvolume = {
  dataIndex: ['invasiveNote', 'cordbloodvolume'],
  editable: true,
  inputType: 'input',
  width: CELL_WIDTH_MIDDLE,
  align: 'center',
  title: '抽脐血量(ml)',
};

export const cordbloodcharactor = {
  dataIndex: ['invasiveNote', 'cordbloodcharacter'],
  editable: true,
  inputType: 'select_with_options_or_input',
  inputProps: {
    options: cordbloodcharacterOptions,
  },
  width: CELL_WIDTH_MIDDLE,
  align: 'center',
  title: '脐血性质',
};

export const hemorrhage = {
  dataIndex: ['invasiveNote', 'cordhematoma'],
  editable: true,
  inputType: 'select_with_no',
  // inputProps: {
  //   options: selectWithNo2,
  // },
  width: CELL_WIDTH_SMALL,
  align: 'center',
  title: '脐带血肿',
};
