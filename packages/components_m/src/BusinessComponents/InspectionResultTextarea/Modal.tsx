import React, { useState, useEffect } from 'react';
import { Modal, Tree, Spin } from 'antd';
import { uniq } from 'lodash';
import { request, safe_json_parse } from '@lm_fe/utils';
import styles from './index.less';
export default function ReaultModal({ visible, title, defaultValue, onOk, onCancel, pregnancyId, admissionId }: any) {
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedNodes, setCheckedNodes] = useState([]);

  useEffect(() => {
    // setTreeData(transferTemplates(DATA));
    getUltrosoundDATA();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getUltrosoundDATA = async () => {
    const headerInfoOfInpatientData = safe_json_parse(sessionStorage.getItem('headerInfoOfInpatientData')!);
    const { inpatientNO, outpatientNO } = headerInfoOfInpatientData;
    console.log(headerInfoOfInpatientData, 'headerInfoOfInpatientData');
    let ultrosoundDATA = {} as any;
    if (inpatientNO) {
      ultrosoundDATA = await request.get<any>(`/api/getLabExamTemplateData?inpatientNo=${inpatientNO}`);
    } else {
      ultrosoundDATA = await request.get<any>(`/api/getLabExamTemplateData?outpatientNo=${outpatientNO}`);
    }
    //  const ultrosoundDATA=await  request.get(`/api/getImageExamImportTree?pregnancyId=${pregnancyId}`)
    // const ultrosoundDATA = await request.get(
    //   `/api/getLabExamImportTree?pregnancyId=${pregnancyId}&admissionId=${admissionId}`,
    // );
    setTreeData(ultrosoundDATA.data);
  };



  const onCheck = (checkedKeys: number[], { checkedNodes }) => {
    setCheckedNodes(checkedNodes);
  };

  const handleOk = () => {
    console.log(checkedNodes, 'checkedNodes');
    //const leafCheckedNodes = checkedNodes.filter((_) => _.isLeaf);
    let leafCheckedNodesValuesArr = [];
    for (let i = 0; i < checkedNodes.length; i++) {
      const element = checkedNodes[i];
      leafCheckedNodesValuesArr.push(element.title);
    }
    const defaultValueArr = defaultValue ? defaultValue.split('；') : [];
    // leafCheckedNodesValuesArr、defaultValueArr去重
    const value = uniq([...defaultValueArr, ...leafCheckedNodesValuesArr]);
    onOk(value.join('；'));
  };

  return (
    <Modal
      centered
      destroyOnClose
      visible={visible}
      title={title}
      width={750}
      onOk={handleOk}
      onCancel={onCancel}
      className={styles["result-textarea-modal"]}
    >
      {loading ? (
        <Spin tip="数据加载中...">
          <div style={{ height: 128 }} />
        </Spin>
      ) : treeData.length > 0 ? (
        <Tree checkable defaultExpandAll treeData={treeData} onCheck={onCheck} className={styles["result-textarea-modal-tree"]} />
      ) : (
        '暂无数据~'
      )}
    </Modal>
  );
}
