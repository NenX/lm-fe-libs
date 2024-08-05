import React from 'react';
import Table from '@/components/BaseTable';
import { Button, InputNumber, Form, Input } from 'antd';
import { isEmpty, isNil, get } from 'lodash';
export default class BaseTable extends Table {
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
        {/* <div
          className="normal-nursing__table-actions"
          style={{ position: 'absolute', top: 4, right: '223px' }}
        >
          <Form.Item label="质控护士" name="fetalCount">
            <Input/>
          </Form.Item>
        </div> */}
      </>
    );
  };
}
