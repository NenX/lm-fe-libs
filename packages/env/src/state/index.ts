// import { Dispatch } from 'redux';
import { Store } from 'redux';

import { filter, get } from 'lodash';
import { mchcConstant } from 'src/constant';
import { getSameOptions } from 'src/select_options';
import { initDictionary } from './actions/dictionaries';
import { getPregnancyData } from './actions/prenatal-visit';
import { getSystemConfig, updateSystemConfig } from './actions/system';
import { deleteAllTabs, deleteTab } from './actions/tabs';
import { IState, ISystemConfig } from './types';
import { MyLog } from '@lm_fe/utils';
export * from './types';
class MchcStore {
    logger = new MyLog('MchcStore')

    private _store!: Store;
    get store(): Store {
        return this._store;
    }
    set store(value: Store) {
        this._store = value;
    }
    __getState!: () => IState
    __getDispatch!: () => Store['dispatch']
    get state() {
        if (this.__getState) return this.__getState()
        if (!this._store) {
            this.logger.warn('为设置 store')
            return {} as IState
        }
        return this._store.getState() as IState
    }
    get dispatch() {
        if (this.__getDispatch) return this.__getDispatch()

        if (!this._store) {
            this.logger.warn('为设置 store')
            return (() => { }) as Store['dispatch']
        }
        return this._store.dispatch

    }
    initDictionary() {
        return initDictionary()(this.dispatch)
    }
    deleteAllTabs() {
        return deleteAllTabs()(this.dispatch)
    }
    deleteCurrentTab() {
        const key = this.state.tabs.activeKey
        return deleteTab(key)(this.dispatch)
    }
    getSystemConfig() {
        return getSystemConfig()(this.dispatch)
    }
    updateSystemConfig(data: any) {
        return updateSystemConfig(data)(this.dispatch)
    }
    getPregnancyData(data: any) {
        return getPregnancyData(data)(this.dispatch)
    }
    get highriskContagionConfig() {
        const dictionaries = this.state.dictionaries
        const system = this.state.system
        const highriskVersion = get(system, 'config.highriskVersion');
        const initDictionaries = get(dictionaries, 'initDictionaries');
        const contagionDic = filter(
            initDictionaries,
            (item) => item.key === 'highriskContagion' && item.type === highriskVersion,
        )[0]?.enumerations?.[0]
        return {
            color: get(contagionDic, 'note'),
            options: getSameOptions(get(contagionDic, 'label'))
        }

    }
    get highriskGradeConfig() {
        const dictionaries = this.state.dictionaries
        const system = this.state.system
        const highriskVersion = get(system, 'config.highriskVersion') as 22
        const initDictionaries = get(dictionaries, 'initDictionaries');
        const gradeDic = filter(initDictionaries, (item) => item.key === 'highriskGrade' && item.type === highriskVersion)[0]

        const colors = mchcConstant.levelOptionsobj[highriskVersion]

        const a = get(gradeDic, 'enumerations')
        const enums = a.map(_ => {
            const colorConfig = colors.find(c => c.value === _.label)
            return { ..._, colorText: colorConfig?.label! }
        })
        return enums

    }
}
class MchcConfig {

    get<T extends keyof ISystemConfig>(key: T) {
        return this.getAll()?.[key]
    }
    getAll() {
        const state = mchcStore.state
        const config = state?.system?.config
        return config
    }

}
export const mchcStore = (window as any).mchcStore = new MchcStore
export const mchcConfig = (window as any).mchcConfig = new MchcConfig
