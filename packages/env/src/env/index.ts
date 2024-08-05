import { isDev } from "../macro";
import { mchcEnv } from "./MchcEnv";
import { MchcTypes } from "./type";
export * from './MchcEnv';
export * from './type';



export function mchcBoot(name?: MchcTypes) {
    if (name) {
        mchcEnv.appName = name
    }
    mchcEnv.isDev = isDev()
    // do other async work here
    return new Promise((res, rej) => {
        res(null)
    })
}

