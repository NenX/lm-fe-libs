import React from 'react';
import Form from './components/Form';
import { valueToApi, valueToForm } from '../adapter';
import { BaseEditPanel, formDescriptionsWithoutSectionApi } from '@lm_fe/components_m';
import { get, isEqual, set, isEmpty } from 'lodash';
import { message } from 'antd';
import moment from 'moment';
import { SMchc_FormDescriptions } from '@lm_fe/service';
import { fubaoRequest as request } from '@lm_fe/utils';
import { form_config } from './form_config';
export default class AdmissionPanel extends BaseEditPanel {
  static defaultProps = {
    baseUrl: '/api/family/planning/addFamilyPlanningEarlyPregnancyCheck', request,
    moduleName: 'family-planning-detail-tumor',
    title: '妇科肿瘤',
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
    if (
      !isEmpty(get(prevState, 'activeItem')) &&
      !isEqual(get(prevState, 'activeItem'), get(this.state, 'activeItem'))
    ) {
      this.handleInit();
      // setTimeout(() => {
      //   this.handleInit();
      // }, 200);
    }
  }

  async componentDidMount() {
    const formDescriptions = form_config;
    const formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);
    const formKey = Math.random();
    this.setState({ spinning: false });
    this.setState({ formDescriptions, formDescriptionsWithoutSection, formKey });
    this.handleInit();
    // setTimeout(() => {
    //   this.handleInit();
    // }, 200);
  }

  handleInit = async () => {
    const { activeItem, formDescriptionsWithoutSection } = this.state;
    const { basicInfo } = this.props as any;
    let values = {};
    if (get(activeItem, 'id')) {
      values = (await request.get(
        `/api/family/planning/getFamilyPlanningEarlyPregnancyCheck?id.equals=${get(
          activeItem,
          'id',
        )}&checkType.equals=${get(activeItem, 'checkType')}&deleteFlag.equals=0`,
      )).data;
    }
    values = get(values, 'data.0');
    let data = values ? valueToForm(values, formDescriptionsWithoutSection) : {};
    const formKey = get(data, 'id') || Math.random();

    const earlyPregnancyCheckDiagnosisInformations = get(
      data,
      'earlyPregnancyCheckDiagnosisAndTreatment.earlyPregnancyCheckDiagnosisInformations',
    );
    if (earlyPregnancyCheckDiagnosisInformations) {
      set(
        data,
        `earlyPregnancyCheckDiagnosisAndTreatment.earlyPregnancyCheckDiagnosisInformations.list`,
        earlyPregnancyCheckDiagnosisInformations,
      );
    }

    if (!get(data, 'earlyPregnancyCheckDiagnosisAndTreatment.registrationDate'))
      set(data, 'earlyPregnancyCheckDiagnosisAndTreatment.registrationDate', moment(new Date()));
    if (!get(data, 'earlyPregnancyCheckDiagnosisAndTreatment.diagnoseDoctor'))
      set(data, 'earlyPregnancyCheckDiagnosisAndTreatment.diagnoseDoctor', get(basicInfo, 'firstName'));

    this.setState({ data, formKey });
  };

  handleSubmit = async (values: any) => {
    const { onRefresh, id, baseUrl } = this.props as any;
    const { data, formDescriptionsWithoutSection } = this.state;
    const earlyPregnancyCheckDiagnosisAndTreatment = get(data, 'earlyPregnancyCheckDiagnosisAndTreatment');
    const earlyPregnancyCheckInspection = get(data, 'earlyPregnancyCheckInspection');
    const earlyPregnancyCheckMedicalHistory = get(data, 'earlyPregnancyCheckMedicalHistory');
    const womenHealthcarePhysicalExamination = get(data, 'womenHealthcarePhysicalExamination');
    let params = valueToApi(values, formDescriptionsWithoutSection);

    const earlyPregnancyCheckDiagnosisInformations = get(
      params,
      'earlyPregnancyCheckDiagnosisAndTreatment.earlyPregnancyCheckDiagnosisInformations.list',
    );
    set(
      params,
      'earlyPregnancyCheckDiagnosisAndTreatment.earlyPregnancyCheckDiagnosisInformations',
      earlyPregnancyCheckDiagnosisInformations,
    );

    //每个对象有id 都要传回去
    set(params, 'earlyPregnancyCheckDiagnosisAndTreatment.id', get(earlyPregnancyCheckDiagnosisAndTreatment, 'id'));
    set(params, 'earlyPregnancyCheckInspection.id', get(earlyPregnancyCheckInspection, 'id'));
    set(params, 'earlyPregnancyCheckMedicalHistory.id', get(earlyPregnancyCheckMedicalHistory, 'id'));
    set(params, 'womenHealthcarePhysicalExamination.id', get(womenHealthcarePhysicalExamination, 'id'));

    params = {
      ...data,
      ...params,
      checkType: '妇科肿瘤',
      familyPlanningId: Number(id),
    };

    if (get(values, 'id')) {
      // 修改
      const _res = await request.put('/api/family/planning/updateFamilyPlanningEarlyPregnancyCheck', params);
      const res = _res.data
      
    } else {
      //新增
      const _res = await request.post(baseUrl, params)
      const res = _res.data

      
    }
    onRefresh && onRefresh();
  };
}
