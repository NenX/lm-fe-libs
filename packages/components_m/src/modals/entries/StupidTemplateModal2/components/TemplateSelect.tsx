import React, { useEffect, useState } from 'react';
import { TreeSelect } from 'antd';
import { transferTemplates, rootTemplate } from '../methods';
import { mchcEnv } from '@lm_fe/env';
import { SLocal_State, SMchc_TemplateTrees, SMchc_User } from '@lm_fe/service';
export default function TemplateSelect(props: any) {
  const { onChange, templateType, depid = 1 } = props;
  const [value, setValue] = useState(props.value || 0);
  const [options, setOptions] = useState<any[]>([]);
  const userId = SLocal_State.getUserData()?.id

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    SMchc_TemplateTrees.getList({
      params: {
        depid,
        type: templateType,
        userid: userId,
        size: 99999,
        page: 0,
      }
    })
      .then((res) => {
        setOptions([
          {
            ...rootTemplate,
            children: transferTemplates(res),
          },
        ]);
      });
  }, []);

  const handleChange = (data: any) => {
    setValue(data);
    onChange?.(data);
  };

  return <TreeSelect treeDefaultExpandAll value={value} treeData={options} onChange={handleChange} />;
}
