import {
  BaseEditPanel,
  fromApi as defaultFromApi,
  toApi as defaultToApi,
  filterReferrals,
  formDescriptionsFromApi,
  formDescriptionsWithoutSectionApi,
  formatTimeToDate,
  observePatientData,
} from '@lm_fe/components_m';
import { SLocal_History, SMchc_Doctor } from '@lm_fe/service';
import { getSearchParamsValue, request } from '@lm_fe/utils';
import { Modal, message } from 'antd';
import { get, isEmpty, map, pick, set } from 'lodash';
import moment, { isMoment } from 'moment';
import React from 'react';
import Form from './components/Form';
function transformDate(pregnancyData: any) {
  map(pregnancyData, (value, key) => {
    if (isMoment(value)) {
      set(pregnancyData, key, formatTimeToDate(value));
    }
  });
  return pregnancyData;
}
class ClosingArchives extends BaseEditPanel {
  static defaultProps = {
    baseUrl: '/api/nurse/updateOutpatientDocumentStatus',
    moduleName: 'close-archives',
    title: '结案管理',
    printResource: 'referral',
    printTemplate: '2',
    Form,
  };

  state = {
    data: {},
    formDescriptionsWithoutSection: {},
    formDescriptions: [],
    formKey: undefined,
    spinning: true,
    modalVisible: false,
  };

  async componentDidMount() {

    const { moduleName, baseUrl, fromApi = defaultFromApi, headerInfo } = this.props;
    // 订阅从 panel 获取的数据
    observePatientData.subscribe((data: any) => {
      console.log('xxg', data)
      const { data: prevData } = this.state;
      this.setState({
        data: {
          ...prevData,
          ...data,
        },
      });
    });
    const id = get(headerInfo, 'id') || getSearchParamsValue('id');
    // 获取配置文件
    const formField = (await request.get(`/api/form-descriptions?moduleName=${moduleName}`)).data;
    if (!formField) {
      return;
    }
    this.setState({ spinning: false });
    const formDescriptions = formDescriptionsFromApi(formField);
    const formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);

    let data = await SMchc_Doctor.getOutpatientDocumentStatus(id)

    data = id ? fromApi(data, formDescriptionsWithoutSection) : {};
    const formKey = get(data, 'id') || Math.random();
    // 筛选出转出登记数据
    let referralOut = get(data, 'referralOutInfo');
    referralOut = isEmpty(referralOut) ? {} : referralOut;
    set(data, 'referralOut', referralOut);
    // set(data, `deliveryGestationalWeek`, get(headerInfo, `labourWeek`));
    set(data, `deliveryGestationalWeek`, get(data, 'deliveryGestationalWeek'));
    if (!isEmpty(referralOut)) {
      set(data, 'referralOut.referralOrganization.id', get(referralOut, 'organizationId'));
      set(data, 'referralOut.referralOrganization.name', get(referralOut, 'organizationName'));
    }

    if (get(data, 'deliveryDate')) {
      set(data, 'deliveryDate', moment(get(data, 'deliveryDate')));
    }
    if (get(data, 'closingDate')) {
      set(data, 'closingDate', moment(get(data, 'closingDate')));
    }

    this.setState({ formDescriptions, formDescriptionsWithoutSection, data, formKey });
  }

  handleSubmit = async (values: any) => {

    const { data, formDescriptionsWithoutSection } = this.state;
    const { toApi = defaultToApi, baseUrl, isSingle } = this.props;
    let params = await toApi(values, formDescriptionsWithoutSection);
    params = transformDate(params);
    //转诊数据
    if (filterReferrals(data, params, 1).length > 0) {
      const referralOutInfo = filterReferrals(data, params, 1);
      set(params, 'referralOutInfo', referralOutInfo[0]);
    }


    const postParams = pick(params, [
      'id',
      'periodState',
      'closingDate',
      'recordstate',
      'referralOutInfo',
      'closingGestationalWeek',
      'closingNote',
      'deliveryDate',
      'deliveryGestationalWeek',
      'deliveryMode',
    ]);
    const newData = await SMchc_Doctor.updateOutpatientDocumentStatus(postParams);
    message.success(`修改成功`);
    if (get(params, 'recordstate') === '6' && isSingle) {
      this.setState({ modalVisible: true });
    }
    this.setState({ data: newData });
  };

  handleOk = () => {
    const { history, pregnancyData, tabs, deleteTab, isSingle } = this.props;
    const activeKey = get(tabs, 'activeKey');
    this.setState({ modalVisible: false });
    SLocal_History.closeAndReplace(
      {
        pathname: '/single/add-archival',
        state: {
          pregnancyData,
          isSingle: isSingle,
          location: get(history, 'location'),
        },
      }
    )

  };

  handleCancel = () => {
    this.setState({ modalVisible: false });
  };

  renderOtherModal = () => {
    const { modalVisible } = this.state;
    return (
      <Modal style={{ top: '200px' }} visible={modalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
        此份档案已结案，是否需要新建档案？
      </Modal>
    );
  };
}
export default ClosingArchives
