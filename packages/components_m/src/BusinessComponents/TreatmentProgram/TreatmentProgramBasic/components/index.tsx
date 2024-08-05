import { SMchc_FormDescriptions } from '@lm_fe/service';
import { get } from 'lodash';
import BaseEditPanel from '../../../../BaseEditPanel';
import { formDescriptionsWithoutSectionApi } from '../../../../utils/adapter';
import { fromApi as defaultFromApi } from '../config/adapter';
import Form from './Form';
export default class AdmissionPanel extends BaseEditPanel {
  formRef: any;
  static defaultProps = {
    baseUrl: '',
    moduleName: 'treatment-program',
    title: '预约项目',
    Form,
  };

  async componentDidMount() {
    const { data, moduleName, fromApi = defaultFromApi } = this.props as any;
    const formDescriptions = await SMchc_FormDescriptions.getModuleParseCache(moduleName);
    const formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);
    const formKey = get(data, 'id') || Math.random();
    this.setState({
      formDescriptions,
      formDescriptionsWithoutSection,
      data: fromApi(data, formDescriptionsWithoutSection),
      formKey,
    });
  }

  render() {
    const { Form, onValuesChange } = this.props as any;
    const { formDescriptions, formDescriptionsWithoutSection, data, formKey, spinning } = this.state;

    return (
      <div className="base-edit-panel">
        <Form
          ref={(ref: any) => (this.formRef = ref)}
          key={formKey}
          spinning={spinning}
          data={data}
          onFinish={this.handleSubmit}
          formDescriptions={formDescriptions}
          formDescriptionsWithoutSection={formDescriptionsWithoutSection}
          history={history}
          onValuesChange={onValuesChange}
        />
      </div>
    );
  }
}
