import { request } from '@lm_fe/utils';
import { map, isEmpty } from 'lodash';

const DEFAULT_URL = '/api/template-trees';

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

export const rootTemplate = {
  id: 0,
  key: 0,
  value: 0,
  title: '顶级',
  children: [],
};

export const transferTemplates = (templates: any, pid = 0) => {
  const temp: any = [];
  map(templates, (item) => {
    if (item.pid === pid) {
      item.key = item.id;
      item.value = item.id;
      item.title = item.val;
      item.children = transferTemplates(templates, item.id);
      if (isEmpty(item.children)) {
        item.isLeaf = true;
      } else {
        item.isLeaf = false;
      }
      temp.push(item);
    }
  });
  return temp;
};
