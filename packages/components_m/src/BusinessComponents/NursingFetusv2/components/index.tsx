import BaseEditPanel from '../../../BaseEditPanel';
import { formDescriptionsWithoutSectionApi } from '../../../utils/adapter';
import { SMchc_FormDescriptions } from '@lm_fe/service';
import { get } from 'lodash';
import { fromApi as defaultFromApi } from '../config/adapter';
import Form from './Form';
export default class AdmissionPanel extends BaseEditPanel {
  static defaultProps = {
    baseUrl: '/api/noenate-records',
    moduleName: 'delivery-nursing-fetus',
    //moduleName: 'neonatal-nursing',
    title: '新生儿记录',
    Form,
  };

  // async componentWillReceiveProps(nextProps) {
  //   if (!isEmpty(nextProps.data) && isEmpty(this.props.data)) {
  //     console.log(nextProps, this.props, '进入了');
  //     const { data, moduleName, baseUrl, fromApi = defaultFromApi, system } = nextProps;
  //     const formField =
  //       get(system, 'config.systemMode') === 'production'
  //         ? get(strToJson(sessionStorage.getItem('formDescriptionsJson')), `${moduleName}`) || []
  //         : await request.get(`/api/form-descriptions?moduleName=${moduleName}`);
  //     const formDescriptions = formDescriptionsFromApi(formField);
  //     const formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);
  //     const formKey = get(nextProps.data, 'id') || Math.random();
  //     this.setState({
  //       formDescriptions,
  //       formDescriptionsWithoutSection,
  //       data: fromApi(nextProps.data, formDescriptionsWithoutSection),
  //       formKey,
  //     });
  //   }
  // }

  async componentDidMount() {
    const { data, moduleName, baseUrl, fromApi = defaultFromApi, } = this.props;
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
    const { Form, printTemplate = '', printResource = '', index, history } = this.props;
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
          index={index}
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
