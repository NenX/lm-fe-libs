
import { mchcUtils } from "@lm_fe/env";
import { SLocal_SystemConfig } from "@lm_fe/service";

//广州高危
export const GZlevelOptions = [
  { colorText: '绿色', label: 'Ⅰ', value: 1, note: '#49c458' },
  { colorText: '黄色', label: 'Ⅱ', value: 2, note: '#ffd363' },
  { colorText: '橙色', label: 'Ⅲ', value: 3, note: '#fb9824' },
  { colorText: '粉色', label: 'Ⅳ', value: 4, note: '#ffa8a8' },
  { colorText: '红色', label: 'Ⅴ', value: 5, note: '#c43333' },
];
// 全国高危
export const nationLevelOptions = [
  { colorText: '绿色', label: 'Ⅰ', value: 1, note: '#49c458' },
  { colorText: '黄色', label: 'Ⅱ', value: 2, note: '#ffd363' },
  { colorText: '橙色', label: 'Ⅲ', value: 3, note: '#fb9824' },
  { colorText: '红色', label: 'Ⅳ', value: 4, note: '#c43333' },
];



export const levelOptionsobj = {
  21: GZlevelOptions,
  22: GZlevelOptions,
  23: nationLevelOptions,
};
export function getLevelOptions(): typeof GZlevelOptions {
  const highriskVersion = SLocal_SystemConfig.get('highriskVersion') as 21
  const arr = levelOptionsobj[highriskVersion] ?? GZlevelOptions
  return arr
}
export const GZlevelOptions_Old = [
  { label: '绿色', value: 'Ⅰ' },
  { label: '黄色', value: 'Ⅱ' },
  { label: '橙色', value: 'Ⅲ' },
  { label: '粉色', value: 'Ⅳ' },
  { label: '红色', value: 'Ⅴ' },
];
// 全国高危
export const nationLevelOptions_Old = [
  { label: '绿色', value: 'Ⅰ' },
  { label: '黄色', value: 'Ⅱ' },
  { label: '橙色', value: 'Ⅲ' },
  { label: '红色', value: 'Ⅳ' },
];

export const levelOptionsobj_Old = {
  21: GZlevelOptions,
  22: GZlevelOptions,
  23: nationLevelOptions,
};


