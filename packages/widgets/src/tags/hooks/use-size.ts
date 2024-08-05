import { useState, useLayoutEffect, MutableRefObject } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

type Size = { width?: number; height?: number }

export type BasicTarget<T = HTMLElement> = (() => T | null) | T | null | MutableRefObject<T | undefined>

type TargetElement = HTMLElement | Document | Window | undefined | null

export function getTargetElement(
    target?: BasicTarget<TargetElement>,
    defaultElement?: TargetElement,
): TargetElement | undefined {
    if (!target) {
        return defaultElement
    }

    let targetElement: TargetElement

    if (typeof target === 'function') {
        targetElement = target()
    } else if ('current' in target) {
        targetElement = target.current
    } else {
        targetElement = target
    }

    return targetElement
}

function useSize(target: BasicTarget): Size {
    const [state, setState] = useState<Size>(() => {
        const el = getTargetElement(target)
        return {
            width: ((el || {}) as HTMLElement).clientWidth,
            height: ((el || {}) as HTMLElement).clientHeight,
        }
    })

    useLayoutEffect(() => {
        const el = getTargetElement(target)
        if (!el) {
            return () => {}
        }

        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                setState({
                    width: entry.target.clientWidth,
                    height: entry.target.clientHeight,
                })
            })
        })

        resizeObserver.observe(el as HTMLElement)
        return () => {
            resizeObserver.disconnect()
        }
    }, [typeof target === 'function' ? undefined : target])

    return state
}

export default useSize
