import { mchcLogger } from "src/logger"

interface IMacro {
    appName: any
    devMode: false,
    WITH_THEME: "true",
    PUBLIC_PATH: "/",
    API_PREFIX: "/",
    PACKAGE_VERSION: "1.3.55",
    check_version: string,
    BUILDINFO: {
        commit: "4e6470a58b669cc3902ece41b35068ab422f856c",
        commitUserName: "brainfuck",
        commitUserMail: "abc.dev@gmail.com",
        commitDate: "2022-10-17 17:2",
        buildUserName: "brainfuck",
        buildUserMail: "abc.dev@gmail.com",
        buildDate: "2022-10-19 17:55",
        branch: "gysy-from-p9"
    }
    HOST_URL: string
}


let macroCache: Partial<IMacro>
function getMacro() {
    if (!macroCache) {
        try {
            macroCache = APP_MACRO as IMacro
        } catch (e) {
            mchcLogger.error('failed to load mchcMacro from APP_MACRO')
        }
    }
    if (!macroCache) {
        try {
            macroCache = process.env as unknown as IMacro
        } catch (e) {
            mchcLogger.error('failed to load mchcMacro from process.env')
        }
    }
    macroCache = macroCache ?? {}
    return macroCache
}
export function getMacroValue<T extends keyof IMacro>(key: T) {
    let data = getMacro()
    return data[key]
}
export function isDev() {
    try {
        return __DEV__
    } catch (e) {
        return false
    }
}
export function getMonacoLoaderPath() {
    return `${getMacroValue('PUBLIC_PATH')}lib/monaco-editor@0.36.1/min/vs`
}
export const mchcMacro = getMacro()