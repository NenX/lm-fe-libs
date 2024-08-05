import { keys, mapKeys } from "lodash";

type InfectionType = '艾' | '梅' | '乙' | '传染病';
type VType<T> = { [x in InfectionType]: T }
interface IRet {
  label: string;
  type: InfectionType;
  allType: InfectionType[];
  color: string;
  key: number;
}
const infectionNameMap: VType<string> = {
  艾: 'HIV',
  梅: '梅毒',
  乙: '乙肝',
  传染病: '传染病',
};
const infectionKeywordMap: VType<string[]> = {
  艾: ['HIV', 'hiv', '艾滋'],
  梅: ['梅毒'],
  乙: ['乙肝', 'HBsAg阳性', '乙型肝炎', '乙型病毒性肝炎', '小三阳', '大三阳'],
  传染病: ['结核病', '重症感染性肺炎', '特殊病毒感染', '丙型病毒性肝炎', '传染病'],
};
const infectionExcludeKeywordMap: VType<string[]> = {
  艾: [],
  梅: ['史'],
  乙: [],
  传染病: [],
};
const infectionColorMap: VType<string> = {
  艾: '#C736FF',
  梅: '#8D36FF',
  乙: '#6236FF',
  传染病: '#9340BA',
};
const sorting: VType<number> = {
  艾: 1,
  梅: 2,
  乙: 3,
  传染病: -1,
};

function getTheFuckingLabel(str: string, isMulti = false): IRet | null {
  const keys = Object.keys(infectionKeywordMap) as InfectionType[];
  const type = keys.reduce<InfectionType | null>((res, key) => {
    if (res) return res;
    const value = infectionKeywordMap[key];
    const exlucdeValue = infectionExcludeKeywordMap[key];
    const isTarget = value.some((v) => str.includes(v) && !exlucdeValue.includes(v));

    return isTarget ? key : null;
  }, null);

  if (!type) return null;
  const label = isMulti ? type : infectionNameMap[type];
  const color = infectionColorMap[type];
  let key = sorting[type];
  return { label, type, color, key, allType: [] };
}
export function handleFuckinginfectionNoteLabel(infectionNote?: string) {
  if (!infectionNote) return [];
  const arr = infectionNote.split(',').filter((_) => _ && _ !== '无');
  const len = arr.length;
  let result = arr.map((str) => getTheFuckingLabel(str, len > 1)!).filter((_) => _);
  let hash: Partial<VType<boolean>> = {};

  result = result.reduce((item, next) => {
    if (!hash[next.type]) {
      hash[next.type] = true;
      item.push(next)
    }
    return item;
  }, [] as IRet[]);
  result = result.map(_ => ({ ..._, allType: keys(hash) as InfectionType[] }))
  const 传染病item = result.find((item) => item.type === '传染病');
  if (传染病item) {
    result = [传染病item];

  } else {

    result.sort((a, b) => a.key - b.key);
  }

  return result;
}
