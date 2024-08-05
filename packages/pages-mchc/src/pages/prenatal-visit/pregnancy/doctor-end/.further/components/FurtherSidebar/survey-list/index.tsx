import { MyForm, getFormData, getGesWeek } from '@lm_fe/components_m';
import { Button, Modal, Tabs, Timeline, message } from 'antd';
import classnames from 'classnames';
import { cloneDeep, filter, get, isEmpty, join, map, set } from 'lodash';
import React, { Component, useEffect, useState } from 'react';
import { api } from '../../../../.api';
import {
  getsurveyList,
  updateSurveyList,
} from '../../../../.initial/methods/request';
import './index.less';
import { IMchc_Doctor_OutpatientHeaderInfo, IMchc_Pregnancy, SLocal_SystemConfig } from '@lm_fe/service';
interface IProps {
  headerInfo: IMchc_Doctor_OutpatientHeaderInfo
  isAllPregnancies: boolean
  isShowListModal: boolean
  closeModal: (t: 'isShowListModal' | 'isShowHisModal' | 'isShowManageModal') => void
  furtherRefresh(): void

}
function SurverList(props: IProps) {
  const { isShowListModal, isAllPregnancies, headerInfo, closeModal, furtherRefresh } = props;

  const [cloneData, set_cloneData] = useState({})
  const [surveyFormConfig, set_surveyFormConfig] = useState([])
  const [ultrasoundConfig, set_ultrasoundConfig] = useState([])
  const [formHandler, set_formHandler] = useState({} as any)
  const [itemData, set_itemData] = useState([])
  const [activeKey, set_activeKey] = useState('1')
  const [formData, set_formData] = useState({
    '1': {},
    '2': {},
  })

  useEffect(() => {

    (async () => {
      const a = SLocal_SystemConfig.get('systemMode')
      const isProduction = a === 'production';
      const id = get(headerInfo, 'id');
      let itemData = await api.further.buildExamTimeAxis(id);
      const surveyConfig = await api.further.getSurveyFormConfig(isProduction);
      const ultrasoundConfig = await api.further.getUltrasoundFormConfig(isProduction);
      itemData = itemData.filter((item: any) => {
        if (get(item, 'groups').length > 0) {
          item.groups = get(item, 'groups').sort((a: any, b: any) => a.groupDate < b.groupDate ? -1 : a.groupDate > b.groupDate ? 1 : 0)
        }
        return item
      })



      set_surveyFormConfig(get(surveyConfig, 'fields'))
      set_ultrasoundConfig(get(ultrasoundConfig, 'fields'))
      set_itemData(itemData)
      getFormData();
    })()

    return () => {

    }
  }, [])

  useEffect(() => {


    const id = headerInfo?.id;

    if (formHandler.subscribe) {
      formHandler.subscribe('syncBtn', 'click', async (val: any) => {
        const syncData = await api.further.syncPatientReport(id);
        getFormData();
        message.info('同步数据成功！');
        formHandler['syncDate'].actions.setValue(get(syncData, 'syncDate'));
      });

      formHandler.subscribe('ntExams', 'change', (val: any) => {
        const newVal = cloneDeep(val);

        const sureEdd = get(formData['2'], 'sureEdd');
        newVal.forEach((item: any) => {
          if (item.checkdate && sureEdd) {
            item.menopause = getGesWeek(sureEdd, item.checkdate);
          } else {
            item.menopause = '';
          }
        });
        formHandler.ntExams.actions.setValue(newVal);
      });

      formHandler.subscribe('nfExams', 'change', (val: any) => {
        const newVal = cloneDeep(val);
        const sureEdd = get(formData['2'], 'sureEdd');
        newVal.forEach((item: any) => {
          if (item.checkdate && sureEdd) {
            item.menopause = getGesWeek(sureEdd, item.checkdate);
          } else {
            item.menopause = '';
          }
        });
        formHandler.nfExams.actions.setValue(newVal);
      });
    }
  }, [formHandler])



  async function getFormData(tab = '1', needRequest = false) {
    if (!isEmpty(formData[tab]) && !needRequest) return false;
    const id = get(props, `headerInfo.id`);
    const res = await getsurveyList[tab](id);
    if (tab == '1') {
      set(res, `hbvdna`, get(res, `hbvdna`)?.replace(/&amp;lt;/, '<'));
    }

    set_formData({
      ...formData,
      [tab]: res,
    })
  }





  async function handleBtnClick(type: string) {
    const id = get(headerInfo, 'id');

    switch (type) {
      case 'cancel':
        closeModal('isShowListModal');
        break;
      case 'sure':
        if (activeKey === '1' || activeKey === '2') {
          const { res, validCode } = await formHandler.submit();
          if (validCode) {
            const resData = getFormData(res);
            await updateSurveyList[activeKey]({ ...resData, id: get(props, `headerInfo.id`) });
            if (activeKey == '1') {
              furtherRefresh && furtherRefresh();
            }
            closeModal('isShowListModal');
          } else {
            message.destroy();
            message.error('请完善表单项！');
          }
        } else {
          closeModal('isShowListModal');
        }
        break;
      case 'print':
        closeModal('isShowListModal');
        alert('打印');
        break;
      default:
        break;
    }
  };

  function setFormHandler(data: any) {
    set_formHandler(data)
  };

  function handleTabChange(key) {
    if (key == 1 || key == 2) {
      getFormData(key);
    }

    set_activeKey(key)
  }

  // 获取正常报告名称reportTitle，用'、'拼起来
  function reportsNormal(group) {
    const reportsNormalItems = filter(
      get(group, 'reports'),
      (report, reportIndex) => !get(report, 'itemInfosAbnormal'),
    );
    const getReportTitles = map(reportsNormalItems, (report, reportIndex) => get(report, 'reportTitle'));
    return join(getReportTitles, '、');
  };

  // 获取异常报告名称reportTitle，用'、'拼起来，指标用空格分隔
  function reportsAbnormal(group) {
    const reportsAbnormalItems = filter(get(group, 'reports'), (report, reportIndex) =>
      get(report, 'itemInfosAbnormal'),
    );
    const getReportDatas = map(reportsAbnormalItems, (report, reportIndex) => {
      const reportTitle = get(report, 'reportTitle') + ':';
      const reportAbnormalitemInfos = filter(
        get(report, 'itemInfos'),
        (itemInfo, itemInfoIndex) => get(itemInfo, 'abnormal') == '2',
      );
      const descriptions = map(reportAbnormalitemInfos, (itemInfo, itemInfoIndex) => get(itemInfo, 'description'));
      return reportTitle + ' ' + join(descriptions, '\xa0\xa0');
    });
    return join(getReportDatas, '、');
  };

  const buttons = [
    <div>
      <Button onClick={() => handleBtnClick('cancel')}>取消</Button>
      <Button type="primary" onClick={() => handleBtnClick('sure')}>
        确定
      </Button>
      {/* <Button onClick={() => handleBtnClick('print')} type="primary">
          打印
        </Button> */}
    </div>,
  ];

  return (
    <Modal
      className="survey-list"
      width="90%"
      footer={isAllPregnancies ? null : buttons}
      title={null}
      visible={isShowListModal}
      onCancel={() => handleBtnClick('cancel')}
    >
      <Tabs activeKey={activeKey} onChange={handleTabChange.bind(this)}>
        <Tabs.TabPane className="survey-form label-width6" tab="检验检查" key="1">
          <MyForm
            config={surveyFormConfig}
            value={formData['1']}
            getFormHandler={(formHandler: any) => setFormHandler(formHandler)}
            submitChange={false}
          />
        </Tabs.TabPane>

        <Tabs.TabPane className="survey-form label-width6" tab="超声检查" key="2">
          <MyForm
            config={ultrasoundConfig}
            value={formData['2']}
            getFormHandler={(formHandler: any) => setFormHandler(formHandler)}
            submitChange={false}
          />
        </Tabs.TabPane>

        <Tabs.TabPane className="check-items-wrapper" tab="孕期必查项目" key="3">
          <Timeline mode="left">
            {map(itemData ?? [], (item, itemIndex) => (
              <Timeline.Item
                className={classnames({
                  'arrived-current': get(item, 'inCurrentGestationalWeek'),
                })}
                key={itemIndex}
                color={get(item, 'arrived') ? '#007AFF' : '#f0f0f0'}
                label={`${get(item, 'gestationalWeekStart')}-${get(item, 'gestationalWeekEnd')}周`}
              >
                {!isEmpty(get(item, 'lackReports')) ? (
                  get(item, 'arrived') ? (
                    <div className="color-orange">
                      <span>未见报告：</span>
                      <span className="make-bold"> {join(get(item, 'lackReports'), '、')}</span>
                    </div>
                  ) : (
                    <div className="color-grey">
                      <span>未见报告：</span>
                      <span className="make-bold"> {join(get(item, 'lackReports'), '、')}</span>
                    </div>
                  )
                ) : (
                  '无必查'
                )}

                {!isEmpty(get(item, 'groups'))
                  ? map(get(item, 'groups'), (group, groupIndex) => {
                    return (
                      <div className="detail-item" key={groupIndex}>
                        <span className="detail-item-date">{get(group, 'groupDate')}</span>
                        {/* {map(get(group, 'reports'), (report, reportIndex) => (
                              <div key={reportIndex} className="detail-item-reports">
                                {get(report, 'itemInfosAbnormal') ? (
                                  <span className="detail-item-reports-abnormal">
                                    {get(report, 'reportTitle')}：
                                    {map(get(report, 'itemInfos'), (itemInfo, itemInfoIndex) => (
                                      <span key={itemInfoIndex}>
                                        {get(itemInfo, 'abnormal') == '2' && get(itemInfo, 'description') + '；'}
                                      </span>
                                    ))}
                                  </span>
                                ) : (
                                  <span className="detail-item-reports-normal">{get(report, 'reportTitle')}</span>
                                )}
                              </div>
                            ))} */}
                        <div>
                          {reportsNormal(group) && (
                            <div className="detail-item-reports-normal">{reportsNormal(group)}</div>
                          )}
                          {reportsAbnormal(group) && (
                            <div
                              className="detail-item-reports-abnormal"
                              style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}
                            >
                              {reportsAbnormal(group)}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                  : null}
              </Timeline.Item>
            ))}
          </Timeline>
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
}
export default SurverList
