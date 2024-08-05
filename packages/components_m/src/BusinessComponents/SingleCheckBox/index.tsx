import React, { useState, useEffect } from 'react';
import { Checkbox, Row, Col } from 'antd';
import { get, filter, indexOf, isEmpty, set, cloneDeep } from 'lodash';
interface IProps {
  selectValue?: any;
  options?: any;
  onChange?: any;
  type?: 'single' | 'multiple';
  disabled?: boolean;
  span?: number;
}
export default (props: IProps) => {
  const { options = [], type = 'single', selectValue, onChange, disabled = false, span = 4 } = props;
  const [data, setData] = useState({});
  useEffect(() => {
    !isEmpty(selectValue) && setData(selectValue);
  }, [selectValue]);

  const handleCheckBoxChange = (checkedValues: any) => {
    const tempData = cloneDeep(data);
    const oldCheckedValues = get(data, 'checkedValues');
    let newCheckedValues = checkedValues;

    if (type === 'single') {
      newCheckedValues = filter(checkedValues, (item) => indexOf(oldCheckedValues, item) === -1);
      set(tempData, 'withInputValues', {});
    }
    // data[key] = val;
    set(tempData, 'checkedValues', newCheckedValues);
    setData(tempData);
    onChange && onChange(tempData);
  };
  return (
    <Checkbox.Group disabled={disabled} value={get(data, 'checkedValues')} onChange={handleCheckBoxChange}>
      <Row>
        {options.map((data: any) => {
          return (
            <Col span={span}>
              <Checkbox value={data.value}>{data.label}</Checkbox>
            </Col>
          );
        })}
      </Row>
    </Checkbox.Group>
  );
};
