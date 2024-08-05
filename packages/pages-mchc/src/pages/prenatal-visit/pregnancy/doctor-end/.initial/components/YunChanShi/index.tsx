import * as React from 'react';
import { FormSection, FormSectionForm } from '@lm_fe/components_m';
import getConfig from './config';
import { 孕产史_config } from '../../../../nurse-end/archival-information/form/孕产史';
export default function JWS(props: any) {
  console.log('xxd', props)
  const { data, form } = props
  const config = 孕产史_config()
  return <FormSectionForm
    onValuesChange={(changedValues) => {


    }}

    formDescriptions={config.children!} data={data} form={form} />
}
Object.assign(JWS, {
  Title: '孕产史',
  Config: 孕产史_config().children,
  ClassName: 'yi-ban-bing-shi label-width6',
  tmp: true
})