import { BaseEditPanelFormFC } from '@lm_fe/components_m';
import { mchcDriver, mchcEvent, mchcLogger, mchcUtils, otherOptions } from '@lm_fe/env';
import { IMchc_Nurse_OutpatientDocument, SLocal_History, SMchc_Nurse, TIdTypeCompatible } from '@lm_fe/service';
import { formatDate, getSearchParamsValue } from '@lm_fe/utils';
import { Button, Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { archivalInformation_onClose, archivalInformation_onPrint, archivalInformation_onValuesChange } from './utils';
// import { form_config } from './form/form_config';
import { PartialAll } from '@lm_fe/utils';
import { set } from 'lodash';
import { load_form_config_nurse_end } from './form_new/form_config';
import { Ws } from './Ws';

function Pregnancies(props: { id?: TIdTypeCompatible, toAdd?: boolean, toCheck?: boolean }) {
  const { id, toAdd, toCheck } = props
  const [formData, setFormData] = useState<PartialAll<IMchc_Nurse_OutpatientDocument>>({ pregnancyInfo: { validateDate: formatDate()! } })
  const [form] = Form.useForm()
  const [requiredKeys, setRequiredKeys] = useState<{ [x: string]: boolean }>({})
  const searchId = getSearchParamsValue('id')
  const _id = id ?? searchId
  const [loading, setLoading] = useState(false)
  const isUnCheck = !formData?.recordstate || formData.recordstate === '0';

  useEffect(() => {
    if (_id) {
      setTimeout(() => {
        SMchc_Nurse.getOutpatientDocument(_id).then(remoteData => {
          if (!remoteData) return
          mchcLogger.log('Pregnancies remote', remoteData)
          const validateDate = remoteData?.pregnancyInfo?.validateDate
          set(remoteData, 'pregnancyInfo.validateDate', validateDate ?? formatDate())

          const idNO = remoteData?.baseInfo?.idNO
          const idType = remoteData?.baseInfo?.idType
          const checkData = mchcUtils.checkIdNo_new(idNO, idType)

          const dob = remoteData?.baseInfo?.dob
          const nationality = remoteData?.baseInfo?.nationality
          const nativeplace = remoteData?.baseInfo?.nativeplace
          const age = remoteData?.baseInfo?.age


          set(remoteData, 'baseInfo.dob', dob ?? checkData?.birth)
          set(remoteData, 'baseInfo.nationality', nationality ?? checkData?.nationality)
          set(remoteData, 'baseInfo.nativeplace', nativeplace ?? checkData?.province)
          set(remoteData, 'baseInfo.age', age ?? checkData?.age)

          setFormData(remoteData)
        })
      }, 1000);
    }

  }, [])

  useEffect(() => {

    return mchcDriver.on_rm('data', e => {

      if (e.type === 'ReadCard') {
        let res = e.data
        const baseInfo: Partial<IMchc_Nurse_OutpatientDocument['baseInfo']> = {
          name: res.name,
          idNO: res.idNO,
          idType: res.idType,
          dob: res.dob,
          age: res.age,
          nationality: res.nationality,
          nativeplace: res.nativeplace,
          validateDate: formatDate()!,
        }
        setFormData({ baseInfo });
      }

    })

  }, [])
  useEffect(() => {

    form.setFieldsValue(formData)




    return () => {

    }
  }, [formData])

  useEffect(() => {
    return mchcEvent.on_rm('my_form', (e) => {

    })

  }, [])

  function onValuesChange(changedValues: any, allValues: any) {
    archivalInformation_onValuesChange(changedValues, allValues, form, obj => setRequiredKeys({ ...requiredKeys, ...obj }))
  }
  function onPrint() {
    if (formData?.id) {
      archivalInformation_onPrint(formData.id)
    }
  }

  async function onFinish(isContinue = false) {
    const recordstate = isContinue ? '0' : (isUnCheck ? '1' : formData.recordstate)
    setLoading(true)
    form.validateFields()
      .then(v => {
        mchcLogger.log('vvv', { v, formData })
        const fn = formData?.id ? SMchc_Nurse.updateOutpatientDocument : SMchc_Nurse.newOutpatientDocument
        return fn({ ...formData, ...v, recordstate }).then(remoteData => {
          setLoading(false)
          message.success('操作成功！')
          if (isContinue) {
            form.resetFields()
          } else {
            const ok = (isUnCheck && toCheck) ? confirm('是否前往编辑孕册?') : false
            if (ok) {
              SLocal_History.closeAndReplace(`/prenatal-visit/pregnancy/nurse-end?id=${remoteData.id}`)
            }
            setFormData(remoteData)
            mchcEvent.emit('outpatient', { type: '刷新头部', pregnancyId: remoteData.id })
          }

        })
      })
      .catch((e) => {
        message.warn('请完善表单项！')
        mchcLogger.log('error', e)
        setLoading(false)
      })

  }
  return <div style={{ background: '#fff', padding: 12, height: '100%' }}>

    <BaseEditPanelFormFC requiredKeys={requiredKeys} form={form} formDescriptions={load_form_config_nurse_end}
      onValuesChange={onValuesChange}
      // onPrint={onPrint}

      // onFinish={onFinish}

      renderBtns={() => {
        return <>
          {
            _id ? <Button type="primary" size="large" onClick={onPrint}>
              打印
            </Button> : null
          }
          <Button loading={loading} type="primary" size="large" onClick={() => onFinish()}>
            {isUnCheck ? '保存并审核' : '保存'}
          </Button>
          {
            searchId ? null : <Button loading={loading} type="primary" size="large" onClick={() => onFinish(true)}>
              保存并继续添加孕册
            </Button>
          }
          <Button size="large" onClick={archivalInformation_onClose}>
            关闭
          </Button>
        </>
      }}

    />
    <Ws />

  </div>
}
export default Pregnancies;
