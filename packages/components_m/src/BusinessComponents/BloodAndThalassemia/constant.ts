import { get } from "lodash";

export default [
  { label: '未检出常见地贫基因变异', value: '未检出常见地贫基因变异' },
  { label: 'β地中海贫血基因CD14-15突变', value: 'β地中海贫血基因CD14-15突变' },
  { label: 'β地中海贫血基因CD17突变', value: 'β地中海贫血基因CD17突变' },
  { label: 'β地中海贫血基因CD27/28突变', value: 'β地中海贫血基因CD27/28突变' },
  { label: 'β地中海贫血基因CD41-42突变', value: 'β地中海贫血基因CD41-42突变' },
  { label: 'β地中海贫血基因CD43突变', value: 'β地中海贫血基因CD43突变' },
  { label: 'β地中海贫血基因CD71-72突变', value: 'β地中海贫血基因CD71-72突变' },
  { label: 'β地中海贫血基因βE突变', value: 'β地中海贫血基因βE突变' },
  { label: 'β地中海贫血基因-32突变', value: 'β地中海贫血基因-32突变' },
  { label: 'β地中海贫血基因CD31突变', value: 'β地中海贫血基因CD31突变' },
  { label: 'β地中海贫血基因30突变', value: 'β地中海贫血基因30突变' },
  { label: 'β地中海贫血基因-29突变', value: 'β地中海贫血基因-29突变' },
  { label: 'β地中海贫血基因-28突变', value: 'β地中海贫血基因-28突变' },
  { label: 'β地中海贫血基因IVS-I-1突变', value: 'β地中海贫血基因IVS-I-1突变' },
  { label: 'β地中海贫血基因IVS-II-654突变', value: 'β地中海贫血基因IVS-II-654突变' },
  { label: 'β地中海贫血基因IVS-I-5突变', value: 'β地中海贫血基因IVS-I-5突变' },
  { label: 'β地中海贫血基因CAP+1突变', value: 'β地中海贫血基因CAP+1突变' },
  { label: 'β地中海贫血基因IntM突变', value: 'β地中海贫血基因IntM突变' },
  { label: 'a地中海贫血基因SEA缺失', value: 'a地中海贫血基因SEA缺失' },
  { label: 'a地中海贫血基因3.7缺失', value: 'a地中海贫血基因3.7缺失' },
  { label: 'a地中海贫血基因4.2缺失', value: 'a地中海贫血基因4.2缺失' },
  { label: 'a地中海贫血基因QS突变', value: 'a地中海贫血基因QS突变' },
  { label: 'a地中海贫血基因WS突变', value: 'a地中海贫血基因WS突变' },
  { label: 'a地中海贫血基因CS突变', value: 'a地中海贫血基因CS突变' },
];


export function getNewDatasource(value: any) {
  const newDatasource: any = [
    {
      key: 'male',
      gender: '女方',
      hB: get(value, 'pdThalassemiaExams.0.hB'),
      mCV: get(value, 'pdThalassemiaExams.0.mCV'),
      mCH: get(value, 'pdThalassemiaExams.0.mCH'),
      hbA2: get(value, 'pdThalassemiaExams.0.hbA2'),
      deletions: get(value, 'pdThalassemiaExams.0.deletions'),
      otherNote: get(value, 'pdThalassemiaExams.0.otherNote'),
      bg: get(value, 'pdBloodGroups.0.bg'),
      rh: get(value, 'pdBloodGroups.0.rh'),
    },
    {
      key: 'female',
      gender: '男方',
      hB: get(value, 'pdThalassemiaExams.1.hB'),
      mCV: get(value, 'pdThalassemiaExams.1.mCV'),
      mCH: get(value, 'pdThalassemiaExams.1.mCH'),
      hbA2: get(value, 'pdThalassemiaExams.1.hbA2'),
      deletions: get(value, 'pdThalassemiaExams.1.deletions'),
      otherNote: get(value, 'pdThalassemiaExams.1.otherNote'),
      bg: get(value, 'pdBloodGroups.1.bg'),
      rh: get(value, 'pdBloodGroups.1.rh'),
    },
  ];
  return newDatasource
}