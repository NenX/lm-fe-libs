import { ISogcdata } from "../types";
import { getValue, isModified } from "./utils";
export function Sogc(_data: ISogcdata,) {
    const sogcdata: ISogcdata = JSON.parse(JSON.stringify(_data))
    const { bhrvalue, accvalue, decvalue, ltvvalue } = sogcdata

    let bhr = getValue(bhrvalue)
    let acc = getValue(accvalue)
    let dec = getValue(decvalue)
    let ltv = getValue(ltvvalue)



    //档案时长
    // const length = analysis.length;
    // 基线选项
    if (isModified(bhr)) {
        sogcdata.bhrscore = bhr;
    }
    // if (inRange(bhr, 110, 160))
    //     sogcdata.bhrscore = 0;
    // else if (inRange(bhr, 100, 109) || bhr > 160)
    //     sogcdata.bhrscore = 1;
    // else if (bhr < 100) {
    //     sogcdata.bhrscore = 2;
    // }

    // 变异

    if (isModified(ltv)) {
        sogcdata.ltvscore = ltv;
    }
    // if (ltv <= 5) {
    //     if (length < 40) {
    //         sogcdata.ltvscore = 0;
    //     } else if (inRange(length, 40, 80)) {
    //         sogcdata.ltvscore = 1;
    //     } else {
    //         sogcdata.ltvscore = 2;
    //     }
    // } else if (ltv >= 26 || analysis.sinusoid) {
    //     sogcdata.ltvscore = 1;
    // } else {
    //     sogcdata.ltvscore = 0;
    // }

    //正弦判断

    // if (analysis.sinusoid) {
    //     sogcdata.ltvscore = 0;
    // }

    // 加速
    if (isModified(acc)) {
        sogcdata.accscore = acc;
    }
    // if (acc >= 2) {
    //     sogcdata.accscore = 0;
    // } else {
    //     if (length > 80) {
    //         sogcdata.accscore = 2;
    //     } else {
    //         sogcdata.accscore = 1;
    //     }
    // }

    // 减速
    if (isModified(dec)) {
        sogcdata.decscore = dec;
    }
    // sogcdata.decscore = dec;
    // sogcdata.total = 1;



    const { bhrscore, accscore, decscore, ltvscore } = sogcdata
    const all = [bhrscore, accscore, decscore, ltvscore]
    sogcdata.result = '正常'
    if (all.some(_ => _ === 2)) {
        sogcdata.result = '异常';
    } else if (all.some(_ => _ === 1)) {
        sogcdata.result = '可疑';
    } else if (all.some(_ => _ === 3)) {
        sogcdata.result = '时长不足';
    }
    return sogcdata
}