import React from 'react';
import { get } from 'lodash';
import {
  punctureAmount,
  fetalPosition,
  punctureObjects,
  punctureSite,
  numberOfInjections,
  placentaOrNot,
  inspectionItems,
  placentaHemorrhage,
  apparatus,
  negativePressure,
  preoperativeAFV,
  amnioticFluid,
  postoperativeAFV,
  liquidVolume,
  stabTimes,
  specialRecord,
  heartRate,
  slowFetalHeartRate,
  processEvaluation,
  medication,
  bleedOrNote,
  liquidcharacter,
  CELL_WIDTH_SMALL,
  apparatus2,
  umbilicalHemorrhage,
  uterusHemorrhage,
  cordbloodvolume,
  hemorrhage,
  cordbloodcharactor,
  CELL_WIDTH_MIDDLE,
  CELL_WIDTH_LARGE,
} from './common-table-item';
import { villuscharacterOptions, perfusiontypeOptions, instrumentOptions } from './options';

// 胎儿囊液穿刺
export const cystocentesisColumns = [
  {
    dataIndex: 'name',
    title: '测量值',
    align: 'center',
    editable: false,
    width: CELL_WIDTH_MIDDLE,
  },
  {
    dataIndex: 'leftPleuralEffusion',
    title: '左胸腔积液(mm)',
    align: 'center',
    editable: true,
    inputType: 'input',
    width: CELL_WIDTH_MIDDLE,
  },
  {
    dataIndex: 'rightPleuralEffusion',
    title: '右胸腔积液(mm)',
    align: 'center',
    editable: true,
    inputType: 'input',
    width: CELL_WIDTH_MIDDLE,
  },
  {
    dataIndex: 'ascites',
    title: '腹水(mm)',
    align: 'center',
    editable: true,
    inputType: 'input',
    width: CELL_WIDTH_MIDDLE,
  },
  {
    dataIndex: 'hygromata',
    title: '囊肿',
    align: 'center',
    editable: true,
    inputType: 'input',
    width: CELL_WIDTH_MIDDLE,
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

// 宫内输血血流
export const bloodFlowsColumns = [
  {
    dataIndex: 'name',
    title: '',
    align: 'center',
    editable: false,
    width: 120,
  },
  {
    dataIndex: 'checkDate',
    title: '日期',
    align: 'center',
    editable: true,
    inputType: 'single_date_picker',
    width: 120,
  },
  {
    dataIndex: 'ua',
    title: 'UA',
    align: 'center',
    children: [
      {
        dataIndex: 'uaEdf',
        title: 'EDF',
        align: 'center',
        editable: true,
        width: 80,
      },
      {
        dataIndex: 'uaPi',
        title: 'PI',
        align: 'center',
        editable: true,
        width: 80,
      },
      {
        dataIndex: 'uaRi',
        title: 'RI',
        align: 'center',
        editable: true,
        width: 80,
      },
      {
        dataIndex: 'uaSdratio',
        title: 'S/D',
        align: 'center',
        editable: true,
        width: 80,
      },
    ],
  },
  {
    dataIndex: 'dv',
    title: 'DV',
    align: 'center',
    editable: true,
    width: 80,
  },
  {
    dataIndex: 'mca',
    title: 'MCA',
    align: 'center',
    width: 80,
    children: [
      {
        dataIndex: 'mcaPsv',
        title: 'PSV(cm/s)',
        align: 'center',
        inputType: 'input',
        editable: true,
        width: 80,
      },
      {
        dataIndex: 'mcaPi',
        title: 'PI',
        align: 'center',
        inputType: 'input',
        editable: true,
        width: 80,
      },
      {
        dataIndex: 'mcaRi',
        title: 'RI',
        align: 'center',
        editable: true,
        inputType: 'input',
        width: 80,
      },
      {
        dataIndex: 'mcaSdratio',
        title: 'S/D',
        align: 'center',
        editable: true,
        width: 200,
      },
    ],
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

export default {
  amniocentesis: [
    // 羊膜腔穿刺
    punctureObjects,
    punctureSite,
    numberOfInjections,
    placentaOrNot,
    placentaHemorrhage,
    uterusHemorrhage,
    {
      dataIndex: ['invasiveNote', 'amnioticfluidvolume'],
      editable: true,
      inputType: 'input',
      width: CELL_WIDTH_SMALL,
      align: 'center',
      title: '抽羊水量(ml)',
    },
    amnioticFluid,
    medication,
    heartRate,
    slowFetalHeartRate,
    processEvaluation,
    inspectionItems,
    // specialRecord,
  ],
  chorionic: [
    // 绒毛活检术
    punctureObjects,
    punctureSite,
    {
      ...apparatus2,
      width: 150,
    },
    {
      dataIndex: ['invasiveNote', 'catheteramount'],
      editable: true,
      inputType: 'input',
      width: CELL_WIDTH_SMALL,
      align: 'center',
      title: '插管次数',
    },
    {
      dataIndex: ['invasiveNote', 'suctionamount'],
      editable: true,
      inputType: 'input',
      width: CELL_WIDTH_SMALL,
      align: 'center',
      title: '抽吸次数',
    },
    negativePressure,
    {
      dataIndex: ['invasiveNote', 'villusvolume'],
      editable: true,
      inputType: 'input',
      width: CELL_WIDTH_SMALL,
      align: 'center',
      title: '绒毛量(支)',
    },
    {
      dataIndex: ['invasiveNote', 'villuscharacter'],
      editable: true,
      inputType: 'select_with_options_or_input',
      align: 'center',
      inputProps: {
        options: villuscharacterOptions,
      },
      width: CELL_WIDTH_SMALL,
      title: '绒毛性质',
    },
    bleedOrNote,
    heartRate,
    slowFetalHeartRate,
    processEvaluation,
    inspectionItems,
    // specialRecord,
  ],
  umbilical: [
    // 脐带穿刺手术
    punctureObjects,
    punctureSite,
    punctureAmount,
    stabTimes,
    placentaOrNot,
    placentaHemorrhage,
    umbilicalHemorrhage,
    uterusHemorrhage,
    cordbloodvolume,
    cordbloodcharactor,
    hemorrhage,
    medication,
    heartRate,
    slowFetalHeartRate,
    processEvaluation,
    inspectionItems,
    // specialRecord,
  ],
  amnioticCavityPerfusion: [
    // 羊膜腔灌注
    punctureObjects,
    punctureSite,
    punctureAmount,
    placentaOrNot,
    placentaHemorrhage,
    amnioticFluid,
    {
      dataIndex: ['invasiveNote', 'perfusiontype'],
      editable: true,
      title: '灌注液体名称',
      inputType: 'select_with_options_or_input',
      inputProps: {
        options: perfusiontypeOptions,
      },
      align: 'center',
      width: CELL_WIDTH_SMALL,
    },
    {
      dataIndex: ['invasiveNote', 'perfusionvolum'],
      editable: true,
      inputType: 'input',
      width: CELL_WIDTH_SMALL,
      align: 'center',
      title: '灌注液量(ml)',
    },
    medication,
    preoperativeAFV,
    postoperativeAFV,
    heartRate,
    slowFetalHeartRate,
    processEvaluation,
    // specialRecord,
  ],
  // 选择性减胎
  selectiveReduction: [
    {
      ...punctureObjects,
      title: '减胎对象',
    },
    punctureAmount,
    {
      dataIndex: ['invasiveNote', 'suctionvolumNote'],
      title: '回抽液体',
      editable: true,
      align: 'center',
      width: CELL_WIDTH_SMALL,
      inputType: 'select_with_options_or_input',
      inputProps: {
        options: [
          { label: '无', value: '无' },
          { label: '有', value: '有' },
          { label: '水性', value: '水性' },
          { label: '血性', value: '血性' },
        ],
      },
    },
    liquidcharacter,
    {
      dataIndex: 'naciml',
      title: '10%氯化钾用量(ml)',
      editable: false,
      align: 'center',
      width: 300,
      children: [
        {
          dataIndex: ['invasiveNote', 'naci'],
          title: '首量',
          editable: true,
          align: 'center',
          width: CELL_WIDTH_SMALL,
          inputType: 'input',
        },
        {
          dataIndex: ['invasiveNote', 'naciNote'],
          title: '追加',
          editable: true,
          align: 'center',
          width: CELL_WIDTH_SMALL,
          inputType: 'input',
        },
        {
          dataIndex: 'naci_2',
          title: '总量',
          width: CELL_WIDTH_SMALL,
          align: 'center',
          editable: false,
          render: (value, rowData) => {
            const naci = get(rowData, 'invasiveNote.naci');
            const naciNote = get(rowData, 'invasiveNote.naciNote');
            let naci1 = 0;
            let naci2 = 0;
            naci && (naci1 = Number(naci));
            naciNote && (naci2 = Number(naciNote));

            return naci1 + naci2;
          },
        },
      ],
    },
    {
      dataIndex: 'disappearfhr',
      title: '胎心消失时间(min)',
      editable: true,
      width: CELL_WIDTH_SMALL,
      align: 'center',
      inputType: 'input',
    },
    slowFetalHeartRate,
    {
      dataIndex: 'sampleInspection',
      title: '保留胎胎心率(bpm)',
      editable: true,
      width: CELL_WIDTH_SMALL,
      align: 'center',
      inputType: 'input',
    },
    processEvaluation,
    // {
    //   ...specialRecord,
    //   width: 350,
    // },
  ],
  amnioticFluidReduction: [
    // 羊水减量
    punctureObjects,
    {
      dataIndex: 'instrument',
      editable: true,
      inputType: 'select_with_options_or_input',
      width: CELL_WIDTH_SMALL,
      title: '穿刺针(G)',
      align: 'center',
      inputProps: {
        options: [instrumentOptions[0], instrumentOptions[1], instrumentOptions[2], instrumentOptions[3]],
      },
    },
    punctureAmount,
    placentaOrNot,
    placentaHemorrhage,
    amnioticFluid,
    {
      dataIndex: ['invasiveNote', 'suctionvolumNote'],
      editable: true,
      inputType: 'input',
      width: CELL_WIDTH_SMALL,
      align: 'center',
      title: '抽吸羊水量(ml)',
    },
    {
      ...negativePressure,
      title: '负压(MPa)',
    },
    preoperativeAFV,
    postoperativeAFV,
    heartRate,
    slowFetalHeartRate,
    processEvaluation,
    // specialRecord,
  ],
  intrauterineBloodTransfusion: [
    // 宫内输血
    punctureObjects,
    punctureSite,
    apparatus2,
    numberOfInjections,
    stabTimes,
    placentaOrNot,
    placentaHemorrhage,
    umbilicalHemorrhage,
    uterusHemorrhage,
    cordbloodvolume,
    cordbloodcharactor,
    hemorrhage,
    {
      dataIndex: 'fetalanaestheticNote',
      editable: true,
      inputType: 'select_with_no',
      inputProps: {
        options: [
          {
            label: '罗库溴胺',
            value: '罗库溴胺',
          },
        ],
      },
      width: CELL_WIDTH_MIDDLE,
      align: 'center',
      title: '胎儿麻醉药物名',
    },
    {
      dataIndex: 'fetalanaesthetic',
      editable: true,
      width: CELL_WIDTH_MIDDLE,
      inputType: 'select_with_no',
      align: 'center',
      title: '胎儿麻醉药物量',
      inputProps: {
        dropdownMatchSelectWidth: 300,
        options: [
          {
            label: '罗库溴胺量(mg)=0.1-0.6(mg/kg)*胎重(kg)',
            value: '0',
          },
        ],
      },
    },
    heartRate,
    slowFetalHeartRate,
    processEvaluation,
    inspectionItems,
    // specialRecord,
    {
      dataIndex: 'hct',
      editable: true,
      inputType: 'input',
      width: CELL_WIDTH_SMALL,
      align: 'center',
      title: '目标HCT',
    },
    {
      dataIndex: 'analysisbtvolume',
      editable: true,
      inputType: 'input',
      width: CELL_WIDTH_MIDDLE,
      align: 'center',
      title: '计算输血量(ml)',
    },
    {
      dataIndex: 'actualbtvolume',
      editable: true,
      inputType: 'input',
      align: 'center',
      width: CELL_WIDTH_MIDDLE,
      title: '实际输血量(ml)',
    },
    {
      dataIndex: 'btDuration',
      editable: true,
      inputType: 'input',
      width: CELL_WIDTH_MIDDLE,
      align: 'center',
      title: '输血时间(min)',
    },
    {
      dataIndex: 'btspeed',
      editable: true,
      inputType: 'input',
      width: CELL_WIDTH_MIDDLE,
      align: 'center',
      title: '输血速度(ml/min)',
    },
    {
      dataIndex: 'recheckHemogram',
      editable: true,
      inputType: 'select_with_no',
      width: CELL_WIDTH_SMALL,
      align: 'center',
      title: '复查血象',
    },
    {
      dataIndex: 'otherNote',
      editable: true,
      inputType: 'input',
      width: 300,
      align: 'center',
      title: '其它',
    },
  ],
  //   胎儿囊液穿刺
  fetalHydrothorax: [punctureSite, punctureAmount, placentaOrNot, placentaHemorrhage, liquidVolume, postoperativeAFV],
  //   腹水
  ascites: [punctureSite, punctureAmount, placentaOrNot, placentaHemorrhage, liquidVolume, postoperativeAFV],
  //   囊液穿刺
  cystocentesis: [
    {
      dataIndex: 'name',
      editable: true,
      inputType: 'input',
      width: CELL_WIDTH_MIDDLE,
      align: 'center',
      title: '手术名称',
    },
    punctureObjects,
    punctureSite,
    punctureAmount,
    placentaOrNot,
    placentaHemorrhage,
    liquidVolume,
    liquidcharacter,
    medication,
    heartRate,
    slowFetalHeartRate,
    processEvaluation,
    inspectionItems,
    // specialRecord,
  ],
};
