import React, { useState, useEffect } from 'react';
import Step1 from './create/step1';
import Step2 from './create/step2';
import Step3 from './create/step3';
import Step4 from './create/step4';
import { message, Steps } from 'antd';
import styles from './index.module.less';
import { IMchc_Questionnaire, SMchc_Questionnaire } from '@lm_fe/service';
interface IQuestionnaire {

  onEditorUpload?: any;
}
export default (props: IQuestionnaire) => {
  const { onEditorUpload } = props;
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState<IMchc_Questionnaire>();




  const [templateList, setTemplateList] = useState<IMchc_Questionnaire[]>([])
  function fetchTemplateList() {
    SMchc_Questionnaire.fk_list().then(setTemplateList)
  }


  async function onDeleteTemplate(data: IMchc_Questionnaire) {
    await SMchc_Questionnaire.del(data.id)
    message.success('删除问卷成功');
    fetchTemplateList()
  };





  useEffect(() => {
    current || fetchTemplateList()



  }, [current]);

  const handleChangeStep = (target: number) => {
    setCurrent(target);
  };

  const handlePreview = (data: IMchc_Questionnaire) => {
    setData(data);
    handleChangeStep(2);
  };

  const handleInitQuestions = async (data: IMchc_Questionnaire, isCopy = false, step = 1) => {
    let _data
    if (typeof data.id === 'number') {
      const remoteData = await SMchc_Questionnaire.fk_byId(data.id)

      const { id, ...dataExcludeId } = remoteData

      _data = isCopy ? dataExcludeId : remoteData
    } else {
      _data = data
    }
    setData(_data);
    handleChangeStep(step);
  };



  return (
    <div className={styles["questionnaire"]}>
      <Steps current={current} className={styles["questionnaire-steps"]}>
        <Steps.Step title="选择问卷" />
        <Steps.Step title="编辑问卷" />
        <Steps.Step title="预览问卷" />
        <Steps.Step title="统计问卷" />
      </Steps>
      <div className={styles["questionnaire-steps-content"]}>
        {current === 0 && (
          <Step1 handleInitQuestions={handleInitQuestions} templateList={templateList} onDeleteTemplate={onDeleteTemplate} />
        )}
        {current === 1 && data && (
          <Step2
            onChangeStep={handleChangeStep}
            onPreview={handlePreview}
            data={data}
            onEditorUpload={onEditorUpload}
          />
        )}
        {current === 2 && data && <Step3 onChangeStep={handleChangeStep} data={data} />}
        {current === 3 && data && <Step4 onChangeStep={handleChangeStep} data={data} />}
      </div>
    </div>
  );
};
