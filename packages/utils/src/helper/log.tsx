import { isFunction } from "lodash"
import { formatDateTime } from "./moment-help"
const colorMap = {
    'log': '#1475b2',
    'warn': '#f89c1e',
    'error': '#ed7961'
}
interface ILL {
    log?(...optionalParams: any[]): void
    warn?(...optionalParams: any[]): void
    error?(...optionalParams: any[]): void
}
export function logMsg(env: string, type: keyof typeof colorMap = 'log', ...msg: any[]) {
    console[type](
        `%c ${env} %c ${formatDateTime()} `,
        `padding: 1px; border-radius:3px 0 0 3px; color: #fff; background: ${colorMap[type]};`,
        "padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: #606060;",
        ...msg
    )
}
export class MyLog {
    private _logMsg(type: keyof typeof colorMap = 'log', ...msg: any[]) {
        const fn = MyLog._handler?.[type]
        if (!fn || !isFunction(fn)) return
        fn(
            `%c ${this.env} %c ${formatDateTime()} `,
            `padding: 1px; border-radius:3px 0 0 3px; color: #fff; background: ${colorMap[type]};`,
            "padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: #606060;",
            ...msg
        )
    }
    private env: string
    private static _handler: ILL = console
    public static set handler(v: ILL) {
        if (!v) return

        MyLog._handler = {
            ...MyLog._handler,
            ...v,
        }

    }



    constructor(e: string) {
        this.env = e
    }
    log(...msg: any[]) {
        this._logMsg('log', ...msg)
    }
    warn(...msg: any[]) {
        this._logMsg('warn', ...msg)
    }
    error(...msg: any[]) {
        this._logMsg('error', ...msg)
    }
    time(label: string, type = 'time') {
        console[type](label)
    }
    timeEnd(label: string, type = 'timeEnd') {
        console[type](label)
    }
}

MyLog.handler = console

