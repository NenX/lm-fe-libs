interface BasePoint {
    index: number;
    start: number;
    end: number;
    peak: number;
    duration: number;
    ampl: number;
    x: number;
    y: number;
    marked?: boolean;
    remove?: boolean;
    user?: boolean;
    _dataClean?: boolean;
    reliability: number;
}
export interface AccPoint extends BasePoint {
}
export declare type TCtgAnalyseResultType = '正常' | '可疑' | '异常' | '时长不足' | '';
export declare const CtgAnalyseResultMap: TCtgAnalyseResultType[];
export declare type DecType = 'ld' | 'ed' | 'vd';
export interface DecPoint extends BasePoint {
    type: DecType;
}
export interface _ctg_exams_analyse {
    analysis: ctg_exams_analyse_analysis;
    score: ctg_exams_analyse_score;
    history: any[];
}
export interface ISogcdata {
    bhrscore: number;
    ltvvalue: number;
    ltvscore: number;
    accscore: number;
    accvalue: number;
    bhrvalue: number;
    decvalue: number | 'ed' | 'vd' | '无';
    decscore: number;
    total: number;
    result: TCtgAnalyseResultType;
}
export interface ICstdata {
    bhrvalue: number;
    bhrscore: number;
    ltvvalue: number;
    ltvscore: number;
    stvvalue: number;
    stvscore: number;
    accscore: number;
    accvalue: number | '无' | '周期性' | '散在性' | '';
    decscore: number;
    total: number;
    decvalue: number | '无' | '晚期' | '变异减速' | '其他' | '';
}
export interface INstdata {
    bhrscore: number;
    ltvscore: number;
    accdurationscore: number;
    accamplscore: number;
    fmscore: number;
    total: number;
    bhrvalue: number;
    ltvvalue: number;
    accdurationvalue: number;
    accamplvalue: number;
    fmvalue: number;
}
export interface IKrebsdata {
    ltvvalue: number;
    bhrscore: number;
    ltvscore: number;
    stvscore: number;
    accscore: number;
    decscore: number;
    fmscore: number;
    total: number;
    bhrvalue: number;
    ltvalue: number;
    stvvalue: number;
    accvalue: number;
    decvalue: string;
    fmvalue: number;
}
export interface IFischerdata {
    ltvvalue: number;
    bhrscore: number;
    ltvscore: number;
    stvscore: number;
    accscore: number;
    decscore: number;
    total: number;
    bhrvalue: number;
    ltvalue: number;
    stvvalue: number;
    accvalue: number;
    decvalue: string;
}
export interface ICstoctdata {
    bhrvalue: number;
    bhrscore: number;
    ltvvalue: number;
    ltvscore: number;
    sinusoidvalue: number | '有' | '无' | '';
    sinusoidscore: number;
    accvalue: number | '有' | '无' | '刺激胎儿后仍缺失' | '';
    accscore: number;
    ldvalue: number | '无' | '';
    vdvalue: number | '无' | '';
    edvalue: number | '无' | '';
    decscore: number;
    decvalue: number | 'LD' | 'VD' | 'ED' | '无' | '';
    ldscore: number;
    vdscore: number;
    edscore: number;
    total: number;
    result: TCtgAnalyseResultType;
}
export interface ctg_exams_analyse_score {
    type: string;
    sogcdata?: ISogcdata;
    ret: number;
    msg: string;
    cstdata?: ICstdata;
    nstdata?: INstdata;
    krebsdata?: IKrebsdata;
    fischerdata?: IFischerdata;
    cstoctdata?: ICstoctdata;
}
export interface ctg_exams_analyse_analysis {
    bhr: number;
    ltv: number;
    stv: number;
    edtimes: number;
    ldtimes: number;
    vdtimes: number;
    acc: AccPoint[];
    dec: DecPoint[];
    fm: number[];
    length: number;
    sinusoid: boolean;
    _fhr_uptime: number;
    _baseline_avg: number;
    _dec_num: number;
    _acc_num: number;
    fhrbaselineMinute: number[];
    ucdata: {
        ucIndex: number[];
        uctimes: number;
        ucStrong: number;
        uckeeptime: number;
        ucdurationtime: number;
    };
    start: number;
    end: number;
}
export {};


export interface IPv {
    id: 1
    visitTime: "2021-05-10T02:29:40.000Z"
    exam: { id: 1, note: "note999", fetalnum: 99 }
    pregnancy: { id: 3, name: "黄靖雅", gravidity: 1, parity: 0, gestationalWeek: "38+1", age: 19 }
}
export interface IPageData {
    page_total: number
    total: number
    result: IPv[]
}