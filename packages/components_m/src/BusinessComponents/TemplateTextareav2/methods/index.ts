import { IMchc_TemplateTree_Item } from '@lm_fe/service';
import { request } from '@lm_fe/utils';
import { DataNode } from 'antd/lib/tree';
import { map, isEmpty } from 'lodash';
import { DEFAULT_URL } from '../common';



export const getTemplates = async ({ templateType, userid = null }) => {
  let res;
  if (templateType === 2 && userid) {
    res = await request.get(
      `${DEFAULT_URL}?depid.equals=1&type.equals=${templateType}&userid.equals=${userid}&size=999999&page=0`,
    );
  } else {
    res = await request.get(`${DEFAULT_URL}?depid.equals=1&type.equals=${templateType}&size=999999&page=0`);
  }
  return res;
};

export const rootTemplate: DataNode = {
  // @ts-ignore
  id: 0,
  key: 0,
  value: 0,
  title: '一级模板',
  children: [],
};

export const transferTemplates = (templates: IMchc_TemplateTree_Item[], pid = 0) => {
  const temp: DataNode[] = [];

  map(templates, (item) => {
    const i: DataNode = { key: item.id }
    if (item.pid === pid) {
      // @ts-ignore
      i.value = item.id;
      i.title = item.val;
      i.children = transferTemplates(templates, item.id);
      if (isEmpty(i.children)) {
        i.isLeaf = true;
      } else {
        i.isLeaf = false;
      }
      temp.push(i);
    }
  });
  return temp;
};
