import { request } from '@lm_fe/utils';
import { map, isEmpty } from 'lodash';

const DEFAULT_URL = '/api/template-trees';

export const getTemplates = async ({ templateType, userid = null }) => {
  let count;
  let res;
  if (templateType === 2 && userid) {
    count = (await request.get(`${DEFAULT_URL}/count?type.equals=${templateType}&userid.equals=${userid}`)).data;
    res = (await request.get(`${DEFAULT_URL}?type.equals=${templateType}&userid.equals=${userid}&size=${count}&page=0`)).data;
  } else {
    count = (await request.get(`${DEFAULT_URL}/count?type.equals=${templateType}`)).data;
    res = (await request.get(`${DEFAULT_URL}?type.equals=${templateType}&size=${count}&page=0`)).data;
  }
  return res;
};

export const addTemplate = async (data) => {
  return await request.post(DEFAULT_URL, data);
};

export const updateTemplate = async (data) => {
  return await request.put(DEFAULT_URL, data);
};

export const getTemplateDetail = async (id) => {
  return await request.get(`${DEFAULT_URL}/${id}`);
};

export const deleteTemplate = async (id) => {
  return await request.delete(`${DEFAULT_URL}/${id}`);
};

export const rootTemplate = {
  id: 0,
  key: 0,
  value: 0,
  title: '请选择',
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
