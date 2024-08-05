import React, { useState, useEffect } from 'react';
import { Checkbox, Row, Col, Input } from 'antd';
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
      //set(tempData, 'withInputValues', {});
    }
    // data[key] = val;
    set(tempData, 'checkedValues', newCheckedValues);
    setData(tempData);
    onChange && onChange(tempData);
  };

  const inputChange = (e: any) => {
    e.preventDefault();
    const val = e.target.value;
    const newVal = { ...data, [`withInputValues`]: val };
    onChange && onChange(newVal);
  };

  return (
    <Checkbox.Group disabled={disabled} value={get(data, 'checkedValues')} onChange={handleCheckBoxChange}>
      <Row>
        {options.map((item: any) => {
          return (
            <React.Fragment key={item.value}>
              <Col span={span}>
                <Checkbox value={item.value}>{item.label}</Checkbox>
              </Col>
              {get(item, 'withInput') && indexOf(get(data, 'checkedValues'), item.value) > -1 && (
                <Input
                  style={get(item, 'style')}
                  onChange={inputChange}
                  value={get(data, `withInputValues`)}
                  placeholder={get(item, 'inputPlaceholder') || '请输入'}
                />
              )}
            </React.Fragment>
          );
        })}
      </Row>
    </Checkbox.Group>
  );
};
