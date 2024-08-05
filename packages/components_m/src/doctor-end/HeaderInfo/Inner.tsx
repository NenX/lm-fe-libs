
import { ThunderboltOutlined } from '@ant-design/icons';
import { mchcConfig, mchcEnv, mchcEvent, mchcLogger, mchcUtils } from '@lm_fe/env';
import { IMchc_Doctor_OutpatientHeaderInfo, IMchc_HighriskGradeConfig, SMchc_Common, SMchc_Doctor, SMchc_Pregnancy } from '@lm_fe/service';
import { ROMAN_NUMERALS, getSearchParamsValue } from '@lm_fe/utils';
import { Button, Tooltip, message } from 'antd';
import classnames from 'classnames';
import { forEach, get, isEmpty, set } from 'lodash';
import moment from 'moment';
import React, { lazy, useEffect, useRef, useState } from 'react';
import { mchcModal } from '../../modals';
import { getFutureDate } from '../../utils';
import { getLevelOptions } from '../common';
import styles from './index.module.less';
import { IHeaderInfoProps } from './types';
import { handleFuckinginfectionNoteLabel } from './utils';
import ExemplaryCase from '../ExemplaryCase/index';

const multipletsArr = ['三胎妊娠', '四胎妊娠', '五胎妊娠', '六胎妊娠', '多胎妊娠'];
const twinsArr = ['双胎妊娠'];

export default function HeaderInfoInner(props: IHeaderInfoProps) {
  const {
    // headerInfo,
    saveHeaderInfo,
    isNurse,
    pregnancyData,
    getPregnancyData,
    id: _id,
    basicInfo,
    onDobuleClick,
  } = props;


  const pregnancyId = _id ?? getSearchParamsValue('id')



  const [isShowGdm, setIsShowGdm] = useState(false)
  const [isShowBmi, setIsShowBmi] = useState(false)
  const [isShowSlowGrowing, setIsShowSlowGrowing] = useState(false)

  const [headerInfo, setHeaderInfo] = useState<IMchc_Doctor_OutpatientHeaderInfo>()


  const [isTwinkling, setIsTwinkling] = useState(true)
  const [contagionColor, setContagionColor] = useState('')


  const [exemplaryCaseVisible, setExemplaryCaseVisible] = useState(false)
  const [tabkey, setTabkey] = useState('1')

  const [highriskGradeConfig, setHighriskGradeConfig] = useState<IMchc_HighriskGradeConfig[]>([])



  const isShowTwins = hasKeyword(twinsArr, headerInfo?.pregnancyCaseLable)
  const isShowMultiplets = hasKeyword(multipletsArr, headerInfo?.pregnancyCaseLable,)
  const highriskLable = headerInfo?.highriskLable || ROMAN_NUMERALS[1]

  const infectionNoteLabels = handleFuckinginfectionNoteLabel(headerInfo?.infectionNote);


  const headerInfoCache = useRef(headerInfo)
  headerInfoCache.current = headerInfo

  const randomIds = useRef(+new Date())
  useEffect(() => {

    SMchc_Common.getHighriskContagionConfig().then(r => {
      setContagionColor(r.color)
    })
    SMchc_Common.getHighriskGradeConfig().then(r => {
      setHighriskGradeConfig(r)
    })
  }, [])


  useEffect(() => {
    fetchHeaderInfo()
  }, [])

  useEffect(() => {
    return mchcEvent.on_rm('ws_event', e => {
      if (e.type !== 'obis-doctor' || e.event !== 'message' || !e.data) return
      if (e.data.type === 'RefreshPregnancyHeaderInfo') {
        mchcLogger.log('event !!', { e })
        fetchHeaderInfo()
      }
    })
  }, [])

  useEffect(() => {

    const rm = mchcEvent.on_rm('outpatient', e => {
      // TODO: 移除
      if (e.type === '弹窗' && !isNurse) {
        switch (e.modal_name) {
          case '瘢痕子宫阴道试产表':
            open瘢痕子宫阴道试产表()
            break;
          case '子痫前期风险评估表':
            open子痫前期风险评估表()
            break;
          case '深静脉血栓高危因素孕期用药筛查表':
            open深静脉血栓高危因素孕期用药筛查表()
            break;
          case '梅毒管理':
            open梅毒管理()
            break;
          default:
            break;
        }

      }
      if (e.type === '刷新头部') {
        fetchHeaderInfo()
      }
    })
    return rm
  }, [])
  function open瘢痕子宫阴道试产表() {
    mchcModal.openOne(randomIds.current + 1, '瘢痕子宫阴道试产表', {
      modal_data: { pregnancyId: headerInfoCache.current?.id! },
      onClose: fetchHeaderInfo
    })
  }
  function open子痫前期风险评估表() {
    mchcModal.openOne(randomIds.current + 2, '子痫前期风险评估表', {
      modal_data: { headerInfo: headerInfoCache.current! },
      onClose: fetchHeaderInfo
    })
  }
  function open深静脉血栓高危因素孕期用药筛查表() {
    mchcModal.openOne(randomIds.current + 3, '深静脉血栓高危因素孕期用药筛查表', {
      modal_data: { pregnancyId: headerInfoCache.current?.id! },
      onClose: fetchHeaderInfo
    })
  }
  function open梅毒管理() {
    mchcModal.openOne(randomIds.current + 4, '梅毒管理', {
      modal_data: { headerInfo: headerInfoCache.current! },
      onClose: fetchHeaderInfo
    })
  }
  function open乙肝管理() {
    mchcModal.openOne(randomIds.current + 5, '乙肝管理', {
      modal_data: { headerInfo: headerInfoCache.current! },
      onClose: fetchHeaderInfo
    })
  }


  function open高危因素管理() {
    const is护士端_禁止编辑高危因素_传染病 = mchcConfig.get('护士端_禁止编辑高危因素_传染病')

    if (is护士端_禁止编辑高危因素_传染病 && isNurse) return
    setIsTwinkling(false)

    mchcModal.open('高危因素管理', {
      modal_data: {
        data: headerInfo!,
        pregnancyId: pregnancyData?.id! ?? headerInfo?.id,

        // onFinish: handleSaveHiskFactor,
        handleSubmit: fetchHeaderInfo,
      }
    })
  };

  async function handleSaveHiskFactor(data: IMchc_Doctor_OutpatientHeaderInfo) {
    alert('???')

    const riskRecords = get(pregnancyData, 'riskRecords') || [];

    /**同一医生同一天只保留一条高危记录*/
    let addRecord = {};
    forEach(riskRecords, (item) => {
      if (get(item, 'eventDate') === getFutureDate(0) && get(item, 'doctor') === get(basicInfo, 'firstName')) {
        addRecord = item;
      }
    });
    if (isEmpty(addRecord)) {
      addRecord = {
        eventDate: moment(),
        doctor: get(basicInfo, 'firstName'),
        highriskGrade: get(data, 'highriskGrade'),
        highriskNote: get(data, 'highriskNote'),
        infectionNote: get(data, 'infectionNote'),
        gestationalWeek: get(data, 'currentGestationalWeek'),
      };
    } else {
      set(addRecord, 'highriskGrade', get(data, 'highriskGrade'));
      set(addRecord, 'highriskNote', get(data, 'highriskNote'));
      set(addRecord, 'infectionNote', get(data, 'infectionNote'));
      set(addRecord, 'gestationalWeek', get(data, 'gestationalWeek'));
    }
    riskRecords.push(addRecord);

    await SMchc_Pregnancy.put({
      // ...data,
      infectionNote: data.infectionNote,
      highriskNote: data.highriskNote,
      riskRecords: riskRecords,
    });
    message.success('操作成功');

    await getPregnancyData?.(pregnancyId!);

    if (get(data, 'highriskGrade') === 'Ⅴ') setIsTwinkling(true);
  };





  function getBackGroundColor(grade: any) {
    let backGroundColor = '';
    switch (grade) {
      case 'Ⅰ':
        backGroundColor = styles['levelBgc1'];
        break;
      case 'Ⅱ':
        backGroundColor = styles['levelBgc2'];
        break;
      case 'Ⅲ':
        backGroundColor = styles['levelBgc3'];
        break;
      case 'Ⅳ':
        backGroundColor = styles['levelBgc4'];
        break;
      case 'Ⅴ':
        backGroundColor = styles['levelBgc5'];
        break;
      default:
        backGroundColor = styles['levelBgc0'];
        break;
    }
    return backGroundColor;
  };

  function showSpan<T extends keyof IMchc_Doctor_OutpatientHeaderInfo>(key: T) {
    return headerInfo?.[key] ? true : false;
  }

  function getValue<T extends keyof IMchc_Doctor_OutpatientHeaderInfo>(key: T) {
    return headerInfo?.[key] ?? '--';
  }
  function hasKeyword(arr: string[], val?: string,) {
    if (!val) return false
    return arr.some(_ => _?.includes(val) || val?.includes(_))
  };

  function isHide(curgesweek: string) {
    let bool = true;
    if (typeof curgesweek == 'string') {
      const index = curgesweek.indexOf('+');
      let week = curgesweek;
      if (index != -1) {
        week = curgesweek.substr(0, index);
      }
      const week_ = parseInt(week);
      if (week_ >= 42) {
        bool = false;
      }
    }
    return bool;
  }

  function showTitle(bool: boolean) {
    const title = bool ? getValue('highriskNote') : getValue('highRiskDiagnosis');
    const a = title && title.length > 25 ? title : '';
    return a;
  }
  function renderInfo() {


    const highriskType = mchcConfig.get('highriskType') == 'highriskNote';
    return (
      <div className={classnames(styles['header-info-wrapper'], getBackGroundColor(highriskLable))}>
        <div className={styles["header-info-content"]}>
          <div className={styles["wrapper-btns"]}>
            <div className={styles["highrisk"]}>
              {
                !!highriskLable &&
                <span
                  style={{ background: highriskGradeConfig.find(_ => _.label === highriskLable)?.note }}
                  className={classnames(
                    styles['level-btn'],
                    isTwinkling && highriskLable === 'Ⅴ' && !mchcEnv.is('广三') ? styles['twinkling'] : '',
                  )}
                  onClick={open高危因素管理}
                >
                  {highriskGradeConfig.find(_ => _.label === highriskLable)?.colorText}
                </span>
              }
              {(showSpan('infectionLable') && !!infectionNoteLabels.length) ? (
                <span
                  style={{
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    writingMode: 'unset',
                    fontSize: infectionNoteLabels.length >> 1 ? 14 : 16,
                  }}
                  className={styles["infection-btn"]}
                  title={get(headerInfo, 'infectionLable')}
                >
                  {infectionNoteLabels.map((_) => (
                    <span
                      key={_.key}
                      onClick={() => (_.type === '梅' || (_.type === '传染病' && _.allType.includes('梅'))) && open梅毒管理()}
                      style={{
                        background: _.color,
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        writingMode: 'vertical-lr',
                      }}
                    >
                      {_.label}
                    </span>
                  ))}
                  {/* 传染病 */}
                </span>
              ) : null}
            </div>
            <div className={styles["signs"]}>
              {showSpan('thrombusLable') && (
                <span className={classnames(styles["signs-btn"], styles['trial'])} onClick={open瘢痕子宫阴道试产表}>
                  疤
                </span>
              )}
              {showSpan('cicatrixLable') && (
                <span className={classnames(styles["signs-btn"], styles['pahr'])} onClick={open深静脉血栓高危因素孕期用药筛查表}>
                  VTE
                </span>
              )}
            </div>
            {showSpan('eclampsiaLable') && (
              <div className={styles["preeclampsia-btn"]} onClick={open子痫前期风险评估表}>
                子痫
              </div>
            )}
          </div>

          <div className={styles["wrapper-msg"]}>
            <div className={styles["msg-top"]}>
              <div className={styles["msg-item"]}>
                <span className={styles["label"]} onDoubleClick={
                  () => mchcModal.open('高危因素管理', {
                    modal_data: {
                      data: headerInfo!,
                      pregnancyId: pregnancyData?.id!,

                      // onFinish: handleSaveHiskFactor,
                      handleSubmit: fetchHeaderInfo,
                    }
                  })
                }>姓名：</span>
                <span className={styles["value"]}>{getValue('name')}</span>
              </div>
              <div className={styles["msg-item"]}>
                <span className={styles["label"]}>年龄：</span>
                <span className={styles["value"]}>{getValue('age')}</span>
              </div>
              <div className={styles["msg-item"]}>
                <span className={styles["label"]}>孕产:</span>
                <span className={styles["value"]}>{getValue('g')}/{getValue('p')}</span>
              </div>
              {get(headerInfo, `labourState`) ? (
                <>
                  <div className={styles["msg-item"]}>
                    <span className={styles["label"]}>产后：</span>
                    <span className={styles["value"]}>{getValue('daysAfterDelivery')}</span>
                  </div>
                  <div className={styles["msg-item"]}>
                    <span className={styles["label"]}>分娩孕周：</span>
                    <span className={styles["value"]}>{getValue('labourWeek')}</span>
                  </div>
                </>
              ) : (
                <>
                  {isHide(getValue('curgesweek')) && (
                    <div className={styles["msg-item"]}>
                      <span className={styles["label"]}>孕周：</span>
                      <span className={styles["value"]}>{getValue('curgesweek')}</span>
                    </div>
                  )}

                  <div className={styles["msg-item"]}>
                    <span className={styles["label"]}>预产期：</span>
                    <span className={styles["value"]}>{getValue('edd')}</span>
                  </div>
                </>
              )}

              <div className={styles["small-item"]}>
                <span className={styles["label"]}>就诊卡号：</span>
                <span className={styles["value"]}>{getValue('outpatientNO')}</span>
              </div>
              <div className={styles["small-item"]}>
                <span className={styles["label"]}>产检编号：</span>
                <span className={styles["value"]}>{getValue('checkupNO')}</span>
              </div>
            </div>
            <div className={styles["msg-bottom"]}>
              <div className={styles["exemplary-case"]}>
                {
                  mchcEnv.is('华医') ? (
                    <>
                      <Button hidden={infectionNoteLabels.some(_ => _.type === '乙')} type="text" size='small' onClick={open乙肝管理}>乙肝专案管理</Button>
                      <Button hidden={infectionNoteLabels.some(_ => _.type === '梅')} type="text" size='small' onClick={open梅毒管理}>梅毒专案管理</Button>
                    </>
                  ) : null
                }
                {isShowGdm && (
                  <Button type="text" onClick={() => {
                    setExemplaryCaseVisible(true)
                    setTabkey('1')
                  }
                  }>
                    GDM专案
                  </Button>
                )}
                {isShowSlowGrowing && (
                  <Button type="text" onClick={() => {
                    setExemplaryCaseVisible(true)
                    setTabkey('2')
                  }}>
                    胎儿生长缓慢专案
                  </Button>
                )}
                {isShowBmi && (
                  <Button type="text" onClick={() => {
                    setExemplaryCaseVisible(true)
                    setTabkey('3')
                  }}>
                    BMI高危专案
                  </Button>
                )}
                {/* {isShowTwins && (
                  <Button type="text" onClick={() => setState({ exemplaryCaseVisible: true, tabkey: '4' })}>
                    双胎妊娠专案
                  </Button>
                )} */}
                {isShowMultiplets && (
                  <Button type="text" onClick={() => {
                    setExemplaryCaseVisible(true)
                    setTabkey('5')
                  }}>
                    {get(props, `headerInfo.pregnancyCaseLable`) || '多胎'}妊娠专案
                  </Button>
                )}
              </div>
              {showSpan('infectionNote') ? (
                <div style={{ color: contagionColor }} className={styles["msg-infection"]}>
                  传染病：{getValue('infectionNote') || '无'} /
                </div>
              ) : null}
              <Tooltip placement="bottomLeft" title={showTitle(highriskType)}>
                {highriskType ? (
                  <div className={styles["msg-highrisk"]}>
                    高危因素：
                    {getValue('highriskNote') || '无'}
                  </div>
                ) : (
                  <div className={styles["msg-highrisk"]}>高危诊断：{getValue('highRiskDiagnosis') || '无'}</div>
                )}
              </Tooltip>
            </div>
          </div>
        </div>
        {!isNurse && (
          <div className={styles["header-info-extra"]}>
            <div className={styles["new-flash-content"]} onClick={onDobuleClick}>
              <div className={styles["icon-conetent"]}>
                <ThunderboltOutlined twoToneColor="#eb2f96" />
              </div>
              提醒
            </div>
          </div>
        )}
      </div>
    );
  };


  async function fetchHeaderInfo() {
    if (!pregnancyId) return
    const data = await SMchc_Doctor.getOutpatientHeaderInfo(pregnancyId);
    saveHeaderInfo?.(data);
    setHeaderInfo(data)
  }


  return (
    <React.Fragment>
      {renderInfo()}





      {exemplaryCaseVisible && (
        <ExemplaryCase
          onClose={() => setExemplaryCaseVisible(false)}
          isShowGdm={isShowGdm}
          isShowBmi={isShowBmi}
          isShowSlowGrowing={isShowSlowGrowing}
          isShowTwins={isShowTwins}
          isShowMultiplets={isShowMultiplets}
          tabkey={tabkey}
          {...props}
        />
      )}
    </React.Fragment>
  );
}




