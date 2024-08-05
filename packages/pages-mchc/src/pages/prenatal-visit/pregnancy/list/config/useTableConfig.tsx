import { APP_CONFIG, IdNOButton, MyBaseListProps, OkButton, mchcModal } from "@lm_fe/components_m";
import { downloadFile, formatDate, request } from "@lm_fe/utils";
import { Button, Divider, Form, Popconfirm, Space, Tooltip } from "antd";
import { get } from "lodash";
import React, { useEffect } from "react";
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { tableColumns } from "./table";
import { queryFormDescriptions } from "./form";
import { mchcDriver, mchcEvent } from "@lm_fe/env";
import { IMchc_Pregnancy } from "@lm_fe/service";
import PrenatalModal from "../components/prenatal-modal/prenatal-modal";
import { useKeepAliveEffect } from "react-keep-alive-pro";
import { useMyEffect } from '@lm_fe/components'
export const baseTableConfig: MyBaseListProps = {
    baseTitle: '孕册',
    name: '/pregnancies',
    tableColumns,
    searchConfig: queryFormDescriptions(),
    keepAlive: true
}
export function useTableConfig(props: any) {
    const { history } = props;
    const [form] = Form.useForm()
    useEffect(() => {
        return mchcEvent.on_rm('my_form', e => {
            if (e.type === 'onSearch' && e.name === "outpatientNO") {
                const pregnancy: IMchc_Pregnancy = e.value?.data
                if (!pregnancy) return
                const isUn = pregnancy.recordstate === '0'
                isUn ? handleCheck(pregnancy) : handleEdit(pregnancy)
            }
        })
    }, [])
    useEffect(() => {



    }, [])

    useMyEffect(() => {
        return mchcDriver.on_rm('data', e => {

            if (e.type === 'ReadCard') {
                let res = e.data
                form.setFieldsValue({ idNO: res.idNO, name: res.name })
                form.submit()
            }

        })
    }, [])
    function handleCheck(rowData: any) {
        const { id } = rowData;
        // @ts-ignore
        history.push(`/prenatal-visit/pregnancy/check?id=${id}`);
    }
    function handleView(rowData: any) {
        const { id } = rowData;
        // @ts-ignore
        history.push(`/prenatal-visit/pregnancy/doctor-end?id=${id}`);
    };
    function handleEdit(rowData: any) {
        const { id } = rowData;
        // @ts-ignore
        history.push(`/prenatal-visit/pregnancy/nurse-end?id=${id}`);
    };
    function handlePrenatal(rowData: any) {
        mchcModal.open('test', {
            modal_data: {
                content: <PrenatalModal
                    selectedRowData={rowData}
                    {...props}
                    onClose={() => mchcModal.pop()}
                    id={get(rowData, `id`)}
                />
            }
        })
    }
    async function handleExport(params) {
        const res = (
            await request.get('/api/export/pregnancies', {
                responseType: 'blob',
                params,
            })
        ).data
        downloadFile(res.data, '导出数据.xls', 'application/vnd.ms-excel');

    };

    function handleDoubleClickRow(record: any) {
        // console.log(record);
        const { id, recordstate } = record;
        // @ts-ignore
        if (recordstate === '1' || recordstate === '6') {
            history.push(`/prenatal-visit/pregnancy/nurse-end?id=${id}`);
        }
        if (recordstate === '0') {
            history.push(`/prenatal-visit/pregnancy/check?id=${id}`);
        }
    };

    function onAdd() {
        // @ts-ignore
        history.push('/prenatal-visit/pregnancy/add');
    };
    const config: MyBaseListProps = {
        ...baseTableConfig,
        searchForm: form,
        handleDoubleClickRow,
        RenderSearchBtns({ handleSearch, getSearchParams }) {
            return <>
                {/* <OkButton text='导出' primary onClick={() => handleExport(getSearchParams())} /> */}
                {/* <OkButton disabled text='读取身份证' /> */}

            </>
        },
        RenderBtns: (({ }) => {
            return <IdNOButton />
        }),
        onExport({ getSearchParams }) {
            handleExport(getSearchParams())
        },
        onAdd,
        genColumns({ handleDelete, tableColumns }) {

            return [
                ...tableColumns,
                {
                    title: '档案状态',
                    dataIndex: 'recordstate',
                    width: 76,
                    sortType: 'number',
                    // fixed: 'right',
                    align: 'center',
                    render: (recordstate: any, rowData: any) => {
                        if (recordstate === '1') {
                            return (
                                <Button
                                    size="small"
                                    onClick={() => handleEdit(rowData)}
                                    className={`egister_ egister_2`}
                                >
                                    已审核
                                </Button>
                            );
                        }
                        if (recordstate === '6') {
                            return (
                                <Button
                                    //  disabled
                                    className={`egister_ egister_`}
                                    style={{ color: '#cdcdcd' }}
                                    size="small"
                                    onClick={() => handleEdit(rowData)}
                                >
                                    已结案
                                </Button>
                            );
                        }
                        //待审核 recordstate===0
                        return (
                            <Button
                                size="small"
                                className={`egister_ egister_1`}
                                onClick={() => handleCheck(rowData)}
                            >
                                待审核
                            </Button>
                        );
                    },
                },

                {
                    title: '操作',
                    fixed: 'right',
                    // width: 168,
                    width: 120,
                    align: 'center',
                    render: (value: any, rowData: any, index: number) => {
                        return (
                            <Space>
                                {!!rowData.recordstate && rowData.recordstate !== '0' ? (
                                    <Button
                                        type="link"
                                        size="small"
                                        onClick={() => handlePrenatal(rowData)}
                                    >
                                        产检本
                                    </Button>
                                ) : (
                                    <Tooltip
                                        title={
                                            <div style={{ color: '#000' }}>
                                                <ExclamationCircleOutlined style={{ color: `rgb(250,173,20)`, marginRight: '10px' }} />
                                                <span>审核通过后可查看</span>
                                            </div>
                                        }
                                        color={'#fff'}
                                    >
                                        <Button type="link" size="small" disabled={true}>
                                            产检本
                                        </Button>
                                    </Tooltip>
                                )}

                                {!!rowData.recordstate && rowData.recordstate !== '0' ? (
                                    <Button
                                        type="link"
                                        size="small"
                                        // icon={<EyeOutlined className="global-table-action-icon" />}
                                        onClick={() => handleView(rowData)}
                                    >
                                        查看
                                    </Button>
                                ) : (
                                    <Popconfirm
                                        placement="topRight"
                                        // getPopupContainer={(triggerNode) => triggerNode?.parentNode?.parentNode?.parentNode}
                                        title={`建档信息尚未审核，是否继续接诊?`}
                                        onConfirm={() => handleView(rowData)}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        <Button type="link" size="small" /* icon={<EyeOutlined className="global-table-action-icon" />} */>
                                            查看
                                        </Button>
                                    </Popconfirm>
                                )}

                                <Popconfirm
                                    placement="topRight"
                                    // getPopupContainer={(triggerNode) => triggerNode?.parentNode?.parentNode?.parentNode}
                                    title={`确定要删除吗?`}
                                    onConfirm={() => handleDelete(rowData)}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <Button type="link" size="small"
                                    // icon={<DeleteOutlined className="global-table-action-icon" />}
                                    >
                                        删除
                                    </Button>
                                </Popconfirm>
                            </Space>
                        );
                    },
                },
            ]
        },
    }
    return [
        config
    ] as const
}