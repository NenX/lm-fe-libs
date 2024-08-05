import { fixedSelects, formatTimeToDate } from '@lm_fe/components_m';
import { assign, cloneDeep, filter, forEach, get, isEmpty, set } from 'lodash';
/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-28 21:43:23
 * @Description: 身份证校验规则
 */

export function checkIdNo(card: string, female: boolean = true) {
  let text = '';
  if (card === '') {
    text = '请输入身份证号码';
  } else if (!isCardNo(card)) {
    text = '请输入符合规范的身份证号码！';
  } else if (!checkProvince(card)) {
    text = '不存在的省份，请输入符合规范的身份证号码！';
  } else if (!checkBirthday(card)) {
    text = '出生年月不合理，请输入符合规范的身份证号码！';
  } else if (!checkParity(card)) {
    text = '校验位不正确，请输入符合规范的身份证号码！';
  } else if (female && checkSex(card) === '男') {
    text = '请输入女性的身份证号码！';
  }
  if (text) {
    return { status: false, message: text };
  }
  return {
    status: true,
    province: checkProvince(card),
    birth: checkBirthday(card),
    gender: checkSex(card),
    age: checkAge(card),
    nationality: '中国',
  };
}

/**
 * 检查号码是否符合规范，包括长度，类型
 * @param {string} card 证件号码
 */
function isCardNo(card: string) {
  //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  // const reg = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/;
  const reg =
    /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
  if (reg.test(card)) {
    return true;
  }
  return false;
}

const areas = [
  { code: '11', name: '北京市' },
  { code: '12', name: '天津市' },
  { code: '13', name: '河北省' },
  { code: '14', name: '山西省' },
  { code: '15', name: '内蒙古自治区' },
  { code: '21', name: '辽宁省' },
  { code: '22', name: '吉林省' },
  { code: '23', name: '黑龙江省' },
  { code: '31', name: '上海市' },
  { code: '32', name: '江苏省' },
  { code: '33', name: '浙江省' },
  { code: '34', name: '安徽省' },
  { code: '35', name: '福建省' },
  { code: '36', name: '江西省' },
  { code: '37', name: '山东省' },
  { code: '41', name: '河南省' },
  { code: '42', name: '湖北省' },
  { code: '43', name: '湖南省' },
  { code: '44', name: '广东省' },
  { code: '45', name: '广西壮族自治区' },
  { code: '46', name: '海南省' },
  { code: '50', name: '重庆市' },
  { code: '51', name: '四川省' },
  { code: '52', name: '贵州省' },
  { code: '53', name: '云南省' },
  { code: '54', name: '西藏自治区' },
  { code: '61', name: '陕西省' },
  { code: '62', name: '甘肃省' },
  { code: '63', name: '青海省' },
  { code: '64', name: '宁夏回族自治区' },
  { code: '65', name: '新疆维吾尔自治区' },
  { code: '71', name: '台湾地区' },
  { code: '81', name: '香港特别行政区' },
  { code: '82', name: '澳门特别行政区' },
  { code: '91', name: '国外' },
];
/**
 * 取身份证前两位,校验省份
 * @param {string} card 证件号码
 */
export function checkProvince(card: string) {
  let provinceCode = card.substr(0, 2);
  const p = areas.filter((e) => e.code === provinceCode)[0] || {};
  if (p.name === undefined) {
    return false;
  }
  return p.name;
}
/**
 * 检查生日是否正确
 * @param {string} card 证件号码
 */
function checkBirthday(card: string) {
  const len = card.length;
  //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
  if (len === 15) {
    const re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
    const arr_data = card.match(re_fifteen) || [];
    const year = arr_data[2];
    const month = arr_data[3];
    const day = arr_data[4];
    // const birthday = new Date('19' + year + '/' + month + '/' + day);
    return year + '-' + month + '-' + day;
  }
  //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
  if (len === 18) {
    const re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;
    const arr_data = card.match(re_eighteen) || [];
    const year = arr_data[2];
    const month = arr_data[3];
    const day = arr_data[4];
    // const birthday = new Date(year + '/' + month + '/' + day);
    return year + '-' + month + '-' + day;
  }
  return false;
}

/**
 * 校验位的检测
 * @param {string} card 证件号码F
 */
function checkParity(card: string) {
  // 15位转18位
  card = changeFivteenToEighteen(card);
  const len = card.length;
  if (len === 18) {
    const arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
    const arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
    let cardTemp = 0;
    let valnum = null;
    for (let i = 0; i < 17; i++) {
      cardTemp += Number(card.substr(i, 1)) * arrInt[i];
    }
    valnum = arrCh[cardTemp % 11];
    if (valnum.toUpperCase() === card.substr(17, 1).toUpperCase()) {
      return true;
    }
    return false;
  }
  return false;
}

/**
 * 15位转18位身份证号
 * @param {string} card 证件号码
 */
function changeFivteenToEighteen(card: string) {
  if (card.length === 15) {
    const arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
    const arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
    let cardTemp = 0;
    card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
    for (let i = 0; i < 17; i++) {
      cardTemp += Number(card.substr(i, 1)) * arrInt[i];
    }
    card += arrCh[cardTemp % 11];
    return card;
  }
  return card;
}

/**
 *
 * @param {string} card
 */
function checkSex(card: string) {
  let sex = 0;
  let sexNo = 0;
  if (card.length === 18) {
    sexNo = Number(card.substring(16, 17));
  } else if (card.length === 15) {
    sexNo = Number(card.substring(14, 15));
  }
  sex = sexNo % 2;
  if (sex === 0) {
    sex = 2;
  }
  return sex === 1 ? '男' : '女';
}

export function checkAge(card: string) {
  if (card === null) return null;
  let len = card.length;
  let arrdata, year, month, day;
  let age = 0;
  let myDate = new Date();
  let nowY = myDate.getFullYear();
  let nowM = myDate.getMonth() + 1;
  let nowD = myDate.getDate(); // 获取当前日(1-31)
  if (len === 15) {
    let refifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
    arrdata = card.match(refifteen) || [];
    year = Number(arrdata[2]);
    month = Number(arrdata[3]);
    day = Number(arrdata[4]);
    if (nowM > month || (nowM === month && nowD >= day)) {
      age = nowY - year;
    } else {
      age = nowY - year - 1;
    }
  }
  if (len === 18) {
    var reeighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;
    arrdata = card.match(reeighteen) || [];
    year = Number(arrdata[2]);
    month = Number(arrdata[3]);
    day = Number(arrdata[4]);
    if (nowM > month || (nowM === month && nowD >= day)) {
      age = nowY - year;
    } else {
      age = nowY - year - 1;
    }
  }
  if (age < 0) return null;
  else return age;
}

/**
 * 过滤出孕产史信息
 */
export function filterPregnancyHistories(data: any) {
  const cloneData = cloneDeep(data);
  const allItem: string[] = [];
  const hisArr: any[] = [];
  let hisSortArr: number[] = [];

  forEach(cloneData, (value, key) => {
    if (key.indexOf('_') > -1) allItem.push(key);
    /*获取需要保存的孕次*/
    if (key.indexOf('year') > -1) {
      const num = Number(key.slice(-1));
      hisSortArr.push(num);
    }
  });
  if (allItem.length === 0) return [];

  for (const i of hisSortArr) {
    const hisObj = {};

    set(hisObj, 'year', get(cloneData, `year_${i}`));
    set(hisObj, 'complicationNote', get(cloneData, `complicationNote_${i}`));
    set(hisObj, 'exceptionalcase', get(cloneData, `exceptionalcase_${i}`));
    /*是否分娩*/
    if (get(cloneData, `hasPregnancy_${i}`)) {
      set(hisObj, 'hospital', get(cloneData, `hospital_${i}`));
      set(hisObj, 'gestationalWeek', get(cloneData, `gestationalWeek_${i}`));
      set(hisObj, 'puerperalFever', get(cloneData, `puerperalFever_${i}`));
      set(hisObj, 'hemorrhage', get(cloneData, `hemorrhage_${i}`));
      /*分娩方式*/
      const deliverWay = get(cloneData, `deliverWay_${i}`);
      forEach(fixedSelects.deliverWays, (item) => {
        if (item === deliverWay) {
          set(hisObj, item, true);
        } else {
          set(hisObj, item, false);
        }
      });

      /*胎儿信息*/
      const fetalcount = get(cloneData, `fetalcount_${i}`) || 0;
      set(hisObj, 'fetalcount', fetalcount);
      if (fetalcount > 0) {
        const fetalArr: any[] = [];
        for (let j = 0; j < fetalcount; j++) {
          const fetalObj = {};
          if (get(cloneData, `childLiving_${i}_${j}`)) {
            set(fetalObj, 'childLiving', true);
            set(fetalObj, 'childGender', get(cloneData, `childGender_${i}_${j}`));
            set(fetalObj, 'sequelaNote', get(cloneData, `sequelaNote_${i}_${j}`));
            set(fetalObj, 'childDeformity', get(cloneData, `childDeformity_${i}_${j}`));
            set(fetalObj, 'neonateWeight', get(cloneData, `neonateWeight_${i}_${j}`));
            set(fetalObj, 'neonateHeight', get(cloneData, `neonateHeight_${i}_${j}`));
          } else {
            set(fetalObj, 'childLiving', false);
            set(fetalObj, 'childDeathTime', get(cloneData, `childDeathTime_${i}_${j}`));
            set(fetalObj, 'childDeathNote', get(cloneData, `childDeathNote_${i}_${j}`));
          }
          fetalArr.push(fetalObj);
        }
        set(hisObj, 'children', fetalArr);
      }
    } else {
      /*流产方式*/
      const abortionWay = get(cloneData, `abortionWay_${i}`);
      forEach(fixedSelects.abortionWays, (item) => {
        if (abortionWay && abortionWay.includes(item)) {
          set(hisObj, item, true);
        } else {
          set(hisObj, item, false);
        }
      });

      /*不良生育史*/
      const badPregnancy = get(cloneData, `badPregnancy_${i}`);
      forEach(fixedSelects.badPregnancies, (item) => {
        if (badPregnancy && badPregnancy.includes(item)) {
          set(hisObj, item, true);
        } else {
          set(hisObj, item, false);
        }
      });
    }

    hisArr.push(hisObj);
  }

  /*与之前的孕产史做合并*/
  const preHisArr = get(cloneData, 'pregnancyHistories');
  if (isEmpty(preHisArr)) {
    return hisArr;
  } else {
    forEach(hisArr, (value, key) => {
      hisArr[key] = assign({}, preHisArr[key], value);

      /*胎儿信息作额外的合并处理*/
      const children = get(hisArr, `${key}.children`);
      const preChildren = get(preHisArr, `${key}.children`);
      if (preChildren && preChildren.length > 0 && children) {
        const newChildren: any[] = [];
        forEach(children, (item, index) => {
          newChildren[index] = assign({}, preChildren[index], item);
        });
        set(hisArr, `${key}.children`, newChildren);
      }
    });
    return hisArr;
  }
}

/**
 * 处理转诊数据
 */
export function filterReferrals(pregnancyData: any, formData: any) {
  const referrals = get(pregnancyData, 'referrals');
  const referralOut = filter(referrals, (referral) => {
    return referral.referralType !== 2;
  });
  const referralIn = get(formData, 'referralIn');
  if (!!get(formData, 'referralInReferralDate')) {
    set(referralIn, 'referralType', 2);
    set(referralIn, 'reason', get(formData, 'referralInReason'));
    set(referralIn, 'referralDate', formatTimeToDate(get(formData, 'referralInReferralDate')));
    set(referralIn, 'referralOrganization', get(formData, 'referralInReferralOrganization'));
    set(referralIn, 'referralDept', get(formData, 'referralInReferralDept'));
    set(referralIn, 'referralDirection', get(formData, 'referralInReferralDirection'));
    set(referralIn, 'referralDoctor', get(formData, 'referralInReferralDoctor'));
    set(referralIn, 'referralContactNumber', get(formData, 'referralInReferralContactNumber'));
    set(referralIn, 'recorder', get(formData, 'referralInRecorder'));
    referralOut.push(referralIn);
  }
  return referralOut;
}

/**
 * 转换体征数据
 */
export function getPhysicalExamdata(measureData: any) {
  let physicalExamMeasure = get(measureData, '0.physicalExamMeasure') || {};
  if (isEmpty(physicalExamMeasure)) {
    return {};
  }
  physicalExamMeasure = {
    ...physicalExamMeasure,
    measureId: get(measureData, '0.id'),
    bloodPressure: {
      systolic: get(physicalExamMeasure, 'systolic'),
      diastolic: get(physicalExamMeasure, 'diastolic'),
    },
    bloodPressure2: {
      systolic: get(physicalExamMeasure, 'systolic2'),
      diastolic: get(physicalExamMeasure, 'diastolic2'),
    },
    bloodPressure3: {
      systolic: get(physicalExamMeasure, 'systolic3'),
      diastolic: get(physicalExamMeasure, 'diastolic3'),
    },
  };
  return physicalExamMeasure;
}
