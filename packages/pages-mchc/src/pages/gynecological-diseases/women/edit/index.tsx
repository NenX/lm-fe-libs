import { BaseEditPanel } from '@lm_fe/components_m';
import Form from './components/Form';
import { fromApi, toApi } from './config/adapter';
export default class WifePanel extends BaseEditPanel {
  static defaultProps = {
    baseUrl: '/api/gynecological-patients',
    //  request,
    moduleName: 'gynecological-patients',
    title: '女方档案',
    toApi,
    fromApi,
    Form,
  };
}
