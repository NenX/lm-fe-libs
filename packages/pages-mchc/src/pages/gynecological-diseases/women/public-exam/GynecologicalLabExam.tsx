import { BaseEditPanel, BaseEditPanelIProps, BaseEditPanelForm as Form, formDescriptionsWithoutSectionApi } from '@lm_fe/components_m';
import { fromApi, toApi } from './adapter';
import { SMchc_FormDescriptions } from '@lm_fe/service';
import {
  request
  // fubaoRequest as request 
} from '@lm_fe/utils';
import { message } from 'antd';
import { get } from 'lodash';
interface IProps extends BaseEditPanelIProps {
  data?: any;
}
export class GynecologicalLabExam extends BaseEditPanel<IProps> {
  static defaultProps = {
    baseUrl: '/api/gynecological-visits', //request,
    moduleName: 'gynecological-patients-premarital-exam',
    title: '实验室检查',
    // toApi,
    // fromApi,
    Form,
  };

  async componentDidMount() {
    const { data, moduleName } = this.props;
    const formDescriptions = await SMchc_FormDescriptions.getModuleParseCache(moduleName!);
    
    const formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);
    const formKey = get(data, 'id') || Math.random();
    this.setState({
      formDescriptions,
      formDescriptionsWithoutSection,
      formKey,
      data: fromApi(get(data, 'gynecologicalLabExam'), formDescriptionsWithoutSection),
    });
  }

  handleSubmit = async (values: any) => {
    const { data: propsData } = this.props;
    const { data, formDescriptionsWithoutSection } = this.state;
    const { title, baseUrl } = this.props;
    const gynecologicalLabExam = toApi(
      {
        ...data,
        ...values,
      },
      formDescriptionsWithoutSection,
    );
    const params = get(propsData, 'id')
      ? {
          id: get(propsData, 'id'),
          gynecologicalLabExam,
        }
      : {
          gynecologicalLabExam,
          gynecologicalPatient: { id: get(propsData, 'gynecologicalPatient.id') },
        };
    if (get(params, 'id')) {
      await request.put(baseUrl, params);
      message.success(`修改${title}成功`);
    } else {
      const result = (await request.post(baseUrl, params)).data
      const { updateWomenExamRecordsEditingId } = this.props;
      // await updateWomenExamRecordsEditingId(get(result, 'id'));
      message.success(`新增${title}成功`);
    }
  };
}
export default GynecologicalLabExam
