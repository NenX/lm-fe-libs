import { Button, Form, InputNumber } from 'antd';
import { isEmpty, isNil } from 'lodash';
import React from 'react';
import { GeneralComponents_EditInTable_Inner } from '../../GeneralComponents/EditInTable';
import { getTableColumn } from './table/index';
export default function CustomEditInTable(props: any) {
  const { config, value, onChange, fetalCount, ...rest } = props;



  const _fetalCount = sessionStorage.getItem('fetalCount') ?? fetalCount ?? 1;
  let tableColumns = getTableColumn(Number(_fetalCount));


  return <GeneralComponents_EditInTable_Inner tableColumns={tableColumns} {...rest} onChange={onChange} value={value} RenderOtherActions={
    ({ selectedRowKeys, isEditing, handleDelete, handleEdit, handleSave, handleCancel, disabled }) => {

      return (
        <>
          {isEditing ? (
            <Button style={{ margin: '0 16px' }} onClick={handleSave}>
              确定
            </Button>
          ) : (
            <Button disabled={disabled} style={{ margin: '0 16px' }} onClick={handleEdit}>
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
            <Button onClick={handleCancel}>取消</Button>
          ) : (
            <Button
              type="primary"
              danger
              onClick={handleDelete}
              disabled={disabled || isNil(selectedRowKeys) || isEmpty(selectedRowKeys)}
            >
              删除
            </Button>
          )}
          <div
            className="normal-nursing__table-actions"
            style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)' }}
          >
            <Form.Item label="胎数" name="fetalCount" initialValue={Number(sessionStorage.getItem('fetalCount'))}>
              <InputNumber disabled />
            </Form.Item>
          </div>
        </>
      );
    }} />;
}
