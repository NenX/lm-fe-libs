import * as React from 'react';
import { FormSection, FormSectionForm } from '@lm_fe/components_m';
import getConfig from './config';
export default function JWS(props: any) {
  console.log('xxd', props)
  const { data, form } = props
  const config = getConfig()
  return <FormSectionForm
    onValuesChange={(changedValues) => {
      // const keys = config.filter(_ => _.key && _.inputType === 'MC').map(_ => _.key)

      // const changedKey = Object.keys(changedValues)[0]
      // const __value = changedValues[changedKey]
      // if (changedKey === '既往史一键勾选') {
      //   const pregnancyInfo = keys.reduce((sum, a) => {
      //     return { ...sum, [a!]: __value ? JSON.stringify([{ value: 0 }]) : undefined }
      //   }, {})
      //   console.log('nurse_既往史_keys', pregnancyInfo)

      //   form.setFieldsValue(pregnancyInfo)
      // }

    }}

    formDescriptions={config} data={data} form={form} />
}
Object.assign(JWS, {
  Title: '既往史',
  Config: getConfig(),
  ClassName: 'yi-ban-bing-shi label-width6',
  tmp: true
})