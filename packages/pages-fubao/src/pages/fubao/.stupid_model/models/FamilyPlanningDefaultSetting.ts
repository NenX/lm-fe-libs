
import { ModelService } from '../ModelService'


export interface IModel_FamilyPlanningDefaultSetting {
    cancelReservation: number,
    deleteFlag: number,
    familyPlanningDefaultSettingDetails: [
        {
            attendanceSet: number,
            cervicalSurgery: number,
            cervicalSurgeryNum: number,
            deleteFlag: number,
            dilatationAndCurettage: number,
            dilatationAndCurettageNum: number,
            hysteroscopicSurgery: number,
            hysteroscopicSurgeryNum: number,
            id: number,
            inducedAbortion: number,
            inducedAbortionNum: number,
            putInIntrauterineDevice: number,
            putInIntrauterineDeviceNum: number,
            takeOutIntrauterineDevice: number,
            takeOutIntrauterineDeviceNum: number,
            totalNumOfDay: number,
            uterineFallopianTubeFluid: number,
            uterineFallopianTubeFluidNum: number,
            uterosalpingography: number,
            uterosalpingographyNum: number,
            vaginoscopy: number,
            vaginoscopyNum: number,
            vulvarCystStoma: number,
            vulvarCystStomaNum: number,
            whatDay: string
        }
    ],
    id: number,
    reservationTime: number,
    statutoryHoliday: number,
    statutoryHolidayRepair: number
}

export const SModel_FamilyPlanningDefaultSetting = new ModelService<IModel_FamilyPlanningDefaultSetting>({
    n: 'FamilyPlanningDefaultSetting',
    addictionalParams: { deleteFlag: 0 },
    prePath: '/family/planning',

},)
