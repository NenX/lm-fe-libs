
import moment, { Moment, isMoment } from 'moment'

type TInput = moment.MomentInput


function getFn<T extends string>(format: T,) {
    return Object.assign((s?: TInput) => {
        const a = moment(s)
        return a.isValid() ? a.format(format) : null
    }, { format })
}

export function getMomentObj(s: TInput) {
    return moment(s)
}

export const formatDate = getFn('YYYY-MM-DD')

export const formatDateTime = getFn('YYYY-MM-DD HH:mm:ss')

export const formatDateTimeNoSecond = getFn('YYYY-MM-DD HH:mm')

export const formatTime = getFn('HH:mm:ss')


export function getMomentRange() {
    return {
        昨天: [moment().add(-1, 'day'), moment().add(-1, 'day')] as [Moment, Moment],
        今天: [moment(), moment()] as [Moment, Moment],
        明天: [moment().add(1, 'day'), moment().add(1, 'day')] as [Moment, Moment],
        这个星期: [moment().subtract(7, 'day'), moment()] as [Moment, Moment],
        这个月: [moment().startOf('month'), moment().endOf('month')] as [Moment, Moment],
        下个星期: [moment().add(1, 'day'), moment().add(7, 'day')] as [Moment, Moment],
    }
}


export { isMoment, }
