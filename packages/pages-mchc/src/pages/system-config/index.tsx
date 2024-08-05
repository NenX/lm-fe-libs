import { mchcConfig, mchcDriver, mchcMacro, mchcStore, mchcUtils } from '@lm_fe/env';
import { Button, Checkbox, Col, Form, Input, InputNumber, message, Row, Select, Switch } from 'antd';
import { get, map } from 'lodash';
import React, { useEffect } from 'react';
import store from 'store';
import { doctor_tabs, medicalTypeMapping, NurseTypesMapping } from './config';
import './index.less';
import VersionModal from './VersionModal';
import { lm_pdfjs_info } from '@lm_fe/static'
const Item = Form.Item;
const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 15 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 15 },
};
const referralOptions = [
  {
    label: '1联',
    value: 1,
  },
  {
    label: '2联',
    value: 2,
  },
  {
    label: '3联',
    value: 3,
  },
];


function ConfigSystem(props: any) {
  const { dictionaries } = props;
  const [form] = Form.useForm()
  const [localForm] = Form.useForm()

  useEffect(() => {
    (async () => {
      const { } = props;
      const data = await mchcStore.getSystemConfig();
      form.setFieldsValue(data);
      // 读取本机配置
      const localData = store.get('localData');
      localForm.setFieldsValue(localData);
    })()

    return () => {
    }
  }, [])


  async function handleSave() {
    const _id = mchcConfig.get('id')
    const formData = form.getFieldsValue();
    await mchcStore.updateSystemConfig({
      id: _id,
      note: JSON.stringify(formData),
    });
    message.success('操作成功');
  };

  function onDownload() {
    // window.location.href = `${mchcMacro.PUBLIC_PATH}assets/OBDriver.msi`;
    mchcDriver.download()

  };

  function handleLocalSave() {
    const values = localForm.getFieldsValue();
    store.set('localData', values);
    message.success('操作成功');
  };



  const versionOptions = get(dictionaries, ['Highrisk.highriskVersion', 'enumerations']);

  return (
    <div className="system-config">
      <Row gutter={12}>
        <Col span={12}>
          <Form autoComplete="off" form={form} className="system-config-form" {...formLayout}>
            <div className="system-config-form-section">
              <div className="system-config-form-section-header">系统配置</div>
              <Item label="系统名称" name="systemName">
                <Input />
              </Item>
              <Item label="系统模式" name="systemMode">
                <Select
                  options={[
                    { value: 'production', label: '生产模式' },
                    { value: 'devlopment', label: '开发模式' },
                    { value: 'test', label: '测试模式' },
                  ]}
                />
              </Item>
              <Item label="PDF预览组件版本" name="PDF预览组件版本">
                <Select
                  options={Object.keys(lm_pdfjs_info.dirs).map(value => ({ label: value, value }))}
                />
              </Item>
              {/* <Item label="适配分辨率" name="systemResolution">
                <MultipleInputWithLabel
                  type="number"
                  min="900"
                  max="5000"
                  options={[
                    { labelBefore: '长', labelAfter: '' },
                    { labelBefore: '宽', labelAfter: '' },
                  ]}
                />
              </Item> */}
              <Item label="登录过期时间(秒)" name="expireTime">
                <InputNumber min={3600} max={72000} />
              </Item>
              <Item label="websocket服务" name="openWebsocket" valuePropName="checked">
                <Switch checkedChildren="开启" unCheckedChildren="关闭" />
              </Item>
              <Item noStyle shouldUpdate>
                {/* <Input disabled={!openWebsocket} /> */}
                {({ getFieldValue }) => {
                  const openWebsocket = getFieldValue('openWebsocket');
                  return (
                    <Item label="websocket服务地址" name="websocketAddress">
                      <Input disabled={!openWebsocket} placeholder="请输入websocker服务地址" />
                    </Item>
                  );
                }}
              </Item>
              <Item label="OBIS外设驱动下载">
                <Button type="primary" onClick={onDownload}>
                  下载
                </Button>
              </Item>
              <Item label="后台版本信息">
                <VersionModal id="version" type="link">
                  查看
                </VersionModal>
              </Item>
            </div>
            <div className="system-config-form-section">
              <div className="system-config-form-section-header">产科门诊配置</div>
              <Item label="医生端_模块隐藏" name="医生端_模块隐藏" >
                <Select mode="multiple" options={doctor_tabs.map(({ name, key }) => ({ label: name, value: key }))} />
              </Item>
              <Item label="禁止编辑高危等级" name="禁止编辑高危等级" valuePropName="checked">
                <Switch checkedChildren="是" unCheckedChildren="否" />
              </Item>
              <Item label="看诊审核限制" name="auditRestriction" valuePropName="checked">
                <Switch checkedChildren="开启" unCheckedChildren="关闭" />
              </Item>
              <Item label="医生端-操作引导提示" name="openIntro" valuePropName="checked">
                <Switch checkedChildren="开启" unCheckedChildren="关闭" />
              </Item>
              <Item label="医生端-胎监报告服务地址" name="fetalMonitor">
                <Input placeholder="请输入胎监报告服务地址" />
              </Item>
              <Item label="医生端-高危提醒功能" name="openHighriskSign" valuePropName="checked">
                <Switch checkedChildren="开启" unCheckedChildren="关闭" />
              </Item>
              <Item label="医生端-高危版本" name="highriskVersion">
                <Select options={versionOptions} />
              </Item>
              <Item label="医生端-VTE预防用药筛查表" name="VTE预防用药筛查表">
                <Select
                  options={
                    [
                      '《2015RCOG降低妊娠及产褥期静脉血栓栓塞的风险》附录1',
                      '《2015RCOG降低妊娠及产褥期静脉血栓栓塞的风险》附录3(广三用)',
                      '《妊娠期及产褥期静脉血栓栓塞症预防和诊治专家共识》2021中文共识(越秀妇幼用)',
                    ]
                      .map(_ => ({ label: _, value: _ }))
                  }
                />
              </Item>
              <Item label="医生端-胎儿生长曲线版本" name="curveVersion">
                <Select
                  options={[
                    { value: 'southChina', label: '中国南方人群' },
                    { value: 'nichd', label: 'NICHD亚裔人群' },
                  ]}
                />
              </Item>
              {/* <Item label="医生端-产前诊断跳转模块" name="prenatalDiagnosis" valuePropName="checked">
                  <Switch checkedChildren="显示" unCheckedChildren="隐藏" />
                </Item> */}
              {/* <Item label="医生端-个案登记卡" name="CaseReport" valuePropName="checked">
                  <Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked />
                </Item> */}
              {/* <Item label="医生端-胎监报告" name="FetalMonitor" valuePropName="checked">
                  <Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked />
                </Item> */}
              {/* <Item label="医生端-文书管理" name="InformedConsent" valuePropName="checked">
                  <Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked />
                </Item> */}
              <Item label="护士端-补助券管理模块" name="nurseDeskVoucher" valuePropName="checked">
                <Switch checkedChildren="显示" unCheckedChildren="隐藏" />
              </Item>
              <Item label="护士端-禁止编辑高危因素、传染病" name="护士端_禁止编辑高危因素_传染病" valuePropName="checked">
                <Switch checkedChildren="是" unCheckedChildren="否" />
              </Item>
              <Item label="产看孕册-首检信息病历风格" name="pregnancyInitial">
                <Select
                  options={[
                    { value: 'tab', label: 'TAB风格' },
                    { value: 'vertical', label: '垂直风格' },
                  ]}
                />
              </Item>
              <Item label="漏诊和高危因素标识提醒" name="doctorOpenWebsocket" valuePropName="checked">
                <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
              </Item>
              <Item label="专案管理-糖尿病专案" name="isOpenDiabetes" valuePropName="checked">
                <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={true} />
              </Item>
              <Item label="医生端-高危展示" name="highriskType">
                <Select
                  defaultValue={'highRiskDiagnosis'}
                  options={[
                    { value: 'highRiskDiagnosis', label: '高危诊断' },
                    { value: 'highriskNote', label: '高危因素' },
                  ]}
                />
              </Item>
              <Item label="疤痕子宫评估孕周" name="ScarredUterusGestationalWeek">
                <Input placeholder="请输入疤痕子宫评估孕周" defaultValue={32} />
              </Item>
            </div>

            <div className="system-config-form-section">
              <div className="system-config-form-section-header">产前诊断配置</div>
              <Item label="医生端-默认病历风格" name="diagnosisStyle">
                <Select
                  options={[
                    { value: 'tab', label: 'TAB风格' },
                    { value: 'vertical', label: '垂直风格' },
                  ]}
                />
              </Item>
              <Item label="医生端-随访记录模块" name="diagnosisFollowUpRecord" valuePropName="checked">
                <Switch checkedChildren="显示" unCheckedChildren="隐藏" />
              </Item>
              <Item label="医生端-实验室报告模块" name="diagnosisLaboratoryReport" valuePropName="checked">
                <Switch checkedChildren="显示" unCheckedChildren="隐藏" />
              </Item>
              <Item label="医生端-产科门诊跳转模块" name="diagnosisPrenatalVisit" valuePropName="checked">
                <Switch checkedChildren="显示" unCheckedChildren="隐藏" />
              </Item>
              <Item label="预约报道、送检列表打印按钮" name="tablePrintBtn" valuePropName="checked">
                <Switch checkedChildren="显示" unCheckedChildren="隐藏" />
              </Item>
            </div>

            <div className="system-config-form-section">
              <div className="system-config-form-section-header">统计管理配置</div>
              <Item label="首页统计模块" name="homeStatistics" valuePropName="checked">
                <Switch checkedChildren="显示" unCheckedChildren="隐藏" />
              </Item>
              <Item label="高危统计-导出统计按钮" name="highriskStatistics" valuePropName="checked">
                <Switch checkedChildren="显示" unCheckedChildren="隐藏" />
              </Item>
              <Item label="建档统计搜索-客服专员" name="customerService" valuePropName="checked">
                <Switch checkedChildren="显示" unCheckedChildren="隐藏" />
              </Item>
            </div>
            <div className="system-config-form-section">
              <div className="system-config-form-section-header">产科住院配置</div>
              <Item label="护理文书隐藏表单" name="nurseHide">
                <Checkbox.Group style={{ width: '100%' }}>
                  <Row>
                    {map(NurseTypesMapping, (item) => {
                      return (
                        <Col span={12}>
                          <Checkbox value={item.key}>{item.name}</Checkbox>
                        </Col>
                      );
                    })}
                  </Row>
                </Checkbox.Group>
              </Item>
              <Item label="病历文书隐藏表单" name="medicalHide">
                <Checkbox.Group style={{ width: '100%' }}>
                  <Row>
                    {map(medicalTypeMapping, (item) => {
                      return (
                        <Col span={12}>
                          <Checkbox value={item.key}>{item.name}</Checkbox>
                        </Col>
                      );
                    })}
                  </Row>
                </Checkbox.Group>
              </Item>
            </div>

            <Item {...tailLayout}>
              <Button type="primary" htmlType="submit" onClick={handleSave}>
                保存
              </Button>
            </Item>
          </Form>
        </Col>

        {/* 本地设置 */}
        <Col span={12}>
          <Form
            autoComplete="off"
            form={localForm}
            className="system-config-form"
            onValuesChange={(changedValues, allValues) => {
              console.log({ changedValues, allValues });
            }}
            {...formLayout}
          >
            <div className="system-config-form-section">
              <div className="system-config-form-section-header">本机系统配置</div>
              <Item label="孕产工具栏" name="homeStatistics" valuePropName="checked">
                <Switch checkedChildren="启用" unCheckedChildren="关闭" />
              </Item>
              <Item label="转诊打印单样式" name="referralStyle" valuePropName="checked">
                <Select options={referralOptions} />
              </Item>
            </div>

            <Item {...tailLayout}>
              <Button type="primary" htmlType="submit" onClick={handleLocalSave}>
                保存
              </Button>
            </Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
export default ConfigSystem;
