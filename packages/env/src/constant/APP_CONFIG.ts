
export const APP_CONFIG = {
    LOGIN_URL: '/login',
    TOKEN: 'lian-med-token',
    EXPIRE_TIME: 24 * 60 * 60,
    AUTH_NAME: 'username',
    COPYRIGHT: '© 2020 莲印医疗',
    VERSION: '2.34.1',
    SYSTEM_NAME: '产前诊断综合管理系统',
    isProduction: true,
    LOGIN_TIME: 'login-time',
    CELL_WIDTH_MINI: 30,
    CELL_WIDTH_TINY: 48,
    CELL_WIDTH_SMALL: 96,
    CELL_WIDTH_MIDDLE: 128,
    CELL_WIDTH_LARGE: 192,
  };
  
  export const RUNTIME_CONFIG = {
    SUCCESS_HTTP_STATUS: [200, 201, 204],
  };
  
  // 产前
  export const PRENATAL_DIAGNOSIS_CHANGE_PATIENT = 'changePatient';
  export const PRENATAL_DIAGNOSIS_OPEN_SPIN = 'openSpin';
  export const PRENATAL_DIAGNOSIS_CLOSE_SPIN = 'closeSpin';
  
  export const WEBSOCKET_STATUS = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3,
  };
  
  export const WEBSOCKET_STATUS_TEXT = ['未打开', '已打开', '正在关闭', '已关闭'];
  
  export const ALLOW_CALC_EDD_BASED_ON_IVF = 'ALLOW_CALC_EDD_BASED_ON_IVF'
  