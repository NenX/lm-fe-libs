import { get, map } from 'lodash';
export const processFromApi = (data: any[]) => {
  return map(data, (item: object) => {
    return {
      ...item,
      name: get(item, 'wife.name'),
      age: get(item, 'wife.age'),
      husbandname: get(item, 'husband.name')
    };
  });
};
