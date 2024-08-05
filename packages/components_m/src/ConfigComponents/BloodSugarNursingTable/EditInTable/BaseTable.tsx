import React, { Component } from 'react';
import { BaseTable as Table } from '../../../BaseTable';
import { Button } from 'antd';
import { isEmpty, isNil } from 'lodash';
export default class BaseTable extends Component {
  renderOtherActions = () => {
    const { selectedRowKeys, isEditing, onDelete, onEdit, onSave, onCancel, disabled } = this.props;
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
      </>
    );
  }
  render(): React.ReactNode {
    return <Table {...this.props} renderOtherActions={this.renderOtherActions} />
  }
}
