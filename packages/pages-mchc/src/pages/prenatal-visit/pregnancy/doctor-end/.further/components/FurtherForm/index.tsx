import { SaveOutlined } from '@ant-design/icons';
import { Button, Card, Space, message } from 'antd';
import { cloneDeep, get, isEqual, set, size } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { api } from '../../../.api';
import DiabetesAppointment from '../../../.components/DiabetesAppointment';
import ResultImport from '../../../.components/ResultImport';
import PreventPreeclampsia from '../../../.components/PreventPreeclampsia';
import { EventEmitter_Old, HighRiskTableEntry, MyForm, getFormData, getFutureDate, mchcModal } from '@lm_fe/components_m';
import { IMchc_Doctor_Diagnoses, IMchc_Doctor_OutpatientHeaderInfo, IMchc_Doctor_RvisitInfoOfOutpatient, IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit, IMchc_Pregnancy, SLocal_SystemConfig, SMchc_Doctor, TIdTypeCompatible } from '@lm_fe/service';
import { getDynamicFormConfig } from './config';
import GesWeek from './ges-week';
import './index.less';
import { mchcEnv, mchcEvent } from '@lm_fe/env';
import { PlusOutlined } from '@ant-design/icons'
// 弹窗枚举
interface IProps {
  headerInfo: IMchc_Doctor_OutpatientHeaderInfo,
  visitsData?: IMchc_Doctor_RvisitInfoOfOutpatient
  formData: Partial<IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit>,
  diagnosesList: IMchc_Doctor_Diagnoses[]
  hasCurrentDoctorRecord: boolean
  isAllPregnancies: boolean

  changePreventPreeclampsia(v: boolean): void,
  updateHeaderInfo(id: TIdTypeCompatible): void,

  setDiagnosesList(v: IMchc_Doctor_Diagnoses[]): void
  onAddBtnClick(): void,
  formHandler: any,
  setFormHandler(v: any): void
  isShowPreventPreeclampsia: boolean,

  getLastRecord(): void,
  getVisitsData(): Promise<void>,



  formChange(b: boolean): void
  canSave: boolean
  loading: boolean
  handleSubmit(): Promise<void>


}
function FurtherForm(props: IProps) {

  const { getLastRecord } = props;
  const { formChange } = props;
  const { diagnosesList,
    formData,
    visitsData,
    hasCurrentDoctorRecord,
    isAllPregnancies,
    headerInfo,
    updateHeaderInfo,
    changePreventPreeclampsia,
    setDiagnosesList,
    onAddBtnClick,
    isShowPreventPreeclampsia,
    canSave,
    handleSubmit,
    formHandler,
    setFormHandler,
    loading,
  } = props;

  const [formConfig, set_formConfig] = useState([])
  const [isShowMenzhen, set_isShowMenzhen] = useState(false)
  const [isShowGesWeek, set_isShowGesWeek] = useState(false)
  const [isShowResultImport, set_isShowResultImport] = useState(false)
  const [isShowDiagReminder, set_isShowDiagReminder] = useState(false)
  const [prindId, set_prindId] = useState('')


  const formRef = useRef({})



  useEffect(() => {
    const a = SLocal_SystemConfig.get('systemMode')
    const isProduction = a === 'production';
    api.further.getFurtherFormConfig(isProduction)
      .then(config => {
        set_formConfig(get(config, 'fields'))
      })
    EventEmitter_Old.subscribe('templateSelect', subscribeMonitor);
    return () => {
      EventEmitter_Old.unSubscribe('templateSelect', subscribeMonitor);

    }
  }, [])

  useEffect(() => {



    if (formHandler && formHandler.listenFormData) {
      formHandler.listenFormData(() => {
        formChange(true);
      });
    }

    if (formHandler.subscribe) {
      formHandler.subscribe('visitDate', 'change', (val: any) => {
        const pregnancyId = headerInfo?.id;
        const params = { date: val, id: pregnancyId };
        api.calcGesWeek(params).then((data) => {
          formHandler.gestationalWeek.actions.setValue(get(data, 'gestationalWeek'));
        });
      });

      formHandler.subscribe('appointmentCycle', 'change', (val: any) => {
        const day = val || 0;
        formHandler.appointmentDate.actions.setValue(getFutureDate(day));
      });

      formHandler.subscribe('inspection', 'click', (val: any) => {
        set_isShowResultImport(true)
      });

      formHandler.subscribe('gestationalWeek', 'click', (val: any) => {
        set_isShowGesWeek(true)
      });
      formHandler.subscribe('syncBtn', 'click', (val: any) => {
        getLastRecord();
      });
      // formHandler.subscribe('prescription', 'focus', (val: any) => {
      //   EventEmitter_Old.dispatch('prescriptionFoucs');
      // });
      // formHandler.subscribe('prescription', 'blur', (val: any) => {
      //   EventEmitter_Old.dispatch('prescriptionBlur');
      // });
    }
  }, [formChange, formHandler])






  function subscribeMonitor(value: any) {
    // EventEmitter_Old.dispatch('prescriptionFoucs');
    const prescription = formHandler.prescription.actions.getValue().value || '';
    formHandler.prescription.actions.setValue(`${prescription}${prescription ? ';' : ''}${value}`);
    formRef.current && formRef.current[`prescription`]?.current?.focus?.();
  }



  function setItemValue(val: string, key: string) {
    if (key === 'gestationalWeek') {
      formHandler.gestationalWeek.actions.setValue(val);
    } else {
      let tempValue = formHandler[key].actions.getValue().value || '';
      if (tempValue.indexOf(val) === -1) tempValue += `${val}；`;
      formHandler[key].actions.setValue(tempValue);
    }
  };










  function closeModal(type: 'isShowMenzhen' | 'isShowResultImport' | 'isShowGesWeek' | '', items?: any, key?: any) {
    if (size(items) > 0) setItemValue(items, key);
    if (type === 'isShowMenzhen') {
      set_isShowMenzhen(false)
    }
    if (type === 'isShowResultImport') {
      set_isShowResultImport(false)
    }
    if (type === 'isShowGesWeek') {
      set_isShowGesWeek(false)
    }
  };
  function Treatmentmeasures(items?: any, key?: any) {
    if (size(items) > 0) setItemValue(items, key);
  };

  function getVisitDate() {
    const visitDate = formHandler['visitDate'].actions.getValue().value;
    return visitDate;
  };

  function showpdf() {

    const id = get(formData, 'id');
    if (id) {
      mchcModal.open('print_modal', {
        modal_data: {
          requestData: {
            url: '/api/pdf-preview',
            resource: 'prenatalVisit1',

            id,
            template: '',
            version: '',
            note: '',

          }
        }
      })
    } else {
      message.error('请先保存');
    }
  }


  function setRef(fieldName: string, ref: any) {
    formRef.current = { ...formRef.current, [fieldName]: ref };
  }





  const dynamicFormConfig = cloneDeep(getDynamicFormConfig(formConfig, diagnosesList));
  const saveBtnTxt = canSave ? `保存${mchcEnv.is('华医') ? '并关闭' : ''}` : '无权限保存'

  return (
    <Card
      title={formData?.id ? "编辑产检记录" : "本次产检信息"}
      bordered={false}
      size="small"
      className="prenatal-visit-main_return-form label-width4"
      extra={
        <span id="extra" style={{ display: 'inline-block', minWidth: 75, height: 24, marginLeft: 98 }}>
          {formData?.id
            // && !hasCurrentDoctorRecord
            ? (
              <Button icon={<PlusOutlined />} type="primary" size="small" onClick={onAddBtnClick} style={{ marginRight: 36 }}>
                新增产检记录
              </Button>
            ) : null}
        </span>
      }
    >
      <MyForm
        disabled_all={!canSave}
        config={dynamicFormConfig}
        value={formData}
        getFormHandler={setFormHandler}
        submitChange={false}
        setRef={setRef}
      />
      <div style={{ marginLeft: '60px' }}>
        <HighRiskTableEntry headerInfo={headerInfo} data={visitsData} />
      </div>
      {!isAllPregnancies && (
        <Space className="return-btns">
          <Button type="primary" icon={<SaveOutlined />} size="large" onClick={showpdf.bind(this)}>
            打印病历
          </Button>
          <Button loading={loading} disabled={!canSave} type="primary" size="large" icon={<SaveOutlined />} onClick={handleSubmit}>
            {saveBtnTxt}
          </Button>
        </Space>
      )}
      {isShowMenzhen && <DiabetesAppointment isShowMenzhen={isShowMenzhen} closeModal={closeModal} />}
      {
        formData ? <GesWeek
          isShowGesWeek={isShowGesWeek}
          closeModal={closeModal}
          Treatmentmeasures={Treatmentmeasures}
          getVisitDate={getVisitDate}
          updateHeaderInfo={updateHeaderInfo}
          headerInfo={headerInfo}
        /> : null
      }
      {isShowResultImport && (
        <ResultImport
          isShowResultImport={isShowResultImport}
          closeModal={closeModal}
          headerInfo={headerInfo}
          importTitle={''}

        />
      )}

      {<PreventPreeclampsia
        changePreventPreeclampsia={changePreventPreeclampsia}
        isShowPreventPreeclampsia={isShowPreventPreeclampsia}
        closeModal={closeModal}
      />}
    </Card>
  );
}
export default FurtherForm
