import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { IMchc_TemplateTree_Item as IModel_TemplateTrees, SLocal_State, SMchc_TemplateTrees as SModel_TemplateTrees } from '@lm_fe/service';
import { Button, Col, Form, message, Modal, Popconfirm, Row, Tree, TreeProps } from 'antd';
import { compact, get, indexOf, isEmpty, isNil, keyBy, keys, map } from 'lodash';
import React from 'react';
import SimpleForm from '../../../FU_components/SimpleForm';
import { AllTypes } from '../../../FU_components/SimpleForm/types/metaTypes';
import {
    createResources,
    deleteResourcesByID,
    getResourcesByID,
    updateResources
} from '../../../utils/defaultMethod';
import { IBaseProps } from '../../types';
import TemplateSelect from './components/TemplateSelect';
import './index.less';
import { transferTemplates } from './methods';
export const DEFAULT_URL = '/api/template-trees';
interface IProps<T> {
    depid?: any
    type?: number
    canOperate?: boolean
    onValueCheck?: (e: IModel_TemplateTrees[]) => void
    renderTitle?: (item: IModel_TemplateTrees) => React.ReactNode
    treeProps?: TreeProps
    multiple?: boolean
    hierarchical?: boolean
    editFormItems?: AllTypes<T>[]
}
export function TemplateModal2(props: IBaseProps<IProps<IModel_TemplateTrees>>) {
    const { modal_data, onCancel, onOk, ...others } = props
    const {
        hierarchical,
        onValueCheck,
        depid = 1,
        canOperate = true,
        treeProps = {},
        type = 1001,
        renderTitle = (item) => <div>{item.val}</div>,
        multiple = true,
        editFormItems = [
            { type: 'Input', outerOptions: { name: 'val', label: '标题' }, id: '0' },
            { type: 'Input', outerOptions: { name: 'mnemonic', label: '描述' }, id: '0' },
        ],
    } = modal_data;

    const userId = SLocal_State.getUserData()?.id
    const [result, setResult] = useState<IModel_TemplateTrees[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
    const [selectedRows, setSelectedRows] = useState<any[]>([])
    const [editModalVisible, setEditModalVisible] = useState(false)
    const [activeTemplate, setActiveTemplate] = useState<IModel_TemplateTrees | undefined>()
    const [splitTemplatesMapping, setSplitTemplatesMapping] = useState<{ [x: string]: IModel_TemplateTrees }>({})

    useEffect(() => {
        getTemplateList();


        return () => {

        }
    }, [])


    async function getTemplateList() {

        const result = await SModel_TemplateTrees.getList({
            params: {
                depid,
                type,
                userid: userId,
                size: 99999,
                page: 0,
            }
        })
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
        setResult(result)
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

    async function handleSubmitEditModal(data: IModel_TemplateTrees) {
        data.type = type
        data.userid = userId
        if (activeTemplate) {
            await updateResources(DEFAULT_URL, {
                ...activeTemplate,
                ...data,
                depid,
            });
        } else {
            await createResources(DEFAULT_URL, { ...data, depid });
        }
        setEditModalVisible(false)
        setActiveTemplate(undefined)

        message.success('提交模板成功');
        getTemplateList();
    };

    function handleEditTemplate(template: any) {
        return async (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            const activeTemplate = await getResourcesByID(DEFAULT_URL, get(template, 'id'));
            setEditModalVisible(true)
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

    function handleSelectTemplates(checked: any[], e: any) {
        console.log('check', checked, e)
        const arr = multiple ? Array.from(new Set([...selectedRowKeys, ...checked])) : checked
        setSelectedRowKeys(arr)
        setSelectedRows(e.checkedNodes)

    };

    function handleOk() {

        let content: IModel_TemplateTrees[] = [];

        let treeDataMapping = keyBy(result, 'id');

        map(selectedRowKeys, (selectedKey) => {
            const item = get(treeDataMapping, selectedKey);
            if (!isEmpty(item) && get(item, 'isLeaf')) {
                content.push(item);
            }
        });


        onValueCheck?.(content);
        onOk?.(null as any)

    };






    function renderTreeNode(templatesTree: IModel_TemplateTrees[]) {
        return map(templatesTree, (template) => {
            const titleWithOperation = <div className="template-list-item">
                {renderTitle(template)}
                {(canOperate) && (
                    <div className="template-list-item__actions">
                        <PlusCircleOutlined className="template-list-item__actions-icon" onClick={handleAddTemplate} />
                        <EditOutlined
                            className="template-list-item__actions-icon"
                            onClick={handleEditTemplate(template)}
                        />
                        <Popconfirm title="确定要删除吗？" onConfirm={handleConfirmDelete(template)}>
                            <DeleteOutlined className="template-list-item__actions-icon" />
                        </Popconfirm>
                    </div>
                )}
            </div>
            if (!isEmpty(get(template, 'children')) && !isNil(get(template, 'children'))) {
                return (
                    <Tree.TreeNode
                        title={titleWithOperation}
                        key={get(template, 'id')}
                    >
                        {renderTreeNode(get(template, 'children'))}
                    </Tree.TreeNode>
                );
            }
            return (
                <Tree.TreeNode
                    title={titleWithOperation}
                    key={get(template, 'id')}
                />
            );
        });
    };



    const [modalForm] = Form.useForm();

    useEffect(() => {
        activeTemplate && modalForm.setFieldsValue({
            ...activeTemplate,
            pid: activeTemplate.pid || 0,
            type,
        });
    }, [activeTemplate]);

    const handleSubmit = async () => {
        await modalForm.validateFields();
        const formData = modalForm.getFieldsValue();
        handleSubmitEditModal(formData);
    };


    return (
        <Modal
            className="textarea-with-template__modal"
            width={1100}
            onCancel={closeModal}
            onOk={handleOk}
            {...others}

        >
            <div>
                <div className="textarea-with-template__modal-nav">

                    {canOperate && <Button onClick={handleAddTemplate}>添加</Button>}
                </div>
                <Row className="textarea-with-template__modal-body">
                    {map(splitTemplatesMapping, (templateTree) => {
                        return (
                            <Col span={12}>
                                <Tree checkable defaultExpandAll selectable={false} checkedKeys={selectedRowKeys} onCheck={handleSelectTemplates} {...treeProps} multiple={false}>
                                    {renderTreeNode([templateTree])}
                                </Tree>
                            </Col>
                        );
                    })}
                </Row>
                <Modal
                    visible={editModalVisible}
                    className="textarea-with-template__modal-edit"
                    onCancel={handleHideEditModal}
                    onOk={handleSubmit}
                    closable={false}
                    width={680}
                >
                    {
                        editModalVisible && <SimpleForm formProps={{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }} form={modalForm} formItems={[
                            hierarchical && { outerOptions: { name: 'pid', label: '上级' }, customNode: <TemplateSelect templateType={type} depid={depid} />, id: '' },
                            ...editFormItems,

                        ]} />
                    }

                </Modal>

            </div>

        </Modal>
    );
}

