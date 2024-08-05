import { mchcMacro } from '@lm_fe/env';
import { IPrintResData } from './types';
import React, { forwardRef } from 'react';



function convertDataURIToBinary(dataURI: string) {
    var raw = window.atob(dataURI);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));
    for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
}


// 约定名称
// 见 /pdfjs/web/base64_viewer.html
export const sessiongStoragePDFDataKey = '__BASE64_PDF_DATA__';
const metaHead = 'data:application/pdf;base64,'
export const docUrl = `${mchcMacro.PUBLIC_PATH}pdfjs-3.3.122-legacy/web/viewer.html`
export function handlePrintData(printData: string) {
    const noHeadData = printData.startsWith(metaHead) ? printData.slice(metaHead.length) : printData
    return convertDataURIToBinary(noHeadData)
}

//  { pdfdata: string, filepath: string } | { code: number, data: { pdfdata: string, filepath: string } }
export function handleRes(res: any) {
    let resData: IPrintResData
    if (!res)
        return {}
    if (typeof res.code === 'number') {
        resData = res.data
    } else {
        resData = res
    }
    if (!resData) return {}
    const { pdfdata, filepath, imagesData } = resData

    resData.filepath = filepath && `${location.origin}${filepath}`
    resData.pdfdata = pdfdata && handlePrintData(pdfdata) as any
    resData.imagesData = (imagesData ?? [])
    // .map(_ => `data:image/png;base64,${_}`)

    return {
        pdf: resData.filepath ?? resData.pdfdata,
        images: resData.imagesData
    }
}


export const PrintNode = forwardRef<HTMLDivElement, { images?: string[] }>(function PrintNode(props, ref) {
    const { images = [] } = props
    return <div hidden>
        <div ref={ref}>
            <div style={{ pageBreakAfter: 'always', pageBreakBefore: 'auto' }}> Page One</div>
            <div style={{ pageBreakAfter: 'always', pageBreakBefore: 'auto' }}> Page Two</div>

            {
                images.map(_ => {
                    return <img src={_} />
                })
            }
        </div>
    </div>
})