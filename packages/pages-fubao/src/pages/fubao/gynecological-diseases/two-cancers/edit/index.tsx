import { BaseEditPanelFormFC } from '@lm_fe/components_m';
import { ICommonOption, mchcEvent } from '@lm_fe/env';
import { IFubao_TwoCancerScreeningFile, SFubao_TwoCancerScreeningFile, SLocal_State } from '@lm_fe/service';
import { formatDate, getSearchParamsValue, safe_json_parse_arr } from '@lm_fe/utils';
import { Button, Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { form_config } from './form/form_config';
import { archivalInformation_onClose, archivalInformation_onPrint, archivalInformation_onValuesChange } from './utils';
function Pregnancies(props: any) {
  const { id } = props
  const [formData, setFormData] = useState<Partial<IFubao_TwoCancerScreeningFile>>({})
  const [form] = Form.useForm()
  const [requiredKeys, setRequiredKeys] = useState<{ [x: string]: boolean }>({})
  const searchId = getSearchParamsValue('id')
  const _id = id ?? searchId
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (_id) {
      setTimeout(() => {
        SFubao_TwoCancerScreeningFile.getOne(_id)

          .then(formData => {
            const u = SLocal_State.getUserData()
            formData.registerDate = formData.registerDate ?? formatDate()
            formData.registerPerson = formData.registerPerson ?? u.firstName
            // formData.testingFacility = formData.testingFacility
            form.setFieldsValue(formData)
            setFormData(formData)
          })






      }, 1000);
    }

  }, [])

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
    setLoading(true)
    form.validateFields()
      .then((v: IFubao_TwoCancerScreeningFile) => {
 
        return SFubao_TwoCancerScreeningFile.postOrPut({ ...formData, ...v }).then(remoteData => {
          if (isContinue) {
            form.resetFields()
          } else {
            if (remoteData.id) {
              form.setFieldsValue(remoteData)
              setFormData(remoteData)
            }


          }

        })
      })
      .catch((e) => {
        message.warn('请完善表单项！')
        console.log('erro', e)
      })
      .finally(() => {
        setLoading(false)
      })

  }
  return <>

    <BaseEditPanelFormFC requiredKeys={requiredKeys} form={form} formDescriptions={form_config()}
      onValuesChange={onValuesChange}
      // onPrint={onPrint}

      // onFinish={onFinish}

      renderBtns={() => {
        return <>
          {/* {
            _id ? <Button type="primary" size="large" onClick={onPrint}>
              打印
            </Button> : null
          } */}
          <Button loading={loading} type="primary" size="large" onClick={() => onFinish()}>
            保存
          </Button>
          {
            searchId ? null : <Button loading={loading} type="primary" size="large" onClick={() => onFinish(true)}>
              保存并继续添加
            </Button>
          }
          <Button size="large" onClick={archivalInformation_onClose}>
            关闭
          </Button>
        </>
      }}

    />

  </>
}
export default Pregnancies;
