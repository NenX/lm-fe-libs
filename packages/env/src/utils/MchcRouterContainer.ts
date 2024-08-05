import { ARG_URS1_KEY, ARG_URS2_KEY, getHappyConfig, getSearchParamsAll } from "@lm_fe/utils"






class MchcRouterContainer {
    constructor(data: any) {
        this.routesData = data
    }
    routesData: { [x: string]: any } = {}
    getTargetComponent(pathname: string) {
        const _url = new URL(pathname, new URL(location.href))
        const _pathname = _url.pathname
        const happyPath = getHappyConfig(_pathname)
        if (happyPath) {
            const C = this.routesData[happyPath.path]
            return C

        }
        const C = this.routesData[_pathname]

        return C
    }
}


// function getMenuKeyByPathname(pathname: string, search = '') {
//     if (!pathname) return null
//     if (pathname.includes('?')) return pathname
//     const _search = search.startsWith('?') ? search : `?${search}`;
//     const url = new URL(pathname + _search, new URL(location.origin))
//     const params = getSearchParamsAll(url)
//     const usr1 = params[ARG_URS1_KEY]
//     const usr2 = params[ARG_URS2_KEY]
//     if (!usr1 && !usr2) return pathname
//     const usr1Search = usr1 ? `usr1=${usr1}` : ''
//     const usr2Search = usr2 ? `usr2=${usr2}` : ''
//     return `${url.pathname}?${usr1Search}${(usr1Search && usr2Search) ? '&' : ''}${usr2Search}`
// }




export { MchcRouterContainer }
