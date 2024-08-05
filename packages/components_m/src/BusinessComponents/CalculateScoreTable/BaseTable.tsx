import React, { Component } from 'react';
import { BaseTable as Table } from '../../BaseTable';
import { Button } from 'antd';
import { isEmpty, isNil, forEach, size } from 'lodash';
export default class BaseTable extends Component<any> {
  renderOtherActions = () => {
    const { selectedRowKeys, isEditing, onDelete, onEdit, onSave, onCancel, disabled, dataSource, srbls } = this.props;
    let totalScore = 0;
    let totalSrbls = 0;
    console.log(dataSource, srbls, '654567');
    if (size(dataSource) > 0) {
      if (srbls) {
        forEach(dataSource, (item) => {
          let s = item.s ? item.s : 0;
          let r = item.r ? item.r : 0;
          let b = item.b ? item.b : 0;
          let l = item.l ? item.l : 0;
          let ls = item.ls ? item.ls : 0;
          console.log(s, r, b, l, s, '111');
          totalSrbls = totalSrbls + s + r + b + l + ls;
        });
      } else {
        forEach(dataSource, (item) => {
          if (item.total) totalScore += item.total;
        });
      }
    }

    return (
      <>
        {isEditing ? (
          <Button style={{ margin: '0 16px' }} onClick={onSave}>
            保存
          </Button>
        ) : (
          <Button disabled={disabled} style={{ margin: '0 16px' }} onClick={onEdit}>
            编辑
          </Button>
        )}
        <Button
          type="primary"
          danger
          onClick={onDelete}
          disabled={disabled || isNil(selectedRowKeys) || isEmpty(selectedRowKeys)}
        >
          删除
        </Button>
        <span style={{ marginLeft: '10px' }}>总分：{srbls ? `S+R+B+L+S=${totalSrbls}` : totalScore}</span>
        {/* {isEditing ? (
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
        )} */}
      </>
    );
  }
  render(): React.ReactNode {
    return <Table  renderOtherActions={this.renderOtherActions} {...this.props} />
  }
}
