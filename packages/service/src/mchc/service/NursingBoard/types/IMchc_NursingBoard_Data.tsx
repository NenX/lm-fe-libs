interface IMchc_NursingBoard_Times {
    "QD": string[]	//一天一次

    "BID": string[]  //一天两次

    "QID": string[]  //一天三次

    "TID": string[] //一天四次

}
export interface IMchc_NursingBoard_Patient {
    nurseLevel: "Ⅰ"  //护理等级
    name: "test"		//病人姓名
    bedno: "21"		//病人床号
    inpatientno: "2234"
    abnormalIdxs: 	//渲染床位卡片中异常护理指标数据
    {
        inpatientno: "2234"
        idxName: "体温" //指标名称
        idxValue: "41"	//指标值
        idxUnit: "℃"	//指标单位
        idxTime: null,
        _error: boolean
    }[]
}
export interface IMchc_NursingBoard_Data {
    //渲染左侧床位一览所需数据
    patients: IMchc_NursingBoard_Patient[]
    //渲染中间底部医嘱信息 数据
    orders: {
        "orderName": "病重",  //医嘱名称
        "toexeBeds": string[]	//对应床号列表

    }[]
    //渲染病房统计所需数据
    stats: {
        "statsName": "今日入院", //统计名称
        "value": 10				//统计值
    }[]
    //渲染右侧 病区换床信息所需数据
    changeBeds: {
        "oldbed": "1",		//原来床位
        "curbed": "21"		//现在床位
    }[]
    //渲染血糖测量工作统计 所需数据
    bloodGlucose: IMchc_NursingBoard_Times
    bloodPressure: IMchc_NursingBoard_Times //渲染血压测量工作统计 所需数据

    pulse: IMchc_NursingBoard_Times //渲染脉搏测量工作统计 所需数据

    temperature: IMchc_NursingBoard_Times //渲染体温测量工作统计 所需数据

}