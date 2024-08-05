import { SModel_EarlyPregnancyCheckSurgeryType, stupidEnums } from '../../../.stupid_model';
import {
  PlusCircleOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  LeftCircleOutlined,
} from '@ant-design/icons';
import { Tag, Row, Col, Popconfirm } from 'antd';
import React from 'react';
import { get } from 'lodash';
import { IBaseProps } from '.';
import DropContainer from '../components/drop-continer';
import { OPERATION_ARR } from '../constant';
import { TMorningOrAfternoon } from '../type';
import { checkDisabledHalfDay, openBookingModal, handleIsBefore, getResidue } from '../util';
interface IProps extends IBaseProps {}
export default function DateSelect(props: IProps) {
  const { bookingData, dd, selectedDate, findColor2, scheduleArr, activeOperationType } = props;

  const morningNum = 5,
    afternoonNum = 5;
  const scheduleDataOfThisDay = scheduleArr[0];
  const rowHeight = `calc((100% - 30px) / ${morningNum + afternoonNum})`;

  const residueObj = getResidue(activeOperationType, scheduleDataOfThisDay);

  const getDateTips = () => {
    const attendanceSet = get(scheduleDataOfThisDay, 'attendanceSet');
    if (attendanceSet === 0) {
      return (
        <div className="date-tips-day date-tips">
          <span className="disabled-img"></span>
          <span className="disabled-word">当天暂无开放的手术类型，请选择其他日期预约!</span>
        </div>
      );
    }
    if (attendanceSet === 1) {
      return (
        <div className="date-tips-afternoon date-tips">
          <span className="disabled-img"></span>
          <span className="disabled-word">当天下午暂无开放的手术类型，请选择其他日期预约!</span>
        </div>
      );
    }
    if (attendanceSet === 2) {
      return (
        <div className="date-tips-morning date-tips">
          <span className="disabled-img"></span>
          <span className="disabled-word">当天上午暂无开放的手术类型，请选择其他日期预约!</span>
        </div>
      );
    }
    return <></>;
  };

  return (
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative' }}>
      {handleIsBefore(selectedDate) >= 0 && getDateTips()}
      <table width="98%" cellSpacing={0} cellPadding={0} border={1} style={{ height: '100%' }} borderColor="#EDEEF6">
        <tbody style={{ height: '100%' }}>
          {Array(morningNum + afternoonNum)
            .fill(0)
            .map((_, rowIndex) => {
              const morningOrAfternoon: TMorningOrAfternoon = rowIndex < morningNum ? '上午' : '下午';

              const realRowIndex = morningOrAfternoon === '上午' ? rowIndex : rowIndex - morningNum;
              const realDataArr = bookingData.filter((_) => _.appointmentMorningOrAfternoon === morningOrAfternoon);

              const disabled = checkDisabledHalfDay(scheduleDataOfThisDay, morningOrAfternoon);

              return (
                <tr key={rowIndex} style={{ height: rowHeight }}>
                  {rowIndex % ((morningNum + afternoonNum) / 2) === 0 ? (
                    <td width={40} rowSpan={5} style={{ textAlign: 'center', writingMode: 'vertical-lr' }}>
                      <span style={{ letterSpacing: 8, fontSize: 16 }}>{morningOrAfternoon}</span>
                    </td>
                  ) : null}

                  {Array(OPERATION_ARR.length)
                    .fill(0)
                    .map((_, colIndex) => {
                      const realIndex = realRowIndex * OPERATION_ARR.length + colIndex;

                      const item = realDataArr[realIndex];
                      const data = item?.data;
                      const [backgroundColor, fontColor, textColor] = findColor2(data?.operationName);
                      const statusLabel = stupidEnums.EarlyPregnancyCheckSurgeryType.progressStatus.getLabel(
                        data?.progressStatus,
                      );

                      return (
                        <td rowSpan={1} key={colIndex} style={{ position: 'relative' }}>
                          <DropContainer
                            scheduling={scheduleDataOfThisDay}
                            mode={'day'}
                            appointmentDate={selectedDate}
                            dd={dd}
                            appointmentMorningOrAfternoon={morningOrAfternoon}
                            isDisabled={disabled}
                          >
                            {data ? (
                              <div
                                onClick={
                                  statusLabel === '已完成'
                                    ? () => {
                                        openBookingModal(selectedDate, morningOrAfternoon, data, () => {
                                          dd.initData();
                                          dd.getStatistic();
                                          dd.getBetweenList();
                                        });
                                      }
                                    : () => {}
                                }
                                className="hover-shadow date-item"
                                style={{
                                  cursor: 'pointer',
                                  borderLeft: `4px solid ${fontColor}`,
                                  borderRadius: 4,
                                  display: 'flex',
                                  flex: 1,
                                  margin: 4,
                                  padding: '4px 0 4px 4px',
                                  background: false ? '#666' : backgroundColor,
                                  position: 'relative',
                                }}
                              >
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                  <Row gutter={8} className="operation-name-row">
                                    <Col>
                                      <span className="word" style={{ color: textColor || '#150F55', fontWeight: 600 }}>
                                        {data.name}
                                      </span>
                                    </Col>
                                    <Col>
                                      <span className="word" style={{ color: textColor || '#383F4A', fontSize: 12 }}>
                                        {data.telephone}
                                      </span>
                                    </Col>
                                  </Row>

                                  <span className="word operation-name" style={{ fontSize: 12, color: textColor }}>
                                    {data.operationName}
                                  </span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                                  <Tag color={fontColor}>{statusLabel}</Tag>
                                  <div className="handle">
                                    {(statusLabel === '待签到' || statusLabel === '超时') && (
                                      <>
                                        <QuestionCircleOutlined
                                          title="签到"
                                          style={{ color: fontColor }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            openBookingModal(
                                              selectedDate,
                                              morningOrAfternoon,
                                              data,
                                              () => {
                                                dd.initData();
                                                dd.getStatistic();
                                                dd.getBetweenList();
                                              },
                                              1,
                                            );
                                          }}
                                        />
                                        <EditOutlined
                                          title="编辑"
                                          className="space"
                                          style={{ color: fontColor }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            openBookingModal(
                                              selectedDate,
                                              morningOrAfternoon,
                                              data,
                                              () => {
                                                dd.initData();
                                                dd.getStatistic();
                                                dd.getBetweenList();
                                              },
                                              0,
                                            );
                                          }}
                                        />
                                        <Popconfirm
                                          title={`取消后则不再显示，是否确认取消?`}
                                          onConfirm={() => {
                                            SModel_EarlyPregnancyCheckSurgeryType.cancelAppointmentSurgery(
                                              data.id,
                                            ).then(() => {
                                              dd.initData();
                                              dd.getStatistic();
                                              dd.getBetweenList();
                                            });
                                          }}
                                          okText="确定"
                                          cancelText="取消"
                                        >
                                          <DeleteOutlined title="取消" style={{ color: fontColor }} />
                                        </Popconfirm>
                                        {/* <DeleteOutlined
                                          title="取消"
                                          style={{ color: fontColor }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            if (confirm('取消后则不再显示，是否确认取消?')) {
                                              SModel_EarlyPregnancyCheckSurgeryType.cancelAppointmentSurgery(
                                                data.id,
                                              ).then(() => {
                                                dd.initData();
                                                dd.getStatistic();
                                                dd.getBetweenList();
                                              });
                                            }
                                          }}
                                        /> */}
                                      </>
                                    )}
                                    {statusLabel === '已签到' && (
                                      <>
                                        <EditOutlined
                                          title="编辑"
                                          style={{ color: fontColor }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            openBookingModal(
                                              selectedDate,
                                              morningOrAfternoon,
                                              data,
                                              () => {
                                                dd.initData();
                                                dd.getStatistic();
                                                dd.getBetweenList();
                                              },
                                              1,
                                            );
                                          }}
                                        />
                                      </>
                                    )}
                                  </div>
                                  {/* {(statusLabel === '待签到' || statusLabel === '超时') && (
                                    <Tag
                                      style={{ marginTop: 4, color: fontColor, border: `1px solid ${fontColor}` }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (confirm('取消后则不再显示，是否确认取消?')) {
                                          SModel_EarlyPregnancyCheckSurgeryType.cancelAppointmentSurgery(data.id).then(
                                            () => dd.initData(),
                                          );
                                        }
                                      }}
                                    >
                                      取消预约
                                    </Tag>
                                  )} */}
                                </div>
                              </div>
                            ) : (
                              <div
                                className={`date-booking-button ${realDataArr.length === realIndex ? 'visible' : ''}`}
                                hidden={disabled || !get(residueObj, 'isOpen')}
                                title="添加或拖动预约"
                                onClick={() =>
                                  openBookingModal(selectedDate, morningOrAfternoon, {}, () => {
                                    dd.initData();
                                    dd.getStatistic();
                                    dd.getBetweenList();
                                  })
                                }
                                style={{
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#8A96A0',
                                }}
                              >
                                <PlusCircleOutlined style={{ marginRight: 4 }} />
                                添加或拖动预约
                              </div>
                            )}
                          </DropContainer>
                        </td>
                      );
                    })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
