import React, { Component } from 'react';
import { Col, Row, Collapse, List, Card, Button, Form, Radio, message, Select, TreeSelect } from 'antd';
import { compact, size, get, isEmpty, keyBy, keys, last, map, set } from 'lodash';
import { getInformedConsents, updateInformedConsent, createInformedConsent, getDocumentTemplates } from './method';
// import SelectTip from '@/components/exception/SelectTip';
import { CaseTempleteEdit, SelectTip, getTemplateById } from '@lm_fe/components_m';
import moment from 'moment';
import { freeAllowance, allowanceAccount } from './data';
import './index.less';
import { formatTimeToUTC, getFutureDate } from '@lm_fe/components_m';
import { getSearchParamsValue } from '@lm_fe/utils';
const groupOptions = [
  { label: '女方', value: 1 },
  { label: '男方', value: 2 },
  { label: '男女双方', value: 3 },
];
export default class InformedConsent extends Component {
  state = {
    informedConsentList: [],
    informedConsent: {},
    isNew: false,
    templateId: null,
    partnerTemplateId: null,
    commonplateId: null,
    allowanceData: {},
    partnerAllowanceData: {},
    radioValue: 1,
  };

  async componentDidMount() {
    this.handleSearchInfomedConsentList();
    const template = await getDocumentTemplates();
    this.setState({
      templateId: get(template, '0.id'),
      partnerTemplateId: get(template, '1.id'),
      commonplateId: get(template, '2.id'),
    });
  }

  handleSearchInfomedConsentList = async () => {
    const { id } = this.props;
    const pregnancyId = id || getSearchParamsValue('id');
    const informedConsentList = this.mergeInformedConsentByDate(await getInformedConsents(pregnancyId));
    this.setState({
      informedConsentList,
    });
  };

  mergeInformedConsentByDate = (informedConsents) => {
    const createDateKeys: Array<any> = compact(keys(keyBy(informedConsents, 'createDate')));
    const mergedInformedConsents = {};
    map(createDateKeys, (createDateKey) => {
      set(mergedInformedConsents, createDateKey, []);
    });
    map(informedConsents, (informedConsent) => {
      if (createDateKeys.indexOf(informedConsent.createDate) === -1) {
        return;
      }
      (mergedInformedConsents[informedConsent.createDate] as Array<any>).push(informedConsent);
    });
    return mergedInformedConsents;
  };

  handleSave = async (content) => {
    const { pregnancyData } = this.props;
    let { informedConsent } = this.state;
    const data = {
      ...informedConsent,
      content,
      pregnancy: pregnancyData,
      createDate: formatTimeToUTC(moment()),
      documentTemplate: get(informedConsent, 'documentTemplate'),
    };
    if (informedConsent.id) {
      informedConsent = await updateInformedConsent(data);
    } else {
      informedConsent = await createInformedConsent(data);
    }
    message.success('操作成功');
    this.setState({
      informedConsent,
    });
    this.handleSearchInfomedConsentList();
  };

  handleAdd = () => {
    this.setState({
      isNew: true,
      informedConsent: {},
    });
  };

  handleClickListItem = (oldInformedConsent) => async () => {
    const oldContent = get(oldInformedConsent, 'content');
    const newContent = this.transferContent(oldContent);
    this.setState({
      informedConsent: {
        ...oldInformedConsent,
        content: newContent,
        documentTemplate: get(oldInformedConsent, 'documentTemplate'),
      },
    });
  };

  transferContent = (oldContent, allowanceObj) => {
    const { pregnancyData } = this.props;
    set(pregnancyData, 'freeAllowance', allowanceObj);
    const reg = /\[\{\{.+?\}\}\]/g;
    const result = oldContent.matchAll(reg);
    let newContent = oldContent;
    for (const item of result) {
      if (item) {
        newContent = newContent.replace(item[0], get(pregnancyData, item[0].slice(3, -3)) || '   ');
      }
    }
    return newContent;
  };

  handleConsentChange = async (value) => {
    const { basicInfo } = this.props;
    const { templateId, partnerTemplateId, commonplateId, allowanceData, partnerAllowanceData } = this.state;
    let id;
    let allowanceObj = {};
    this.setState({ radioValue: value });
    if (value === 1) {
      id = templateId;
      allowanceObj = { ...allowanceData };
    } else if (value === 2) {
      id = partnerTemplateId;
      allowanceObj = { ...partnerAllowanceData };
    } else {
      id = commonplateId;
      allowanceObj = { ...allowanceData, ...partnerAllowanceData };
    }

    set(allowanceObj, 'date', getFutureDate(0));
    set(allowanceObj, 'doctor', get(basicInfo, 'firstName'));
    const { informedConsent } = this.state;
    const documentTemplate = await getTemplateById(id);
    const oldContent = get(documentTemplate, 'content');
    const newContent = this.transferContent(oldContent, allowanceObj);
    this.setState({
      informedConsent: {
        ...informedConsent,
        content: newContent,
        documentTemplate,
      },
    });
  };

  handleTreeChange = async (value, type) => {
    const { radioValue } = this.state;
    if (size(value) === 0) return;
    const arr: any[] = [];
    map(value, (item) => arr.push(freeAllowance[item]));

    const obj = {};
    let account = '';
    let province = 0;
    let city = 0;
    let county = 0;
    map(arr, (item) => {
      account += `${item.account}  `;
      province += item.province;
      city += item.city;
      county += item.county;
    });
    if (type === 1) {
      set(obj, 'account', account);
      set(obj, 'province', province.toFixed(2));
      set(obj, 'city', city.toFixed(2));
      set(obj, 'county', county.toFixed(2));
      await this.setState({ allowanceData: obj });
    } else {
      set(obj, 'partnerAccount', account);
      set(obj, 'partnerProvince', province.toFixed(2));
      set(obj, 'partnerCity', city.toFixed(2));
      set(obj, 'partnerCounty', county.toFixed(2));
      await this.setState({ partnerAllowanceData: obj });
    }
    this.handleConsentChange(radioValue);
  };

  renderInformedConsentList = () => {
    const { informedConsentList } = this.state;
    return (
      <Card
        size="small"
        title="补助券列表"
        extra={
          <Button type="primary" onClick={this.handleAdd}>
            新建
          </Button>
        }
      >
        <Collapse>
          {map(informedConsentList, (item, key) => {
            return (
              <Collapse.Panel header={key} key={key}>
                <List
                  size="small"
                  dataSource={item}
                  renderItem={(informedConsent) => {
                    return (
                      <List.Item
                        className="pregnancy-informed-consent-list-item"
                        onClick={this.handleClickListItem(informedConsent)}
                      >
                        {get(informedConsent, 'documentTemplate.title')}
                      </List.Item>
                    );
                  }}
                />
              </Collapse.Panel>
            );
          })}
        </Collapse>
      </Card>
    );
  };

  render() {
    const { informedConsent, isNew, radioValue } = this.state;
    const {
      containerProps = {
        height: document.getElementsByClassName('prenatal-visit-main')[0]?.clientHeight,
      },
    } = this.props;

    return (
      <Row className="pregnancy-informed-consent">
        <Col className="pregnancy-informed-consent-list" span={4}>
          {this.renderInformedConsentList()}
        </Col>
        <Col className="pregnancy-informed-consent-detail" span={20}>
          {isEmpty(informedConsent) && !isNew ? (
            <SelectTip />
          ) : (
            <>
              <Row>
                <Col span={8}>
                  <Form.Item label="女方补助项目" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    <TreeSelect
                      style={{ width: '100%' }}
                      placeholder="请选择补助项目"
                      treeData={allowanceAccount}
                      treeDefaultExpandAll
                      multiple={true}
                      onChange={(v) => this.handleTreeChange(v, 1)}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="男方补助项目" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    <TreeSelect
                      style={{ width: '100%' }}
                      placeholder="请选择补助项目"
                      treeData={allowanceAccount}
                      treeDefaultExpandAll
                      multiple={true}
                      onChange={(v) => this.handleTreeChange(v, 2)}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="补助对象" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    <Radio.Group
                      options={groupOptions}
                      value={radioValue}
                      onChange={(e) => this.handleConsentChange(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <CaseTempleteEdit
                key={get(informedConsent, 'id') || Math.random()}
                containerProps={{ ...containerProps, height: containerProps.height - 88 }}
                content={get(informedConsent, 'content')}
                onSave={this.handleSave}
                toolbars={false}
                mode="STRICT"
              />
            </>
          )}
        </Col>
      </Row>
    );
  }
}
