import React, { useState, useEffect, Fragment } from 'react';
import { Button, Radio, Form, Input, Rate, Select, Checkbox } from 'antd';
import { get, map, indexOf, isArray, keys } from 'lodash';
import { DesktopOutlined, MobileOutlined, TabletOutlined } from '@/components/GeneralComponents/CustomIcon';
import { CustomIcon } from '@/components/GeneralComponents/CustomIcon';
import './step3.less';
export default (props: any) => {
  const [device, setDevice] = useState('mobile');
  const [globalLogic, setGlobalLogic] = useState([]);
  const { data, onChangeStep, onSubmit } = props;
  const { questions, questionsTitle, questionsDescription } = data;
  const [form] = Form.useForm();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    refresh && setTimeout(() => setRefresh(false));
  }, [refresh]);

  useEffect(() => {
    const newGlobalLogic: any = [...globalLogic];
    map(questions, (question, index) => {
      const { logic } = question;
      if (logic) {
        newGlobalLogic.push({ bindIndex: get(logic, 'bind'), index });
      }
    });
    setGlobalLogic(newGlobalLogic);
  }, []);

  const handleChange = (e) => {
    setDevice(get(e, 'target.value'));
  };

  const handleValuesChange = (values, allValues) => {
    const changedKey = get(keys(values), 0);
    map(globalLogic, ({ bindIndex, index }) => {
      if (changedKey == bindIndex) {
        form.setFieldsValue({
          [index]: undefined,
        });
      }
    });
    setRefresh(true);
  };

  const renderFormItem = (question: any, index: any) => {
    const { options, type, title, logic } = question;
    let itemStyle = {};
    let Component: any = <Fragment />;
    const bindIndex = get(logic, 'bind');
    const bindIndexSelectOption = get(logic, 'selectOption');
    const formItemValue = form.getFieldValue(bindIndex);
    if (logic) {
      itemStyle = {
        display: 'none',
      };
      if (isArray(formItemValue)) {
        map(formItemValue, (itemOption) => {
          if (indexOf(bindIndexSelectOption, itemOption) > -1) {
            itemStyle = {};
          }
        });
      } else {
        if (indexOf(bindIndexSelectOption, formItemValue) > -1) {
          itemStyle = {};
        }
      }
    }
    switch (type) {
      case 'radio':
        Component = (
          <Radio.Group>
            {map(options, (option, key) => {
              return (
                <Radio style={{ display: 'block' }} key={key} value={key}>
                  {get(option, 'label')}
                </Radio>
              );
            })}
          </Radio.Group>
        );
        break;
      case 'multiple':
        Component = (
          <Checkbox.Group>
            {map(options, (option, key) => {
              return (
                <Checkbox style={{ display: 'block', margin: 0 }} key={key} value={key}>
                  {get(option, 'label')}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
        break;
      case 'dropdown':
        Component = (
          <Select>
            {map(options, (option, key) => {
              return (
                <Select.Option key={key} value={key}>
                  {get(option, 'label')}
                </Select.Option>
              );
            })}
          </Select>
        );
        break;
      case 'star':
        Component = <Rate />;
        break;
      case 'description':
        break;
      default:
        Component = <Input />;
        break;
    }
    return (
      <Form.Item style={itemStyle} name={index} label={`${index + 1}.${title}`}>
        {Component}
      </Form.Item>
    );
  };

  const renderMobileShow = () => {
    return (
      <Form autoComplete="off" form={form} layout="vertical" onValuesChange={handleValuesChange}>
        <div className="questions-title">{questionsTitle}</div>
        <div className="questions-desc" dangerouslySetInnerHTML={{ __html: questionsDescription }}></div>
        {map(questions, (question, index) => {
          return <Fragment key={index}>{renderFormItem(question, index)}</Fragment>;
        })}
      </Form>
    );
  };

  const renderComputeShow = () => {
    return (
      <Form autoComplete="off" form={form} layout="vertical" onValuesChange={handleValuesChange}>
        <div className="questions-title">{questionsTitle}</div>
        <div className="questions-desc" dangerouslySetInnerHTML={{ __html: questionsDescription }}></div>
        {map(questions, (question, index) => {
          return <Fragment key={index}>{renderFormItem(question, index)}</Fragment>;
        })}
      </Form>
    );
  };

  return (
    <div className="question-step-three__panel">
      <div className="question-step-three__panel-radio">
        <Radio.Group onChange={handleChange} value={device}>
          <Radio.Button value="mobile">
            <MobileOutlined style={{ marginRight: 5 }} />
            手机
          </Radio.Button>
          <Radio.Button value="compute">
            <DesktopOutlined style={{ marginRight: 5 }} />
            电脑
          </Radio.Button>
          <Radio.Button value="tablet">
            <TabletOutlined style={{ marginRight: 5 }} rotate={270} />
            床头屏
          </Radio.Button>
        </Radio.Group>
      </div>
      {device === 'mobile' && (
        <div className="question-step-three__panel-mobile">
          <div className="question-step-three__panel-mobile-preview">
            <div className="question-step-three__panel-mobile-preview_content">{renderMobileShow()}</div>
          </div>
        </div>
      )}
      {device === 'tablet' && <div className="question-step-three__panel-tablet">{renderComputeShow()}</div>}
      {device === 'compute' && <div className="question-step-three__panel-compute">{renderComputeShow()}</div>}
      <div className="question-step-three__panel-bottom">
        <Button
          style={{ marginRight: 8 }}
          icon={<CustomIcon type="icon-reset" />}
          onClick={() => {
            onChangeStep && onChangeStep(1);
          }}
        >
          上一步
        </Button>
        <Button
          type="primary"
          icon={<CustomIcon type="icon-task" />}
          style={{ marginRight: 8 }}
          onClick={() => {
            onSubmit && onSubmit();
          }}
        >
          提交
        </Button>
      </div>
    </div>
  );
};
