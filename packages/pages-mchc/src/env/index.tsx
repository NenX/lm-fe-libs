import { IMchc_User, SMchc_Common, SMchc_User } from "@lm_fe/service";
import { appEnv, makeEventStore } from "@lm_fe/utils";
export interface IGlobalStoreData {
    loggedIn: boolean
    user?: IMchc_User
}
export const globalStore = makeEventStore<IGlobalStoreData>(appEnv.appName)
export async function passwordLogin(data: Parameters<typeof SMchc_Common.fk_login>[0]) {
    await SMchc_Common.fk_login(data)
    const user = await SMchc_User.getOne(data.username)
    globalStore.bus.data = { user, loggedIn: true }
}
export async function logout() {
    appEnv.removeToken()
    globalStore.bus.data = { user: undefined, loggedIn: false }
}
