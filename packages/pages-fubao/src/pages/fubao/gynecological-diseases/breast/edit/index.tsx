import React from 'react';
import Form from './components/Form';
import { toApi, fromApi } from './config/adapter';
import { formDescriptionsWithoutSectionApi, BaseEditPanel } from '@lm_fe/components_m'
import { fubaoRequest as request } from '@lm_fe/utils'
export default class Panel extends BaseEditPanel {
  static defaultProps = {
    baseUrl: '/api/breast-cancers', request,
    moduleName: 'breast-cancer',
    title: '乳腺癌筛查情况',
    toApi,
    fromApi,
    Form,
  };
}
