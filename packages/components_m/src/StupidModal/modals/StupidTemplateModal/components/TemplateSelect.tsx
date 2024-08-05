import React, { useEffect, useState } from 'react';
import { TreeSelect } from 'antd';
import { transferTemplates, rootTemplate } from '../methods';
import { getResources } from '../../utils/defaultMethod';
import { DEFAULT_URL, needUserIDTypes } from '../index';
export default function TemplateSelect(props: any) {
  const { onChange, templateType, userid, depid = 1 } = props;
  const [value, setValue] = useState(props.value || 0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    getResources(DEFAULT_URL, {
      'depid.equals': depid,
      'type.equals': templateType,
      'userid.equals': needUserIDTypes.indexOf(templateType) > -1 && userid ? userid : null,
      size: 99999,
      page: 0,
    }).then((res) => {
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
    onChange && onChange(data);
  };

  return <TreeSelect treeDefaultExpandAll value={value} treeData={options} onChange={handleChange} />;
}
