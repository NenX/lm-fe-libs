import React, { Component } from 'react';
import { BaseTable as Table } from '../../../BaseTable';
import { Button } from 'antd';
import { isEmpty, isNil, map } from 'lodash';
export default class BaseTable extends Component {
  renderOtherActions = () => {
    const { selectedRowKeys, isEditing, onDelete, onEdit, onSave, onCancel, disabled, value } = this.props;
    let total = 0;
    map(value, (item) => {
      if (item.bleedingValue) {
        total = total + item.bleedingValue;
      }
    });
    return (
      <>
        {isEditing ? (
          <Button style={{ margin: '0 16px' }} onClick={onSave}>
            预览
          </Button>
        ) : (
          <Button disabled={disabled} style={{ margin: '0 16px' }} onClick={onEdit}>
            编辑
          </Button>
        )}
        {/* <Button
          type="primary"
          danger
          onClick={onDelete}
          disabled={disabled || isNil(selectedRowKeys) || isEmpty(selectedRowKeys)}
        >
          删除
        </Button> */}
        {isEditing ? (
          <Button onClick={onCancel}>取消</Button>
        ) : (
          <Button
            type="primary"
            danger
            onClick={onDelete}
            disabled={disabled || isNil(selectedRowKeys) || isEmpty(selectedRowKeys)}
          >
            删除
          </Button>
        )}
        {total > 200 ? (
          <div
            className="normal-nursing__table-actions"
            style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)' }}
          >
            产后2小时出血总量：<span style={{ color: 'red', fontWeight: 'bold' }}>{total} ml</span>
          </div>
        ) : (
          <div
            className="normal-nursing__table-actions"
            style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)' }}
          >
            产后2小时出血总量：<span>{total} ml</span>
          </div>
        )}
      </>
    );
  }
  render(): React.ReactNode {
    return <Table {...this.props} renderOtherActions={this.renderOtherActions} />
  }
}
