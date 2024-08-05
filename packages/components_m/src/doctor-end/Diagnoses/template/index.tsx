import { HighRiskGradeSelect } from '../../HighriskGradeSelect';
import { SMchc_Doctor, SMchc_TemplateTrees } from '@lm_fe/service';
import { formatDateTime } from '@lm_fe/utils';
import { Button, Col, Input, Modal, Row, Spin, Tabs, message } from 'antd';
import { cloneDeep, filter, find, findIndex, get, isString, map, set, size, throttle } from 'lodash';
import React, { Component } from 'react';
import { CustomIcon } from '../../../GeneralComponents/CustomIcon';
import TemplateTree from '../../TemplateTree';
import DiagnosesItem from '../diagnoses-item/diagnoses-item';
import DiagnosesWeek from '../diagnoses-week/diagnoses-week';
import styles from './index.module.less';
interface IProps {
  [key: string]: any;
}
interface IState {
  [key: string]: any;
}
export default class DiagnosesTemplate extends Component<IProps, IState> {
  state = {
    activeKey: '1',
    allDiagnosesTemplate: [],
    filterDiagnosesTemplate: [],
    noteChange: false,
    searchValue: '',
  };

  componentDidMount() {
    const { diagnosesWord } = this.props;
    this.getDiagnosesTemplate(diagnosesWord);
  }
  page = 0
  loading = false
  empty = false
  scrollHandler = throttle((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (this.loading || this.empty) return

    const target = e.nativeEvent.target as HTMLDivElement
    const clientHeight = target.clientHeight;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;

    if (clientHeight + scrollTop > scrollHeight * .8 || scrollTop < 10)
      this.getDiagnosesTemplatePage(this.state.searchValue, ++this.page)

  }, 100)
  componentWillReceiveProps(nextProps: any) {
    if (JSON.stringify(get(nextProps, `diagnosesList`)) != JSON.stringify(get(this.props, `diagnosesList`))) {
      this.setState({
        filterDiagnosesTemplate: this.filterDiagnoses(this.state.allDiagnosesTemplate, nextProps.diagnosesList),
      });
    }
  }
  filterDiagnoses(remoteData: any, diagnoses: any) {
    const newTemplate = filter(remoteData, (item) => {
      const ind = findIndex(diagnoses, (i: any) => i.diagnosis == item.val);
      return ind == -1 ? true : false;
    });
    return newTemplate;
  }

  getDiagnosesTemplate = async (value: string) => {
    const res = await SMchc_TemplateTrees.getDiagnosesTemplate(value);
    this.setState({
      filterDiagnosesTemplate: this.filterDiagnoses(res, this.props.diagnosesList),
      allDiagnosesTemplate: res,
    });
  };
  getDiagnosesTemplatePage = async (value: string, page = 0) => {
    this.loading = true
    try {
      const res: any = await SMchc_TemplateTrees.getDiagnosesTemplate(value, page);
      if (!res?.length)
        this.empty = true

      this.setState({
        filterDiagnosesTemplate: [...this.state.filterDiagnosesTemplate, ...this.filterDiagnoses(res, this.props.diagnosesList)],
      });
    } finally {
      this.loading = false
    }
  };

  handleChangeTab = (activeKey: string) => {
    this.setState({ activeKey });
  };

  handleChange = async (value: string) => {
    this.page = 0
    this.empty = false
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.changeState('searchValue', value);
      if (this.state.activeKey == '1') {
        this.getDiagnosesTemplate(value);
      }
    }, 500);
  };
  findMaxSort() {
    const { diagnosesList } = this.props;
    let max: any = 0;
    map(diagnosesList, (item) => {
      const sort = get(item, `sort`);
      if (sort > max) {
        max = sort;
      }
    });
    return max + 1;
  }

  handleSearch = (item: any) => {
    const { closeTemplate, addDiag, diagnosesList, headerInfo } = this.props;
    const { filterDiagnosesTemplate } = this.state;
    let postdata: any = {
      diagnosis: '',
      diagnosisCode: '',
      highrisk: false,
      note: '',
      sort: this.findMaxSort(),
      outEmrId: get(headerInfo, `id`),
      // createDate: formatTimeToStandard(new Date()),
    };
    if (item) {
      if (!isString(item) && size(item.children) > 0) return;
      if (isString(item)) {
        set(postdata, `diagnosis`, item);
        let itemObj = find(filterDiagnosesTemplate, (tem: any) => tem.val == item);
        if (itemObj) {
          set(postdata, 'diagnosisCode', get(itemObj, 'code'));
        }
      } else {
        set(postdata, 'diagnosis', get(item, 'val'));
        set(postdata, 'diagnosisCode', get(item, 'code'));
      }
      addDiag(postdata);
    }
  };

  handleCancel = () => {
    const { closeTemplate } = this.props;
    closeTemplate();
  };

  handleAddIcon = async (item: any, type: number) => {
    const { basicInfo } = this.props;
    delete item.id;
    set(item, 'pid', 0);
    set(item, 'type', type);
    if (type === 2) {
      set(item, 'depid', type);
    } else {
      set(item, 'userid', get(basicInfo, 'id'));
    }
    await SMchc_TemplateTrees.addTemplateTree(item);
    message.info(`${get(item, `val`)}同步到${type == 2 ? '科室' : '个人'}`);
  };

  //#region  右边诊断操作
  async changeHeaderInfo() {
    const { headerInfo, saveHeaderInfo } = this.props;
    const res = await SMchc_Doctor.getOutpatientHeaderInfo(get(headerInfo, `id`));
    saveHeaderInfo(res);
  }
  getTitle = (item: any) => {
    const createdDate = item.createdDate ? `诊断时间: ${formatDateTime(item.createdDate)}\n` : '';
    const diagnosis = item.diagnosis ? `诊断全称: ${item.diagnosis}\n` : '';
    const preNote = item.preNote ? `前备注: ${item.preNote}\n` : '';
    const note = item.note ? `后备注: ${item.note}\n` : '';
    const doctor = item.doctor ? `诊断医生: ${item.doctor}\n` : '';

    return `${createdDate}${diagnosis}${preNote}${note}${doctor}`;
  };

  handleDelete = async (item: any, i: number) => {
    const { diagnosesList, pregnancyData, getHighriskDiagnosis, setDiagnosesList } = this.props;
    const pregnancyId = get(pregnancyData, 'id');
    const newList = cloneDeep(diagnosesList);
    const delArr = newList.splice(i, 1);
    await SMchc_Doctor.deleteDiagnosisOfOutpatient(get(delArr, `[0].id`));
    message.info('删除成功！');
    setDiagnosesList(newList);
    this.changeHeaderInfo();
    // getHighriskDiagnosis(pregnancyId);
  };

  changeState(key: string, value: any) {
    this.setState({ [key]: value });
  }

  changeNote = (v: string, i: number, key: string) => {
    // this.changeState('noteChange', true);
    const { diagnosesList, setDiagnosesList } = this.props;
    const newList = cloneDeep(diagnosesList);
    const item = newList[i];
    item[`${key}`] = v;
    // item['createDate'] = formatTimeToStandard(new Date());
    setDiagnosesList(newList);
  };

  updateNote(value: any, i: number, key: string) {
    const { diagnosesList, setDiagnosesList } = this.props;
    const newList = cloneDeep(diagnosesList);
    const item = newList[i];
    item[`${key}`] = value;
    setDiagnosesList(newList);
    SMchc_Doctor.newOrSaveDiagnosisOfOutpatient(item);
  }

  //#endregion

  render() {
    const { isShowDiagnosesTemplate, basicInfo, diagnosesWord, diagnosesList, headerInfo } = this.props;
    const { allDiagnosesTemplate, activeKey, filterDiagnosesTemplate, searchValue } = this.state;
    const style = { fontSize: '24px', marginRight: '0px', display: 'flex', alignItem: 'center' };
    return (
      <Modal
        centered
        title={
          <div>
            <CustomIcon type={'icon-doctor'} style={{ color: '#150F55', fontSize: '24px', marginRight: '10px' }} />
            <span style={{ color: '#150F55', fontSize: '16px', fontWeight: 500 }}>诊断管理页</span>
          </div>
        }
        className={styles["diag-template"]}
        footer={null}
        visible={isShowDiagnosesTemplate}
        onCancel={this.handleCancel}
      >
        <Row>
          <Col span={14}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Input.Search
                placeholder="请输入诊断信息"
                enterButton="添加诊断"
                defaultValue={diagnosesWord}
                onChange={(e) => this.handleChange(e.target.value)}
                onSearch={this.handleSearch}
              />
              <HighRiskGradeSelect headerInfo={headerInfo} />
            </div>
            <Tabs activeKey={activeKey} onChange={this.handleChangeTab}>
              <Tabs.TabPane
                tab={
                  <Button className={styles["list-btn"]} icon={<CustomIcon type="icon-all" style={style} />}>
                    全部
                  </Button>
                }
                key="1"
              >
                <div onScroll={this.scrollHandler} style={{ height: '100%', overflowY: 'scroll', }}>
                  {map(filterDiagnosesTemplate, (item) => (
                    <p className={styles["diag-item"]}>
                      <span onClick={() => this.handleSearch(item)}>
                        {get(item, 'code') ? '（icd）' : null}
                        {get(item, 'val')}
                      </span>
                      <CustomIcon
                        className={styles["diag-icon"]}
                        title="同步到科室诊断"
                        onClick={() => this.handleAddIcon(item, 2)}
                        type="icon-department"
                      />
                      <CustomIcon
                        className={styles["diag-icon"]}
                        title="同步到个人诊断"
                        onClick={() => this.handleAddIcon(item, 3)}
                        type="icon-individual1"
                      />
                    </p>
                  ))}
                </div>
              </Tabs.TabPane>
              (
              <Tabs.TabPane
                tab={
                  <Button className={styles["list-btn"]} icon={<CustomIcon style={style} type="icon-department" />}>
                    科室
                  </Button>
                }
                key="2"
              >
                {activeKey === '2' && (
                  <TemplateTree
                    type={2}
                    depid={2}
                    checkable={false}
                    onSelected={this.handleSearch}
                    editable={true}
                    showIcd={true}
                    searchValue={searchValue}
                  />
                )}
              </Tabs.TabPane>
              ) (
              <Tabs.TabPane
                tab={
                  <Button className={styles["list-btn"]} icon={<CustomIcon style={style} type="icon-individual1" />}>
                    个人
                  </Button>
                }
                key="3"
              >
                {activeKey === '3' && (
                  <TemplateTree
                    type={3}
                    userid={get(basicInfo, 'id')}
                    checkable={false}
                    onSelected={this.handleSearch}
                    editable={true}
                    showIcd={true}
                    searchValue={searchValue}
                  />
                )}
              </Tabs.TabPane>
              )
            </Tabs>
          </Col>
          <Col span={10}>
            <div className={styles["diag-title"]}>已选诊断</div>
            <div id="diag-content" className={styles["diag-content"]}>
              <DiagnosesWeek first={false} headerInfo={headerInfo} />
              {diagnosesList ? (
                diagnosesList.map((item: any, i: number) => (
                  <DiagnosesItem
                    key={`${get(item, 'id')}-true`}
                    diagnose={item}
                    changeNote={this.changeNote}
                    updateNote={this.updateNote.bind(this)}
                    index={i}
                    handleDelete={this.handleDelete}
                    edit={true}
                    {...this.props}
                  />
                ))
              ) : (
                <Spin />
              )}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  }
}