import React from 'react';
import Form from './components/Form';
import { valueToApi, valueToForm } from './config/adapter';
import { formDescriptionsWithoutSectionApi, BaseEditPanel } from '@lm_fe/components_m'
import { get, isEqual, set, isEmpty } from 'lodash';
import { fubaoRequest as request } from '@lm_fe/utils';
import { message } from 'antd';
import moment from 'moment';
import { SMchc_FormDescriptions } from '@lm_fe/service'
export default class AdmissionPanel extends BaseEditPanel {
  static defaultProps = {
    baseUrl: '/api/two/cancer/screening/addBreastCancerXRay', request,
    moduleName: 'mammary-cancer-mammography',
    title: '乳腺X线',
    Form,
  };

  state = {
    data: {},
    formDescriptionsWithoutSection: {},
    formDescriptions: [],
    formKey: undefined,
    spinning: true,
    activeItem: {},
  };

  extraEvents = {
    handleDisabled: (formDescriptionsWithoutSection: any) => {
      this.setState({ formDescriptionsWithoutSection });
    },
  };

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    const { activeItem } = nextProps;
    if (!isEqual(activeItem, prevState.activeItem)) {
      return {
        activeItem,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (
      !isEmpty(get(prevState, 'activeItem')) &&
      !isEqual(get(prevState, 'activeItem'), get(this.state, 'activeItem'))
    ) {
      this.handleInit();
    }
  }

  async componentDidMount() {
    const { moduleName } = this.props as any;
    const formDescriptions = await SMchc_FormDescriptions.getModuleParseCache(moduleName!);
    
    const formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);
    const formKey = Math.random();
    this.setState({ spinning: false });
    this.setState({ formDescriptions, formDescriptionsWithoutSection, formKey });
    this.handleInit();
  }

  handleInit = async () => {
    const { activeItem, formDescriptionsWithoutSection } = this.state;
    const { basicInfo, system } = this.props as any;
    let values = {};
    let breastCancerRecordId;
    if (get(activeItem, 'breastCancerXRayId')) {
      if (get(activeItem, 'breastCancerXRayId') != -1) {
        values = await request.get(
          `/api/two/cancer/screening/getBreastCancerXRay?id.equals=${get(
            activeItem,
            'breastCancerXRayId',
          )}&deleteFlag.equals=0`,
        );
      }
      breastCancerRecordId = get(activeItem, 'id');
    }
    values = get(values, 'data.0');

    let data = values ? valueToForm(values, formDescriptionsWithoutSection) : {};
    const formKey = get(data, 'id') || Math.random();

    //辅助检查 没报告显示未查
    if (!get(data, 'breastCancerAuxiliaryExamination.breastUltrasoundExamination')) {
      set(data, 'breastCancerAuxiliaryExamination.breastUltrasoundExamination', {
        key: 2,
        keyNote: undefined,
      });
    }
    if (!get(data, 'breastCancerAuxiliaryExamination.breastXBiRadsExamination')) {
      set(data, 'breastCancerAuxiliaryExamination.breastXBiRadsExamination', {
        key: 2,
        keyNote: undefined,
      });
    }
    if (!get(data, 'breastCancerDiagnosisAndGuidance.checkUnit'))
      set(data, 'breastCancerDiagnosisAndGuidance.checkUnit', get(system, 'config.hospitalName'));
    if (!get(data, 'breastCancerDiagnosisAndGuidance.checkDate'))
      set(data, 'breastCancerDiagnosisAndGuidance.checkDate', moment(new Date()));
    if (!get(data, 'breastCancerDiagnosisAndGuidance.checkDoctor'))
      set(data, 'breastCancerDiagnosisAndGuidance.checkDoctor', get(basicInfo, 'firstName'));
    this.setState({ data, formKey, breastCancerRecordId });
  };

  handleSubmit = async (values: any) => {
    const { onRefresh, baseUrl } = this.props as any;
    const { formDescriptionsWithoutSection, breastCancerRecordId, data, activeItem } = this.state as any;

    let params = valueToApi(values, formDescriptionsWithoutSection);

    params = {
      ...data,
      ...params,
      breastCancerRecordId: Number(breastCancerRecordId),
      screeningType: '乳腺癌筛查',
    };

    if (get(values, 'id')) {
      // 修改
      const res = await request.put('/api/two/cancer/screening/updateBreastCancerXRay', params);
      
    } else {
      //新增
      const res = (await request.post(baseUrl, params)).data
      
    }
    onRefresh && onRefresh('Mammography', activeItem);
  };
}
