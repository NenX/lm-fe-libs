import Screening from './Screening';
import PathologicalBiopsy from './PathologicalBiopsy';
import Mammography from './Mammography';

export const NurseTypesMapping = {
  Screening: {
    key: 'Screening',
    name: '筛查',
    icon: '',
    api: '/api/labour-records',
    component: Screening,
  },
  Mammography: {
    key: 'Mammography',
    name: '乳腺X线',
    icon: '',
    api: '/api/labour-records',
    component: Mammography,
  },
  PathologicalBiopsy: {
    key: 'PathologicalBiopsy',
    name: '病理活检',
    icon: '',
    api: '/api/labour-records',
    component: PathologicalBiopsy,
  },
};
