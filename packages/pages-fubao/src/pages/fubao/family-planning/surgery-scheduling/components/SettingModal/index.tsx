/**
 * @author bhliang
 * @email 710122069@qq.com
 * @create date 2021-12-01 15:15:24
 * @modify date 2021-12-01 15:15:24
 * @desc [设置日期的modal]
 */
import React from 'react';
import './index.less';
import { Modal, DatePicker, Select, Form, message, Button, Popconfirm } from 'antd';
import moment from 'moment';
import { fubaoRequest as request } from '@lm_fe/utils';
import { valueToApi, valueToForm } from './adapter';
import SingleCheckBox from '../SingleCheckBox/index';
import { FormInstance } from 'antd/lib/form';
import { NurseTypesMapping } from "../../../file-management/doctor-desk/components/SurgicalRecordv2/config";
import { get, map } from 'lodash';
moment.locale('zh-cn');
const Option = Select.Option;
const GetSchedulingDetailsUrl = `/api/family/planning/getSchedulingInformation`;
const UpdateSchedulingDetailUrl = `/api/family/planning/updateSchedulingDetails`;
export default class SettingModal extends React.Component<any, any> {
  form: FormInstance | null = null;
  state = {
    isModalVisible: false,
    createdDate: this.props.settingDate ? this.props.settingDate : moment(),
    schedulingDetail: {},
    surgeryOptions: [], //手术项目选项
    disabled: false,
    reservationNumObj: new Map(),
    reservationWarningText: '',
    popconfirmVisible: false,
    submitData: {},
    surgeryObj: {},
  };

  componentDidMount() {
    let surgeryOptions: any = [];
    for (let i in NurseTypesMapping) {
      surgeryOptions.push({
        label: NurseTypesMapping[i].name,
        value: NurseTypesMapping[i].key,
        withInput: true,
        style: { width: 50, border: 'none', borderBottom: '1px solid #FE547B', fontSize: 12, background: '#f5f6fa' },
      });
    }
    this.setState({ surgeryOptions });
    this.getTreatmentByDate();
  }

  getTreatmentByDate = async () => {
    const { createdDate } = this.state;
    let values = {};
    const params = {
      'schedulingDate.equals': createdDate.format('YYYY-MM-DD'),
    };
    const response = await request.get(`${GetSchedulingDetailsUrl}`, { params: params });

    if (get(response, 'code') === 1) {
      values = get(response, 'data.0');
      let newValuesObj = valueToForm(values);

      this.form?.setFieldsValue(newValuesObj.newValues);

      this.setState({ schedulingDetail: newValuesObj.newValues, reservationNumObj: newValuesObj.reservationNumObj });
    }
  };

  handleSubmitData = (data: {}) => {
    let count = 0;
    let flag: Boolean = false;
    map(data, (value, key) => {
      if (key !== 'totalNumOfDay' && key.indexOf('Num') > -1) {
        count += value;
      }
    });

    if (count > 50) {
      flag = true;
    }
    return flag;
  };

  isHaveReservation = (data: any) => {
    //关闭有预约的项目提示
    let reservationWarningText = '';
    map(data, (value) => {
      reservationWarningText += NurseTypesMapping[value].name + ' ';
    });
    return reservationWarningText;
  };

  getReservation = (data: Map<any, any>) => {
    //关闭有预约的项目提示(Map数据结构遍历)
    let reservationWarningText = '';
    for (let key of data.keys()) {
      reservationWarningText += NurseTypesMapping[key].name + ' ';
    }
    return reservationWarningText;
  };

  //确认关闭有预约的项目，提交
  handleConfirm = async () => {
    let { schedulingDetail, submitData, surgeryObj } = this.state;

    submitData = {
      id: get(schedulingDetail, 'id'),
      ...schedulingDetail,
      ...submitData,
      ...get(surgeryObj, 'newValues'),
    };

    const res: any = await request.put(`${UpdateSchedulingDetailUrl}`, submitData);

    if (get(res, 'code') === 1) {
      
      this.props.setSettingModal(false);
      this.props.getReservationPanel();
      this.setState({ popconfirmVisible: false });
    } else {
      
    }
  };

  handleOk = async () => {
    const { schedulingDetail, reservationNumObj } = this.state;
    let submitData = this.form?.getFieldsValue();
    let surgeryObj = valueToApi(get(submitData, 'surgery'), reservationNumObj); //开发手术项目

    let reservationWarningText = this.isHaveReservation(get(surgeryObj, 'reservationArr'));

    const oldAttendanceSet = get(schedulingDetail, 'attendanceSet');
    const newAttendanceSet = get(submitData, 'attendanceSet');

    //单天号源总数大于30不能提交
    const flag = this.handleSubmitData(get(surgeryObj, 'newValues'));
    if (flag) {
      message.error(`总号源数>50，请调整设置，控制在50个号源以内`);
      return;
    }

    //有预约且上午改成下午时提示
    if (reservationNumObj.size > 0 && oldAttendanceSet === 1 && newAttendanceSet === 2) {
      reservationWarningText = this.getReservation(reservationNumObj);
      this.setState({ submitData, surgeryObj, reservationWarningText, popconfirmVisible: true });
      return;
    }
    //有预约且下午改成上午时提示
    if (reservationNumObj.size > 0 && oldAttendanceSet === 2 && newAttendanceSet === 1) {
      reservationWarningText = this.getReservation(reservationNumObj);
      this.setState({ submitData, surgeryObj, reservationWarningText, popconfirmVisible: true });
      return;
    }

    if (reservationWarningText) {
      //关闭有预约的项目弹出提示
      this.setState({ submitData, surgeryObj, reservationWarningText, popconfirmVisible: true });
    } else {
      submitData = {
        id: get(schedulingDetail, 'id'),
        ...schedulingDetail,
        ...submitData,
        ...get(surgeryObj, 'newValues'),
      };

      const res: any = await request.put(`${UpdateSchedulingDetailUrl}`, submitData);

      if (get(res, 'code') === 1) {
        
        this.props.setSettingModal(false);
        this.props.getReservationPanel();
      } else {
        
      }
    }
  };

  handleItemChange = (changedValues: any, allValues: any) => {
    if (get(allValues, 'attendanceSet') === 0) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  };

  onChange = (data: any) => {};

  render() {
    const { createdDate, schedulingDetail, surgeryOptions, disabled, reservationWarningText, popconfirmVisible } =
      this.state;
    const { isModalVisible } = this.props;
    return (
      <Modal
        title="设置"
        visible={isModalVisible}
        onCancel={() => this.props.setSettingModal(false)}
        wrapClassName="setting-modal"
        width={480}
        onOk={() => this.handleOk()}
        footer={[
          <Button key="cancel" onClick={() => this.props.setSettingModal(false)}>
            关闭
          </Button>,
          <Popconfirm
            key="submit"
            title={`${reservationWarningText}已有预约，是否修改设置!`}
            visible={popconfirmVisible}
            onCancel={() => {
              this.setState({ popconfirmVisible: false });
            }}
            onConfirm={() => {
              this.handleConfirm();
            }}
            okText="确定"
            cancelText="取消"
          >
            <Button
              key="submit"
              type="primary"
              onClick={() => {
                this.handleOk();
              }}
            >
              保存
            </Button>
          </Popconfirm>,
        ]}
      >
        <Form
          ref={(formRef) => {
            this.form = formRef;
          }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onValuesChange={(changedValues, allValues) => {
            this.handleItemChange(changedValues, allValues);
          }}
        >
          <div className="setting-top">
            <Form.Item label="日期">
              <DatePicker disabled value={createdDate} className="date-picker" />
              <span className="week-day">{createdDate ? createdDate.format('dddd') : ''}</span>
            </Form.Item>
            <Form.Item label="手术状态" name="attendanceSet">
              <Select style={{ width: 120 }}>
                <Option value={0}>不可约</Option>
                <Option value={1}>上午</Option>
                <Option value={2}>下午</Option>
                <Option value={3}>全天</Option>
              </Select>
            </Form.Item>
            <Form.Item label="开放手术项目" name="surgery">
              <SingleCheckBox
                type="multiple"
                disabled={disabled}
                options={surgeryOptions}
                onChange={this.onChange}
                selectValue={get(schedulingDetail, 'surgery')}
              />
            </Form.Item>
          </div>
        </Form>
        {popconfirmVisible && <div className="masking"></div>}
      </Modal>
    );
  }
}
