import { SMchc_TemplateTrees } from '@lm_fe/service';
import { TreeSelect } from 'antd';
import { DataNode } from 'antd/lib/tree';
import { useEffect, useState } from 'react';
import { rootTemplate, transferTemplates } from '../methods';
import { needUserIDTypes } from '../common';
export default function TemplateSelect(props: any) {
  const { onChange, templateType, userid, depid = 1 } = props;
  const [value, setValue] = useState(props.value || 0);
  const [options, setOptions] = useState<DataNode[]>([]);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    SMchc_TemplateTrees.getTemplateTree({
      depid,
      type: templateType,
      userid: needUserIDTypes.indexOf(templateType) > -1 && userid ? userid : null,
    }).then((res) => {
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
    onChange && onChange(data);
  };

  return <TreeSelect treeDefaultExpandAll value={value} treeData={options} onChange={handleChange} />;
}
