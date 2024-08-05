import { get, set, orderBy, isEmpty, assign, isPlainObject, filter } from 'lodash';
import { message } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteTab } from '@/actions/tabs';
import BaseEditPanel from '@/components/BaseEditPanel';
import request from '@/lib/request';
import observePatientData from '@/utils/observePatientData';
import {
  formDescriptionsFromApi,
  formDescriptionsWithoutSectionApi,
  fromApi as defaultFromApi,
  toApi as defaultToApi,
} from '@/utils/adapter';
import { getFutureDate } from '@/utils/formula';
import Form from './components/Form';
import getFormDescriptions from '@/lib/request/getFormDescriptions';
import { filterReferrals, getPhysicalExamdata } from '@lm_fe/components_m';
class Pregnancies extends BaseEditPanel {
  static defaultProps = {
    baseUrl: '/api/pregnancies',
    moduleName: 'pregnancy',
    title: '孕册',
    printResource: 'prenatalVisit',
    Form,
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
    const formField = await getFormDescriptions(moduleName);
    this.setState({ spinning: false });
    const formDescriptions = formDescriptionsFromApi(formField);
    const formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);
    let data = id ? await request.get(`${baseUrl}/${id}`) : {};

    // 体征数据处理
    const measureData = id
      ? await request.get(`/api/measures?type.equals=0&outpatientNO.equals=${get(data, 'outpatientNO')}`)
      : [];
    const physicalExamMeasure = getPhysicalExamdata(measureData);
    if (!isEmpty(physicalExamMeasure)) set(data, 'physicalExamMeasure', physicalExamMeasure);

    data = id ? fromApi(data, formDescriptionsWithoutSection) : {};
    const formKey = get(data, 'id') || Math.random();

    // 孕产史数据排序处理
    const pregnancyHistories = get(data, 'pregnancyHistories');
    if (pregnancyHistories) {
      set(data, 'pregnancyHistories', orderBy(pregnancyHistories, ['gravidityindex'], ['asc']));
    }

    // 筛选出转入登记数据
    let referralIn = filter(get(data, 'referrals'), ['referralType', 2])[0];
    referralIn = isEmpty(referralIn) ? {} : referralIn;
    set(data, 'referralIn', referralIn);

    if (!get(data, 'validateDate')) set(data, 'validateDate', moment(new Date()));
    this.setState({ formDescriptions, formDescriptionsWithoutSection, data, formKey });
  }

  handleSubmit = async (values: any) => {
    let tips = '修改';
    let pregnancyID = '';
    const { data, formDescriptionsWithoutSection } = this.state;
    const { toApi = defaultToApi, baseUrl, deleteTab, history, activeKey, user } = this.props;
    let params = await toApi(values, formDescriptionsWithoutSection);
    console.log(params, 'params');

    /*孕册二级对象作合并处理*/
    Object.keys(params).forEach((item: any) => {
      if (isPlainObject(get(params, item))) {
        let assignVal = assign({}, get(data, item), get(params, item));
        set(params, item, assignVal);
      }
    });

    if (!get(data, 'recordstate') || get(data, 'recordstate') === '0') {
      set(params, 'recordstate', '1');
      tips = '审核';
    }
    set(params, 'referrals', filterReferrals(data, params));

    if (get(values, 'id')) {
      // 修改孕册
      await request.put(baseUrl, params);
      message.success(`${tips}成功`);
      pregnancyID = get(values, 'id');
    } else {
      // 新增孕册
      tips = '新增';
      const pregnancyData = await request.post(baseUrl, params);
      message.success(`${tips}成功`);
      pregnancyID = get(pregnancyData, 'id');
    }

    // 体征测量数据提交
    let physicalExamMeasure = get(params, 'physicalExamMeasure');
    if (!isEmpty(physicalExamMeasure)) {
      let data = {};
      const measureId = get(physicalExamMeasure, 'measureId');
      physicalExamMeasure = {
        ...physicalExamMeasure,
        systolic: get(physicalExamMeasure, 'bloodPressure.systolic'),
        diastolic: get(physicalExamMeasure, 'bloodPressure.diastolic'),
        systolic2: get(physicalExamMeasure, 'bloodPressure2.systolic'),
        diastolic2: get(physicalExamMeasure, 'bloodPressure2.diastolic'),
        systolic3: get(physicalExamMeasure, 'bloodPressure3.systolic'),
        diastolic3: get(physicalExamMeasure, 'bloodPressure3.diastolic'),
      };

      if (measureId) {
        data = { id: measureId, physicalExamMeasure };
        await request.put(`/api/measures`, data);
      } else {
        set(data, 'outpatientNO', get(params, 'outpatientNO'));
        set(data, 'name', get(params, 'name'));
        set(data, 'type', 0);
        set(data, 'createDate', getFutureDate(0));
        set(data, 'createUser.id', get(user, 'basicInfo.id'));
        set(data, 'physicalExamMeasure', physicalExamMeasure);
        await request.post(`/api/measures`, data);
      }
    }

    if (tips !== '修改') {
      deleteTab(activeKey);
      history && history.replace(`/prenatal-visit/pregnancy/nurse-end?id=${pregnancyID}`);
      // history && history.push('/prenatal-visit/pregnancy/list');
    }
  };
}
const mapStateToProps = ({ tabs, system }) => ({ ...tabs, system });
const Pregnancy = connect(mapStateToProps, { deleteTab })(Pregnancies);
export default Pregnancy;
