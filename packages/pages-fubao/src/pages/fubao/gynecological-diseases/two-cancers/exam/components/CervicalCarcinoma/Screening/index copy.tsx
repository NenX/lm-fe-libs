import React from 'react';
import Form from './components/Form';
//import { toApi, fromApi, valueToApi, valueToForm } from './config/adapter';
import { valueToApi, valueToForm } from './config/adapter';
import { formDescriptionsWithoutSectionApi, BaseEditPanel } from '@lm_fe/components_m'
import { get, isEqual, set, isEmpty } from 'lodash';
import { fubaoRequest as request } from '@lm_fe/utils';
import { message } from 'antd';
import moment from 'moment';
import { SMchc_FormDescriptions } from '@lm_fe/service'
export default class AdmissionPanel extends BaseEditPanel {
  static defaultProps = {
    baseUrl: '/api/two/cancer/screening/addCervicalCancerRecord', request,
    moduleName: 'cervical-carcinoma-screening',
    title: '筛查',
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
    //console.log(prevState, this.state, 'state');
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
    const { basicInfo, basicData, siderPanels, system } = this.props as any;

    let values = {};
    if (get(activeItem, 'cervicalCancerScreeningId') && get(activeItem, 'cervicalCancerScreeningId') != -1) {
      values = await request.get(
        `/api/two/cancer/screening/getCervicalCancerScreening?id.equals=${get(
          activeItem,
          'cervicalCancerScreeningId',
        )}&deleteFlag.equals=0`,
      );
      values = get(values, 'data.0');
    } else {
      set(values, 'womenHealthcareMenstrualHistory', { ...get(basicData, 'womenHealthcareMenstrualHistory') }); //同步档案月经史信息
    }

    let data = values ? valueToForm(values, formDescriptionsWithoutSection) : {};
    const formKey = get(data, 'id') || Math.random();

    //既往接受宫颈癌筛查 取上一次数据
    if (!get(data, 'cervicalCancerMedicalHistory.previousCervicalScreening')) {
      if (siderPanels.length > 1) {
        const cervicalCancerMedicalHistory = siderPanels[siderPanels.length - 2];
        const cervicalCancerScreeningCheckDate = get(cervicalCancerMedicalHistory, 'cervicalCancerScreeningCheckDate');
        const cervicalCancerScreeningScreeningSuggest = get(
          cervicalCancerMedicalHistory,
          'cervicalCancerScreeningScreeningSuggest',
        );
        set(data, 'cervicalCancerMedicalHistory.previousCervicalScreening', {
          key: 2,
          keyNote: `${cervicalCancerScreeningScreeningSuggest}(${cervicalCancerScreeningCheckDate})`,
        });
      }
    }
    if (!get(data, 'cervicalCancerDiagnosisAndGuidance.checkUnit'))
      set(data, 'cervicalCancerDiagnosisAndGuidance.checkUnit', get(system, 'config.hospitalName'));
    if (!get(data, 'cervicalCancerDiagnosisAndGuidance.checkDate'))
      set(data, 'cervicalCancerDiagnosisAndGuidance.checkDate', moment(new Date()));
    if (!get(data, 'cervicalCancerDiagnosisAndGuidance.checkDoctorName'))
      set(data, 'cervicalCancerDiagnosisAndGuidance.checkDoctorName', get(basicInfo, 'firstName'));

    this.setState({ data, formKey });
  };

  handleSubmit = async (values: any) => {
    const { onRefresh, id, baseUrl } = this.props as any;
    const { formDescriptionsWithoutSection, data, activeItem } = this.state as any;
    let params = valueToApi(values, formDescriptionsWithoutSection);

    if (get(values, 'id')) {
      // 修改
      params = {
        ...data,
        ...params,
        screeningType: '宫颈癌筛查',
      };
      const res = await request.put('/api/two/cancer/screening/updateCervicalCancerScreening', params);
      
      onRefresh && onRefresh('Screening', activeItem);
    } else {
      //新增
      params = {
        cervicalCancerScreening: {
          ...params,
          screeningType: '宫颈癌筛查',
        },
        twoCancerScreeningId: Number(id),
      };
      const res = (await request.post(baseUrl, params)).data
      
      onRefresh && onRefresh('Screening', activeItem, true);
    }
  };
}
