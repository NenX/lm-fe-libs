import SecondVisitNormal from '../components/SecondVisitNormal';
import SecondVisitReduction from '../components/SecondVisitReduction';
import SecondVisitBlood from '../components/SecondVisitBlood';

export const visitTypeMapping = {
  4: {
    key: 4,
    name: '常规复诊',
    component: SecondVisitNormal,
  },
  5: {
    key: 5,
    name: '复诊（选择性减胎）',
    component: SecondVisitReduction,
  },
  6: {
    key: 6,
    name: '复诊（宫内输血）',
    component: SecondVisitBlood,
  },
};
