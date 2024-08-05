/*
 * @Descripttion: 项目描述
 * @Author: cjl
 * @Date: 2022-05-18 15:12:47
 * @LastEditTime: 2022-05-24 14:35:09
 */
import BaseEditPanelForm from '../../../BaseEditPanel/BaseEditPanelForm';
import { message } from 'antd';
import { get } from 'lodash';
import { FormInstance } from 'antd/lib/form';
export default class AdmissionForm extends BaseEditPanelForm {
    handleItemChange = (changedValues, allValues) => {
        const { handleItemChange } = this.props;
        handleItemChange(changedValues, allValues);
        return {};
    };
}
