import React, { useState, useEffect } from 'react';
import Step1 from './create/step1';
import Step2 from './create/step2';
import Step3 from './create/step3';
import { Steps } from 'antd';
import './index.less';
import { IModel_WorkQuestions } from '@/stupid_model/models/workQuestions';
interface IQuestionnaire {
  templateList: IModel_WorkQuestions[];
  onDeleteTemplate: (item: IModel_WorkQuestions) => void;
  onSubmitTemplate: (type: 'create' | 'update', item: IModel_WorkQuestions) => void;
  onEditorUpload?: any;
}
export default (props: IQuestionnaire) => {
  const { templateList, onSubmitTemplate, onDeleteTemplate, onEditorUpload } = props;
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState<IModel_WorkQuestions>();
  const [type, setType] = useState<'create' | 'update'>('create');

  useEffect(() => {
    setCurrent(0);
  }, [templateList]);

  const handleChangeStep = (target: number) => {
    setCurrent(target);
  };

  const handlePreview = (data: IModel_WorkQuestions) => {
    setData(data);
    handleChangeStep(2);
  };

  const handleInitQuestions = (type: 'create' | 'update', data: IModel_WorkQuestions) => {
    setData(data);
    setType(type);
    handleChangeStep(1);
  };

  const handleSubmit = () => {
    data && onSubmitTemplate(type, data);
  };

  return (
    <div className="questionnaire">
      <Steps current={current} className="questionnaire-steps">
        <Steps.Step title="选择问卷" />
        <Steps.Step title="编辑问卷" />
        <Steps.Step title="预览问卷" />
      </Steps>
      <div className="questionnaire-steps-content">
        {current === 0 && (
          <Step1 initQuestions={handleInitQuestions} templateList={templateList} onDeleteTemplate={onDeleteTemplate} />
        )}
        {current === 1 && (
          <Step2
            onChangeStep={handleChangeStep}
            onPreview={handlePreview}
            type={type}
            data={data}
            onEditorUpload={onEditorUpload}
          />
        )}
        {current === 2 && <Step3 onChangeStep={handleChangeStep} data={data} onSubmit={handleSubmit} />}
      </div>
    </div>
  );
};
