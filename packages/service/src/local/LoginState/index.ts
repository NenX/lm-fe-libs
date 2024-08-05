import { mchcEnv, mchcStore, mchcUtils } from "@lm_fe/env"
import { IMchc_User } from "../../mchc"
import { SLocal_SystemConfig } from "../SystemConfig"








export const SLocal_State = {
  getUserData() {
    const store = mchcStore.state

    return store?.user?.userData as IMchc_User
  },
  get userData() {
    const store = mchcStore.state
    return store?.user?.userData as IMchc_User
  },
  get isDev() {
    const isTestMode = SLocal_SystemConfig.get('systemMode') === 'test'
    return mchcEnv.isDev || isTestMode
  },
  get isAdmin() {
    const u = this.getUserData()
    const state = u.groups?.some?.(_ => _.name?.toUpperCase() === 'ADMIN') ?? false
    return !!state
  }

}