import { isString, size } from "lodash";
import { mchcLogger } from "src/logger";
import { getPresetOptions } from "src/select_options";




export function checkIdNo(card: string,
    //  female = true
) {
    card = card?.replace(/\s*/g, '');
    let text = '';
    if (card === '') {
        text = '请输入身份证号码';
    }
    else if (!isCardNo(card)) {
        text = '请输入符合规范的身份证号码！';
    }
    else if (!checkProvince(card)) {
        text = '不存在的省份，请输入符合规范的身份证号码！';
    }
    else if (!checkBirthday(card)) {
        text = '出生年月不合理，请输入符合规范的身份证号码！';
    }
    else if (!checkParity(card)) {
        text = '校验位不正确，请输入符合规范的身份证号码！';
    }
    // else if (female && checkSex(card) === '男') {
    //     text = '请输入女性的身份证号码！';
    // }
    if (text) {
        return {
            province: undefined,
            birth: undefined,
            gender: undefined,
            age: undefined,
            nationality: undefined,
            status: false,
            message: text,
        };
    }
    return {
        province: checkProvince(card),
        birth: checkBirthday(card),
        gender: checkSex(card),
        age: checkAge(card),
        nationality: '中国',

        status: true,
        message: text
    };
}

export function checkIdNo_new(card?: string, idType = 1) {
    if (!card || !isString(card)) return null
    if (idType !== 1) return null
    const _card = card.replace(/\s*/g, '')
    if (size(_card) !== 18) return null

    const idState = checkIdNo(_card)
    mchcLogger.log('checkIdNo_new', { card, idType, idState })
    if (idState.status === true) {
        return idState
    } else {
        return null
    }
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
const areas = getPresetOptions('省份s')

/**
 * 取身份证前两位,校验省份
 * @param {string} card 证件号码
 */
export function checkProvince(card: string) {
    let provinceCode = card.substr(0, 2);
    const p = areas.filter((e) => e.code === provinceCode)[0] || {};
    if (p.label === undefined) {
        return;
    }
    return p.label;
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
    return;
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
        let valnum: string;
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
    if (card === null) return;
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
    if (age < 0) return;
    else return age;
}















