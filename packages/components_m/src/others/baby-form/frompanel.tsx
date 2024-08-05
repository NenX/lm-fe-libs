import BaseEditPanel from '../../BaseEditPanel';
import {
  fromApi as defaultFromApi
} from '../../utils/adapter';
import { get, isEqual } from 'lodash';
import Form from './components/Form';
import { fromApi, toApi } from './config/adapter';
import { getSearchParamsValue } from '@lm_fe/utils';
export default class RowoftireRecordBabyPanel extends BaseEditPanel {
  static defaultProps = {
    baseUrl: '',
    moduleName: 'rowoftire-record-baby',
    title: '排胎记录单',
    toApi,
    fromApi,
    Form,
  };
  async componentDidMount() {
    const { routerQuery, moduleName, baseUrl, fromApi = defaultFromApi, formDescriptData, fromValues } = this.props;
    const { formDescriptions, formDescriptionsWithoutSection } = formDescriptData;
    // 优先从 props 里面获取id，因为可能作为组件，被其它页面引用使用
    const id = get(this.props, 'id') || getSearchParamsValue('id');
    this.setState({
      formDescriptions: formDescriptions,
      formDescriptionsWithoutSection: formDescriptionsWithoutSection,
      spinning: false,
    });
    // 请求表单值
    const data = fromApi(fromValues, formDescriptionsWithoutSection);
    const formKey = get(fromValues, 'key') || Math.random(); // 当前dataSource id
    // console.log({ thisformKey: formKey, data, fromValues });
    this.setState({ data, formKey });
  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.fromValues, this.props.fromValues)) {
      const { formDescriptions, formDescriptionsWithoutSection } = nextProps.formDescriptData;
      const data = fromApi(nextProps.fromValues, formDescriptionsWithoutSection);
      const formKey = get(nextProps.fromValues, 'key') || Math.random();
      // console.log({ nextformKey: formKey, data, fromValues: nextProps.fromValues });
      this.setState({ data, formKey });
    }
  }
}
