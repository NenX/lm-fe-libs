import React, { Component } from 'react';
import { List, Card } from 'antd';
import { DeleteOutlined, EditOutlined, CopyOutlined, CustomIcon } from '@/components/GeneralComponents/CustomIcon';
import { get, round } from 'lodash';
import './step1.less';
import ItemTop from '../assets/questionnaire-item-top.png';
const itemBgColors = ['#FFEFDD', '#FBDDDD', '#DDF3FB', '#DDFBE4', '#E8DDFB'];
export class Step1 extends Component {
  constructor(props: any) {
    super(props);
  }

  handleSelect = (type: 'create' | 'update', item: any) => {
    const { initQuestions } = this.props;
    initQuestions && initQuestions(type, item);
  };

  handleNewTemplate = () => {
    const { initQuestions } = this.props;
    initQuestions && initQuestions('create', {});
  };

  render() {
    const { templateList, onDeleteTemplate } = this.props;
    return (
      <div className="follow-up-step1">
        <List
          rowKey="id"
          grid={{ gutter: 24, column: 4 }}
          dataSource={['', ...templateList]}
          renderItem={(item) =>
            item ? (
              <List.Item key={item.id}>
                <Card
                  hoverable
                  bodyStyle={{ paddingBottom: 20 }}
                  onClick={() => {
                    this.handleSelect('update', item);
                  }}
                  cover={
                    <div
                      className="item-top"
                      style={{ backgroundColor: get(itemBgColors, round(Math.random() * 5)) || '#FFEFDD' }}
                    >
                      <img className="item-top-img" src={ItemTop} alt="" />
                    </div>
                  }
                  actions={[
                    <div>
                      <EditOutlined key="edit" />
                      编辑
                    </div>,
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        this.handleSelect('create', item);
                      }}
                    >
                      <CopyOutlined key="copy" />
                      复制
                    </div>,
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTemplate && onDeleteTemplate(item);
                      }}
                    >
                      <DeleteOutlined key="delete" />
                      删除
                    </div>,
                  ]}
                >
                  <Card.Meta style={{ cursor: 'pointer' }} title={item.title} description={item.description} />
                </Card>
              </List.Item>
            ) : (
              <List.Item>
                <div className="follow-up-new-item" onClick={this.handleNewTemplate}>
                  <CustomIcon type="icon-and" />
                  <span>新建调查问卷</span>
                </div>
              </List.Item>
            )
          }
        />
      </div>
    );
  }
}
export default Step1;
