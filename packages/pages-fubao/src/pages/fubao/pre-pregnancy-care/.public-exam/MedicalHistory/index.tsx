import React from 'react';
import { message } from 'antd';
import { get } from 'lodash';
import {BaseEditPanel} from '@lm_fe/components_m';
import { formDescriptionsWithoutSectionApi } from '@lm_fe/components_m';
import { valueToApi, valueToForm } from '../config/adapter';
import Form from './components/Form';
import { fubaoRequest as request } from '@lm_fe/utils';
import { SMchc_FormDescriptions } from '@lm_fe/service';
import { getSearchParamsValue } from '@lm_fe/utils';
export default class MedicalHistory extends BaseEditPanel<any> {
  static defaultProps = {
    baseUrl: '/api/progestation/check/saveProgestationCheckArchivesMedicalHistory', request,
    moduleName: 'wife-pre-pregnancy-care-medical-history',
    title: '病史情况',
    Form,
  };

  async componentDidMount() {
    this.handleInit();
  }

  handleInit = async () => {
    const { routerQuery, moduleName, type } = this.props as any;
    const id = get(this.props, 'id') || getSearchParamsValue('id')
    let res: any;
    let data: any;
    // 获取配置文件
    const formDescriptions = await SMchc_FormDescriptions.getModuleParseCache(moduleName);
    this.setState({ spinning: false });
    
    const formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);
    if (type === 'wife') {
      res = id
        ? await request.get(
            `/api/progestation/check/getByProgestationCheckArchivesId?progestationCheckArchivesId.equals=${id}&fileType.equals=2&childrenSign.equals=2`,
          )
        : {};
    } else {
      res = id
        ? await request.get(
            `/api/progestation/check/getByProgestationCheckArchivesId?progestationCheckArchivesId.equals=${id}&fileType.equals=1&childrenSign.equals=2`,
          )
        : {};
    }
    if (res) {
      data = get(res, 'data.0');
      data = { ...data, ...get(data, 'progestationCheckArchivesMedicalHistoryVM') };
    }

    data = id ? valueToForm(data, formDescriptionsWithoutSection) : {};

    const formKey = get(data, 'id') || Math.random();

    this.setState({ formDescriptions, formDescriptionsWithoutSection, data, formKey });
  };

  handleSubmit = async (values: any) => {
    const { formDescriptionsWithoutSection, data, newData } = this.state as any;
    const { baseUrl, filesData, type } = this.props as any;
    let { progestationCheckArchivesMedicalHistoryVM } = data;
    if (newData) {
      progestationCheckArchivesMedicalHistoryVM = get(newData, 'progestationCheckArchivesMedicalHistoryVM');
    }
    let params = valueToApi(values, formDescriptionsWithoutSection);
    let progestationCheckArchivesDetailId = get(filesData, 'womanProgestationCheckArchivesDetailVM.id');
    if (type === 'husband') {
      progestationCheckArchivesDetailId = get(filesData, 'manProgestationCheckArchivesDetailVM.id');
    }

    params = {
      ...progestationCheckArchivesMedicalHistoryVM,
      ...params,
      progestationCheckArchivesDetailId,
    };

    const res = (await request.post(baseUrl, params)).data
    if (get(res, 'code') === 1) {
      
      let newData = get(res, 'data.0');
      this.setState({ newData });
    } else {
      
    }
  };
}
