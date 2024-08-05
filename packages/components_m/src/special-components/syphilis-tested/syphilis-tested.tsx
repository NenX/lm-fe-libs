import { Checkbox, Col, Input, Row } from 'antd';
import { cloneDeep, filter, get, includes, indexOf, isEmpty, map, set } from 'lodash';
import { useEffect, useState } from 'react';
import styles from './index.module.less';
import { safe_json_parse } from '@lm_fe/utils';
interface IProps {
  [key: string]: any;
}
enum stateEnum {
  none = 1,
  sure = 2,
}
const options = [
  { label: '未检测', value: stateEnum.none },
  { label: '检测', value: stateEnum.sure },
];
const list1 = [
  {
    title: '快速血浆反应素环状卡片试验RPR',
    type: 'checkbox',
    options: [
      { label: '阴性', value: stateEnum.none, inputWith: false },
      { label: '阳性', value: stateEnum.sure, inputWith: true },
    ],
    inputWith: true,
  },
  {
    title: '甲苯胺红不加热血清试验TRUST',
    type: 'checkbox',
    options: [
      { label: '阴性', value: stateEnum.none, inputWith: false },
      { label: '阳性', value: stateEnum.sure, inputWith: true },
    ],
    inputWith: true,
  },
  {
    title: '其他',
    type: 'input',
    options: [
      { label: '阴性', value: stateEnum.none, inputWith: false },
      { label: '阳性', value: stateEnum.sure, inputWith: true },
    ],
    inputWith: true,
  },
];
const list3 = [
  {
    title: '梅毒螺旋体颗粒凝集试验TPPA',
    type: 'checkbox',
    options: [
      { label: '阴性', value: stateEnum.none, inputWith: false },
      { label: '阳性', value: stateEnum.sure, inputWith: false },
    ],
  },
  {
    title: '酶联免疫吸附试验ELISA',
    type: 'checkbox',
    options: [
      { label: '阴性', value: stateEnum.none, inputWith: false },
      { label: '阳性', value: stateEnum.sure, inputWith: false },
    ],
  },
  {
    title: '免疫层析发-快速检测RT',
    type: 'checkbox',
    options: [
      { label: '阴性', value: stateEnum.none, inputWith: false },
      { label: '阳性', value: stateEnum.sure, inputWith: false },
    ],
  },
  {
    title: '化学发光法CLIA',
    type: 'checkbox',
    options: [
      { label: '阴性', value: stateEnum.none, inputWith: false },
      { label: '阳性', value: stateEnum.sure, inputWith: false },
    ],
  },
  {
    title: '其他',
    type: 'input',
    options: [
      { label: '阴性', value: stateEnum.none, inputWith: false },
      { label: '阳性', value: stateEnum.sure, inputWith: false },
    ],
  },
];
const listConfig = {
  list1: list1,
  list2: list1,
  list3: list3,
};
const defaultValue = {
  testedChecked: [],
  list: [
    { checked: false, cValue: '', checkedGroud: [], dValue: '' },
    { checked: false, cValue: '', checkedGroud: [], dValue: '' },
    { checked: false, cValue: '', checkedGroud: [], dValue: '' },
  ],
};
export default function SyphilisTested({ config, value, onChange, ...props }: IProps) {
  const [data, setData] = useState(cloneDeep(defaultValue));
  useEffect(() => {
    !isEmpty(value) && setData(value);
  }, [value]);

  function handleChangeall(checkedValues: any[]) {
    const tempData = cloneDeep(data);
    const oldCheckedValues = get(tempData, 'testedChecked');
    let newCheckedValues = checkedValues;
    newCheckedValues = filter(checkedValues, (item) => indexOf(oldCheckedValues, item) === -1);
    set(tempData, 'testedChecked', newCheckedValues);
    onChange && onChange(tempData);
  }
  function checkboxChange(ind: number) {
    return (e: any) => {
      const checked = e.target.checked;
      const tempData = cloneDeep(data);
      set(tempData, `list.[${ind}].checked`, checked);
      onChange && onChange(tempData);
    };
  }
  function inputChange(ind: number) {
    return (e: any) => {
      const value = e.target.value;
      const tempData = cloneDeep(data);
      set(tempData, `list.[${ind}].cValue`, value);
      onChange && onChange(tempData);
    };
  }
  function inputChange2(ind: number) {
    return (e: any) => {
      const value = e.target.value;
      const tempData = cloneDeep(data);
      set(tempData, `list.[${ind}].dValue`, value);
      onChange && onChange(tempData);
    };
  }
  function handleGroupChange(ind: number) {
    return (checkedValues: any[]) => {
      const tempData = cloneDeep(data);
      const list = get(tempData, 'list');
      const oldCheckedValues = get(list, `[${ind}].checkedGroud`);
      let newCheckedValues = checkedValues;
      newCheckedValues = filter(checkedValues, (item) => indexOf(oldCheckedValues, item) === -1);
      set(tempData, `list[${ind}]checkedGroud`, newCheckedValues);
      onChange && onChange(tempData);
    };
  }

  function renderC() {
    const specialConfig = get(config, 'specialConfig') ?? safe_json_parse(get(config, 'special_config'));
    return map(get(listConfig, `${get(specialConfig, 'type')}`), (item, index: any) => {
      const title = get(item, 'title');
      const type = get(item, 'type');
      const options = get(item, 'options');
      const inputWith = get(item, 'inputWith');
      return (
        <Row className={styles["list-row"]}>
          <Col span={8}>
            {type == 'checkbox' && (
              <Checkbox onChange={checkboxChange(index)} checked={get(data, `list[${index}]checked`)}>
                {title}
              </Checkbox>
            )}
            {type == 'input' && (
              <div className={styles["inupt-c"]}>
                <div className={styles["title"]}>{title}</div>
                <Input
                  onChange={inputChange(index)}
                  size="small"
                  width={100}
                  value={get(data, `list[${index}]cValue`)}
                ></Input>
              </div>
            )}
          </Col>
          <Col span={5}>
            <Checkbox.Group
              options={options}
              value={get(data, `list[${index}]checkedGroud`)}
              onChange={handleGroupChange(index)}
            />
          </Col>
          <Col span={6}>
            {inputWith && (
              <div className={styles["input-d"]}>
                <div className={styles["title"]}>滴度结果:</div>
                <Input onChange={inputChange2(index)} size="small" value={get(data, `list[${index}]dValue`)}></Input>
              </div>
            )}
          </Col>
        </Row>
      );
    });
  }
  function isShow() {
    const checkedValues: any = get(data, 'testedChecked');
    if (includes(checkedValues, stateEnum.sure)) {
      return true;
    }
    return false;
  }
  return (
    <div className={styles["syphilis-tested-container"]}>
      <Checkbox.Group options={options} value={get(data, 'testedChecked')} onChange={handleChangeall} />
      {isShow() && <div className={styles["main"]}>{renderC()}</div>}
    </div>
  );
}
