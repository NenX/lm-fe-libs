import { AppEnv } from "@lm_fe/utils";
import { getMacroValue } from "../macro";
import { getPresetOptions } from "../select_options";
import { MchcTypes } from "./type";

export const allEnvNames: MchcTypes[] = ['临洮', '华医', '南医增城', '广三', '越秀妇幼', '建瓯']



class MchcEnv<T> extends AppEnv<T> {
    constructor(appName?: T) {
        super(appName)
    }
    public get appName() {
        return super.appName;
    }
    public set appName(value: T | undefined) {
        super.appName = value;
    }
    getOptions = getPresetOptions
    allEnvNames = allEnvNames
}

export const mchcEnv = (window.mchcEnv = new MchcEnv<MchcTypes>(getMacroValue('appName') ?? 'mchc'))
