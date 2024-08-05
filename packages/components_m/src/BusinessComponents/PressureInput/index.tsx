import React from 'react';
import { Input, InputNumber, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import classnames from 'classnames';
import styles from './index.module.less';
export default (props: any) => {
  const { onChange, value, hiddenIpt, disabled } = props;
  const data = {
    systolic: get(value, 'systolic') || null,
    diastolic: get(value, 'diastolic') || null,
  };

  const handleChange = (type: any) => (value: any) => {
    data[type] = value;
    onChange && onChange(data);
  };

  const systolic = get(value, 'systolic') || '';
  const diastolic = get(value, 'diastolic') || '';

  if (hiddenIpt) {
    return !systolic && !diastolic ? (
      <div className={styles["pressure-input-wrapper"]}>-- / --</div>
    ) : (
      <div className={styles["pressure-input-wrapper"]}>
        <span
          className={classnames({
            [styles['pressure-input_issue']]: systolic < 90 || systolic > 130,
          })}
        >
          {systolic}
        </span>
        <span className={styles["pressure-input_split"]}>/</span>
        <span
          className={classnames({
            [styles['pressure-input_issue']]: diastolic < 60 || diastolic > 90,
          })}
        >
          {diastolic}
        </span>
      </div>
    );
  }

  return (
    <Input.Group compact className={styles["pressure-input-wrapper"]}>
      <InputNumber
        disabled={disabled}
        className={classnames(styles['pressure-input'], {
          [styles['pressure-input_issue']]: systolic < 90 || systolic > 130,
        })}
        min={0}
        max={1000}
        placeholder="收缩压"
        value={systolic}
        onChange={handleChange('systolic')}
      />
      <Input className={styles["input-split"]} placeholder="/" disabled />
      <InputNumber
        disabled={disabled}

        className={classnames(styles['pressure-input'], {
          [styles['pressure-input_issue']]: diastolic < 60 || diastolic > 90,
        })}
        min={0}
        max={1000}
        placeholder="舒张压"
        value={diastolic}
        onChange={handleChange('diastolic')}
      />
      <Tooltip className={styles["pressure-input_tip"]} title={`收缩压的正常范围值是90~130mmHg，舒张压的正常范围值是60~90mmHg`}>
        <QuestionCircleOutlined />
      </Tooltip>
    </Input.Group>
  );
};
