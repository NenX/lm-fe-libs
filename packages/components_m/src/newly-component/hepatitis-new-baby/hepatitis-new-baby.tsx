import { SMchc_FormDescriptions } from '@lm_fe/service';
import { get, isEqual, map, set } from 'lodash';
import BaseEditPanel from '../../BaseEditPanel';
import { formDescriptionsWithoutSectionApi, fromApi, toApi } from '../../utils/adapter';
import Form from './components/Form';
import { getSearchParamsValue } from '@lm_fe/utils';
export default class HepatitsNewBaby extends BaseEditPanel {
  static defaultProps = {
    // baseUrl: '/api/admissions',
    moduleName: 'hepatitis-pregnant-baby-new',
    title: '乙肝新生婴儿情况',
    toApi,
    fromApi,
    Form,
  };

  async componentDidMount() {
    const { routerQuery, moduleName, baseUrl, fromApi = defaultFromApi, data, config } = this.props;
    // 优先从 props 里面获取id，因为可能作为组件，被其它页面引用使用
    const id = get(this.props, 'id') || getSearchParamsValue('id');
    // 未配置moduleName时，不请求配置
    if (!moduleName) {
      return;
    }
    // 请求表单配置表
    const formDescriptions = await SMchc_FormDescriptions.getModuleParseCache(moduleName);
    const formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);
    this.changeEdit(formDescriptionsWithoutSection, get(config, `inputProps.disabled`));
    this.setState({ formDescriptions, formDescriptionsWithoutSection, spinning: false });
    this.getFormData(data, formDescriptionsWithoutSection);
  }
  componentWillReceiveProps(nexProps) {
    if (!isEqual(get(nexProps, 'data'), get(this.props, 'data'))) {
      this.getFormData(get(nexProps, 'data'), this.state.formDescriptionsWithoutSection);
    }
  }
  getFormData(data: any, formDescriptionsWithoutSection: any) {
    if (data) {
      const newdata = data ? fromApi(data, formDescriptionsWithoutSection) : {};
      const formKey = get(data, 'id') || Math.random(); // 当前dataSource id
      this.setState({ data: newdata, formKey }, () => {
        console.log('12',{ babydata: this.state.data, formDescriptionsWithoutSection });
      });
    } else {
      this.setState({ data: {}, formKey: Math.random() });
    }
  }
  changeEdit(formDescriptionsWithoutSection: any, bool: boolean) {
    // set(formDescriptionsWithoutSection,'age.inputProps.disabled',true)
    map(formDescriptionsWithoutSection, (item, key) => {
      set(item, 'inputProps.disabled', bool);
    });
  }
}
