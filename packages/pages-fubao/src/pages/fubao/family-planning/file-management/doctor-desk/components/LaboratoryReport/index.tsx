import { SelectTip, deleteResourcesByID } from '@lm_fe/components_m';
import { SLocal_Dictionary } from '@lm_fe/service';
import { getSearchParamsValue } from '@lm_fe/utils';
import { Card, Col, List, Row, Tag, message } from 'antd';
import classnames from 'classnames';
import { compact, find, first, get, isEmpty, keyBy, keys, map, replace, set, size, split } from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { getTemplateById } from '@lm_fe/components_m';
import './index.less';
import {
  createInformedConsent,
  getInformedConsents,
  stateMapping,
  updateInformedConsent
} from './method';
const signStates = [
  { label: '已签', value: '1' },
  { label: '拒签', value: '2' },
];
const archiveStates = [
  { label: '已归档', value: '1' },
  { label: '未归档', value: '2' },
];
export class InformedConsent extends Component {
  state = {
    siderPanels: [],
    loading: true,
    informedConsent: {},
    isNew: false,
    allDiagnosisStr: '',
  };

  async componentDidMount() {
    const { id } = this.props;
    const siderPanels = await this.initData();
    const defaultActiveItem = first(siderPanels) || {};
    this.setState({
      informedConsent: defaultActiveItem,
    });

    // const diagnosisList = await getAllDiagnosisByPatientId(id);
    // this.getAllDiagnosisStr(get(diagnosisList, '0'));
  }

  getAllDiagnosisStr = (list: any) => {
    let allDiagnosisStr = '';
    let diags = [];
    diags = size(get(list, 'ods')) > 0 ? get(list, 'ods') : get(list, 'pds');
    map(diags, (item, index) => {
      if (!!get(item, 'diagnosis')) {
        const diagnosisNote = !!get(item, 'note') ? `(${get(item, 'note')})` : '';
        allDiagnosisStr += `${index + 1}、${get(item, 'diagnosis')}${diagnosisNote}；`;
      }
    });

    this.setState({ allDiagnosisStr });
  };

  initData = async () => {
    const { id, pregnancyData } = this.props;
    const pregnancyId = id || getSearchParamsValue('id')
    // const siderPanels = this.mergeInformedConsentByDate(await getInformedConsents(pregnancyId));

    const siderPanels = await getInformedConsents(get(pregnancyData, 'outpatientNO'));
    console.log('999999999999', pregnancyData, siderPanels);
    this.setState({
      siderPanels,
      loading: false,
    });
    return siderPanels;
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
      prenatalPatient: pregnancyData,
      createDate: moment().utc().format(),
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
    this.initData();
  };

  handleAdd = () => {
    this.setState({
      isNew: true,
      informedConsent: {},
    });
  };

  handleClickListItem = (informedConsent) => () => {
    this.setState({
      informedConsent,
    });
  };

  transferContent = (oldContent) => {
    const { pregnancyData, dictionaries } = this.props;
    const { allDiagnosisStr } = this.state;
    set(pregnancyData, 'allDiagnosisStr', allDiagnosisStr);
    const reg = /\[\{\{.+?\}\}\]/g;
    const result = oldContent.matchAll(reg);
    let newContent = oldContent;
    for (const item of result) {
      if (item) {
        const itemName = item[0].slice(3, -3);
        const itemNameSplits = split(itemName, '---');
        let label = get(pregnancyData, itemName);
        if (itemName === 'residenceAddress' || itemName === 'permanentResidenceAddress') {
          label = replace(label, '&', ',');
        }
        // 用 --- 从字典获取值
        if (itemNameSplits.length === 2) {
          const value = get(pregnancyData, itemNameSplits[0]);
          const options = SLocal_Dictionary.getDictionariesEnumerations(itemNameSplits[1])

          label = get(keyBy(options, 'value'), `${value}.label`);
        }
        newContent = newContent.replace(item[0], label || '   ');
      }
    }
    return newContent;
  };

  handleConsentChange = async (value) => {
    const { informedConsent } = this.state;
    const documentTemplate = await getTemplateById(value);
    const oldContent = get(documentTemplate, 'content');
    const newContent = this.transferContent(oldContent);
    this.setState({
      informedConsent: {
        ...informedConsent,
        content: newContent,
        documentTemplate,
      },
    });
  };

  handleSignStateChange = (signStates: any) => {
    const { informedConsent } = this.state;
    const oldSignState = get(informedConsent, 'signState');
    this.setState({
      informedConsent: {
        ...informedConsent,
        signState: find(signStates, (item) => item !== oldSignState),
      },
    });
  };

  handleArchiveChange = (archives: any[]) => {
    const { informedConsent } = this.state;
    const oldArchive = get(informedConsent, 'archive');
    this.setState({
      informedConsent: {
        ...informedConsent,
        archive: find(archives, (item) => item !== oldArchive),
      },
    });
  };

  handleDelete = (item) => async () => {
    const { informedConsent } = this.state;
    await deleteResourcesByID('/api/prenatal-patient-documents', get(item, 'id'));
    if (get(informedConsent, 'id') === get(item, 'id')) {
      this.setState({
        informedConsent: {},
      });
    }
    this.initData();
  };

  rendersiderPanels = () => {
    const { siderPanels, informedConsent, loading } = this.state;
    console.log('111111111111', siderPanels);
    return (
      <Card
        loading={loading}
        size="small"
        bordered={false}
        title="报告列表"
        // extra={<PlusCircleOutlined onClick={this.handleAdd} />}
      >
        {/* <Collapse>
          {map(siderPanels, (siderPanel, key) => {
            return (
              <Collapse.Panel
                header={
                  <>
                    <CalendarOutlined /> {key}
                  </>
                }
                key={key}
              > */}
        <List
          size="small"
          dataSource={siderPanels}
          renderItem={(item) => {
            console.log('---12121----', item);
            return (
              <List.Item
                className={classnames('patient-informed-consent-list__item', {
                  'patient-informed-consent-list__item_active': informedConsent.id === item.id,
                })}
              >
                <span className="patient-informed-consent-list__item-title" onClick={this.handleClickListItem(item)}>
                  {get(item, 'name')}
                </span>
                <Tag color={get(stateMapping, `${get(item, 'state')}.color`)}>{get(item, 'stateString')}</Tag>
              </List.Item>
            );
          }}
        />
        {/* </Collapse.Panel>
            );
          })}
        </Collapse> */}
      </Card>
    );
  };

  render() {
    const { informedConsent, isNew } = this.state;
    const { containerProps = { height: document.getElementsByClassName('prenatal-visit-main')[0]?.clientHeight } } =
      this.props;
    return (
      <Row className="patient-informed-consent">
        <Col className="patient-informed-consent-list" span={5}>
          {this.rendersiderPanels()}
        </Col>
        <Col className="patient-informed-consent-detail" span={19}>
          {isEmpty(informedConsent) && !isNew ? (
            <SelectTip />
          ) : (
            <div className="patient-informed-consent-detail-block">
              {get(informedConsent, 'state') === 5 ? (
                <iframe src="/assets/karyotype-report.pdf" style={{ height: '100%', width: '100%' }} />
              ) : (
                '暂未出实验报告'
              )}
              {/* 实验报告内容 */}
              {/* <CaseTempleteEdit
                key={get(informedConsent, 'id') || Math.random()}
                containerProps={{ ...containerProps, height: containerProps.height - 88 }}
                content={get(informedConsent, 'content')}
                onSave={this.handleSave}
                toolbars={false}
                mode="STRICT"
              /> */}
            </div>
          )}
        </Col>
      </Row>
    );
  }
}
export default InformedConsent
