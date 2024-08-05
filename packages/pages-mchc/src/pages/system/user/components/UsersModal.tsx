import { modalFormDescriptions as formDescriptions } from '../config/form';
import { toApi, fromApi } from '../config/adapter';
import { generateModalForm } from '@lm_fe/components_m';

export default generateModalForm({
  formDescriptions,
  url: '/api/users',
  title: '用户',
  toApi,
  fromApi,
  modalProps: {
    width: 700,
  },
});
