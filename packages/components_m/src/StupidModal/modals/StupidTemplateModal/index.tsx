import React, { useEffect, useState } from 'react';
import { Modal, Button, Tree, message, Popconfirm, Row, Col } from 'antd';
import { map, get, set, isEmpty, keyBy, indexOf, keys, compact, isNil, concat, size, filter } from 'lodash';
import { transferTemplates } from './methods';
import EditModal from './EditModal';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {
    createResources,
    deleteResourcesByID,
    getResources,
    getResourcesByID,
    updateResources,
} from '../../../utils/defaultMethod';
import styles from './index.module.less';

import { request, safe_json_parse } from '@lm_fe/utils';
import { IBaseProps } from '../../types';
import { SLocal_State } from '@lm_fe/service';

export const DEFAULT_URL = '/api/template-trees';

export const needUserIDTypes = [2];

export const MODAL_NAVS = {
    department: {
        key: 'department',
        label: '术前',
        type: 1001,
    },
    person: {
        key: 'person',
        label: '术后',
        type: 1002,
    },
    // examResult: {
    //     key: 'examReport',
    //     label: '检验结果导入',
    //     type: 3,
    // },
    // soundResult: {
    //     key: 'soundResult',
    //     label: '超声结果导入',
    //     type: 4,
    // },
    // diagnosisHistory: {
    //     key: 'diagnosisHistory',
    //     label: '历史诊断导入',
    //     type: 5,
    // },
};

interface IProps {
    patientId: number
    depid?: any
    admissionId?: number
    pregnancyId?: number
    onValueCheck?: (e: string[]) => void
}


export function TemplateModal(props: IBaseProps<IProps>) {
    const { modal_data, onCancel, onOk, ...others } = props
    const { depid = 1, patientId, admissionId, pregnancyId, onValueCheck } = modal_data;
    const userId = SLocal_State.getUserData()?.id
    const [result, setResult] = useState<any[]>([])
    const [labexams, setLabexams] = useState<any[]>([])
    const [allLabexams, setAllLabexams] = useState<any[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])
    const [selectedRows, setSelectedRows] = useState<any[]>([])
    const [diagnosisList, setDiagnosisList] = useState<any[]>([])
    const [editModalVisible, setEditModalVisible] = useState(false)
    const [templateType, setTemplateType] = useState(MODAL_NAVS.department.type)
    const [activeTemplate, setActiveTemplate] = useState({})
    const [splitTemplatesMapping, setSplitTemplatesMapping] = useState({})
    const canOperate = templateType === 1 || templateType === 2 || templateType > 1000

    useEffect(() => {
        getTemplateList();
        return () => {

        }
    }, [])

    function transferLabexamsList(result: any) {
        return map(result, (item) => {
            const temp = { ...item, children: [], val: get(item, 'title'), isLeaf: true };
            if (!isEmpty(get(item, 'items'))) {
                set(temp, 'children', transferLabexamsList(get(item, 'items')));
                set(temp, 'isLeaf', false);
            }
            return temp;
        });
    };

    function transferAllLabexamsList(labexams: any) {
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

    async function getTemplateList(_templateType = templateType) {

        if (_templateType === 3) {
            const headerInfoOfInpatientData = safe_json_parse(sessionStorage.getItem('headerInfoOfInpatientData')!);
            const { inpatientNO, outpatientNO } = headerInfoOfInpatientData;
            let result = {} as any;
            if (inpatientNO) {
                result = await request.get(`/api/getLabExamTemplateData?inpatientNo=${inpatientNO}`);
            } else {
                result = await request.get(`/api/getLabExamTemplateData?outpatientNo=${outpatientNO}`);
            }
            const labexams = result;
            const allLabexams = transferAllLabexamsList(labexams);
            setLabexams(labexams)
            setAllLabexams(allLabexams)
        } else if (_templateType === 4) {
            const headerInfoOfInpatientData = safe_json_parse(sessionStorage.getItem('headerInfoOfInpatientData')!);
            const { inpatientNO, outpatientNO } = headerInfoOfInpatientData;
            let result = {} as any;
            if (inpatientNO) {
                result = await request.get(`/api/getImageExamTemplateData?inpatientNo=${inpatientNO}`);
            } else {
                result = await request.get(`/api/getImageExamTemplateData?outpatientNo=${outpatientNO}`);
            }
            const labexams = result;
            const allLabexams = transferAllLabexamsList(labexams);
            setLabexams(labexams)
            setAllLabexams(allLabexams)

        } else if (_templateType === 5) {
            // const result = await getResources(`/api/findDiagnosisByDateVisitType/${patientId}`);
            const result = await getResources(`/api/findDiagnosisByDateVisitType/${admissionId}`);
            setDiagnosisList(result as any)
        } else {
            const result = await getResources(DEFAULT_URL, {
                'depid.equals': depid,
                'type.equals': _templateType,
                'userid.equals':
                    needUserIDTypes.indexOf(_templateType) > -1 && userId ? userId : null,
                size: 99999,
                page: 0,
            });
            const templates = transferTemplates(result);
            // 拆分为多个树
            const splitTemplates = compact(
                map(templates, (template) => {
                    if (get(template, 'pid') === 0) {
                        return {
                            ...template,
                            children: [],
                        };
                    }
                }),
            );
            const splitTemplatesMapping = keyBy(splitTemplates, 'id');
            map(result, (template) => {
                const templatePid = get(template, 'pid');
                if (indexOf(keys(splitTemplatesMapping), String(templatePid)) > -1) {
                    splitTemplatesMapping[templatePid]['children'].push(template);
                }
            });
            setSplitTemplatesMapping(splitTemplatesMapping)
            setResult(result as any)

        }
    };

    function handleAddTemplate(e: any) {
        e.stopPropagation();
        setEditModalVisible(true)
        setActiveTemplate({})

    };

    function handleHideEditModal() {
        setEditModalVisible(false)
        setActiveTemplate({})


    };

    function closeModal() {
        onCancel?.(null as any);
        setSplitTemplatesMapping({})
    };

    async function handleSubmitEditModal(data: any) {
        if (templateType === 2) {
            set(data, 'userid', userId);
        }
        if (!isEmpty(activeTemplate)) {
            await updateResources(DEFAULT_URL, {
                ...activeTemplate,
                ...data,
                depid,
            });
        } else {
            await createResources(DEFAULT_URL, { ...data, depid });
        }
        setEditModalVisible(false)
        setActiveTemplate({})

        message.success('提交模板成功');
        getTemplateList();
    };

    function handleEditTemplate(template: any) {
        return async (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            const activeTemplate = await getResourcesByID(DEFAULT_URL, get(template, 'id'));
            setEditModalVisible(false)
            setActiveTemplate(activeTemplate)

        };
    }

    function handleConfirmDelete(template: any) {
        return (e?: React.MouseEvent<HTMLElement>) => {
            e?.stopPropagation();
            deleteResourcesByID(DEFAULT_URL, get(template, 'id')).then(() => {
                message.success('删除模板成功');
                getTemplateList();
            });

        };
    }

    function handleSelectTemplates(checked: any, e: any) {

        setSelectedRowKeys(Array.from(new Set([...selectedRowKeys, ...checked])) as any)
        setSelectedRows(e.checkedNodes)

    };

    function handleOk() {

        let content = '';
        let addList = [];
        let treeData = result;
        if (templateType === 3 || templateType === 4) {
            treeData = allLabexams;
        }
        let treeDataMapping = keyBy(treeData, 'id');
        if (templateType === 3 || templateType === 4) {
            treeDataMapping = keyBy(treeData, 'key');
        }
        if (templateType === 3 || templateType === 4) {
            map(selectedRowKeys, (selectedKey) => {
                const item = get(treeDataMapping, selectedKey) as any;
                if (!isEmpty(item)) {
                    content += `${get(treeDataMapping, `${selectedKey}.title`)}；`;
                }
            });
        } else {
            map(selectedRowKeys, (selectedKey) => {
                const item = get(treeDataMapping, selectedKey);
                if (!isEmpty(item) && get(item, 'isLeaf')) {
                    content += `${get(treeDataMapping, `${selectedKey}.val`)}；`;
                }
            });
        }

        if (templateType === 5) {
            addList = filter(selectedRows, (item) => !item.type);
            if (size(addList) > 0) {
                map(addList, (item) => {
                    delete item.id;
                });
            }
            onValueCheck?.(addList);
            onOk?.(null as any)
            return;
        }
        onValueCheck?.([content]);
        onOk?.(null as any)

    };

    async function handleChangeTemplateType(nav: any) {
        setTemplateType(nav.type)
        getTemplateList(nav.type);
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
            size(treeData) > 0 && <Tree checkable defaultExpandAll onCheck={handleSelectTemplates} treeData={treeData} />
        );
    };

    function renderLabexams() {
        return labexams.length > 0 ? (
            <Tree checkable defaultExpandAll treeData={labexams} onCheck={handleSelectTemplates}></Tree>
        ) : (
            '暂无数据'
        );
    };

    function renderTreeNode(templatesTree: any) {
        return map(templatesTree, (template) => {
            if (!isEmpty(get(template, 'children')) && !isNil(get(template, 'children'))) {
                return (
                    <Tree.TreeNode
                        title={
                            <div className={styles["template-list-item"]}>
                                <div>&nbsp;{get(template, 'val')}&nbsp;</div>
                                {(canOperate) && (
                                    <div className={styles["template-list-item__actions"]}>
                                        <PlusCircleOutlined className={styles["template-list-item__actions-icon"]} onClick={handleAddTemplate} />
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
                        key={get(template, 'id')}
                    >
                        {renderTreeNode(get(template, 'children'))}
                    </Tree.TreeNode>
                );
            }
            return (
                <Tree.TreeNode
                    title={
                        <div className={styles["template-list-item"]}>
                            <div>{get(template, 'val')}</div>
                            {(canOperate) && (
                                <div className={styles["template-list-item__actions"]}>
                                    <PlusCircleOutlined className={styles["template-list-item__actions-icon"]} onClick={handleAddTemplate} />
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
                    key={get(template, 'id')}
                />
            );
        });
    };

    function renderModal() {
        return (
            <div>
                <div className={styles["textarea-with-template__modal-nav"]}>
                    <div>
                        {map(MODAL_NAVS, (nav, key) => {
                            return (
                                <Button
                                    className={styles["textarea-with-template__modal-nav__items"]}
                                    type={templateType === nav.type ? 'primary' : 'default'}
                                    key={key}
                                    onClick={() => handleChangeTemplateType(nav)}
                                >
                                    {nav.label}
                                </Button>
                            );
                        })}
                    </div>
                    {(canOperate) && <Button onClick={handleAddTemplate}>添加模板</Button>}
                </div>
                <Row className={styles["textarea-with-template__modal-body"]}>
                    {(canOperate) && (
                        <>
                            {map(splitTemplatesMapping, (templateTree) => {
                                return (
                                    <Col span={12}>
                                        <Tree checkable defaultExpandAll onCheck={handleSelectTemplates}>
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
                        templateType={templateType}
                        userid={userId}
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
            onCancel={closeModal}
            onOk={handleOk}
        >
            {renderModal()}
        </Modal>
    );
}

export default TemplateModal;
