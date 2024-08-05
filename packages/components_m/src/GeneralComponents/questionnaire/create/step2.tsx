import React, { Fragment } from 'react';
import { Row, Col, Button, Input, Modal, Select, Checkbox, Form, message } from 'antd';
import { isEmpty, map, get, indexOf, last, keys, concat, keyBy, isUndefined, filter, set, cloneDeep } from 'lodash';
import QuestionItem from './question-item';
import RadioIcon from '../assets/radio.png';
import MultipleIcon from '../assets/checkbox.png';
import DropdownIcon from '../assets/select.png';
import CompletionIcon from '../assets/vacancy.png';
import StarIcon from '../assets/stars.png';
import DescriptionIcon from '../assets/description.png';
import { CustomIcon } from '@/components/GeneralComponents/CustomIcon';
import Editor from '@/components/GeneralComponents/Editor';
import './step2.less';
export const chooseArray = [
  {
    title: '单选题',
    value: 'radio',
    iconImg: RadioIcon,
  },
  {
    title: '多选题',
    value: 'multiple',
    iconImg: MultipleIcon,
  },
  {
    title: '下拉题',
    value: 'dropdown',
    iconImg: DropdownIcon,
  },
  {
    title: '填空题',
    value: 'completion',
    iconImg: CompletionIcon,
  },
];
export const starArray = [
  {
    title: '打分题',
    value: 'star',
    iconImg: StarIcon,
  },
];
export const descArray = [
  {
    title: '段落说明',
    value: 'description',
    iconImg: DescriptionIcon,
  },
];
export const labelsArray = concat(chooseArray, starArray, descArray);
export const labelsArrayMapping = keyBy(labelsArray, 'value');
const btns = [
  {
    id: 1,
    title: '选择填空',
    value: chooseArray,
  },
  {
    id: 2,
    title: '评分题',
    value: starArray,
  },
  {
    id: 3,
    title: '文字说明',
    value: descArray,
  },
];
export default class Step2 extends React.Component {
  constructor(props: any) {
    super(props);
    const { data } = props;
    this.state = {
      questionsTitle: get(data, 'questionsTitle') || '',
      questionsDescription: get(data, 'questionsDescription') || '',
      questions: get(data, 'questions') || [],
      title: get(data, 'title') || '',
      description: get(data, 'description') || '',
      dragItemType: undefined,
      newQuestionIndex: undefined,
      activeQuestion: undefined,
      relationVisible: false,
      relationSelect: 0,
      relationBindOption: [],
    };
  }

  questionItemRefs = {};

  lastClientY = 0;

  index = 0;

  generateQuestionByType = (type) => {
    let question = undefined;
    switch (type) {
      case 'radio':
        question = {
          type,
          value: type,
          label: '单选题',
          title: '请输入题目标题',
          options: [
            {
              label: '选项一',
              value: 0,
            },
            {
              label: '选项二',
              value: 1,
            },
          ],
        };
        break;
      case 'multiple':
        question = {
          type,
          value: type,
          label: '多选题',
          title: '请输入题目标题',
          options: [
            {
              label: '选项一',
              value: 0,
            },
            {
              label: '选项二',
              value: 1,
            },
          ],
        };
        break;
      case 'dropdown':
        question = {
          type,
          label: '下拉题',
          value: type,
          title: '请输入题目标题',
          options: [
            {
              label: '选项一',
              value: 0,
            },
            {
              label: '选项二',
              value: 1,
            },
          ],
        };
        break;
      case 'completion':
        question = {
          value: type,
          type,
          label: '填空题',
          title: '请输入题目标题',
          options: [
            {
              rule: 'equal',
              score: 0,
              answer: '',
            },
          ],
        };
        break;
      case 'star':
        question = {
          value: type,
          type,
          label: '打分题',
          title: '请输入题目标题',
        };
        break;
      case 'description':
        question = {
          value: type,
          type,
          label: '段落说明',
          title: '请输入题目标题',
        };
        break;
    }
    return question;
  };

  handleBtnClick = (type) => () => {
    const { questions } = this.state;
    // const lastItemRef = get(this.questionItemRefs, last(keys(this.questionItemRefs)));
    // lastItemRef && lastItemRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const question = this.generateQuestionByType(type);

    this.setState({
      questions: [...questions, question],
    });
  };

  handleChangeIndex = (index) => {
    this.index = index;
  };

  handleDragEnd = () => {
    const { questions, dragItemType } = this.state;
    const newQuestions = cloneDeep(questions);
    newQuestions.splice(this.index, 0, this.generateQuestionByType(dragItemType));
    map(newQuestions, (question, questionIndex: number) => {
      if (!isUndefined(get(question, 'logic.bind')) && questionIndex > this.index) {
        if (get(question, 'logic.bind') > this.index - 1) {
          set(question, 'logic.bind', get(question, 'logic.bind') + 1);
        }
      }
    });
    this.setState({
      questions: newQuestions,
    });
  };

  handleQuestionClick = (activeQuestion: any) => {
    const { logic } = activeQuestion;

    this.setState({
      activeQuestion,
      relationSelect: Number(get(logic, 'bind')) + 1 || [],
      relationBindOption: get(logic, 'selectOption') || [],
    });
  };

  renderQuestions = () => {
    const { questions } = this.state;
    return map(questions, (question, index) => {
      const lastQuestion = last(questions);
      return (
        <QuestionItem
          key={index + 1}
          index={index + 1}
          question={question}
          lastQuestion={lastQuestion}
          onChangeIndex={this.handleChangeIndex}
          onQuestionClick={this.handleQuestionClick}
          onQuestionItemEdit={(index, text) => {
            const newQuestions = cloneDeep(questions);
            set(newQuestions, `${index - 1}.title`, text);
            this.setState({
              questions: newQuestions,
            });
          }}
          onQuestionItemOptionEdit={(index, optionIndex, value, type = 'label') => {
            const newQuestions = cloneDeep(questions);
            set(newQuestions, `${index - 1}.options.${optionIndex}.${type}`, value);
            this.setState({
              questions: newQuestions,
            });
          }}
          onQuestionItemDelete={(index) => {
            const newQuestions = cloneDeep(questions);
            const logicBindIds: any = [];
            map(questions, (question) => {
              !isUndefined(get(question, 'logic.bind')) && logicBindIds.push(get(question, 'logic.bind'));
            });
            if (indexOf(logicBindIds, index - 1) > -1) {
              message.error('该题有逻辑关联，无法删除');
              return;
            }
            newQuestions.splice(index - 1, 1);
            map(newQuestions, (question, questionIndex: number) => {
              if (!isUndefined(get(question, 'logic.bind')) && questionIndex > index - 1) {
                set(question, 'logic.bind', get(question, 'logic.bind') - 1);
              }
            });
            this.setState({
              questions: newQuestions,
            });
          }}
          onQuestionItemOptionsAdd={(index) => {
            const newQuestions = cloneDeep(questions);
            const options = get(newQuestions, `${index - 1}.options`) || [];
            set(newQuestions, 'options', options.push({ label: '新增选项' }));
            this.setState({
              questions: newQuestions,
            });
          }}
          onQuestionItemOptionsDelete={(index, optionIndex) => {
            const newQuestions = cloneDeep(questions);
            const options = get(newQuestions, `${index - 1}.options`);
            set(newQuestions, 'options', options.splice(optionIndex, 1));
            this.setState({
              questions: newQuestions,
            });
          }}
        />
      );
    });
  };

  renderBtns = () => {
    return (
      <div className="question-step-two__panel-question">
        <div className="question-step-two__panel-question-card">
          {map(btns, (btn, index) => {
            return (
              <div key={index} className="question-step-two__panel-question-card-item">
                <span className="question-step-two__panel-question-card-item__title">{get(btn, 'title')}</span>
                <div className="question-step-two__panel-question-card-item__btns">
                  {map(get(btn, 'value'), (item) => {
                    return (
                      <div
                        key={get(item, 'value')}
                        className="question-step-two__panel-question-card-item__btns-btn"
                        draggable
                        onDragStart={() => {
                          this.setState({ dragItemType: get(item, 'value') });
                        }}
                        onDragEnd={this.handleDragEnd}
                        onClick={this.handleBtnClick(get(item, 'value'))}
                      >
                        <img src={get(item, 'iconImg')} alt="" />
                        <div>{get(item, 'title')}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  renderLogicEdit = () => {
    const { activeQuestion } = this.state;
    return (
      !isUndefined(activeQuestion) && (
        <div className="question-step-two__panel-func">
          <div className="question-step-two__panel-func__title">题目{get(activeQuestion, 'index')}设置</div>
          {/* <div className="question-step-two__panel-func__item">
            <span>此题必答</span>
            <Switch></Switch>
          </div> */}
          <div className="question-step-two__panel-func__item">
            <span>题目关联</span>
            <Button
              size="small"
              onClick={() => {
                this.setState({
                  relationVisible: true,
                });
              }}
            >
              设置
            </Button>
          </div>
        </div>
      )
    );
  };

  handleSaveRelation = () => {
    const { relationBindOption, relationSelect, questions, activeQuestion } = this.state;
    if (relationSelect < 1) {
      this.setState({
        relationVisible: false,
      });
      return;
    }
    const logic = {
      bind: relationSelect - 1,
      selectOption: relationBindOption,
    };
    const newQuestions = cloneDeep(questions);
    set(newQuestions, `${Number(get(activeQuestion, 'index')) - 1}.logic`, logic);
    this.setState({
      questions: newQuestions,
      relationVisible: false,
    });
  };

  renderModal = () => {
    const { relationVisible, relationSelect, activeQuestion, questions, relationBindOption } = this.state;
    const questionBefore = questions.slice(0, Number(get(activeQuestion, 'index')) - 1);
    const selectOptions = filter(
      questionBefore,
      (question) => indexOf(['radio', 'dropdown', 'multiple'], get(question, 'type')) > -1,
    );
    selectOptions.unshift({ title: '请选择关联的题目' } as any);
    const boxOptions = get(selectOptions, `${relationSelect}.options`);
    return (
      <Modal
        title="题目关联设置"
        visible={relationVisible}
        onOk={this.handleSaveRelation}
        onCancel={() => {
          this.setState({
            relationVisible: false,
          });
        }}
        okText="确认"
        cancelText="取消"
      >
        <div>
          <span>当前题目：</span>
          <span>{get(activeQuestion, 'title')}</span>
        </div>
        <div>
          <span>关联题目：</span>
          <Select
            style={{ width: 300 }}
            dropdownMatchSelectWidth={300}
            value={relationSelect}
            onChange={(value) => {
              this.setState({
                relationSelect: value,
                relationBindOption: [],
              });
            }}
          >
            {map(selectOptions, (option, index) => {
              return (
                <Select.Option key={index} value={index}>
                  {index === 0 ? get(option, 'title') : `${index}.${get(option, 'title')}`}
                </Select.Option>
              );
            })}
          </Select>
        </div>
        {relationSelect > 0 && (
          <>
            <div>当“关联题目”选择下面的选项：</div>
            <Checkbox.Group
              value={relationBindOption}
              onChange={(data) => {
                this.setState({
                  relationBindOption: data,
                });
              }}
            >
              {map(boxOptions, (option, index) => {
                return (
                  <Fragment key={index}>
                    <Checkbox key={index} value={index}>
                      {get(option, 'label')}
                    </Checkbox>
                    <br />
                  </Fragment>
                );
              })}
            </Checkbox.Group>
            <div>中的任意一个时，“当前题目”才出现</div>
          </>
        )}
      </Modal>
    );
  };

  render() {
    const { relationVisible, questions, questionsTitle, questionsDescription, description, title } = this.state;
    const { onEditorUpload } = this.props;

    return (
      <>
        <Row className="question-step-two__panel">
          <Col span={4}>{this.renderBtns()}</Col>
          <Col span={12} offset={1} className="question-step-two__panel-preview">
            <div className="question-step-two__panel-preview-top">
              <Input
                className="question-step-two__panel-preview-top__title"
                value={questionsTitle}
                placeholder="请输入标题"
                onChange={(e) => {
                  this.setState({
                    questionsTitle: get(e, 'target.value'),
                  });
                }}
              />
              <Editor
                className="question-step-two__panel-preview-top__desc"
                style={{ height: 320, overflow: 'scroll' }}
                onChange={(data) => {
                  this.setState({
                    questionsDescription: data,
                  });
                }}
                value={questionsDescription}
                onUpload={onEditorUpload}
              />
            </div>
            <div className="question-step-two__panel-preview-middle">
              {isEmpty(questions) ? (
                <div className="question-step-two__panel-preview-middle__start">点击题型 或者 将题型拖入此区域</div>
              ) : (
                this.renderQuestions()
              )}
            </div>
            <div className="question-step-two__panel-preview-bottom">
              <Form.Item label="问卷标题" wrapperCol={{ span: 17 }}>
                <Input
                  size="small"
                  value={title}
                  onChange={(e) => {
                    this.setState({
                      title: get(e, 'target.value'),
                    });
                  }}
                />
              </Form.Item>
              <Form.Item label="问卷描述" wrapperCol={{ span: 17 }}>
                <Input
                  size="small"
                  value={description}
                  onChange={(e) => {
                    this.setState({
                      description: get(e, 'target.value'),
                    });
                  }}
                />
              </Form.Item>
              {/* <div className="question-step-two__panel-preview-bottom__title">
                <span>完成时显示</span>
              </div>
              <div>
                <Input.TextArea rows={5} defaultValue="感谢您的配合!" />
              </div> */}
              <div className="question-step-two__panel-preview-bottom__btns">
                <Button
                  className="question-step-two__panel-preview-bottom__btns-btn"
                  icon={<CustomIcon type="icon-reset" />}
                  onClick={() => {
                    const { onChangeStep } = this.props;
                    onChangeStep && onChangeStep(0);
                  }}
                >
                  上一步
                </Button>
                <Button
                  type="primary"
                  className="question-step-two__panel-preview-bottom__btns-btn"
                  icon={<CustomIcon type="icon-next" />}
                  onClick={() => {
                    const { onPreview, data } = this.props;
                    const { questions, questionsTitle, questionsDescription, title, description } = this.state;
                    onPreview &&
                      onPreview({
                        ...data,
                        questions,
                        questionsTitle,
                        questionsDescription,
                        title,
                        description,
                      });
                  }}
                >
                  下一步
                </Button>
              </div>
            </div>
          </Col>
          <Col span={6} offset={1}>
            {!isEmpty(questions) && this.renderLogicEdit()}
          </Col>
        </Row>
        {relationVisible && this.renderModal()}
      </>
    );
  }
}
