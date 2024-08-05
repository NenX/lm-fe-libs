import { request } from "@lm_fe/utils";
import { IMchc_NursingBoard_Data, IMchc_NursingBoard_InsideData, IMchc_NursingBoard_SignFrequencySetting, IMchc_NursingBoard_TodayWatchKeeper } from "./types";
export * from './types'


class NursingBoard {
    async nursingBoardInside() {
        const res = await request.get<IMchc_NursingBoard_InsideData>('/api/nursingBoardInside')
        return res.data
    }
    async getTodayWatchKeepers() {
        const res = await request.get<IMchc_NursingBoard_TodayWatchKeeper>('/api/getTodayWatchKeepers ')
        return res.data
    }
    async getNursingBoardData() {
        const { data } = await request.get<IMchc_NursingBoard_Data>('/api/getNursingBoardData');
        // data.patients = Array(9).fill(data.patients[0])
        return data;
    }

    async setTodayWatchKeepers(data: Partial<IMchc_NursingBoard_TodayWatchKeeper>) {
        const res = await request.put<IMchc_NursingBoard_TodayWatchKeeper>('/api/setTodayWatchKeepers', data);
        return res.data;
    }
    async getSignFrequencySetting() {
        const res = await request.get<IMchc_NursingBoard_SignFrequencySetting>('/api/getSignFrequencySetting')
        return res.data
    }
    async updateSignFrequencySetting(data: Partial<IMchc_NursingBoard_SignFrequencySetting>) {
        const res = await request.put<IMchc_NursingBoard_SignFrequencySetting>('/api/updateSignFrequencySetting', data);
        return res.data;
    }
}

export const SMchc_NursingBoard = new NursingBoard()