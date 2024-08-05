import React from 'react';
import { BaseQuery } from '@lm_fe/components_m'
import { Button } from 'antd';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';
import { queryFormDescriptions } from '../config/form';
export default class Query extends BaseQuery {
  state = { queryFormDescriptions };
  renderBtn = () => (
    <React.Fragment>
      <Button icon={<RedoOutlined />} onClick={this.handleReset}>
        重置
      </Button>
      <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
        查询
      </Button>
    </React.Fragment>
  );
}
