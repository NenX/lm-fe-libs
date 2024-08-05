import { ArrowRightOutlined, SaveOutlined } from '@ant-design/icons';
import { MyForm, getFormData, mchcModal } from '@lm_fe/components_m';
import { Button, Form, Space, Tabs, message } from 'antd';
import { cloneDeep, get, isEmpty, map } from 'lodash';
import React, { useEffect, useState, useRef } from 'react';
import CloseArchives from '../../nurse-end/close-archives/index1';
import HusbandInfo from './husband'
import PregnancyBase from './pregnancy'
import { api } from '../.api';
import './index.less';
import requestMethods from './methods/request';
import { IMchc_Doctor_OutpatientHeaderInfo, IMchc_Pregnancy } from '@lm_fe/service';

export interface IDoctorEnd_BaseProps {
  isAllPregnancies: boolean
  headerInfo: IMchc_Doctor_OutpatientHeaderInfo
  isSingle?: boolean
}

function DoctorEnd_Base(props: IDoctorEnd_BaseProps) {
  const { isAllPregnancies } = props;
  const [tabs, set_tabs] = useState([
    { key: 'tab-0', title: '孕妇信息', component: PregnancyBase, form: Form.useForm()[0] },
    { key: 'tab-1', title: '丈夫信息', component: HusbandInfo, form: Form.useForm()[0] },
    { key: 'tab-2', title: '结案管理', component: CloseArchives, form: Form.useForm()[0] },
  ],)
  const [step, set_step] = useState('tab-0')

  useEffect(() => {

  }, [])

  async function handleSubmit(next: string, bool?: boolean) {
    const tab = tabs.filter((item: any) => item.key === step)[0];

    const res = await tab.form.validateFields();

    set_step(next)


  };


  function tabsChange(key: string) {
    handleSubmit(key, true);
  }
  return (
    <div className="prenatal-visit-main_base">
      <Tabs
        type="card"
        className="prenatal-visit-main_base-tabs"
        activeKey={step}
        onChange={tabsChange.bind(this)}
      >
        {map(tabs, (item) => {
          const Component = get(item, 'component');
          const active = item.key === step
          return (
            <Tabs.TabPane tab={item.title} key={item.key}>
              {
                active ? <Component {...props} /> : null
              }
            </Tabs.TabPane>
          );

        })}
      </Tabs>
    </div>
  );
}


export default DoctorEnd_Base
