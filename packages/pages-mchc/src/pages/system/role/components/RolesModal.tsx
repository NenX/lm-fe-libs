import { modalFormDescriptions as formDescriptions } from '../config/form';
import { fromApi, toApi } from '../config/adapter';
import { generateModalForm } from '@lm_fe/components_m';

export default generateModalForm({
  formDescriptions,
  url: '/api/groups',
  title: '角色',
  fromApi,
  toApi,
  modalProps: {
    width: 600,
  },
  formItemLayout: {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  },
});
