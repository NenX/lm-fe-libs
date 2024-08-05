

import { getDictionariesEnumerations } from "./dictionary";



/**
 *
 * @param value 枚举值value
 * @param type string 字典类型
 */
export function dictionaryTranslator(value: string | number, type: string) {
  const enumerations = getDictionariesEnumerations(type)

  const item = enumerations.find((_) => _.value === value);
  if (!item) {
    return;
  }
  return item.label;
};
