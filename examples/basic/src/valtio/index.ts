import { EventEmitter } from '@lm_fe/utils'
import { useEffect, useRef, useState } from 'react'



type TEventBus<T> = { _bus: E<T> }
type TEventStore<T> = TEventBus<T> & T
export class E<T extends { [x: string]: any }> extends EventEmitter<{ change: any }> {
    _data: T
    constructor(data: T) {
        super()
        const bus = this
        const busData = this._data = { ...data }

        Object.defineProperties(data, Object.keys(data).reduce((a, k: string) => {
            return Object.assign(a, {
                [k]: {
                    get() {
                        return busData[k]
                    },
                    set(val: any) {
                        //@ts-ignore
                        busData[k] = val
                        bus.emit('change', k, { ...busData })
                    },
                    enumerable: true
                }
            })
        }, {}))
    }
}

export function makeEventStore<T extends { [x: string]: any }>(data: T): TEventBus<T> & T {
    return Object.assign(data, { _bus: new E(data) })
}
export function useEventStore1<T>(store: TEventStore<T>,) {
    const [_data, set_data] = useState({ ...store._bus._data })
    const ref = useRef(new Set<string>())
    const flag = useRef(false)
    const keys = useRef(Object.keys(store._bus._data))
    useEffect(() => {
        const cb = (k: string, data: any) => {
            if (ref.current.has(k)) {
                set_data(data)
            }
        }
        store._bus.on('change', cb)
        return () => {
            store._bus.off('change', cb)
        };
    }, [store])
    function setPropertyGuard() {
        flag.current || Object.defineProperties(_data, keys.current.reduce((a, k: string) => {
            return Object.assign(a, {
                [k]: {
                    get() {
                        console.log('get', k)
                        ref.current.add(k)
                        //@ts-ignore
                        return store._bus._data[k]
                    },

                }
            })
        }, {}))
        flag.current = true

    }
    setPropertyGuard()
    return _data

}

export const state = makeEventStore({ count: 0, text: 'hello', isLogin: false })
