import React, { Component } from 'react';
import { Form, Input, message, Modal, DatePicker, Button, Row, Col, Popconfirm } from 'antd';
import { get, map, set, cloneDeep } from 'lodash';
import SingleCheckBox from '../components/SingleCheckBox';
import { FormInstance } from 'antd/lib/form';
import moment from 'moment';
import { formatDate, fubaoRequest as request } from '@lm_fe/utils';
import { fubaoHistoryPush } from '@lm_fe/components_m';
const noticeTypeOptions = [
  { label: '电话', value: '电话' },
  { label: '短信', value: '短信' },
  { label: '微信', value: '微信' },
  { label: '现场', value: '现场' },
];
const noteOptions = [
  { label: '未接听', value: '未接听' },
  { label: '号码错误', value: '号码错误' },
  { label: '未做病理检查', value: '未做病理检查' },
  { label: '继续治疗', value: '继续治疗' },
  { label: '拒接复查', value: '拒接复查' },
  { label: '其他', value: '其他', withInput: true, inputPlaceholder: '请输入备注', style: { width: 150 } },
];
const wayOptions = [
  { label: '无', value: '无' },
  { label: '宫颈冷冻', value: '宫颈冷冻' },
  { label: '宫颈锥切', value: '宫颈锥切' },
  { label: '子宫切除手术', value: '子宫切除手术' },
  { label: '放疗', value: '放疗' },
  { label: '化疗', value: '化疗' },
  { label: '手术', value: '手术' },
  { label: '其他', value: '其他' },
];
export class ModalForm extends Component {
  form: FormInstance | null = null;

  state = {
    popconfirmVisible: false,
  };

  async componentDidMount() {
    const { currentRecord } = this.props as any;
    let newCurrentRecord = cloneDeep(currentRecord);
    if (get(newCurrentRecord, 'notificationStatus') && get(newCurrentRecord, 'notificationStatus') === 2) {
      this.form?.resetFields();
    } else {
      map(newCurrentRecord, (data, index) => {
        if (index === 'notificationDate' || index === 'pathologicalExaminationDate') {
          set(newCurrentRecord, index, data ? moment(data) : null);
        }
        if (index === 'notificationWay' || index === 'treatment') {
          this.setState({
            ...this.state,
            [index]: { checkedValues: [data], withInputValues: {} },
          });
        }
        if (index === 'notificationNote') {
          this.setState({
            ...this.state,
            [index]: { checkedValues: [data], withInputValues: get(newCurrentRecord, 'notificationOtherNote') },
          });
        }
      });
      this.form?.setFieldsValue(newCurrentRecord);
    }
  }

  handleOk = async () => {
    this.setState({ popconfirmVisible: true });
  };

  handleSubmit = async (flag?: number) => {
    const { currentRecord, onCancel, onSearch } = this.props as any;
    let data = this.form?.getFieldsValue();

    let params = {};
    let notificationStatus = get(currentRecord, 'notificationStatus') || 0;
    let loseTrack = get(currentRecord, 'loseTrack') || 0;
    map(data, (item, key) => {
      if (key === 'notificationDate' || key === 'pathologicalExaminationDate') {
        set(data, key, formatDate(item));
      }
      if (key === 'notificationWay' || key === 'treatment') {
        const checkedValues = get(item, 'checkedValues.0');
        set(data, key, checkedValues);
      }
      if (key === 'notificationNote') {
        const checkedValues = get(item, 'checkedValues.0');
        const withInputValues = get(item, 'withInputValues');
        set(data, key, checkedValues);
        set(data, 'notificationOtherNote', withInputValues);
        if (checkedValues === '继续治疗' || checkedValues === '拒接复查' || checkedValues === '其他') {
          notificationStatus = 1;
        }
        if (checkedValues === '未接听' || checkedValues === '号码错误') {
          notificationStatus = 2;
        }
      }
    });
    if (flag) {
      loseTrack = 1;
    }
    params = {
      ...data,
      notificationStatus,
      loseTrack,
      id: get(currentRecord, 'id'),
    };
    const res = await request.put('/api/two/cancer/screening/updateTwoCancerPathologicalResultTracking', params);
    
    onCancel && onCancel();
    onSearch && onSearch();
  };

  onChange = (data: any) => { };

  jumpPage = () => {
    const { currentRecord, history, onCancel } = this.props as any;
    onCancel && onCancel();
    fubaoHistoryPush(
      `/gynecological-diseases/two-cancers/exam?id=${get(currentRecord, 'twoCancerScreeningId')}&activeKey=FollowUp`,
      this.props as any
    );
  };

  render() {
    const { popconfirmVisible } = this.state;
    const { visible, onCancel, currentRecord, system } = this.props as any;
    return (
      <Modal
        title="追踪管理"
        width={900}
        onOk={() => {
          this.handleSubmit(0);
        }}
        visible={visible}
        onCancel={onCancel}
        footer={[
          <Popconfirm
            key="back"
            title={`是否标记失访!`}
            visible={popconfirmVisible}
            onCancel={() => {
              this.setState({ popconfirmVisible: false });
            }}
            onConfirm={() => {
              this.handleSubmit(1);
            }}
            okText="确定"
            cancelText="取消"
          >
            <Button
              key="back"
              onClick={() => {
                this.handleOk();
              }}
              danger
            >
              标记失访
            </Button>
          </Popconfirm>,
          <Button key="cancel" onClick={onCancel}>
            关闭
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              this.handleSubmit(0);
            }}
          >
            保存
          </Button>,
        ]}
      >
        <Form
          ref={(form) => {
            this.form = form;
          }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ checkOrganization: get(system, 'config.hospitalName') }}
        >
          <div className="basic-info" style={{ padding: 12 }}>
            <Row style={{ marginBottom: 8 }}>
              <Col span={8}>用户姓名：{get(currentRecord, 'name')}</Col>
              <Col span={8}>手机号码：{get(currentRecord, 'telephone')}</Col>
              <Col span={8}>检查日期：{get(currentRecord, 'checkDate')}</Col>
            </Row>
            <Row>
              <Col span={8}>检查类型：{get(currentRecord, 'screeningType')}</Col>
              {/* <Col span={12}>
                结果异常/可疑项目：<span style={{ color: 'red' }}>HPV检查；宫颈癌细胞学检查</span>
              </Col> */}
              <Col span={8}>建议：{get(currentRecord, 'screeningSuggest')}</Col>
            </Row>
          </div>
          <div className="base-edit-panel">
            <div className="base-edit-panel-form_section border">
              <span className="base-edit-panel-form_section_title">随访登记</span>

              <Form.Item label="随访方式" name="notificationWay">
                <SingleCheckBox
                  options={noticeTypeOptions}
                  onChange={this.onChange}
                  selectValue={get(this.state, 'notificationWay')}
                />
              </Form.Item>
              <Row>
                <Col span={12}>
                  <Form.Item label="随访日期" name="notificationDate" labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}>
                    <DatePicker />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="病理检查日期"
                    name="pathologicalExaminationDate"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
                  >
                    <DatePicker />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="检查机构" name="checkOrganization" labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}>
                    <Input placeholder="请输入检查机构" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="病理检查情况"
                    name="pathologicalExaminationResult"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
                  >
                    <Input placeholder="请输入病理检查情况" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="治疗方法" name="treatment">
                <SingleCheckBox
                  options={wayOptions}
                  onChange={this.onChange}
                  span={4}
                  selectValue={get(this.state, 'treatment')}
                />
              </Form.Item>
              <Form.Item label="备注" name="notificationNote">
                <SingleCheckBox
                  options={noteOptions}
                  onChange={this.onChange}
                  selectValue={get(this.state, 'notificationNote')}
                />
              </Form.Item>
              {get(currentRecord, 'notificationStatus') ? (
                <Row>
                  <Col span={6}>
                    {/* <Button style={{ marginLeft: '29%' }} size={'large'} onClick={this.jumpPage}>
                      历史记录
                    </Button> */}
                  </Col>
                </Row>
              ) : (
                ''
              )}
            </div>
          </div>
        </Form>
      </Modal>
    );
  }
}
export default ModalForm;
