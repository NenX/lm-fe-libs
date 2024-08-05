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
import { SLocal_History } from '@lm_fe/service';
import { request } from '@lm_fe/utils';
import { Modal, message } from 'antd';
import { filter, get, isEmpty, last, map, set } from 'lodash';
import moment, { isMoment } from 'moment';
import React from 'react';
import Form from './components/Form';
// import { filterReferrals, transformDate } from './components/func';
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
    baseUrl: '/api/pregnancies',
    moduleName: 'close-archives',
    title: '结案管理',
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
    const { routerQuery, moduleName, baseUrl, fromApi = defaultFromApi } = this.props;
    // 订阅从 panel 获取的数据
    observePatientData.subscribe((data: any) => {
      const { data: prevData } = this.state;
      this.setState({
        data: {
          ...prevData,
          ...data,
        },
      });
    });
    const id = get(this.props, 'id') || get(routerQuery, 'id');
    // 获取配置文件
    const formField = (await request.get(`/api/form-descriptions?moduleName=${moduleName}`)).data;
    if (!formField) {
      return;
    }
    this.setState({ spinning: false });
    const formDescriptions = formDescriptionsFromApi(formField);
    const formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);
    let data = id ? (await request.get(`${baseUrl}/${id}`)).data : {};

    data = id ? fromApi(data, formDescriptionsWithoutSection) : {};
    const formKey = get(data, 'id') || Math.random();

    // 筛选出转出登记数据
    let referralOut = last(filter(get(data, 'referrals'), ['referralType', 1]));
    referralOut = isEmpty(referralOut) ? {} : referralOut;
    set(data, 'referralOut', referralOut);

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
    set(params, 'referrals', filterReferrals(data, params));

    console.log(params, 'params');

    // await request.put(baseUrl, params);
    message.success(`修改成功`);
    if (get(params, 'recordstate') === '6' && isSingle) {
      this.setState({ modalVisible: true });
    }
  };

  handleOk = () => {
    const { history, pregnancyData, isSingle } = this.props;
    this.setState({ modalVisible: false });
    SLocal_History.closeAndReplace({
      pathname: '/single/add-archival',
      state: {
        pregnancyData,
        isSingle: isSingle,
        location: get(history, 'location'),
      },
    })

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
export default ClosingArchives;
