export const START_HOUR = 8
export const END_HOUR = 18
export const DIFF_HOUR = END_HOUR - START_HOUR
export const HOUR_SPAN = .5

export const COLS_OF_SAME_INTERVAL_DEFAULT = 2

export enum EProgressStatus {
    待预约 = 1,
    待签到 = 2,
    已签到 = 3,
    已完成 = 4,
}
export enum EExaminationStatus {
    正常 = 1,
    异常 = 2,
    未查 = 3,
}

