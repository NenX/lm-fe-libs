import { Button } from 'antd';
import { isEmpty, isNil, map } from 'lodash';
import { GeneralComponents_EditInTable_Inner } from '../../GeneralComponents/EditInTable';
import { tableColumns } from './table';
import React from 'react';
export default function CustomEditInTable(props: any) {
  const { config, value, onChange, ...rest } = props;



  return <GeneralComponents_EditInTable_Inner tableColumns={tableColumns} {...rest} onChange={onChange} value={value}

    RenderOtherActions={
      ({ selectedRowKeys, isEditing, handleDelete, handleEdit, handleSave, handleCancel, disabled }) => {
        let total = 0;
        map(value, (item) => {
          if (item.bleedingValue) {
            total = total + item.bleedingValue;
          }
        });
        return (
          <>
            {isEditing ? (
              <Button style={{ margin: '0 16px' }} onClick={handleSave}>
                预览
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
      }}
  />;
}


