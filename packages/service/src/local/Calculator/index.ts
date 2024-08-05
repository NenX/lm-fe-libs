import { formatDate, request } from "@lm_fe/utils";
import moment from "moment";




export const SLocal_Calculator = {

    // 根据末次月经计算预产期B超
    async calcEddBasedOnLmp(lmp: string) {
        const { data } = await request.get<string>(`/api/pregnancyCalc-calcEddByLmp?lmp=${lmp}`);
        return data //2023-11-12
    },
    // 根据IVF计算预产期B超
    async calcEddBasedOnIVF(移植时间: string, 天数: number) {
        const 孕0 = moment(移植时间).subtract(14 + 天数, 'days')
        const 预产期B超时间 = 孕0.add(280, 'days')

        return formatDate(预产期B超时间)
    }
}