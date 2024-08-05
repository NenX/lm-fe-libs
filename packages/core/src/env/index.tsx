import { mchcBoot, mchcLogger, mchcStore, MchcTypes } from "@lm_fe/env";
import { IMchc_User, SMchc_Common, SMchc_User } from "@lm_fe/service";
import { appEnv, EventEmitter, makeEventStore } from "@lm_fe/utils";
import React, { FunctionComponentElement } from 'react'
import { configCustomIcon } from '@lm_fe/components_m'
import ReactDOM from 'react-dom'
import { MountMchcModal } from "@lm_fe/components_m";
import { MchcRouterContainer } from '@lm_fe/env'
import { mchcRoutes } from '@lm_fe/pages-mchc'
import { fubaoRoutes } from '@lm_fe/pages-fubao'
import { keys } from "lodash";
import { runTask } from "./tasks";
import { Store } from 'redux';

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
export async function boot(config: {
    store?: Store
    app?: FunctionComponentElement<any> | FunctionComponentElement<any>[],
    App?: React.ComponentType<{ routerContainer?: MchcRouterContainer }>,
    scriptUrl?: any,
    name?: MchcTypes,
    taskDisabled?: boolean,
    routesData?: { [x: string]: any }
}) {
    const { scriptUrl, name, app, App = () => null, routesData = {}, taskDisabled, store } = config
    mchcLogger.log('mchcLogger', config)
    configCustomIcon(scriptUrl)
    await mchcBoot(name)
    if (!taskDisabled)
        runTask()
    const mixinRoutes = { ...mchcRoutes, ...fubaoRoutes }
    const oldKeys = keys(routesData)
    const mixinKeys = keys(mixinRoutes)
    const sameKeys = oldKeys.filter(_ => mixinKeys.includes(_))
    sameKeys.forEach(_ => {
        routesData[`${_}_old`] = routesData[_]
    })
    const _routerContainer = new MchcRouterContainer({ ...routesData, ...mixinRoutes })
    const _app = app ?? <App routerContainer={_routerContainer} />
    if (store) {
        mchcStore.store = store
    }
    ReactDOM.render(
        <>
            {_app}
            <MountMchcModal />
        </>,
        document.getElementById('root')
    );


}
