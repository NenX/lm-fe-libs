
import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { event, asRequest as request } from '@lm_fe/utils';

const info = message.info



export default function useSign() {



    const [qrCodeBase64, setQrCodeBase64] = useState('')
    const [qrCodeBase64Loading, setQrCodeBase64Loading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [signed, setSigned] = useState(false)
    const [fuck_BizSn, setFuck_BizSn] = useState()
    const fetchSigninfo = useCallback(
        () => {
            fuck_BizSn && request.post('/ca/signinfo', { bizSn: fuck_BizSn, }).then(({ data }) => {
                const res = data.data
                if (res.ret === '1') {
                    setModalVisible(false)
                    if (res.data) {
                        setSigned(true)
                        info('签名成功')
                        event.emit('signed', fuck_BizSn)
                    } else {
                        info('签名失败')
                    }
                }
            })
        },
        [fuck_BizSn, ,],
    )

    useEffect(() => {
        let timeoutId = modalVisible && setInterval(fetchSigninfo, 1500)
        return () => {
            timeoutId && clearInterval(timeoutId)
        }
    }, [modalVisible, fetchSigninfo])



    const fetchQrCode = (note: string) => {
        setQrCodeBase64Loading(true)
        request.post<any>('/ca/signreq', { note, })
            .then(({ data }) => {
                const { sn, img, } = data.data
                if (sn) {
                    setModalVisible(true)
                    setFuck_BizSn(sn)
                    setQrCodeBase64(img)
                }
            })
            .finally(() => setQrCodeBase64Loading(false))
    }





    return {
        fetchQrCode, qrCodeBase64, modalVisible, setModalVisible, qrCodeBase64Loading, signed
    }
}
