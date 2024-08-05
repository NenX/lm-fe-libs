export const modalFormDescriptions = {
  userType: {
    key: 'userType',
    label: '类型',
    rules: [{ required: true, message: '登录账号是必填项' }],
    inputType: 'normal_select',
    special_config: '{"type":"userTypeMapping"}',
    inputProps: {
      placeholder: '请选择账号类型',
    },
    layout: '1/2',
  },
  overdueDate: {
    key: 'overdueDate',
    label: '过期',
    inputType: 'single_date_picker',
    inputProps: {
      placeholder: '请选择过期日期',
    },
    layout: '1/2',

  },
  login: {
    key: 'login',
    label: '账号',
    rules: [{ required: true, message: '登录账号是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入登录账号',
    },
    layout: '1/2',
  },
  password: {
    key: 'password',
    label: '登录密码',
    inputType: 'password',
    rules: [
      // { required: true, message: '密码是必填项' },
      // { type: 'string' },
      // { min: 5, message: '密码不能少于5位' },
      // { max: 16, message: '密码不能超过16位' },
    ],
    inputProps: {
      placeholder: '请输入登录密码',
    },
    layout: '1/2',
  },
  // imageUrl: {
  //   key: 'imageUrl',
  //   label: '头像',
  //   rules: [{ required: false, message: '头像是必填项' }],
  //   inputType: 'input',
  //   inputProps: {
  //     placeholder: '请输入头像',
  //   },
  // },
  firstName: {
    key: 'firstName',
    label: '姓名',
    rules: [{ required: true, message: '姓名是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入姓名',
    },
    layout: '1/2',
  },
  // email: {
  //   key: 'email',
  //   label: '邮箱',
  //   rules: [{ required: true, message: '邮箱是必填项' }],
  //   inputType: 'input',
  //   inputProps: {
  //     placeholder: '请输入邮箱',
  //   },
  // },
  groups: {
    key: 'groups',
    label: '角色',
    rules: [{ required: true, message: '角色是必选项' }],
    inputType: 'roles',
    inputProps: {
      placeholder: '请选择角色',
    },
    layout: '1/1',
  },
};

export const resetFormDescriptions = {
  password: {
    key: 'password',
    label: '登录密码',
    inputType: 'password',
    rules: [
      { required: true, message: '密码是必填项' },
      { type: 'string' },
      { min: 5, message: '密码不能少于5位' },
      { max: 16, message: '密码不能超过16位' },
    ],
    inputProps: {
      placeholder: '请输入登录密码',
    },
  },
};

export const queryFormDescriptions = {
  login: {
    label: '账号',
    // 输入组件类型 input/number/autoComplete/checkbox/address/select/multiselect/date/rangeDate/treeSelect/
    inputType: 'input',
    // JPA CriteriaQuery //  equal, in, contains,specified, greaterThan, lessThan, greaterOrEqualThan, lessOrEqualThan
    // 默认 contains 包含
    filterType: 'contains',
  },
  firstName: {
    label: '姓名',
    inputType: 'input',
    filterType: '',
  },
  role: {
    label: '角色',
    inputType: 'select',
    url: '/api/groups',
    filterType: '',
  },
  score: {
    label: '分数',
    inputType: 'rangeInputNumber',
  },
  // date: {
  //   label: '时间',
  //   inputType: 'date',
  //   filterType: '',
  // },
  // rangeDate: {
  //   label: '时间区间',
  //   inputType: 'rangeDate',
  //   filterType: '',
  // },
};
