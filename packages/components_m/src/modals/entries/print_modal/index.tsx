import { IGlobalModalProps } from '@lm_fe/components';
import { mchcLogger, mchcMacro } from '@lm_fe/env';
import { lm_pdfjs_info } from '@lm_fe/static';
import { request, sleep } from '@lm_fe/utils';
import { Modal, Select, Space, Spin, message } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import store from 'store';
import { IPrintModalProps, IPrintResData, TVersion } from './types';
import { handlePrintData, handleRes } from './utils';
import styles from './index.module.less'
import { SLocal_SystemConfig } from '@lm_fe/service';
import { isString } from 'lodash';

interface IPDFApp {
  open: any,
  initialized: boolean
  initializedPromise?: Promise<any>
  appConfig: { defaultUrl: string }
  run(config: any): void
}

const LAST_SELECT_VERSION_KEY = 'LAST_SELECT_VERSION_KEY'

export default function Test({ modal_data, width, close, onClose, bodyStyle = {}, ...others }: IGlobalModalProps<IPrintModalProps>) {
  const { requestData, printData, filepath, version, requestConfig, callback } = modal_data
  const [loading, setLoading] = useState(false);
  const _request = useMemo(() => modal_data.request ?? request, [modal_data])
  const el = useRef<HTMLIFrameElement>(null)
  const initVersion: TVersion = version || store.get(LAST_SELECT_VERSION_KEY) || SLocal_SystemConfig.get('PDF预览组件版本') || lm_pdfjs_info.dirs['pdfjs-3.3.122-legacy']

  const [__version, set__version] = useState(initVersion)
  const [pdfdata, setPdfdata] = useState<any>()
  const [pdfApp, setPdfApp] = useState<IPDFApp>()
  const pdfAppRef = useRef<IPDFApp>()
  const pdfdataRef = useRef<any>()
  useEffect(() => {
    getPDF();
  }, []);

  const w = width ?? "60vw"


  const getPDF = async () => {
    let printConfig: { images?: string[], pdf?: any } = {}

    // await sleep(.4)
    // const PDFViewerApplicationOptions = el.current?.contentWindow?.PDFViewerApplicationOptions
    // const PDFViewerApplication = el.current?.contentWindow?.PDFViewerApplication


    if (filepath) {
      printConfig.pdf = filepath
    }

    if (printData && isString(printData)) {
      printConfig.pdf = handlePrintData(printData)
    }

    try {
      if (requestData) {
        const { url, ...others } = requestData
        const submitData = {
          template: '',
          version: '',
          note: '',
          ...others
        }
        const res = await _request.post<IPrintResData>(url, submitData, { params: submitData });
        printConfig = handleRes(res.data)
      }

      if (requestConfig) {
        requestConfig.method = requestConfig.method ?? 'POST'
        const res = await _request.ins(requestConfig)
        printConfig = handleRes(res.data)
      }
    } catch (e) {
      message.warn(e)
    }
    const data = printConfig.pdf
    callback?.(data)
    setPdfdata(data)
    pdfdataRef.current = data

  };


  useEffect(() => {

    if (pdfApp) {
      const initializedPromise = pdfApp.initializedPromise ?? new Promise((res, rej) => setTimeout(res, 1000))
      initializedPromise.then(() => {
        setTimeout(() => {
          pdfApp.open(pdfdataRef.current)
        }, 200);

      })

    }

    return () => {


    }
  }, [pdfApp])

  const docUrl = __version
    ? `${mchcMacro.PUBLIC_PATH}lm_pdfjs/${__version}/web/viewer.html`
    : `${mchcMacro.PUBLIC_PATH}pdfjs/web/viewer.html`

  return (
    <Modal
      className={styles['print-modal']}
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: 36 }}>
          <span onClick={() => {
            mchcLogger.log({ pdfApp, pdfdata })
          }}>打印预览</span>
          <Space>
            {
              version
                ? null
                : <Select size='small' style={{ width: 200 }} value={__version} onChange={v => {
                  setPdfApp(undefined)
                  set__version(v)
                  store.set(LAST_SELECT_VERSION_KEY, v)
                }}
                  options={Object.keys(lm_pdfjs_info.dirs).map(value => ({ value, label: value }))} />
            }
          </Space>
        </div>
      }
      width={w}
      footer={null}
      // style={{ top: '20px' }}
      centered
      destroyOnClose
      style={{ padding: 0 }}
      {...others}
      bodyStyle={{ height: '88vh', ...bodyStyle, padding: 0, }}

    >






      <div style={{ height: '100%' }}>

        {
          (!pdfdata)
            ? <Spin style={{ width: '100%', marginTop: 240 }} size="large" />
            : <iframe
              onLoad={(e) => {
                const target: any = e.target
                const app = target?.contentWindow?.PDFViewerApplication
                mchcLogger.log('abc reload', app.initialized)
                setPdfApp(app)
                pdfAppRef.current = app
              }}
              ref={el}
              title="pdfView"
              width={'100%'}
              src={docUrl ?? `${mchcMacro.PUBLIC_PATH}pdfjs/web/base64_viewer.html`}
              height="100%"
            />
        }
        {/* <div hidden={loading} style={{ height: '100%' }}>


        </div> */}

      </div>


    </Modal >
  );

};