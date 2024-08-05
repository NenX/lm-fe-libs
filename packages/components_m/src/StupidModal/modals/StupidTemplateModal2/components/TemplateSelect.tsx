import React, { useEffect, useState } from 'react';
import { TreeSelect } from 'antd';
import { transferTemplates, rootTemplate } from '../methods';
import { appEnv } from '@/utils/appEnv';
import { SModel_TemplateTrees } from '@/stupid_model/models/TemplateTrees';
export default function TemplateSelect(props: any) {
  const { onChange, templateType, depid = 1 } = props;
  const [value, setValue] = useState(props.value || 0);
  const [options, setOptions] = useState<any[]>([]);
  const userId = appEnv.userData.id

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    SModel_TemplateTrees.getList({
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

  const handleChange = (data) => {
    setValue(data);
    onChange?.(data);
  };

  return <TreeSelect treeDefaultExpandAll value={value} treeData={options} onChange={handleChange} />;
}
