import React, { useRef, useState } from 'react';
import { Row, Col, Button, Input, InputNumber, Select } from 'antd';
import { isEmpty, map, get, indexOf, isNil, join } from 'lodash';
import {
  StarOutlined,
  BorderOutlined,
  CaretDownOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@/components/GeneralComponents/CustomIcon';
import { labelsArrayMapping } from './step2';
import './item.less';
interface IProps {
  index: any;
  question: any;
  lastQuestion: any;
  onChangeIndex: any;
  onQuestionItemDelete: any;
  onQuestionItemOptionsDelete: any;
  onQuestionItemOptionsAdd: any;
  onQuestionClick: any;
  onQuestionItemOptionEdit: any;
  onQuestionItemEdit: any;
}
export default (props: IProps) => {
  const {
    index,
    question,
    onChangeIndex,
    onQuestionClick,
    onQuestionItemOptionsDelete,
    onQuestionItemDelete,
    onQuestionItemOptionsAdd,
    onQuestionItemEdit,
    onQuestionItemOptionEdit,
  } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [hoverTargetQuestionPlace, setHoverTargetQuestionPlace] = useState('');

  // useEffect(() => {
  //   ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  // }, [lastQuestion]);

  const handleQuestionDragOver = (e: any) => {
    const { y, height } = ref.current!.getBoundingClientRect();
    const normalClientY = y + height / 2;
    const clientY = get(e, 'clientY');
    if (clientY) {
      let hoverTargetQuestionPlace = 'bottom';
      let newQuestionIndex = index;
      if (clientY < normalClientY) {
        hoverTargetQuestionPlace = 'top';
        newQuestionIndex = index - 1;
      }
      setHoverTargetQuestionPlace(hoverTargetQuestionPlace);
      onChangeIndex(newQuestionIndex);
    }
  };

  const handleQuestionDragLeave = () => {
    setHoverTargetQuestionPlace('');
  };

  const renderQuestionInput = () => {
    const { type, options } = question;
    if (indexOf(['radio'], type) > -1) {
      return map(options, (option, optionIndex) => {
        return (
          <Row key={optionIndex} className="question-step-two__panel-preview-middle__question-options">
            <Col span={14}>
              <Input
                className="question-step-two__panel-preview-middle__question-options-input"
                addonBefore={<CheckCircleOutlined />}
                value={get(option, 'label')}
                onChange={(e) => {
                  onQuestionItemOptionEdit(index, optionIndex, get(e, 'target.value'));
                }}
                size="small"
              />
            </Col>
            <Col span={7} offset={1} style={{ display: 'flex' }}>
              <div style={{ width: 80 }}>分值：</div>
              <InputNumber
                className="question-step-two__panel-preview-middle__question-options-input"
                value={get(option, 'score')}
                onChange={(score) => {
                  onQuestionItemOptionEdit(index, optionIndex, score, 'score');
                }}
                size="small"
              />
            </Col>

            <Col span={1} offset={1}>
              <CloseCircleOutlined
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  onQuestionItemOptionsDelete(index, optionIndex);
                }}
                className="question-step-two__panel-preview-middle__question-options-delete"
              />
            </Col>
          </Row>
        );
      });
    }
    if (indexOf(['multiple'], type) > -1) {
      return map(options, (option, optionIndex) => {
        return (
          <Row key={optionIndex} className="question-step-two__panel-preview-middle__question-options">
            <Col span={14}>
              <Input
                className="question-step-two__panel-preview-middle__question-options-input"
                addonBefore={<BorderOutlined />}
                value={get(option, 'label')}
                size="small"
                onChange={(e) => {
                  onQuestionItemOptionEdit(index, optionIndex, get(e, 'target.value'));
                }}
              />
            </Col>
            <Col span={7} offset={1} style={{ display: 'flex' }}>
              <div style={{ width: 80 }}>分值：</div>
              <InputNumber
                className="question-step-two__panel-preview-middle__question-options-input"
                value={get(option, 'score')}
                onChange={(score) => {
                  onQuestionItemOptionEdit(index, optionIndex, score, 'score');
                }}
                size="small"
              />
            </Col>
            <Col span={1} offset={1}>
              <CloseCircleOutlined
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  onQuestionItemOptionsDelete(index, optionIndex);
                }}
                className="question-step-two__panel-preview-middle__question-options-delete"
              />
            </Col>
          </Row>
        );
      });
    }
    if (indexOf(['dropdown'], type) > -1) {
      return map(options, (option, optionIndex) => {
        return (
          <Row key={optionIndex} className="question-step-two__panel-preview-middle__question-options">
            <Col span={14}>
              <Input
                className="question-step-two__panel-preview-middle__question-options-input"
                addonBefore={<CaretDownOutlined />}
                value={get(option, 'label')}
                size="small"
                onChange={(e) => {
                  onQuestionItemOptionEdit(index, optionIndex, get(e, 'target.value'));
                }}
              />
            </Col>
            <Col span={7} offset={1} style={{ display: 'flex' }}>
              <div style={{ width: 80 }}>分值：</div>
              <InputNumber
                className="question-step-two__panel-preview-middle__question-options-input"
                value={get(option, 'score')}
                onChange={(score) => {
                  onQuestionItemOptionEdit(index, optionIndex, score, 'score');
                }}
                size="small"
              />
            </Col>
            <Col span={1} offset={1}>
              <CloseCircleOutlined
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  onQuestionItemOptionsDelete(index, optionIndex);
                }}
                className="question-step-two__panel-preview-middle__question-options-delete"
              />
            </Col>
          </Row>
        );
      });
    }
    if (indexOf(['completion'], type) > -1) {
      return (
        <div className="question-step-two__panel-preview-middle__question-completion">
          <Input
            className="question-step-two__panel-preview-middle__question-completion-input"
            size="small"
            style={{ marginTop: 4 }}
          />
          {map(options, (option, optionIndex) => {
            return (
              <Row className="question-step-two__panel-preview-middle__question-options">
                <Col span={6} style={{ display: 'flex' }}>
                  <div style={{ width: '100%' }}>计分规则：</div>
                  <Select
                    className="question-step-two__panel-preview-middle__question-options-input"
                    value={get(option, 'rule')}
                    onSelect={(value) => {
                      onQuestionItemOptionEdit(index, 0, value, 'rule');
                    }}
                    dropdownMatchSelectWidth
                    size="small"
                  >
                    <Select.Option value="equal">相等</Select.Option>
                    <Select.Option value="contain">包含</Select.Option>
                  </Select>
                </Col>
                <Col span={7} offset={1} style={{ display: 'flex' }}>
                  <div style={{ width: '100%' }}>标准答案：</div>
                  <Input
                    className="question-step-two__panel-preview-middle__question-options-input"
                    value={get(option, 'answer')}
                    onChange={(e) => {
                      onQuestionItemOptionEdit(index, 0, e.target.value, 'answer');
                    }}
                    size="small"
                  />
                </Col>
                <Col span={7} offset={1} style={{ display: 'flex' }}>
                  <div style={{ width: 80 }}>分值：</div>
                  <InputNumber
                    className="question-step-two__panel-preview-middle__question-options-input"
                    value={get(option, 'score')}
                    onChange={(score) => {
                      onQuestionItemOptionEdit(index, 0, score, 'score');
                    }}
                    size="small"
                  />
                </Col>
              </Row>
            );
          })}
        </div>
      );
    }
    if (indexOf(['description'], type) > -1) {
      return <div className="question-step-two__panel-preview-middle__question-options"></div>;
    }
    if (indexOf(['star'], type) > -1) {
      return (
        <div className="question-step-two__panel-preview-middle__question-options">
          <StarOutlined />
          <StarOutlined />
          <StarOutlined />
          <StarOutlined />
          <StarOutlined />
        </div>
      );
    }
    return <></>;
  };

  const renderBottomBtns = (question) => {
    if (indexOf(['radio', 'multiple', 'dropdown'], get(question, 'type')) > -1) {
      return (
        <div style={{ marginTop: 20 }}>
          <Button
            size="small"
            onClick={(e: React.MouseEvent) => {
              onQuestionItemOptionsAdd(index);
            }}
          >
            添加选项
          </Button>
        </div>
      );
    }
  };

  return (
    <div
      style={
        !isEmpty(hoverTargetQuestionPlace)
          ? {
              [`border-${hoverTargetQuestionPlace}`]: '4px solid #ff0000',
            }
          : {}
      }
      ref={ref}
      className="question-step-two__panel-preview-middle__question"
      onDragOver={handleQuestionDragOver}
      onDragLeave={handleQuestionDragLeave}
      onClick={() => {
        onQuestionClick({ ...question, index });
      }}
    >
      <div className="question-step-two__panel-preview-middle__question-title">
        <h4>
          {index}.{get(labelsArrayMapping, `${get(question, 'type')}.title`)}
          ({question.group?.val||'未分组'})
        </h4>
        <DeleteOutlined
          onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
            e.stopPropagation();
            onQuestionItemDelete(index);
          }}
          className="question-step-two__panel-preview-middle__question-title-icon-delete"
        />
      </div>
      <div>
        <Input
          className="question-step-two__panel-preview-middle__question-options-input"
          value={get(question, 'title')}
          size="small"
          onChange={(e) => {
            onQuestionItemEdit(index, get(e, 'target.value'));
          }}
        />
        {renderQuestionInput()}
      </div>
      {!isNil(get(question, 'logic')) && !isEmpty(get(question, 'logic')) && (
        <div className="question-step-two__panel-preview-middle__question-tip">
          依赖于第{get(question, 'logic.bind') + 1}题的第
          {join(
            map(get(question, 'logic.selectOption'), (value) => value + 1),
            '、',
          )}
          选项
        </div>
      )}
      {renderBottomBtns(question)}
    </div>
  );
};
