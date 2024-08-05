import React, { FC, Suspense } from 'react'
import { render } from 'react-dom'

let cacheDiv: HTMLDivElement | null
export function temp_reander(config: { Comp: FC<any>, cb?: () => void, exclusive?: boolean }) {
    const { Comp, cb, exclusive } = config
    const div = exclusive ? getDiv() : (cacheDiv = cacheDiv ?? getDiv())
    render(<TempNode Comp={Comp} />, div, () => {
        setTimeout(() => {
            // document.body.removeChild(div)
            cb?.()
        }, 100);
    })

    return () => {
        document.body.removeChild(div)
        if (!exclusive)
            cacheDiv = null

    }

}
function getDiv() {
    const div = document.createElement('div')
    document.body.append(div)
    div.className = 'temp-node'
    div.style.display = 'none'
    div.style.width = '0'
    div.style.height = '0'
    return div
}
function TempNode(props: { Comp: FC<any> }) {
    const { Comp } = props

    return <Suspense fallback={<div></div>} >
        <Comp />
    </Suspense>
}
