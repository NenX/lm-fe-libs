export interface IMchc_NursingBoard_TodayWatchKeeperPeople {
    "id": number
    "name": string
    "telephone": string
}
export interface IMchc_NursingBoard_TodayWatchKeeper {
    "firstDoctors": IMchc_NursingBoard_TodayWatchKeeperPeople[]//一线医生
    "secondDoctors": IMchc_NursingBoard_TodayWatchKeeperPeople[]//二线医生
    "masterDoctors": IMchc_NursingBoard_TodayWatchKeeperPeople[]//值班总
    "labourRoomNurses": IMchc_NursingBoard_TodayWatchKeeperPeople[]//待产病区护士
    "fourFloorNurses": IMchc_NursingBoard_TodayWatchKeeperPeople[]//四楼护士
    "fiveFloorNurses": IMchc_NursingBoard_TodayWatchKeeperPeople[]//5楼护士
    "midlifeNurses": IMchc_NursingBoard_TodayWatchKeeperPeople[]//助产室护士
    //值班总护士
    "masterNurses": IMchc_NursingBoard_TodayWatchKeeperPeople[]


}