import Screening from './Screening';
import PathologicalBiopsy from './PathologicalBiopsy';

export const NurseTypesMapping = {
  Screening: {
    key: 'Screening' as const,
    name: '筛查',
    icon: '',
    api: '/api/labour-records',
    component: Screening,
  },
  PathologicalBiopsy: {
    key: 'PathologicalBiopsy' as const,
    name: '病理活检',
    icon: '',
    api: '/api/labour-records',
    component: PathologicalBiopsy,
  },
};
