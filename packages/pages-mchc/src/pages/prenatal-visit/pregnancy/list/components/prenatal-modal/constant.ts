/*
 * @Descripttion: 常量
 * @Author: cjl
 * @Date: 2022-02-16 15:37:20
 * @LastEditTime: 2022-02-16 15:37:21
 */
/**预览类型 */
export enum previewEnum {
  singleView,
  fullView,
}
/**病历类型 */
export enum prenatalEnum {
  firstInSpection,
  repetitionSpecton,
  growthCurve,
  BMICurve,
  fundalImage,
  glucoseSupervise,
  pressureSupervise,
  fetalSupervise,
}

/**病历列表 */
export const PRENATALLIST = [
  {
    type: prenatalEnum.firstInSpection,
    title: '首检病历',
  },
  {
    type: prenatalEnum.repetitionSpecton,
    title: '复诊记录',
  },
  {
    type: prenatalEnum.growthCurve,
    title: '胎儿生长曲线',
  },
  {
    type: prenatalEnum.BMICurve,
    title: 'BMI孕期管理曲线',
  },
  {
    type: prenatalEnum.fundalImage,
    title: '宫高腹围图',
  },
  {
    type: prenatalEnum.glucoseSupervise,
    title: '血糖检测',
  },
  {
    type: prenatalEnum.pressureSupervise,
    title: '血压监测',
  },
  {
    type: prenatalEnum.fetalSupervise,
    title: '胎动检测',
  },
];

export const prenatalToResource = {
  [prenatalEnum.firstInSpection]: 'prenatalVisit',
  [prenatalEnum.repetitionSpecton]: 'prenatalRVisit',
  [prenatalEnum.growthCurve]: 'Image1',
  [prenatalEnum.BMICurve]: 'Image2',
  [prenatalEnum.fundalImage]: 'Image3',
  [prenatalEnum.glucoseSupervise]: 'BloodGlucoseInHome',
  [prenatalEnum.pressureSupervise]: 'BloodPressureInHome',
  [prenatalEnum.fetalSupervise]: 'FetalMovementInHome',
};

export const printapi = {
  single: 'api/pdf-preview',
  multipage: '/api/pdf-preview-document',
};
