export const sendCodeLocale = {
    initText: '获取验证码',
    runText: '{%s}秒后重新获取',
    resetText: '重新获取验证码',
}

// 获取格式化的模板文本
export function getTemplateText(runText: string, second: number): string {
    if (runText?.indexOf('{%s}') !== -1) {
        return runText.replace(/\{([^{]*?)%s(.*?)\}/g, second?.toString())
    } else {
        return runText
    }
}

export function fixedZero(val: number) {
    return val * 1 < 10 ? `0${val}` : val
}

/**
 * 倒计时初始化数据
 * @param target Date | number
 * @returns string
 */
export function initTime(target: Date | number) {
    let lastTime = 0
    let targetTime = 0
    try {
        if (Object.prototype.toString.call(target) === '[object Date]' && typeof target !== 'number') {
            targetTime = target.getTime()
        } else {
            targetTime = new Date(target).getTime()
        }
    } catch (e) {
        throw new Error('invalid target prop', e)
    }

    lastTime = targetTime - new Date().getTime()
    return lastTime < 0 ? 0 : lastTime
}

/**
 * 倒计时格式化显示
 * @param time number
 * @returns string
 */
export function defaultFormat(time: number) {
    const hours = 60 * 60 * 1000
    const minutes = 60 * 1000

    const h = Math.floor(time / hours)
    const m = Math.floor((time - h * hours) / minutes)
    const s = Math.floor((time - h * hours - m * minutes) / 1000)
    return `${fixedZero(h)}:${fixedZero(m)}:${fixedZero(s)}`
}

/**
 * 秒表计时器格式化显示
 * @param time number
 * @returns string
 */
export function timerFormat(time: number) {
    if (!time) {
        return `00:00:00`
    }
    return ``
}

/**
 * 实时时间显示格式 ’时钟‘
 * @param time number 时间
 * @param format string 显示格式
 * @returns string
 */
export function dateFormat(
    time: number,
    format: 'YYYY-MM-DD HH:mm:ss' | 'MM-DD HH:mm:ss' | 'HH:mm:ss' = 'YYYY-MM-DD HH:mm:ss',
    use12Hours?: boolean,
) {
    if (!time) {
        return ''
    }
    const datetime = new Date(time)
    let year = datetime.getFullYear()
    let month = datetime.getMonth() + 1
    let date = datetime.getDate()
    let hour = datetime.getHours()
    let minute = datetime.getMinutes()
    let second = datetime.getSeconds()
    let ampm = ''
    let hms = `${fixedZero(hour)}:${fixedZero(minute)}:${fixedZero(second)}`

    if (use12Hours) {
        ampm = hour >= 12 ? 'PM' : 'AM'
        hour = hour % 12 || 12
        hms = `${fixedZero(hour)}:${fixedZero(minute)}:${fixedZero(second)} ${ampm}`
    }
    let result = `${year}/${fixedZero(month)}/${fixedZero(date)} ${hms}`
    if (format && format === 'MM-DD HH:mm:ss') {
        result = `${fixedZero(month)}/${fixedZero(date)} ${hms}`
    }
    if (format && format === 'HH:mm:ss') {
        result = hms
    }
    return result
}
