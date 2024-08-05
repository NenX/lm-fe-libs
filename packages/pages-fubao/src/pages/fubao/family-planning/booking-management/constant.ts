import { IModel_PreoperativeExamination } from '../../.stupid_model';
import { TAttendanceType, TOperationType } from './type';

export const START_HOUR = 8;
export const END_HOUR = 18;
export const DIFF_HOUR = END_HOUR - START_HOUR;
export const HOUR_SPAN = 0.5;

export enum EExaminationStatus {
  正常 = 1,
  异常 = 2,
  未查 = 3,
}
export const OPERATION_ARR: TOperationType[] = [
  '人工流产',
  '刮宫术',
  '宫内避孕器放置术',
  '宫内节育器取出术',
  '子宫输卵管通液术',
];

export const ATTENDANCE_MAP: { [x: string]: TAttendanceType } = {
  0: '休息',
  1: '上午',
  2: '下午',
  3: '全天',
};

export const OPERATION_NAME_MAP: { [x in TOperationType]: string } = {
  人工流产: 'inducedAbortion',
  刮宫术: 'dilatationAndCurettage',
  子宫输卵管通液术: 'uterineFallopianTubeFluid',
  宫内节育器取出术: 'takeOutIntrauterineDevice',
  宫内避孕器放置术: 'putInIntrauterineDevice',
};

export const EXAM_MAP: { [x: string]: keyof IModel_PreoperativeExamination } = {
  血常规: 'bloodRoutine',
  凝血六项: 'sixCoagulation',
  //'尿常规': 'routineUrine',
  HIV: 'hiv',
  梅毒: 'syphilis',
  乙肝: 'hepatitisB',
  丙肝: 'hepatitisC',
  白带常规: 'leucorrhea',
};

export const COLS_OF_SAME_INTERVAL_DEFAULT = 2

export enum EProgressStatus {
  待预约 = 1,
  待签到 = 2,
  已签到 = 3,
  已完成 = 4,
}
