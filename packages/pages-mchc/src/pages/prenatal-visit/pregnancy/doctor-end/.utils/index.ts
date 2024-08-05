import { mchcEnv } from '@lm_fe/env'
import { IMchc_Doctor_Diagnoses, IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit } from '@lm_fe/service'
import { getSearchParamsValue } from '@lm_fe/utils'

export function filter_diagnoses(diagnoses?: IMchc_Doctor_Diagnoses[]) {
    if (!diagnoses) return []

    const serialNo = getSearchParamsValue('serialNo')
    if (!serialNo) return diagnoses
    const filterData = mchcEnv.is('广三')
        ? diagnoses.filter(_ => {
            if (!_.serialNo) return true
            return _.serialNo === serialNo
        })
        : diagnoses
    // 暂时不过滤
    return diagnoses ?? filterData
}



