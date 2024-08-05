import { Modal } from 'antd';
import { IBaseProps } from '../../types';
interface Iprops {
    visible?: boolean;
    onCancel?: any;
    width?: string | number;
    size?: string;
    fetchData: () => Promise<any>
}
export const Test = ({ modalData, visible, onCancel, ...others }: IBaseProps<Iprops>) => {


    return (
        <Modal
            visible={visible}
            title="打印预览"
            width={1000}
            footer={null}
            onCancel={onCancel}
            wrapClassName="pdf-modal-wrap"
            style={{ top: '20px' }}
            destroyOnClose
            {...others}
        >
            123
        </Modal>
    );
};