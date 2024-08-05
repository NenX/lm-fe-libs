import { ARG_URS1_KEY, ARG_URS2_KEY } from "src/constant"

export function getHappyConfig(pathname: string) {
    const url = new URL(location.origin + pathname)

    const arr = pathname.split('/').filter(_ => _)
    const first = arr[0]

    if (first === 'happy' && arr.length > 2) {
        arr.shift()
        const arg = arr.pop()
        const argArr = arg?.split(',') ?? []
        const path = `/${arr.join('/')}`
        return { path, arg, search: url.search, [ARG_URS1_KEY]: argArr[0], [ARG_URS2_KEY]: argArr[1] }
    }
    return null
}
export function genHappyPath(path: string, arg: string) {
    const arr = path.split('/').filter(_ => _)

    return `/happy/${arr.join('/')}/${arg}`
}

export function getHappyArg() {
    const pathname = location.pathname
    const happyPath = getHappyConfig(pathname)
    return happyPath?.arg
}