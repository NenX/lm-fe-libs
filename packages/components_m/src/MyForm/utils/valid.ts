import { get, isNil, isEmpty, isNumber, isBoolean, isObject } from 'lodash';

interface ValidateRule {
  [key: string]: (val: any, min?: any, max?: any) => boolean;
}

const SPLIT_KEY = '|';

function isRegExp(data: any): boolean {
  return data instanceof RegExp;
}

const errorText: { [key: string]: string } = {
  required: '此输入值不可为空',
  number: '*请输入数字',
  pureNumber: '*请输入正整数',
  chinaID: '*请输入格式正确的中国居民身份证',
  telephone: '*请输入正确的手机号码',
  rang: '*值异常',
};

const validateRules: ValidateRule = {
  required: function (val: any): boolean {
    return val !== undefined && val !== '' && val !== null;
  },
  number: function (val: any): boolean {
    if (val === null || val === undefined) {
      return true;
    }
    return /^\d*(\.\d+)?$/.test(val);
  },
  pureNumber: function (val: any): boolean {
    return /^\d+$/.test(val);
  },
  chinaID: function (val: any): boolean {
    return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(val);
  },
  telephone: function (val: any): boolean {
    // return /^((\+|00)86)?((134\d{4})|((13[0-3|5-9]|14[1|5-9]|15[0-9]|16[2|5|6|7]|17[0-8]|18[0-9]|19[0-2|5-9])\d{8}))$/.test(val);
    return /^((134\d{4})|((13[0-3|5-9]|14[1|5-9]|15[0-9]|16[2|5|6|7]|17[0-8]|18[0-9]|19[0-2|5-9])\d{8}))$/.test(val);
  },
  rang: function (val, min, max): boolean {
    let v = Number(val);
    let minVal = Number(min);
    let maxVal = Number(max);
    if (minVal > v || maxVal < v) {
      return false;
    }
    return true;
  },
};

/**
 *
 * @param {any} data
 * @param {string|object|RegExp|null} validate
 * 输入规则
 * 1.基本数据类型校验validate格式 string
 * 2.引用数据类型校验validate格式 {}
 * 3.若输入的rule类型和data类型不相同，报错但可通过校验
 */

export const validFun = function validFun(data: any, validates: any[], label: string = '该项'): any {
  for (let index = 0; index < validates.length; index++) {
    const validate = validates[index];
    if (get(validate, 'required')) {
      if (isObject(data)) {
        const allKeys = Object.keys(data);
        data = data[allKeys[0]];
      }
      if (!data && !isNumber(data) && !isBoolean(data)) {
        return get(validate, 'message') || `${label} 是必填项`;
      }
    }
    const ruleType = get(validate, 'type');
    if (ruleType === 'rang') {
      const min = get(validate, 'min');
      const max = get(validate, 'max');
      if (get(validateRules, ruleType) && !get(validateRules, ruleType)(data, min, max)) {
        return get(validate, 'message') || `*${label} 有异常`;
      }
    } else {
      if (get(validateRules, ruleType) && !get(validateRules, ruleType)(data)) {
        return get(validate, 'message') || `*${label} 有异常`;
      }
    }
  }
  return true;

  // if (!validate) return '';
  // let errorTip: any = '';
  // // data 为 null时，typeof为object
  // if (isString(validate) && (isBase(data) || !data)) {
  //   const ruleArr = validate.split(SPLIT_KEY);
  //   let isValid = true;
  //   for (let i = 0; i < ruleArr.length; i++) {
  //     const name = ruleArr[i].replace(/\(.*\)/, '');
  //     const args = /\((.*)\)/.test(ruleArr[i]) && /\((.*)\)/.exec(ruleArr[i])[1];
  //     isValid = validateRules[name](data, ...(args ? args.split(',') : []));
  //     if (!isValid) {
  //       errorTip = errorText[name];
  //       break;
  //     }
  //   }
  // } else if (isString(validate) && isObj(data)) {
  //   const allKeys = Object.keys(data);
  //   errorTip = validFun(data[allKeys[0]], validate);
  // } else if (isObj(validate) && isObj(data)) {
  //   errorTip = Object.assign({}, validate);
  //   try {
  //     Object.keys(validate).forEach((key: string) => {
  //       errorTip[key] = '';
  //       errorTip[key] = validFun(data[key], validate[key]);
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // } else if (isRegExp(validate) && (!isBase(data) || !data)) {
  //   errorTip = validate.test(data) ? '' : `正则验证 ${validate} 不通过`;
  // } else if (isObj(validate) && Array.isArray(data)) {
  //   errorTip = data.map((v: any) => {
  //     const obj = Object.assign({}, v);
  //     Object.keys(obj).forEach((key: string) => {
  //       obj[key] = '';
  //     });
  //     return obj;
  //   });
  //   for (let i = 0; i < errorTip.length; i++) {
  //     errorTip[i] = validFun(data[i], validate);
  //   }
  //   console.log(errorTip);
  // } else if (isFunction(validate)) {
  //   errorTip = validate(data);
  // } else {
  //   console.error(`Type of validate is ${typeof validate}, but type of data is ${typeof data} `);
  // }
  // return errorTip;
};
