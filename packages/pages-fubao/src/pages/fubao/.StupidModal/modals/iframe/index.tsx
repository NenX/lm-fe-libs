import { Modal } from 'antd';
import { IBaseProps } from '../../types';
interface Iprops {
    url: string //http://192.168.3.53:9988/api/qns/mgtQnsPage?userid=60014440308&qnid=9716294
}
export const IFrame = ({ modalData, visible, onCancel, ...others }: IBaseProps<Iprops>) => {

    const { url } = modalData
    return (
        <Modal
            visible={visible}
            width={'88vw'}
            footer={null}
            onCancel={onCancel}
            destroyOnClose
            {...others}
            closeIcon={null}

            bodyStyle={{ height: '88vh', padding: 0, margin: 0 ,overflow:'hidden'}}
        >
            <iframe style={{ width: '100%', height: '100%', border: 'none', padding: 0, margin: 0 }} src={url}>

            </iframe>
        </Modal >
    );
};