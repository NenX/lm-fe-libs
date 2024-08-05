import { ALLOW_CALC_EDD_BASED_ON_IVF, GetAgeByBirthDay, getBMI, mchcModal } from "@lm_fe/components_m";
import { ICommonOption, mchcLogger, mchcUtils } from "@lm_fe/env";
import { SLocal_Calculator, SLocal_History, SLocal_State, SMchc_Common } from "@lm_fe/service";
import { formatDate } from "@lm_fe/utils";
import { FormInstance, message } from "antd";
import { get, includes, keys, size, values } from "lodash";
import moment from "moment";


// Form onValuesChange
export async function archivalInformation_onValuesChange(changedValues: any, allValues: any, form: FormInstance, setRequiredKeys: (v: { [x: string]: boolean }) => void) {


    const { __key, __value } = getKeyAndValue(changedValues)
    mchcLogger.log('vv changedValues', __key, __value, changedValues)

    const is既往史一键勾选 = __key === '既往史一键勾选'
    const is是否缴费 = __key === 'baseInfo.payment'
    const is身份证 = __key === 'baseInfo.idNO'
    const is出生日期 = __key === 'baseInfo.dob'
    const is末次月经 = __key === 'pregnancyInfo.lmp'
    const is受孕方式 = __key === 'pregnancyInfo.conceiveMode__'
    const is婚姻状况 = __key === 'baseInfo.maritalStatus'

    const is高危因素 = __key === 'highRiskInfo.highriskGrade'
    const is转入登记整体 = __key === 'referralInInfo'
    const is转入登记原单位id = __key === 'referralInInfo.organizationId'



    const is孕前体重 = __key === 'pregnancyInfo.preweight'
    const is孕前身高 = __key === 'pregnancyInfo.preheight'

    const is丈夫身份证 = __key === 'partnerInfo.partnerIdNO'
    const is丈夫出生日期 = __key === 'partnerInfo.partnerDob'


    // if (is既往史一键勾选) {
    //     const pregnancyInfo = 既往史一键勾选keys().reduce((sum, a) => {
    //         return { ...sum, [a!]: __value ? JSON.stringify([{ value: 0 }]) : undefined }
    //     }, {})
    //     mchcLogger.log('nurse_既往史_keys', 既往史一键勾选keys(), pregnancyInfo)

    //     form.setFieldsValue({ pregnancyInfo })
    // }



    if (is是否缴费) {
        // 获取服务器端时间
        // console.log('time', await request.get(`api/current-time`));
        const paymentDate = __value ? (await SMchc_Common.currentTime()) : undefined

        form.setFieldsValue({
            baseInfo: { paymentDate, },
        });
    }

    if (
        is身份证 && get(allValues, 'baseInfo.idType') === 1 &&
        size(__value?.replace(/\s*/g, '')) === 18
    ) {


        const computedData = mchcUtils.checkIdNo_new(__value)

        if (computedData) {
            form.setFieldsValue({
                baseInfo: {
                    // dob: moment(`${idNO.substr(6, 4)}-${idNO.substr(10, 2)}-${idNO.substr(12, 2)}`),
                    dob: computedData.birth,
                    nationality: computedData.nationality,
                    nativeplace: computedData.province,
                    age: computedData.age,
                },
            });
        } else {
            message.error('请输入符合规范的身份证号码！');
        }
    }
    if (is出生日期 && __value) {
        form.setFieldsValue({ baseInfo: { age: GetAgeByBirthDay(__value) } });
    }



    if (
        is丈夫身份证 && get(allValues, 'partnerInfo.partnerIdType') === 1 &&
        size(__value?.replace(/\s*/g, '')) === 18
    ) {
        const computedData = mchcUtils.checkIdNo_new(__value)
        if (computedData) {

            form.setFieldsValue({
                partnerInfo: {
                    // dob: moment(`${idNO.substr(6, 4)}-${idNO.substr(10, 2)}-${idNO.substr(12, 2)}`),
                    partnerDob: computedData.birth,
                    partnerNationality: computedData.nationality,
                    partnerNativeplace: computedData.province,
                    partnerAge: computedData.age,
                },
            });
        } else {
            message.error('请输入符合规范的身份证号码！');
        }
    }

    if (is丈夫出生日期 && __value) {
        form.setFieldsValue({ partnerInfo: { age: GetAgeByBirthDay(__value) } });
    }


    if (is末次月经 && get(allValues, `pregnancyInfo.conceiveMode.key`) !== 1) {
        const lmp = formatDate(get(changedValues, 'pregnancyInfo.lmp'))!;
        const value = await SLocal_Calculator.calcEddBasedOnLmp(lmp);

        form.setFieldsValue({
            pregnancyInfo: {
                edd: moment(value),
                sureEdd: moment(value),
            },
        });
    }

    if (
        (is孕前体重 && __value && get(allValues, 'pregnancyInfo.preheight')) ||
        (is孕前身高 && __value && get(allValues, 'pregnancyInfo.preweight'))
    ) {
        const bmi = getBMI(get(allValues, 'pregnancyInfo.preweight'), get(allValues, 'pregnancyInfo.preheight'));
        form.setFieldsValue({ pregnancyInfo: { bmi: bmi } });
    }

    if (is转入登记整体 && __value) {
        __value.recorder = __value.recorder || SLocal_State.getUserData()?.firstName
        __value.referralDate = __value.referralDate || formatDate()
        form.setFieldsValue({
            referralInInfo: __value
        });

    }

    if (is转入登记原单位id) {


        const organization = await SMchc_Common.getReferralOrganizations({ id: __value })

        const currentOrganization = await SMchc_Common.getCurrReferralOrganization()
        const selectGrade = organization[0]?.grade;
        const currentGrade = currentOrganization?.grade;
        const direction = currentGrade === selectGrade ? 1 : currentGrade > selectGrade ? 2 : 3;

        form.setFieldsValue({
            referralInInfo: {
                referralDirection: direction,
            },

        });
    }
    if (is婚姻状况) {
        const keys = ['partnerInfo.partnerName', 'partnerInfo.partnerTelephone', 'partnerInfo.partnerTelephone']
        if (includes([1, 4], __value)) {
            setRequiredKeys(keys.reduce((s, k) => ({ ...s, [k]: true }), {}))
        } else {
            setRequiredKeys(keys.reduce((s, k) => ({ ...s, [k]: false }), {}))

        }
    }


    if (is受孕方式) {
        const data = __value as ICommonOption[]
        const checkedValues = data?.[0]?.value
        const textArr: any[] = data?.[0]?.text ?? []
        const 移植时间 = textArr[0]
        const 天数 = textArr[1] ?? 0
        const 胚胎数 = textArr[2] ?? 0
        const isIVF = checkedValues === 1

        if (isIVF && 移植时间) {

            const value = await SLocal_Calculator.calcEddBasedOnIVF(移植时间, 天数)
            console.log('vv is受孕方式', value)
            mchcModal.confirmOnce({
                title: '根据胚胎移植时间，是否调整预产期B超时间？',
                storeKey: ALLOW_CALC_EDD_BASED_ON_IVF,
                cb: () => form?.setFieldsValue({
                    pregnancyInfo: {
                        sureEdd: value,
                    },
                })
            })
        }
    }
};
function getKeyAndValue(changedValues: any) {
    const key1 = keys(changedValues)[0]
    const value1 = values(changedValues)[0]
    const value1KeysArr = keys(value1)
    if (value1KeysArr.length > 1) {
        return { __key: key1, __value: value1 }
    }
    const key2 = value1KeysArr[0]
    const __key = [key1, key2].filter(_ => _).join('.')
    const __value = get(changedValues, __key)

    return { __key, __value }
}
export function archivalInformation_onPrint(id: any) {
    mchcModal.open('print_modal', {
        modal_data: {
            requestData: {
                url: '/api/pdf-preview',
                resource: 'prenatalVisit',
                template: '',
                version: '',
                note: '',
                id,
            }
        }
    })
}
export function archivalInformation_onClose() {

    SLocal_History.closeAndReplace('/prenatal-visit/pregnancy/list')
}

