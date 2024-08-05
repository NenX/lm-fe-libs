import React, { Component } from 'react';
import { List, Card } from 'antd';
import { DeleteOutlined, EditOutlined, CopyOutlined, CustomIcon } from '@/components/GeneralComponents/CustomIcon';
import { get, round } from 'lodash';
import './step1.less';
import ItemTop from '../assets/questionnaire-item-top.png';
import { IModel_WorkQuestions } from '@/stupid_model/models/workQuestions';
const itemBgColors = ['#FFEFDD', '#FBDDDD', '#DDF3FB', '#DDFBE4', '#E8DDFB'];
interface IProps {
  initQuestions: (type: 'create' | 'update', item: IModel_WorkQuestions) => void
  onDeleteTemplate: (item: IModel_WorkQuestions) => void
  templateList: IModel_WorkQuestions[]
}
export function Step1(props: IProps) {

  const { initQuestions, templateList, onDeleteTemplate } = props;

  function handleSelect(type: 'create' | 'update', item: IModel_WorkQuestions) {
    initQuestions(type, item);
  };

  function handleNewTemplate() {
    initQuestions('create', {} as any);
  };

  return (
    <div className="follow-up-step1">
      <List
        rowKey={item => item?.id || -1}
        grid={{ gutter: 24, column: 4 }}
        dataSource={[null, ...templateList]}
        renderItem={(item) =>
          item ? (
            <List.Item key={item.id}>
              <Card
                hoverable
                bodyStyle={{ paddingBottom: 20 }}
                onClick={() => {
                  handleSelect('update', item);
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
                      handleSelect('create', item);
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
                <Card.Meta style={{ cursor: 'pointer' }} title={item.title} description={<div title={item.preface} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.preface}</div>} />
              </Card>
            </List.Item>
          ) : (
            <List.Item>
              <div className="follow-up-new-item" onClick={handleNewTemplate}>
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
export default Step1;
