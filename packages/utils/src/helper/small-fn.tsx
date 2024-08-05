import { Moment } from "moment";
import { formatDate, formatDateTime } from "./moment-help";
import { isBoolean, isFunction, isNil, isNumber, isObject, toNumber, toString } from "lodash";

export type TCommonFileType = 'application/vnd.ms-excel' | 'text/csv;charset=utf-8' | 'application/msword'
export function sleep(sec: number) {
    return new Promise((resolve) => setTimeout(resolve, sec * 1000))
}

export function getSearchParamsValue(key: string) {
    const url = new URL(location.toString())
    return url?.searchParams?.get(key) ?? null
}
export function getSearchParamsAll(url?: URL) {
    const _url = url ?? new URL(location.href);
    const searchParams = _url ?
        [..._url.searchParams.entries()]
            .reduce((a, b) => Object.assign(a, { [b[0]]: b[1] }), {})
        : {}
    return searchParams as { [x: string]: string }
}

export function unmarshalGestationWeek(weekStr?: string) {
    const result = {
        week: 0,
        day: 0
    }
    if (!weekStr) return result
    const arr = weekStr.split('+')
    result.week = parseInt(arr[0] || '0')
    result.day = parseInt(arr[1] || '0')
    return result
}
export function marshalGestationWeek(week?: string | number, day?: string | number) {
    if (!week && !day) {
        return '0'
    }
    week = week ?? '0'
    day = day ? `+${day}` : ''
    return `${week}${day}`
}

export function getTimeSlice(hour = 24, isShowSecond = false) {
    const hourArr = Array(hour).fill(0) as number[]
    const minuteArr = Array(60).fill(0) as number[]
    return hourArr.reduce((sum, h, hIdx) => {
        return [...sum, ...minuteArr.map((m, mIdx) => `${hIdx}:${mIdx}`)]
    }, [] as string[])
}

export function scrollIntoView(symbol: string, finder: (selectors: string) => Element | null = document.querySelector.bind(document)) {
    const dom = finder(symbol);
    const scrollIntoViewIfNeeded = (dom as any)?.scrollIntoViewIfNeeded as () => {} | null
    if (scrollIntoViewIfNeeded) {
        scrollIntoViewIfNeeded.call(dom)
    } else {
        dom?.scrollIntoView({ behavior: 'smooth' });
    }

}

export function base64ToBinary(data: string, type: TCommonFileType) {
    const raw = window.atob(data);
    const uInt8Array = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type });
}
export function downloadFile(content: string | Blob, filename = '问卷答题情况.xlsx', type: TCommonFileType = 'application/vnd.ms-excel', isBase64 = false) {
    var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    var blob = typeof content === 'string' ? (isBase64 ? base64ToBinary(content, type) : new Blob([content], { type })) : content;
    eleLink.href = URL.createObjectURL(blob);
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
};

export function uuid() {
    var temp_url = URL.createObjectURL(new Blob());
    var uuid = temp_url.toString();
    URL.revokeObjectURL(temp_url);
    return uuid.slice(uuid.lastIndexOf("/") + 1);
}

export function randomHex() {
    const hex = ~~(Math.random() * 16)
    return hex
}

export function charToUTF8(char: string) {
    const encoder = new TextEncoder()
    const uint8Array = encoder.encode(char[0])
    return Array.from(uint8Array)
}

export function charToUnicode(char: string) {
    let u = char.charCodeAt(0)
    const u1 = char.charCodeAt(0)
    const u2 = char.charCodeAt(1)

    if (u1 >= 0xD800 && u1 <= 0xDBFF && u2 >= 0xDC00 && u2 <= 0xDFFF) {
        u = (((u1 - 0xD800) << 10) | (u2 - 0xDC00)) + 0x10000;
    }
    return u
}
export function unicodeToChar(u: number) {

    let arr //utf8;
    if (u <= 0x7F) {
        arr = [u & 0xFF]
    }
    else if (u <= 0x07FF) {

        arr = [((u >> 6) & 0x1F) | 0xC0, (u & 0x3F) | 0x80]
    }
    else if (u <= 0xFFFF) {
        arr = [
            ((u >> 12) & 0x0F) | 0xE0,
            ((u >> 6) & 0x3F) | 0x80,
            (u & 0x3F) | 0x80
        ]

    }
    else if (u <= 0x10FFFF) {
        arr = [
            ((u >> 18) & 0x07) | 0xF0,
            ((u >> 12) & 0x3F) | 0x80,
            ((u >> 6) & 0x3F) | 0x80,
            (u & 0x3F) | 0x80
        ]
    }
    if (!arr) return null
    const decoder = new TextDecoder();
    const ui8 = new Uint8Array(arr)
    return decoder.decode(ui8)
}


function formatRangeMoment(data: { [x: string]: Moment[] | null }, formater: (v: Moment) => string | null, cKeys: string[],) {
    const entries = Object.entries(data)
    return entries.reduce((a, [k, v], idx) => {
        if (!v) return a
        return {
            ...a,
            [`${k}.${cKeys[0]}`]: formater(v[0]),
            [`${k}.${cKeys[1]}`]: formater(v[1]),
        }
    }, {} as { [x: string]: string | null })
}
export function formatRangeDate(data: { [x: string]: Moment[] | null }, cKeys = ['greaterOrEqualThan', 'lessOrEqualThan']) {
    return formatRangeMoment(data, formatDate, cKeys)
}
export function formatRangeDateTime(data: { [x: string]: Moment[] | null }, cKeys = ['greaterOrEqualThan', 'lessOrEqualThan']) {
    return formatRangeMoment(data, formatDateTime, cKeys)
}

export function getFilledArray(n: number): any[] {
    return Array(n).fill(0);
}

export function copyText(text: string) {
    var textareaC = document.createElement('textarea');
    textareaC.setAttribute('readonly', 'readonly');
    textareaC.value = text;
    document.body.appendChild(textareaC);
    textareaC.select();
    var res = document.execCommand('copy');
    document.body.removeChild(textareaC);
    console.log("复制成功");
    return res;
}




export function safeExec<T extends (...args: any) => any>(fn?: T, ...args: Parameters<T>[]) {
    return isFunction(fn) ? fn(...args) : null
}

export function safeGetFromFuncOrData(fn: any) {
    return safeExec(fn) ?? fn
}

export function numberLikeCompare(a: number | string | boolean, b: number | string | boolean) {
    if (a === b) return true
    if (isNil(a) || isNil(b)) return false
    if (isObject(a) || isObject(b)) return false
    if (isBoolean(a) && !isBoolean(b)) return false
    if (isBoolean(b) && !isBoolean(a)) return false
    if (toNumber(a) === toNumber(b)) return true
    if (toString(a) === toString(b)) return true
    return false
}

export function warpBase64Type(str: string, type: 'img' | 'pdf') {
    if (!str) return str
    if (type === 'img') {
        return str.startsWith('data:image/png;base64,') ? str : `data:image/png;base64,${str}`
    }
    if (type === 'pdf') {
        return str.startsWith('data:application/json;base64,') ? str : `data:application/json;base64,${str}`
    }
    return str
}

export function safe_number_parse(value: any, defaultValue = NaN) {
    if (isNumber(value) && !isNaN(value)) return value
    const rawParse = Number(value)
    return isNaN(rawParse) ? defaultValue : rawParse
}

export function expect_array<T>(value?: T[]) {
    if (!Array.isArray(value)) return []
    return value
}

// 生成包含字符的 svg 转义字符串
export function gen_encoded_char_svg(props: { char: string, size?: number, color?: string }) {
    const { char, size = 12, color = 'cc0000' } = props
    const _color = color?.startsWith('#') ? color.slice(1) : color
    return `data:image/svg+xml,%3Csvg 
    width='${size + 2}' height='${size + 2}' 
    xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%25' y='50%25' 
    font-size='${size}' 
    fill='%23${_color}' 
    font-weight='bold'
    text-anchor='middle' 
    dominant-baseline='middle'%3E${char}%3C/text%3E%3C/svg%3E`
}

export function base64_to_image(base64img: string) {
    return new Promise<HTMLImageElement | null>((res, rej) => {
        if (!base64img) res(null)
        var img = new Image();
        img.onload = function () {
            res(img);
        };
        img.src = base64img;
    })

}
export function image_to_base64(img_el: HTMLImageElement) {
    if (!img_el) return null
    const c = document.createElement('canvas')
    c.width = img_el.width
    c.height = img_el.height
    const ctx = c.getContext('2d')
    ctx?.drawImage(img_el, 0, 0, img_el.width, img_el.height)
    const base64 = c.toDataURL('image/png')
    return base64

}