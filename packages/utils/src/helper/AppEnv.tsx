import store from "store";
import { TOKEN_KEY } from "../constant";
import { MyLog } from "./log";
import { getSearchParamsValue } from "./small-fn";
const tokenPrefix = ['Bearer', 'captcha']
function isStartWithTokenPrefix(token?: string) {
    if (!token) return false
    return tokenPrefix.some(_ => token.startsWith(`${_} `))
}
export class AppEnv<T = string> {
    static get singleton(): AppEnv {
        return window.mchcEnv ?? appEnv
    }
    protected _appName?: T;
    private _globalCache: { [x: string]: any; } = {};
    defineGlobalCacheProperty(k: string, d: PropertyDescriptor) {

        Object.defineProperty(this._globalCache, k, { ...d, configurable: true })
    }
    getGlobalCache<C extends Object>(k: string): any {
        const a = this._globalCache[k] as C;
        return a
    }
    setGlobalCache(k: string, v: any) {
        this._globalCache[k] = v;
    }
    private _isDev?: boolean;
    public is(type: T) {
        return this._appName === type;
    }
    public in(types: T[]) {
        return types.includes(this._appName!);
    }
    public get isSp() {
        const sp = getSearchParamsValue('sp') ?? getSearchParamsValue('SP')
        return !!sp
    }
    public get isDev() {
        return this._isDev ?? false;
    }
    public set isDev(value: boolean) {
        this._isDev = value
    }
    public get appName() {
        return this._appName;
    }
    public set appName(value: T | undefined) {
        this._appName = value;
        this.logger = new MyLog(this._appName as string)
    }
    public logger = new MyLog('AppEnv')

    get tokenKey() {
        return `${this.appName}_${TOKEN_KEY}`
    }
    constructor(appName?: T,) {
        this.appName = appName
    }
    get token(): string | null {
        const value = this.getToken()
        if (!value) return null
        return isStartWithTokenPrefix(value) ? value : `Bearer ${value}`
    }
    set token(value) {
        const arr = value?.split(' ')?.slice(-1) || []
        const target = arr[0]
        if (target) {
            store.set(this.tokenKey, target)
        }
    }
    get rawToken() {
        const value = this.getToken()
        if (!value) return ''
        return isStartWithTokenPrefix(value) ? value.split(' ').slice(-1) : value
    }
    private getToken(): string | null {

        return store.get(this.tokenKey) || this.getTokenFromSearchParam()
    }
    private getTokenFromSearchParam() {
        const url = new URL(location.toString())
        return url.searchParams.get(this.tokenKey)
    }
    setTokenToSearchParam(url: URL) {
        url.searchParams.set(this.tokenKey, this.getToken() || '')
        return url
    }
    removeToken() {
        store.remove(this.tokenKey)
    }
};
export const appEnv = new AppEnv<'mchc_env'>('mchc_env',)

