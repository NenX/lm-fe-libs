export function inRange(value: number | string, min: number, max: number): boolean {
    let v = typeof value === 'string' ? Number(value) : value
    let result = false;
    if (v >= min && v <= max)
        result = true;
    return result;
}
export function getValue(v: number | string): any {
    const a = String(v)
    const modified = a.startsWith('00');
    return modified ? Number.parseInt(a) : false
}
export function isModified(v: any) {
    return typeof v === 'number'
}
export const emptyValue = {
    Sogc: {
        bhrscore: null,
        ltvvalue: null,
        ltvscore: null,
        accscore: null,
        accvalue: null,
        bhrvalue: null,
        decscore: null,
        decvalue: null,
        total: null,
        result: ''
    },


    Nst: {
        bhrscore: null,
        ltvscore: null,
        accdurationscore: null,
        accamplscore: null,
        fmscore: null,
        total: null,
        bhrvalue: null,
        ltvvalue: null,
        accdurationvalue: null,
        accamplvalue: null,
        fmvalue: null,
    },
    Krebs: {
        ltvvalue: null,
        total: null,
        bhrscore: null,
        ltvscore: null,
        stvscore: null,
        accscore: null,
        decscore: null,
        fmscore: null,
        bhrvalue: null,
        ltvalue: null,
        stvvalue: null,
        accvalue: null,
        decvalue: '',
        fmvalue: null,
    },
    Fischer: {
        ltvvalue: null,
        bhrscore: null,
        ltvscore: null,
        stvscore: null,
        accscore: null,
        decscore: null,
        total: null,
        bhrvalue: null,
        ltvalue: null,
        stvvalue: null,
        accvalue: null,
        decvalue: '',
    },
    Cstoct: {
        ldvalue: null,
        ldscore: null,
        vdscore: null,
        vdvalue: null,
        edscore: null,
        edvalue: null,
        bhrscore: null,
        ltvvalue: null,
        ltvscore: null,
        accscore: null,
        accvalue: null,
        bhrvalue: null,
        decscore: null,
        decvalue: null,
        sinusoidscore: null,
        sinusoidvalue: null,
        total: null,
        result: ''
    },
    Cst: {
        bhrscore: null,
        ltvvalue: null,
        ltvscore: null,
        stvscore: null,
        stvvalue: null,
        accscore: null,
        accvalue: null,
        bhrvalue: null,
        decscore: null,
        decvalue: null,
        total: null,
    }
}