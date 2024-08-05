import { SMchc_FormDescriptions } from '@lm_fe/service';
import { get } from 'lodash';
import BaseEditPanel from '../../../BaseEditPanel';
import { formDescriptionsWithoutSectionApi } from '../../../utils/adapter';
import { fromApi as defaultFromApi } from '../config/adapter';
import Form from './Form';
export default class AdmissionPanel extends BaseEditPanel {
  static defaultProps = {
    baseUrl: '/api/noenate-records',
    moduleName: 'newborn-stranger',
    //moduleName: 'neonatal-nursing',
    title: '新生儿出生情况',
    Form,
  };


  async componentDidMount() {
    const { data, moduleName, baseUrl, fromApi = defaultFromApi, system } = this.props;
    const formDescriptions = await SMchc_FormDescriptions.getModuleParseCache(moduleName!);
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
    const { Form, printTemplate = '', printResource = '', history } = this.props;
    const { formDescriptions, formDescriptionsWithoutSection, data, formKey, spinning } = this.state;

    return (
      <div className="base-edit-panel">
        <Form
          ref={(ref) => (this.formRef = ref)}
          key={formKey}
          spinning={spinning}
          printId={get(data, 'id')}
          printResource={printResource}
          printTemplate={printTemplate}
          data={data}
          onFinish={this.handleSubmit}
          formDescriptions={formDescriptions}
          formDescriptionsWithoutSection={formDescriptionsWithoutSection}
          history={history}
        // onValuesChange={this.props.onValuesChange}
        />
      </div>
    );
  }
}
