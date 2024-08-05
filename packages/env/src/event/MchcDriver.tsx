import { BaseWsService } from "@lm_fe/utils";
import { message } from "antd";
import { isObject, isString } from "lodash";
import { TDirver_Event, check_is_readcard, parse_readcard_data } from "./types/mchc_driver";
import { lm_files_info } from '@lm_fe/static';






class MchcDriver extends BaseWsService<TDirver_Event> {
    download() {
        window.location.href = `/lm_files/${lm_files_info.files['LMCSSetup.msi']}`;
    }
    protected _messageHandler(e: WebSocketEventMap['message']) {
        const rawData = e.data
        this._logger.log('message', { rawData, ins: this })

        let data = null
        try {
            data = JSON.parse(rawData)
        } catch (e) {
            this._logger.error({ e, type: 'JSON.parse' })
            if (isString(rawData)) {
                message.warn(rawData)
            }
        }

        this.emit('message', e)
        this.checkType(data)
    }
    send(data: any) {
        if (!this.isOpen) {
            message.warn('外接设备初始化失败，请联系管理员')
            return
        }

        this._send(data)

    }
    private checkType(data: any) {
        if (!data || !isObject(data)) return


        const is_read_IdNO = check_is_readcard(data)
        if (is_read_IdNO) {


            const __personal = parse_readcard_data(data)
            if (__personal) {
                message.success(`读取到${__personal.name}的信息 !`)

                this.emit('data', {
                    type: 'ReadCard',
                    data: __personal
                })

            } else {
                message.error('读取到错误的身份证号码 !');
            }



        }
    }

}

export const mchcDriver = new MchcDriver('ws://127.0.0.1:8087/Laputa')

