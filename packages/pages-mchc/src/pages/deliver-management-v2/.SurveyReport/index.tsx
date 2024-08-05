import { CalendarOutlined } from '@ant-design/icons';
import { IMchc_Admission_HeaderInfoOfInpatientEmr, IMchc_Doctor_OutpatientHeaderInfo, IMchc_Pregnancy, SMchc_Admission } from '@lm_fe/service';
import { Badge, Collapse, Table } from 'antd';
import { get, includes, map, size } from 'lodash';
import React, { useEffect, useState } from 'react';
import ExaminationItemCurve from './components/ExaminationItemCurve';
import { formatTimeToDate } from '@lm_fe/components_m';
import { request } from '@lm_fe/utils';
import './index.less';
interface IProps {
  pregnancyData: IMchc_Pregnancy
  headerInfo: IMchc_Doctor_OutpatientHeaderInfo
  headerInfoOfInpatientData: IMchc_Admission_HeaderInfoOfInpatientEmr
}
export default function SurveyReport(props: IProps) {



  const { headerInfoOfInpatientData, headerInfo, pregnancyData } = props;

  const [reportList, set_reportList] = useState([])
  const [detailData, set_detailData] = useState({})
  const [reportFile, set_reportFile] = useState<string | null>(null)
  const [isShowCurve, set_isShowCurve] = useState(false)
  const [itemName, set_itemName] = useState('')


  const tableColumns = [
    { title: '检验项目', dataIndex: 'itemName', key: 'itemName' },
    { title: '结果', dataIndex: 'result', key: 'result' },
    { title: '单位', dataIndex: 'unit', key: 'unit' },
    { title: '参考值', dataIndex: 'limit', key: 'limit' },
    {
      title: '状态', dataIndex: 'state', key: 'state', render: (record: any) => {
        return <div style={{ color: `${record == 1 ? 'red' : ''}` }}>{record == 1 ? '异常' : '正常'}</div>
      }
    },
    {
      title: '曲线',
      render: (record: any) => (
        <div className="curve-words" onClick={() => openIndexCurve(record)}>
          曲线
        </div>
      ),
    },
  ];

  useEffect(() => {

    getLabExamGroup();
    return () => {

    }
  }, [])


  function openIndexCurve(record: any) {

    set_itemName(record.itemName)
    set_isShowCurve(true)
  };

  async function getLabExamGroup() {
    const outpatientNO = get(headerInfo, `outpatientNO`) ?? get(headerInfoOfInpatientData, 'outpatientNO')

    const inpatientNO = get(headerInfo, 'inpatientNO') ?? get(headerInfoOfInpatientData, 'inpatientNO');
    const idNO = get(headerInfo, 'idNO') ?? get(headerInfoOfInpatientData, 'idNO');


    let list = {} as any;


    list = await SMchc_Admission.listPatientLabExamReport({ params: headerInfo ?? headerInfoOfInpatientData, })

    set_reportList(list)
  };

  async function handleItemClick(item: any) {
    const { id, type } = item;
    const detailData = (await request.get(`/api/getLabExamReport?id=${id}&type=${type}`)).data;
    // if (!item.firstReader) {
    //   await api.survey.saveFirstReader(item);
    //   getLabExamGroup();
    // }
    if (type === 2) {
      //const reportFile = await api.survey.getOutReportFileBase64(item.path);


      set_reportFile(`data:application/pdf;base64, ${get(detailData, 'imgBase64')}`)
      set_detailData(detailData)
    } else {
      set_reportFile(null)
      set_detailData(detailData)
    }
    getLabExamGroup();
  };

  function setClassName(record: any, index: any) {
    if (includes([1, 2, 3], record.state)) {
      return 'abnormalValue';
    }
    return '';
  };

  function closeModal() {

    set_isShowCurve(false)
  };

  function renderLeft() {

    return (
      <div className="survey-left">
        <div className="left-title">检验报告列表</div>
        {size(reportList) > 0 ? (
          <Collapse defaultActiveKey={['0']} expandIcon={() => <CalendarOutlined />}>
            {map(reportList, (item: any) => (
              <Collapse.Panel
                header={
                  !item.gesWeek ? (
                    <>
                      {formatTimeToDate(item.date)}
                      <div style={{ position: 'absolute', right: 6, top: 6 }}>
                        <Badge
                          count={item.unread ? item.unread : item.total}
                          style={!item.unread ? { backgroundColor: 'green' } : {}}
                        ></Badge>
                      </div>
                    </>
                  ) : (
                    <>
                      `${formatTimeToDate(item.date)} (孕周：${item.gesWeek})`
                      <div style={{ position: 'absolute', right: 6, top: 6 }}>
                        <Badge
                          count={item.unread ? item.unread : item.total}
                          style={!item.unread ? { backgroundColor: 'green' } : {}}
                        ></Badge>
                      </div>
                    </>
                  )
                }
                key={item.id}
              >
                {map(item.examReport, (subItem) => (
                  <div className="left-item" onClick={() => handleItemClick(subItem)}>
                    {subItem.unread ? <span className="left-item-state">新</span> : null}
                    <p
                      className="left-item-title"
                      title={subItem.title}
                      style={!subItem.normal ? { color: 'red' } : {}}
                    >
                      {subItem.title}
                    </p>
                    {subItem.type === 2 ? <span className="left-item-lable">外院</span> : null}
                  </div>
                ))}
              </Collapse.Panel>
            ))}
          </Collapse>
        ) : (
          <div className="no-data">
            <p className="no-data-title">暂无数据</p>
          </div>
        )}
      </div>
    );
  }

  function renderRight() {

    return (
      <div className="survey-right">
        <div className="right-top">
          <p className="right-title">
            <span className="right-words">{get(detailData, 'reportName') || ''} 检验报告单</span>
          </p>
          <div className="right-doctor">首阅医生：{get(detailData, 'firstReadDoctor') || ''}</div>
        </div>
        <ul className="right-msg">
          <li className="msg-item">检验单号: {get(detailData, 'examNo') || ''}</li>
          <li className="msg-item">送检: {get(detailData, 'requestDoctor') || ''}</li>
          <li className="msg-item">姓名: {get(detailData, 'patientName') || ''}</li>
          <li className="msg-item">性别: {get(detailData, 'patientGender') || ''}</li>
          <li className="msg-item">年龄: {get(detailData, 'patientAge') || ''}</li>
          <li className="msg-item">标本部位: {get(detailData, 'samplePart') || ''}</li>
          <li className="msg-item">报告日期: {formatTimeToDate(get(detailData, 'reportDate')) || ''}</li>
          <li className="msg-item">送检日期: {formatTimeToDate(get(detailData, 'requestDate')) || ''}</li>
        </ul>
        <div>
          {reportFile ? (
            <div className="right-pdf">
              <img alt="report" src={reportFile} />
            </div>
          ) : (
            <Table
              className="prenatal-visit-main-table right-table"
              columns={tableColumns}
              dataSource={get(detailData, 'examItems') || []}
              pagination={false}
              rowClassName={(record, index) => setClassName(record, index)}
            />
          )}
        </div>
      </div>
    );
  }



  return (
    <div className="prenatal-visit-main_survey">
      <div className="survey-left-wrapper">{renderLeft()}</div>
      <div className="survey-right-wrapper">{renderRight()}</div>
      {isShowCurve && (
        <ExaminationItemCurve
          isShowCurve={isShowCurve}
          itemName={itemName}
          onClose={closeModal}
          pregnancyData={pregnancyData}
        />
      )}
    </div>
  );

}
