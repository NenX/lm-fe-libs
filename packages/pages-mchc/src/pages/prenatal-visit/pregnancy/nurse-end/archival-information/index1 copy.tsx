import React from 'react';
import { mchcEvent, mchcLogger } from '@lm_fe/env';
import { SLocal_History, SLocal_SystemConfig, SLocal_Utils, SMchc_FormDescriptions } from '@lm_fe/service';
import { formatDate, getSearchParamsValue, request, safe_json_parse } from '@lm_fe/utils';
import { message } from 'antd';
import { assign, find, get, includes, isArray, isEmpty, isPlainObject, map, orderBy, set } from 'lodash';
import moment from 'moment';
import { Ws } from './Ws';
import Form from './components/Form';
import {
  BaseEditPanel,
  fromApi as defaultFromApi,
  toApi as defaultToApi,
  filterReferrals,
  formDescriptionsFromApi,
  formDescriptionsWithoutSectionApi, getPhysicalExamdata, levelOptionsobj_Old, observePatientData
} from '@lm_fe/components_m';
class Pregnancies extends BaseEditPanel {
  static defaultProps = {
    baseUrl: '/api/nurse/newOutpatientDocument',
    moduleName: 'pregnancy',
    title: '孕册',
    printResource: 'prenatalVisit',
    Form,
  };

  async componentDidMount() {
    this.init()
  }
  async init() {
    const { routerQuery, moduleName, baseUrl, fromApi = defaultFromApi } = this.props;



    // 订阅从 panel 获取的数据
    // event: ƒ (data)
    // subscribe: ƒ subscribe(fn)
    // triger: ƒ triger(data)
    // unSubscribe: ƒ unSubscribe()
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
    let data: any = id ? (await request.get(`/api/nurse/getOutpatientDocument?id=${id}`)).data : {};

    const g = data?.baseInfo?.gravidity ?? 0;
    const p = data?.baseInfo?.parity ?? 0;

    // 获取配置文件
    const formField = await SMchc_FormDescriptions.getModuleCache(moduleName!);

    //     0: {id: 70, moduleName: 'pregnancy', name: '孕妇基本信息', flag: '产前检查-护士端-档案信息-孕妇基本信息', sort: 1, …}
    // 1: {id: 71, moduleName: 'pregnancy', name: '丈夫基本信息', flag: '产前检查-护士端-档案信息-丈夫基本信息', sort: 2, …}
    // 2: {id: 72, moduleName: 'pregnancy', name: '本次孕产信息', flag: '产前检查-护士端-档案信息-本次孕产信息', sort: 3, …}
    // 3: {id: 73, moduleName: 'pregnancy', name: '孕产史', flag: '产前检查-护士端-档案信息-孕产史', sort: 4, …}
    // 4: {id: 138, moduleName: 'pregnancy', name: '高危管理', flag: '产前检查-护士端-档案信息-高危管理', sort: 5, …}
    // 5: {id: 178, moduleName: 'pregnancy', name: '体征检查', flag: '产前检查-护士端-档案信息-体征检查', sort: 6, …}
    // 6: {id: 195, moduleName: 'pregnancy', name: '转入登记', flag: '产前检查-护士端-档案信息-转入登记', sort: 7, …}
    // length: 7
    this.setState({ spinning: false });
    let formDescriptions = formDescriptionsFromApi(formField);
    const target = formDescriptions.find(_ => _.name === '孕产史')
    if (g || p) {
      if (target) {
        // target.name = `${target.name} (孕产: ${g}/${p})`
        const f = target.fields[0]

        if (f?.inputProps) {
          Object.assign(f?.inputProps, { pregnancyId: id })
        }
      }

    }
    formDescriptions.forEach((fd) =>
      fd.fields.forEach(
        (f: any) => {

          f.label.includes('月经持续天数') && Object.assign(f.inputProps, { placeholder: '请输入月经持续天数' })

          if (f.label.includes('孕产史')) {
            f.inputProps.tableColumns = f.inputProps.tableColumns.map((col: any) => {
              if (col.key === 'year') {
                return { ...col, width: 70 };
              }
              return col;
            });
          }

        }
      ),
    );

    let formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);

    // 体征数据处理
    const { physicalExam } = data as any;

    const physicalExamMeasure = getPhysicalExamdata(physicalExam);

    if (!isEmpty(physicalExamMeasure)) set(data, 'physicalExamMeasure', physicalExamMeasure);

    data = id ? fromApi(data, formDescriptionsWithoutSection) : {};

    const formKey = get(data, 'id') || Math.random();

    // 孕产史数据排序处理
    const pregnancyHistories = get(data, 'pregnancymh');
    if (pregnancyHistories) {
      set(data, 'pregnancyHistories', orderBy(pregnancyHistories, ['gravidityindex'], ['asc']));
    }

    //高危信息
    const highRiskInfo = get(data, 'highRiskInfo');
    const highriskVersion = SLocal_SystemConfig.get('highriskVersion')
    const levelOptions = get(levelOptionsobj_Old, `${highriskVersion}`);
    if (highRiskInfo) {
      set(data, 'highriskGrade', this.highriskGradeFormApi(levelOptions, get(highRiskInfo, 'highriskGrade'))); // value->label
      set(data, 'highriskNote', get(highRiskInfo, 'highriskNote'));
      set(data, 'infectionNote', get(highRiskInfo, 'infectionNote'));
    }

    // 筛选出转入登记数据
    let referralIn = get(data, 'referralInInfo');
    referralIn = isEmpty(referralIn) ? {} : referralIn;
    set(data, 'referralIn', referralIn);
    if (!isEmpty(referralIn)) {
      set(data, 'referralIn.referralOrganization.id', get(referralIn, 'organizationId'));
      set(data, 'referralIn.referralOrganization.name', get(referralIn, 'organizationName'));
    }

    //建档日期
    if (!get(data, 'pregnancyInfo.validateDate')) set(data, 'pregnancyInfo.validateDate', moment(new Date()));

    //婚姻状况
    if (get(data, 'baseInfo.maritalStatus')) {
      set(data, 'maritalStatus', get(data, 'baseInfo.maritalStatus'));
    }

    // 过敏史
    if (
      !get(data, 'pregnancyInfo.amh.drug') &&
      !get(data, 'pregnancyInfo.amh.food') &&
      !get(data, 'pregnancyInfo.amh.unknown') &&
      !get(data, 'pregnancyInfo.amh.other')
    ) {
      set(data, 'pregnancyInfo.amh.nothing', true);
    }

    function changeRequired(formDescriptions: any, bool: boolean) {
      const fields = get(formDescriptions, `[1].fields`);
      function changeRequired(fields: any, key: string) {
        const obj = find(fields, (item) => item.name == key);
        map(get(obj, `rules`), (item: any) => {
          if (get(item, `required`) || bool) {
            set(item, `required`, bool);
          }
        });
      }
      changeRequired(fields, 'partnerInfo.partnerName');
      changeRequired(fields, 'partnerInfo.partnerTelephone');
      formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);
    }

    if (includes([2, 3, 5], get(data, `baseInfo.maritalStatus`))) {
      changeRequired(formDescriptions, false);
    }
    if (includes([1, 4], get(data, `baseInfo.maritalStatus`))) {
      changeRequired(formDescriptions, true);
    }
    mchcLogger.log('init', data)
    this.setState({ formDescriptions, formDescriptionsWithoutSection, data, formKey, levelOptions });
  }
  renderOtherModal = () => {
    return <Ws />
  };
  highriskGradeFormApi(levelOptions: any, value: any) {
    return get(
      find(levelOptions, (item: any) => item.value == value),
      'label',
    );
  }
  highriskGradeToApi(value: string) {
    if (includes(['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], value)) {
      return value;
    }
    return (
      get(
        find(this.state.levelOptions, (item: any) => item.label == value),
        'value',
      ) || value
    );
  }
  handleSubmit = async (values: any) => {
    let tips = '修改';
    let pregnancyID = '';
    const { data, formDescriptionsWithoutSection } = this.state;
    const { toApi = defaultToApi, baseUrl, reloadHeader } = this.props;
    let params = await toApi(values, formDescriptionsWithoutSection);

    /*孕册二级对象作合并处理*/
    Object.keys(params).forEach((item: any) => {
      if (isPlainObject(get(params, item))) {
        let assignVal = assign({}, get(data, item), get(params, item));
        set(params, item, assignVal);
      }
    });

    if (get(values, 'noCheck')) {
      if (!get(data, 'recordstate') || get(data, 'recordstate') === '0') {
        set(params, 'recordstate', '0');
        tips = '保存';
      }
    } else {
      if (!get(data, 'recordstate') || get(data, 'recordstate') === '0') {
        set(params, 'recordstate', '1');
        tips = '审核';
      }
    }

    //转入登记
    set(params, 'referralInInfo', filterReferrals(data, params)[0]);

    //婚姻状况
    set(params, 'baseInfo.maritalStatus', get(params, 'maritalStatus'));

    //高危信息
    set(params, 'highRiskInfo.highriskGrade', this.highriskGradeToApi(get(params, 'highriskGrade')));
    set(
      params,
      'highRiskInfo.highriskNote',
      safe_json_parse(get(params, 'highriskNote'), [get(params, 'highriskNote')]).join(','),
    );
    set(params, 'highRiskInfo.infectionNote', isArray(get(params, 'infectionNote')) && get(params, 'infectionNote').length == 0 ? '' : get(params, 'infectionNote'));
    const { baseInfo, partnerInfo, pregnancyInfo, physicalExamMeasure } = params;
    //孕妇基本信息
    baseInfo.idType = get(baseInfo, 'idType.key');
    if (baseInfo.dob) {
      baseInfo.dob = formatDate(baseInfo.dob);
    }
    if (baseInfo.paymentDate) {
      baseInfo.paymentDate = formatDate(baseInfo.paymentDate);
    }

    //丈夫基本信息
    if (partnerInfo.partnerDob) {
      partnerInfo.partnerDob = formatDate(partnerInfo.partnerDob);
    }

    //本次孕产信息
    if (pregnancyInfo.validateDate) {
      pregnancyInfo.validateDate = formatDate(pregnancyInfo.validateDate);
    }
    if (pregnancyInfo.lmp) {
      pregnancyInfo.lmp = formatDate(pregnancyInfo.lmp);
    }
    if (pregnancyInfo.edd) {
      pregnancyInfo.edd = formatDate(pregnancyInfo.edd);
    }
    if (pregnancyInfo.sureEdd) {
      pregnancyInfo.sureEdd = formatDate(pregnancyInfo.sureEdd);
    }
    if (pregnancyInfo.branchNO) {
      pregnancyInfo.branchNO = get(pregnancyInfo, 'branchNO.key');
    }
    if (pregnancyInfo.customerService) {
      pregnancyInfo.customerService = get(pregnancyInfo, 'customerService.key');
    }
    if (pregnancyInfo.deliveryPoint) {
      pregnancyInfo.deliveryPoint = get(pregnancyInfo, 'deliveryPoint.key');
    }
    if (pregnancyInfo.conceiveMode) {
      pregnancyInfo.conceiveModeNote = get(pregnancyInfo, 'conceiveMode.keyNote');
      pregnancyInfo.conceiveMode = get(pregnancyInfo, 'conceiveMode.key');
      console.log('conceiveMode', pregnancyInfo)
    }
    // dysmenorrhea: { key: undefined, keyNote: undefined },
    // nearRelation: undefined,
    // smoke: { key: undefined, keyNote: undefined },
    // alcohol: { key: undefined, keyNote: undefined },
    // hazardoussubstances: { key: undefined, keyNote: undefined },
    // radioactivity: { key: undefined, keyNote: undefined },
    // medicine: { key: undefined, keyNote: undefined },
    // hypertension: { key: undefined, keyNote: undefined },
    // diabetes: { key: undefined, keyNote: undefined },
    // cardiacDisease: { key: undefined, keyNote: undefined },
    // operationmh: { ke
    let obj = ['dysmenorrhea', 'nearRelation', 'smoke', 'alcohol', 'hazardoussubstances', 'radioactivity', 'medicine', 'hypertension', 'diabetes', 'cardiacDisease', 'operationmh']
    obj.forEach((key: any) => {
      if (pregnancyInfo[key] == undefined) {
        pregnancyInfo[key] = null;
      }
    })
    // 处理家族史 过敏史数据
    let pregnancyInfoNew = { ...pregnancyInfo };
    // 暂时不用家族史的处理 以后可能会要，先屏蔽
    // if (pregnancyInfo.fmh) {
    //   if (get(pregnancyInfo, 'fmh.nothing')) {
    //     pregnancyInfoNew = {
    //       ...pregnancyInfoNew,
    //       fmh: {
    //         nothing: true,
    //         hypertension: false,
    //         hypertensionNote: '',
    //         diabetes: false,
    //         diabetesNote: '',
    //         birthdefects: false,
    //         birthdefectsNote: '',
    //         heritableDisease: false,
    //         heritableDiseaseNote: '',
    //         other: false,
    //         otherNote: '',
    //       },
    //     };
    //   } else {
    //     pregnancyInfoNew = {
    //       ...pregnancyInfoNew,
    //     };
    //   }
    // }
    if (pregnancyInfo.amh) {
      if (get(pregnancyInfo, 'amh.nothing')) {
        pregnancyInfoNew = {
          ...pregnancyInfoNew,
          amh: {
            nothing: true,
            drug: false,
            drugNote: '',
            food: false,
            foodNote: '',
            other: false,
            otherNote: '',
          },
        };
      } else {
        pregnancyInfoNew = {
          ...pregnancyInfoNew,
        };
      }
    }
    set(params, 'pregnancyInfo', pregnancyInfoNew);

    //孕产史
    if (params.pregnancyHistories) {
      map(params.pregnancyHistories, (data, index) => {
        if (get(data, 'fetalcount')) {
          set(data, 'fetalcount', Number(get(data, 'fetalcount')));
        } else {
          set(data, 'fetalcount', null);
        }
      });
      set(params, 'pregnancymh', params.pregnancyHistories);
    }

    //体征检查
    if (!isEmpty(physicalExamMeasure)) {
      let physicalExam = {
        ...physicalExamMeasure,
        systolic: get(physicalExamMeasure, 'bloodPressure.systolic'),
        diastolic: get(physicalExamMeasure, 'bloodPressure.diastolic'),
        systolic2: get(physicalExamMeasure, 'bloodPressure2.systolic'),
        diastolic2: get(physicalExamMeasure, 'bloodPressure2.diastolic'),
        systolic3: get(physicalExamMeasure, 'bloodPressure3.systolic'),
        diastolic3: get(physicalExamMeasure, 'bloodPressure3.diastolic'),
      };
      set(params, 'physicalExam', physicalExam);
    }

    if (get(values, 'id')) {
      // 修改孕册
      await request.put('/api/nurse/updateOutpatientDocument', params);
      message.success(`${tips}成功`);
      pregnancyID = get(values, 'id');
    } else {
      // 新增孕册
      tips = '新增';
      const pregnancyData = (await request.post(baseUrl, params)).data;
      message.success(`${tips}成功`);
      pregnancyID = get(pregnancyData, 'id');
    }

    if (!get(values, 'noCheck') && tips !== '修改') {
      SLocal_History.closeAndReplace(`/prenatal-visit/pregnancy/nurse-end?id=${pregnancyID}`)

    }

    reloadHeader && await reloadHeader();
    this.init()

    const pregnancyId = get(this.props, 'id') ?? getSearchParamsValue('id')

    mchcEvent.emit('outpatient', { type: '刷新头部', pregnancyId })
  };

  extraEvents = {
    /** 额外的事件 */
    changeFormDescriptions: (formDescriptions: any, data: any) => {
      const formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);

      this.setState({
        formDescriptions: formDescriptions,
        formDescriptionsWithoutSection: formDescriptionsWithoutSection,
        formKey: Math.random(),
        data,
      });
    },
  };
}
export default Pregnancies;
