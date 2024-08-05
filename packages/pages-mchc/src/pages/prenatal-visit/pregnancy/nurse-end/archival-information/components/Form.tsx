import {
  CloseOutlined,
  IdcardOutlined,
  LoadingOutlined,
  PrinterOutlined,
  QrcodeOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { ALLOW_CALC_EDD_BASED_ON_IVF, BaseEditPanelForm, GetAgeByBirthDay, WEBSOCKET_STATUS, fromApi, getBMI, mchcModal } from '@lm_fe/components_m';
import { mchcEnv, mchcStore, mchcUtils, otherOptions } from '@lm_fe/env';
import { SLocal_Calculator, SLocal_History, SLocal_SystemConfig, SMchc_Common } from '@lm_fe/service';
import { formatDate, request, safe_json_parse } from '@lm_fe/utils';
import { Button, Col, Row, Space, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { cloneDeep, find, get, includes, isEmpty, isNil, map, set, size } from 'lodash';
import moment from 'moment';
const WEBSOCKETMAPS = otherOptions.WEBSOCKETMAPS
class PregnanciesForm extends BaseEditPanelForm {
  state = {
    QRCodeLoading: false,
    IDCardLoading: false,
    visitId: null,
  };

  componentWillMount() {
    const { formDescriptionsWithoutSection, history, config } = this.props;
    const websocketServices = window.websocketServices;
    const search = get(history, 'location.search');
    const openWebsocket = SLocal_SystemConfig.get('openWebsocket')
    if (!(openWebsocket && !!websocketServices) || search) {
      return;
    }
    websocketServices.addEventListener('message', (e: any) => {
      if (e && e.data && !e.data.includes('{')) {
        this.setState({
          QRCodeLoading: false,
        });
        return message.info(`${e.data}，请重新扫描二维码`);
      }
      let d = {};
      if (e && e.data && e.data.includes('{')) {
        d = JSON.parse(e.data).data;
        this.setState({
          QRCodeLoading: false,
        });
      }
      let newd = {};
      for (const key in d) {
        if (Object.prototype.hasOwnProperty.call(d, key)) {
          const value = d[key];
          if (Object.prototype.toString.call(value) == '[object Object]') {
            const subMaps = WEBSOCKETMAPS[WEBSOCKETMAPS[key]];
            let subValues = {};
            for (const subKey in value) {
              if (Object.prototype.hasOwnProperty.call(value, subKey)) {
                const subElement = value[subKey];
                subValues = { ...subValues, [subMaps[subKey]]: subElement };
              }
            }
            newd = { ...newd, [WEBSOCKETMAPS[key]]: subValues };
          } else {
            newd = { ...newd, [WEBSOCKETMAPS[key]]: value };
          }
        }
      }
      // console.log('-----transform data-----', newd);
      // 身份证获取信息
      const personal = (newd.idNO && newd.idNO.length === 18 && mchcUtils.checkIdNo(newd.idNO)) || {};
      const partner = (newd.partnerIdNO && newd.partnerIdNO.length === 18 && mchcUtils.checkIdNo(newd.partnerIdNO, false)) || {};
      // bmi计算
      const bmi =
        newd.personalProfile && newd.personalProfile.preheight && newd.personalProfile.preweight
          ? getBMI(newd.personalProfile.preweight, newd.personalProfile.preheight)
          : null;
      if (personal.status) {
        newd = {
          ...newd,
          // 建档日期
          validateDate: moment().format(),
          // 孕妇身份证信息
          dob: personal.birth,
          age: personal.age,
          nationality: personal.nationality,
          nativeplace: personal.province,
          // 男方身份证信息
          partnerDob: partner.birth,
          partnerAge: partner.age,
          partnerNationality: partner.nationality,
          partnerNativeplace: partner.province,

          personalProfile: {
            ...newd.personalProfile,
            bmi,
          },
        };
      }

      const dd = fromApi(newd, formDescriptionsWithoutSection);
      return this.form?.setFieldsValue(dd);
    });
    return this.setState({
      QRCodeLoading: false,
    });
  }

  handleFinish = async () => {
    const form = this.form as unknown as FormInstance;
    const { onFinish, data } = this.props;
    form &&
      form
        .validateFields()
        .then(async () => {
          const params = {
            ...form.getFieldsValue(),
            id: get(data, 'id'),
          };
          onFinish && (await onFinish(params));
          if (!get(params, 'id')) form.resetFields();
        })
        .catch((error) => {
          const name = get(error, 'errorFields.0.name.0');
          const errors = get(error, 'errorFields.0.errors.0');
          message.error(errors);
          // const index = name.indexOf('_');
          // if (index > -1) {
          //   const sort = Number(name[index + 1]) + 1;
          //   message.error(`孕次${sort}：${errors}`);
          // } else {
          //   message.error(errors);
          // }
          form.scrollToField(name);
        });
  };

  handleItemBlur = async (e: any) => {
    const form = this.form as unknown as FormInstance;
    const { data } = this.props;

    if (get(e, 'target.id') === 'baseInfo_outpatientNO') {
      console.log({ a: 'adfadf' });
      const outpatientNO = get(e, 'target.value');
      if (get(data, 'id') || !outpatientNO) return;

      const resData = (await request.get(`/api${mchcEnv.is('广三') ? '/nurse/getPregnancyFromObisOrHis' : '/pregnancies'}?outpatientNO.equals=${outpatientNO}&page=0&size=20`)).data;
      let pregnancyData = get(resData, '0') || {};
      if (get(pregnancyData, 'id') && get(pregnancyData, 'recordstate') !== '6') {
        message.error('就诊卡号已存在！', 5);
        form && form.setFieldsValue({ baseInfo: { outpatientNO: null } });
        return;
      }

      if (!isEmpty(pregnancyData)) {
        let idNO = get(pregnancyData, 'idNO');
        const idType = get(pregnancyData, 'idType')
        pregnancyData.idType = { key: idType }
        idNO = idNO?.replace(/\s*/g, '');
        if (idType === 1 && size(idNO) === 18) {

          const checkData = mchcUtils.checkIdNo(idNO)
          if (checkData.status) {
            pregnancyData = {
              ...pregnancyData,
              dob: checkData.birth,
              nationality: '法国',
              nativeplace: checkData.province,
              age: checkData.age,
            };
          }
        }
        form && form.setFieldsValue({ baseInfo: { ...pregnancyData }, partnerInfo: { ...pregnancyData }, ...pregnancyData });
      }
    }

    if (get(e, 'target.id') === 'baseInfo_idNO') {
      let idNO = get(e, 'target.value');
      if (get(data, 'id') || !idNO) return;
      idNO = idNO?.replace(/\s*/g, '');
      let pregData = (await request.get(`/api/pregnancies/idNO/${idNO}`)).data;
      if (!isNil(pregData)) {
        form.setFieldsValue({
          ...pregData,
        });
      }
    }
  };

  // Form onFieldsChange
  handleFieldsChange = async (changedFields: any, allFields: any) => {
    const form = this.form;
    if (!changedFields) return;
    // const { name, value } = changedFields[0];
    const name = get(changedFields, `[0].name`) || [];
    const value = get(changedFields, `[0].value`);
    const key = name.join('.');
    if (key === 'baseInfo.payment') {
      // 获取服务器端时间
      // console.log('time', await request.get(`api/current-time`));
      const serverTime = (await request.get(`api/current-time`)).data;
      const paymentDate = value ? moment(serverTime) : undefined;
      form &&
        form.setFieldsValue({
          baseInfo: {
            paymentDate: paymentDate,
          },
        });
    }
  };

  // Form onValuesChange
  handleItemChange = async (changedValues: any, allValues: any) => {
    console.log('changedValues', changedValues, allValues)
    const form = this.form as unknown as FormInstance;
    if (
      get(allValues, 'baseInfo.idType.key') === 1 &&
      size(get(changedValues, 'baseInfo.idNO')?.replace(/\s*/g, '')) === 18
    ) {
      if (get(mchcUtils.checkIdNo(get(changedValues, 'baseInfo.idNO')), 'status') == true) {
        let idNO = get(changedValues, 'baseInfo.idNO');
        idNO = idNO?.replace(/\s*/g, '');
        const checkData = mchcUtils.checkIdNo(idNO)
        if (checkData.status) {

          form &&
            form.setFieldsValue({
              baseInfo: {
                dob: checkData.birth,
                nationality: '中国',
                nativeplace: checkData.province,
                age: checkData.age,
              },
            });
        }
      } else {
        message.error('请输入符合规范的身份证号码！');
      }
    }
    if (get(changedValues, 'baseInfo.dob') && size(get(changedValues, 'baseInfo.idNO')) != 18) {
      const birthDay = get(changedValues, 'baseInfo.dob').format('YYYY-MM-DD');
      form && form.setFieldsValue({ baseInfo: { age: GetAgeByBirthDay(birthDay) } });
    }

    if (
      get(allValues, 'partnerInfo.partnerIdType') === 1 &&
      get(changedValues, 'partnerInfo.partnerIdNO') &&
      get(changedValues, 'partnerInfo.partnerIdNO')?.replace(/\s*/g, '').length === 18
    ) {
      if (get(mchcUtils.checkIdNo(get(changedValues, 'partnerInfo.partnerIdNO'), false), 'status') == true) {
        let partnerIdNO = get(changedValues, 'partnerInfo.partnerIdNO');
        partnerIdNO = partnerIdNO?.replace(/\s*/g, '');
        const checkData = mchcUtils.checkIdNo(partnerIdNO)
        if (checkData.status) {
          form &&
            form.setFieldsValue({
              partnerInfo: {
                partnerDob: checkData.birth,
                partnerNationality: '中国',
                partnerNativeplace: checkData.province,
                partnerAge: checkData.age,
              },
            });
        }
      } else {
        message.error('请输入符合规范的身份证号码！');
      }
    }
    if (get(changedValues, 'partnerInfo.partnerDob') && size(get(changedValues, 'partnerInfo.partnerIdNO')) != 18) {
      const birthDay = get(changedValues, 'partnerInfo.partnerDob').format('YYYY-MM-DD');
      form &&
        form.setFieldsValue({
          partnerInfo: { partnerAge: GetAgeByBirthDay(birthDay) },
        });
    }

    if (get(changedValues, 'pregnancyInfo.lmp') && get(allValues, `pregnancyInfo.conceiveMode.key`) !== 1) {
      const lmp = formatDate(get(changedValues, 'pregnancyInfo.lmp'));
      const value = (await request.get(`/api/pregnancyCalc-calcEddByLmp?lmp=${lmp}`)).data;
      form &&
        form.setFieldsValue({
          pregnancyInfo: {
            edd: moment(value),
            sureEdd: moment(value),
          },
        });
    }

    if (
      (get(changedValues, 'pregnancyInfo.preweight') && get(allValues, 'pregnancyInfo.preheight')) ||
      (get(changedValues, 'pregnancyInfo.preheight') && get(allValues, 'pregnancyInfo.preweight'))
    ) {
      const bmi = getBMI(get(allValues, 'pregnancyInfo.preweight'), get(allValues, 'pregnancyInfo.preheight'));
      form && form.setFieldsValue({ pregnancyInfo: { bmi: bmi } });
    }

    if (get(changedValues, 'referralInReferralOrganization')) {
      const referralInReferralOrganization = get(changedValues, 'referralInReferralOrganization');

      const organization = await SMchc_Common.getReferralOrganizations({ name: referralInReferralOrganization })

      const currentOrganization = await SMchc_Common.getCurrReferralOrganization()


      const organizationGrade = get(organization, '0.grade');
      const currentOrganizationGrade = get(currentOrganization, 'grade');
      const direction =
        currentOrganizationGrade === organizationGrade ? 1 : currentOrganizationGrade > organizationGrade ? 2 : 3;

      this.form?.setFieldsValue({
        referralInReferralDirection: direction,
        referralInReferralOrganization: get(organization, 0),
      });
    }
    if (includes([2, 3, 5], get(changedValues, `maritalStatus`))) {
      this.changeRequired(changedValues, false);
    }
    if (includes([1, 4], get(changedValues, `maritalStatus`))) {
      this.changeRequired(changedValues, true);
    }

    const conceiveMode = get(changedValues, `pregnancyInfo.conceiveMode`)
    if (conceiveMode) {
      const checkedValues = conceiveMode.key
      const withInputValues = safe_json_parse(conceiveMode.keyNote)
      const subValue = withInputValues?.[checkedValues]?.value ?? {}
      const 移植时间 = subValue[0]
      const 天数 = subValue[1] ?? 0
      const 胚胎数 = subValue[2] ?? 0
      const isIVF = checkedValues === 1


      if (isIVF && 移植时间) {
        const value = await SLocal_Calculator.calcEddBasedOnIVF(移植时间, 天数)
        mchcModal.confirmOnce({
          title: '根据胚胎移植时间，是否调整预产期B超时间？',
          storeKey: ALLOW_CALC_EDD_BASED_ON_IVF,
          cb: () => form?.setFieldsValue({
            pregnancyInfo: {
              sureEdd: moment(value),
            },
          })
        })
      }
    }
  };
  changeRequired(changedValues: any, bool: any) {
    const { formDescriptions, extraEvents, data } = this.props;

    const formDescriptionsDeep = cloneDeep(formDescriptions);
    const fields = get(formDescriptionsDeep, `[1].fields`);
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
    // let dataDeep = cloneDeep(data);
    const form = this.form as unknown as FormInstance;
    const dataDeep = cloneDeep(form.getFieldsValue());

    set(dataDeep, `maritalStatus`, get(changedValues, `maritalStatus`));
    // extraEvents['changeFormDescriptions'](formDescriptionsDeep, dataDeep);
    extraEvents['changeFormDescriptions'](formDescriptionsDeep, { ...data, ...dataDeep });
  }

  handleCancel = () => {
    const { data } = this.props;
    const form = this.form as unknown as FormInstance;
    if (!get(data, 'id')) form.resetFields();
    SLocal_History.closeAndReplace('/prenatal-visit/pregnancy/list')
  };

  handleSaveAndNext = () => {
    const form = this.form as unknown as FormInstance;
    const { onFinish, data } = this.props;
    form &&
      form
        .validateFields()
        .then(() => {
          const params = {
            ...form.getFieldsValue(),
            id: get(data, 'id'),
          };
          onFinish && onFinish({ ...params, noCheck: true }); //不审核
          form.resetFields();
        })
        .catch((error) => {
          const name = get(error, 'errorFields.0.name.0');
          const errors = get(error, 'errorFields.0.errors.0');
          message.error(errors);
          // const index = name.indexOf('_');
          // if (index > -1) {
          //   const sort = Number(name[index + 1]) + 1;
          //   message.error(`孕次${sort}：${errors}`);
          // } else {
          //   message.error(errors);
          // }
          form.scrollToField(name);
        });
  };

  handlePrint = async () => {
    const { printUrl = '/api/pdf-preview', printResource, printTemplate, data } = this.props;

    const { data } = this.props;
    // const visitData = await request.get(
    //   `/api/prenatal-visits?visitType.equals=0&pregnancyId.equals=${get(data, 'id')}`,
    // );


    mchcModal.open('print_modal', {
      modal_data: {
        requestData: {
          url: printUrl,
          resource: printResource,
          template: printTemplate,
          version: '',
          note: '',
          id: get(data, 'id'),
        }
      }
    })
  };



  renderPrintBtn = () => {
    return (
      <Button size="large" type="primary" icon={<PrinterOutlined />} onClick={this.handlePrint}>
        打印
      </Button>
    );
  };

  renderCheckBtn = () => {
    const { data } = this.props;

    return (
      <Button
        size="large"
        type="primary"
        icon={<SaveOutlined />}
        htmlType="submit"
        onClick={this.handleFinish}
        disabled={data.recordstate == '6'}
      >
        {!data.recordstate || data.recordstate === '0' ? '保存并审核' : '保存'}
      </Button>
    );
  };

  renderCancelBtn = () => {
    return (
      <>
        <Button size="large" icon={<CloseOutlined />} onClick={this.handleCancel}>
          关闭
        </Button>
      </>
    );
  };

  renderSaveAndNext = () => {
    return (
      <Button size="large" type="primary" icon={<SaveOutlined />} onClick={this.handleSaveAndNext}>
        保存并继续添加孕册
      </Button>
    );
  };

  renderBtns = () => {
    const { history, data } = this.props;
    return (
      <Space>
        {data.recordstate && data.recordstate !== '0' && this.renderPrintBtn()}
        {!get(history, 'location.search') && this.renderSaveAndNext()}
        {this.renderCheckBtn()}
        {this.renderCancelBtn()}
      </Space>
    );
  };

  readIDCard = () => {
    const websocketServices = window.websocketServices;
    const command = {
      name: 'ReadCard',
      data: {},
    };
    websocketServices.send(JSON.stringify(command));
    this.setState({
      IDCardLoading: true,
    });
  };

  readQRCode = () => {
    let websocketServices = window.websocketServices;
    const command = {
      name: 'QRScan',
      data: {},
    };
    websocketServices.send(JSON.stringify(command));
    this.setState({
      QRCodeLoading: true,
    });
  };

  readSnap = () => {
    let websocketServices = window.websocketServices;
    const command = {
      name: 'Snap',
      data: {
        pid: '',
        uid: '',
        token: '',
      },
    };
    websocketServices.send(JSON.stringify(command));
  };

  // 地址组件 触发按钮
  getEvents = () => ({
    handleIDNumberChange: (id: string) => {
      if (id === 'baseInfo_residenceAddress') {
        const value = this.form?.getFieldValue(['baseInfo', 'permanentResidenceAddress']);
        !value && message.info('请先填写完整的户口地址信息！');
        value && this.form?.setFieldsValue({ baseInfo: { residenceAddress: value } });
      }
      if (id === 'baseInfo_postpartumAddress') {
        const value = this.form?.getFieldValue(['baseInfo', 'residenceAddress']);
        !value && message.info('请先填写完整的居住地址信息！');
        value && this.form?.setFieldsValue({ baseInfo: { postpartumAddress: value } });
      }
      if (id === 'partnerInfo_partnerPermanentResidenceAddress') {
        const value = this.form?.getFieldValue(['baseInfo', 'permanentResidenceAddress']);
        !value && message.info('请先填写完整的女方户口地址信息！');
        value && this.form?.setFieldsValue({ partnerInfo: { partnerPermanentResidenceAddress: value } });
      }
      if (id === 'partnerInfo_partnerResidenceAddress') {
        const value = this.form?.getFieldValue(['baseInfo', 'residenceAddress']);
        !value && message.info('请先填写完整的女方居住地址信息！');
        value && this.form?.setFieldsValue({ partnerInfo: { partnerResidenceAddress: value } });
      }
      if (id == 'residenceAddress') {
        const value = this.form?.getFieldValue(['baseInfo', 'residenceAddress']);
        !value && message.info('请先填写完整的女方的居住地址信息！');
        value && this.form?.setFieldsValue({ baseInfo: { postpartumAddress: value } });
      }
      if (id == 'permanentResidenceAddress') {
        const value = this.form?.getFieldValue(['baseInfo', 'permanentResidenceAddress']);
        !value && message.info('请先填写完整的女方的户籍地址信息！');
        value && this.form?.setFieldsValue({ baseInfo: { postpartumAddress: value } });
      }
      if (id == 'hubResidenceBywpAddress') {
        const value = this.form?.getFieldValue(['baseInfo', 'permanentResidenceAddress']);
        !value && message.info('请先填写完整的女方户籍地址信息！');
        value && this.form?.setFieldsValue({ partnerInfo: { partnerPermanentResidenceAddress: value } });
      }
      if (id == 'hubResidenceBywifeesidenceAddress') {
        const value = this.form?.getFieldValue(['baseInfo', 'residenceAddress']);
        !value && message.info('请先填写完整的女方居住地址信息！');
        value && this.form?.setFieldsValue({ partnerInfo: { partnerPermanentResidenceAddress: value } });
      }
      if (id == 'hubbyResidenceAddress') {
        const value = this.form?.getFieldValue(['partnerInfo', 'partnerPermanentResidenceAddress']);
        !value && message.info('请先填写完整的男方户籍地址信息！');
        value && this.form?.setFieldsValue({ partnerInfo: { partnerResidenceAddress: value } });
      }
      if (id == 'hubbywifeResidenceAddress') {
        const value = this.form?.getFieldValue(['baseInfo', 'residenceAddress']);
        !value && message.info('请先填写完整的女方居住地址信息！');
        value && this.form?.setFieldsValue({ partnerInfo: { partnerResidenceAddress: value } });
      }
      // 男方户籍地址同步按钮
      // 同女方户籍地址
      if (id == 'hupermanentResidenceAddress') {
        const value = this.form?.getFieldValue(['baseInfo', 'permanentResidenceAddress']);
        !value && message.info('请先填写完整的女方的户籍地址信息！');
        value && this.form?.setFieldsValue({ partnerInfo: { partnerPermanentResidenceAddress: value } });
      }
      // 同女方居住地址
      if (id == 'huresidenceAddress') {
        const value = this.form?.getFieldValue(['baseInfo', 'residenceAddress']);
        !value && message.info('请先填写完整的女方的居住地址信息！');
        value && this.form?.setFieldsValue({ partnerInfo: { partnerPermanentResidenceAddress: value } });
      }
    },
    handleAddressChange: (id: string, syncKey: string) => {
      if (syncKey == 'residenceAddress') {
        const value = this.form?.getFieldValue(['baseInfo', `${syncKey}`]);
        !value && message.info('请先填写完整的户口地址信息！');
        value && this.form?.setFieldsValue({ baseInfo: { residenceAddress: value } });
      }
    },
    handleButton: (id: string, isCheck: boolean) => {
      // 一键勾选
      if (id === 'selectBtn' && isCheck) {
        const form = this.form as unknown as FormInstance;
        form &&
          form.setFieldsValue({
            pregnancyInfo: {
              // personalProfileConceiveMode: { key: 2, keyNote: undefined },
              // menstrualHistoryMenstrualVolume: '多',
              dysmenorrhea: { key: false, keyNote: undefined },
              nearRelation: false,
              smoke: { key: false, keyNote: undefined },
              alcohol: { key: false, keyNote: undefined },
              hazardoussubstances: { key: false, keyNote: undefined },
              radioactivity: { key: false, keyNote: undefined },
              medicine: { key: false, keyNote: undefined },
              hypertension: { key: false, keyNote: undefined },
              diabetes: { key: false, keyNote: undefined },
              cardiacDisease: { key: false, keyNote: undefined },
              operationmh: { key: false, keyNote: undefined },
              // // 过敏史，家族史这样写无效
              // allergyHistory: { none: true, drug: false, food: false, other: false },
              // familyHistory: {
              //   birthdefects: false,
              //   diabetes: false,
              //   heritableDisease: false,
              //   hypertension: false,
              //   none: true,
              //   other: false,
              // },
            },
          });
      }
      // 一键取消
      if (id === 'selectBtn' && !isCheck) {
        const form = this.form as unknown as FormInstance;
        form &&
          form.setFieldsValue({
            pregnancyInfo: {
              // personalProfileConceiveMode: { key: 2, keyNote: undefined },
              // menstrualHistoryMenstrualVolume: '多',
              dysmenorrhea: { key: undefined, keyNote: undefined },
              nearRelation: undefined,
              smoke: { key: undefined, keyNote: undefined },
              alcohol: { key: undefined, keyNote: undefined },
              hazardoussubstances: { key: undefined, keyNote: undefined },
              radioactivity: { key: undefined, keyNote: undefined },
              medicine: { key: undefined, keyNote: undefined },
              hypertension: { key: undefined, keyNote: undefined },
              diabetes: { key: undefined, keyNote: undefined },
              cardiacDisease: { key: undefined, keyNote: undefined },
              operationmh: { key: undefined, keyNote: undefined },
            },
          });
      }
    },
  });

  renderFreeButton = () => {
    const { history, } = this.props;
    const { QRCodeLoading, IDCardLoading } = this.state;
    const socketState = mchcStore.state.system.socketState
    return (
      <div className="base-edit-panel-form_freebtns"
      // style={{ width: '33.3%', marginLeft: 'calc(2 * 100% / 3)' }}
      >
        <Row>
          <Col offset={3}>
            <Button.Group>
              <Button.Group>
                <Button
                  type="primary"
                  icon={IDCardLoading ? <LoadingOutlined /> : <IdcardOutlined />}
                  disabled={
                    socketState !== WEBSOCKET_STATUS['OPEN'] || !!get(history, 'location.search') || IDCardLoading
                  }
                  onClick={this.readIDCard}
                >
                  读取身份证
                </Button>
                <Button
                  danger
                  type="primary"
                  icon={QRCodeLoading ? <LoadingOutlined /> : <QrcodeOutlined />}
                  disabled={
                    socketState !== WEBSOCKET_STATUS['OPEN'] || !!get(history, 'location.search') || QRCodeLoading
                  }
                  onClick={this.readQRCode}
                >
                  读取二维码
                </Button>
              </Button.Group>
            </Button.Group>
          </Col>
        </Row>
      </div>
    );
  };
}
export default PregnanciesForm
