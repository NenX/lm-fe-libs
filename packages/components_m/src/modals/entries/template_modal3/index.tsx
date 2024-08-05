import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { IGlobalModalProps } from '@lm_fe/components';
import { IMchc_TemplateTree_Item, SLocal_State } from '@lm_fe/service';
import { request, safe_json_parse } from '@lm_fe/utils';
import { Button, Col, Modal, Popconfirm, Row, Tree, message } from 'antd';
import { compact, concat, get, indexOf, isEmpty, isNil, keyBy, keys, map, set, size } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  getResources
} from '../../../utils/defaultMethod';
import EditModal from './EditModal';
import { baseType, } from './common';
import styles from './index.module.less';
import { transferTemplates } from './methods';
import { ITemplateType, MyDataNode } from './types';
import { mchcEnv, mchcLogger, MODAL_TEMPLATE_TYPES } from '@lm_fe/env';
interface IProps {
  depid?: number;
  onOk?(data: any): void
  visible?: boolean
  admissionId?: any
  templateTypes?: ITemplateType[]
  canOperate?: boolean
  simpleTypes?: typeof MODAL_TEMPLATE_TYPES['科室个人']
  onValueCheck?: (e: { result: Partial<IMchc_TemplateTree_Item>[], [x: string]: any }) => void

}
export default function TemplateModal(props: IGlobalModalProps<IProps>) {

  const { modal_data, width, close, onClose, ...others } = props
  const { depid = 1, admissionId, onValueCheck, templateTypes = [], onOk, } = modal_data;

  const simpleTypes = Array.isArray(modal_data.simpleTypes) ? modal_data.simpleTypes : MODAL_TEMPLATE_TYPES['科室个人']

  const user = SLocal_State.getUserData()
  const [result, set_result] = useState<Partial<MyDataNode>[]>([])
  const [labexams, set_labexams] = useState([])
  const [allLabexams, set_allLabexams] = useState([])
  const [selectedRowKeys, set_selectedRowKeys] = useState<string[]>([])
  const [selectedRows, set_selectedRows] = useState<any[]>([])
  const [activeTemplate, set_activeTemplate] = useState<MyDataNode>({})
  const [splitTemplatesMapping, set_splitTemplatesMapping] = useState<{ [x: string]: IMchc_TemplateTree_Item }>({})
  const [diagnosisList, set_diagnosisList] = useState([])
  const [editModalVisible, set_editModalVisible] = useState(false)
  const [templateType, set_templateType] = useState(simpleTypes[0]?.type)

  const safeTypes = [...simpleTypes.map(_ => ({ ..._, ...baseType })), ...templateTypes]
  const canOperate = mchcEnv.is('广三') ? user.groups?.some?.(_ => ['ADMIN', 'MASTERNURSE'].includes(_.name.toUpperCase())) : (modal_data.canOperate ?? true)
  const isExpandAll = false
  useEffect(() => {

    getTemplateList();

    return () => {

    }
  }, [])


  function transferLabexamsList(data: any) {
    return map(data, (item) => {
      const temp = { ...item, children: [], val: get(item, 'title'), isLeaf: true };
      if (!isEmpty(get(item, 'items'))) {
        set(temp, 'children', transferLabexamsList(get(item, 'items')));
        set(temp, 'isLeaf', false);
      }
      return temp;
    });
  };

  function transferAllLabexamsList(labexams) {
    let allLabexams: any = [];
    map(labexams, (labexam) => {
      let tempLabexams = [];
      if (!isEmpty(get(labexam, 'children'))) {
        tempLabexams = transferAllLabexamsList(get(labexam, 'children'));
        allLabexams = concat(allLabexams, tempLabexams);
      } else {
        allLabexams.push(labexam);
      }
    });
    return allLabexams;
  };

  async function getTemplateList(type = templateType) {
    const t = safeTypes.find(_ => _.type === type)

    if (!t) return

    if (type === 3) {
      const headerInfoOfInpatientData = safe_json_parse(sessionStorage.getItem('headerInfoOfInpatientData')!);
      const { inpatientNO, outpatientNO } = headerInfoOfInpatientData;
      let _result = {} as any;
      if (inpatientNO) {
        _result = await request.get(`/api/getLabExamTemplateData?inpatientNo=${inpatientNO}`);
      } else {
        _result = await request.get(`/api/getLabExamTemplateData?outpatientNo=${outpatientNO}`);
      }
      const labexams = _result;
      const allLabexams = transferAllLabexamsList(labexams);
      set_labexams(labexams)
      set_allLabexams(allLabexams)

    } else if (type === 4) {
      const headerInfoOfInpatientData = safe_json_parse(sessionStorage.getItem('headerInfoOfInpatientData')!);
      const { inpatientNO, outpatientNO } = headerInfoOfInpatientData;
      let _result = {} as any;
      if (inpatientNO) {
        _result = await request.get(`/api/getImageExamTemplateData?inpatientNo=${inpatientNO}`);
      } else {
        _result = await request.get(`/api/getImageExamTemplateData?outpatientNo=${outpatientNO}`);
      }
      const labexams = _result;
      const allLabexams = transferAllLabexamsList(labexams);

      set_labexams(labexams)
      set_allLabexams(allLabexams)

    } else if (type === 5) {
      const _result = await getResources(`/api/findDiagnosisByDateVisitType/${admissionId}`);
      set_diagnosisList(_result)
    } else {
      const { getList } = t
      const _result = (await getList?.({ item: { depid, type }, user })) ?? [];
      const { tree, all } = transferTemplates(_result);

      // 拆分为多个树
      const splitTemplates = compact(
        map(tree, (t) => {
          if (get(t, 'pid') === 0) {
            return {
              ...t,
              children: [],
            };
          }
        }),
      );
      const splitTemplatesMapping = keyBy(splitTemplates, 'id');
      map(_result, (t) => {
        const templatePid = get(t, 'pid');
        if (indexOf(keys(splitTemplatesMapping), String(templatePid)) > -1) {
          splitTemplatesMapping[templatePid]['children'].push(t);
        }
      });
      const newData = keyBy(tree, 'id');
      set_splitTemplatesMapping(newData)
      set_result(all)

    }
  };

  function handleAddTemplate(e) {
    e.stopPropagation();
    set_editModalVisible(true)
    set_activeTemplate({})

  };

  function handleHideEditModal() {
    set_editModalVisible(false)
    set_activeTemplate({})

  };



  async function handleSubmitEditModal(data) {
    const t = safeTypes.find(_ => _.type === templateType)

    if (!t) return


    if (!isEmpty(activeTemplate)) {
      await t.putItem?.({
        user,
        item: {
          ...activeTemplate,
          ...data,
          depid
        },
      });
    } else {
      await t.postItem?.({
        user,
        item: {
          ...data,
          depid
        },
      });
    }
    set_editModalVisible(false)
    set_activeTemplate({})

    message.success('提交模板成功');
    getTemplateList();
  };

  const handleEditTemplate = (template: IMchc_TemplateTree_Item) => async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    set_editModalVisible(true)
    set_activeTemplate(template)
  };

  const handleConfirmDelete = (template: IMchc_TemplateTree_Item) => async (e: React.MouseEvent<HTMLElement>) => {
    const t = safeTypes.find(_ => _.type === templateType)


    if (!t) return
    e.stopPropagation();
    await t.delItem?.({ item: template });
    message.success('删除模板成功');
    getTemplateList();
  };

  function handleSelectTemplates(checked: string[], e: { checked: boolean, checkedNodes: { key: string, title: any }[], node: { key: string } }) {

    if (e.checked) {
      set_selectedRowKeys(Array.from(new Set([...selectedRowKeys, ...checked])))
    } else {
      const parentKey = e.node.key
      const leftKey = selectedRowKeys.filter(_ => !_.includes(parentKey))
      set_selectedRowKeys(leftKey)

    }
    console.log('aax', e.checked, e.checkedNodes, e)
    set_selectedRows(e.checkedNodes)

  };

  function handleOk() {
    const rowKey = selectedRowKeys.map(_ => _.split('_').pop())
    let content = '';
    let treeData = result;

    let treeDataMapping = keyBy(treeData, 'id');

    map(rowKey, (id) => {

      const item = get(treeDataMapping, id);
      if (!isEmpty(item) && get(item, 'isLeaf')) {
        content += `${get(item, `val`)}；`;
      }
    });

    const data = { result: result.filter(_ => _.isLeaf && !_.children?.length && rowKey.includes(_.id?.toString()!)), raw: result, selectedRowKeys: rowKey, treeDataMapping }
    onValueCheck?.(data);
    close?.(true)
  };

  const handleChangeTemplateType = (type: number) => async () => {
    getTemplateList(type);
    set_templateType(type)

  };

  function transferTemplateData(data: any) {
    const treeData: any = [];
    map(data, (item: any, index) => {
      if (item.date) {
        item.title = `${item.date} ${item.type}`;
        item.key = index;
        let diags = [];
        if (size(item.pds) > 0) {
          diags = item.pds;
        } else {
          diags = item.ods;
        }
        item.children = transferTemplateData(diags);
      } else {
        item.title = item.diagnosis;
        item.key = String(item.id);
      }
      if (isEmpty(item.children)) {
        item.isLeaf = true;
      } else {
        item.isLeaf = false;
      }
      treeData.push(item);
    });
    return treeData;
  };

  function renderDiagnosisHistory() {
    const treeData = transferTemplateData(diagnosisList);
    return (
      size(treeData) > 0 && <Tree checkable defaultExpandAll={isExpandAll} onCheck={handleSelectTemplates} treeData={treeData} />
    );
  };

  function renderLabexams() {
    return labexams.length > 0 ? (
      <Tree checkable defaultExpandAll={isExpandAll} treeData={labexams} onCheck={handleSelectTemplates}></Tree>
    ) : (
      '暂无数据'
    );
  };

  function renderTreeNode(templatesTree: IMchc_TemplateTree_Item[] = [], _key = '') {
    return map(templatesTree, (template) => {
      const key = _key ? `${_key}_${template.id}` : `${template.id}`
      return (
        <Tree.TreeNode
          title={
            <div className={styles["template-list-item"]}>
              <div>&nbsp;{get(template, 'val')}&nbsp;</div>
              {canOperate && (
                <div className={styles["template-list-item__actions"]}>
                  {/* <PlusCircleOutlined className={styles["template-list-item__actions-icon"]} onClick={handleAddTemplate} /> */}
                  <EditOutlined
                    className={styles["template-list-item__actions-icon"]}
                    onClick={handleEditTemplate(template)}
                  />
                  <Popconfirm title="确定要删除这个模板吗？" onConfirm={handleConfirmDelete(template)}>
                    <DeleteOutlined className={styles["template-list-item__actions-icon"]} />
                  </Popconfirm>
                </div>
              )}
            </div>
          }
          key={key}
        >
          {renderTreeNode(get(template, 'children'), key)}
        </Tree.TreeNode>
      );

    });
  };

  function renderModal() {

    return (
      <div>
        <div className={styles["textarea-with-template__modal-nav"]}>
          <div>
            {
              safeTypes.map(({ type, title }) => {
                return <Button
                  className={styles["textarea-with-template__modal-nav__items"]}
                  type={templateType === type ? 'primary' : 'default'}
                  key={type}
                  onClick={handleChangeTemplateType(type)}
                >
                  {title}
                </Button>
              })
            }

          </div>
          {<Button disabled={!canOperate} onClick={handleAddTemplate}>添加模板</Button>}
        </div>
        <Row className={styles["textarea-with-template__modal-body"]}>
          {(
            <>
              {map(splitTemplatesMapping, (templateTree, id) => {
                return (
                  <Col span={12}>
                    <Tree checkable defaultExpandAll={isExpandAll} onCheck={handleSelectTemplates}>
                      {renderTreeNode([templateTree])}
                    </Tree>
                  </Col>
                );
              })}
            </>
          )}
          {(templateType === 3 || templateType === 4) && renderLabexams()}
          {templateType === 5 && renderDiagnosisHistory()}
        </Row>
        {editModalVisible && (
          <EditModal
            templateTypes={safeTypes}
            getContainer={props.getContainer}
            templateType={templateType}
            visible={editModalVisible}
            data={activeTemplate}
            depid={depid}
            onCancel={handleHideEditModal}
            onSubmit={handleSubmitEditModal}
          />
        )}
      </div>
    );
  };

  return (
    <Modal
      {...others}

      className={styles["textarea-with-template__modal"]}
      title="模板导入"
      width={1100}
      onOk={handleOk}
    >
      {renderModal()}
    </Modal>
  );
}

