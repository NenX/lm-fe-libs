import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Spin, Table } from 'antd';
import ReactToPrint from 'react-to-print';
import { get, set, isEmpty, cloneDeep, size, forEach, filter, find } from 'lodash';
import { config, get_table_columns, printConfig } from './config';
import PrintTable from './print-table';
import styles from './index.module.less';
import { IMchc_Doctor_Diagnoses, IMchc_Doctor_OutpatientHeaderInfo, IMchc_Doctor_RvisitInfoOfOutpatient, IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit } from '@lm_fe/service';
import { mchcEnv, mchcLogger, otherOptions } from '@lm_fe/env';
import { LoadingPlaceholder, MyForm } from '@lm_fe/components_m';
import { EMPTY_PLACEHOLDER } from '@lm_fe/utils';
import { filter_diagnoses } from '../../../.utils';
interface IProps {
    visitsData?: IMchc_Doctor_RvisitInfoOfOutpatient,
    headerInfo: IMchc_Doctor_OutpatientHeaderInfo,
    setDiagnosesList?(list: IMchc_Doctor_Diagnoses[]): void
    setFormData(v: Partial<IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit>): void

    formData?: Partial<IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit>,

}

export default function FurtherTable(props: IProps) {

    const { setFormData, setDiagnosesList, visitsData, headerInfo, formData, } = props;




    const [isShowPrintTable, set_isShowPrintTable] = useState(false)
    const [selectKeys, set_selectKeys] = useState<any[]>([])
    const [selectRows, set_selectRows] = useState<any[]>([])

    const printTableRef = useRef<HTMLDivElement>(null)


    useEffect(() => {



    }, [])

    const filtered_rvisits = (visitsData?.rvisits ?? []).filter(_ => _.id)





    function handleCancel() {

        set_isShowPrintTable(false)
    };

    async function handlePrint(bool: boolean) {

        set_isShowPrintTable(false)
    };

    function buttons() {
        return [
            <ReactToPrint
                trigger={() => (
                    <div>
                        <Button type="primary" onClick={() => handlePrint(true)}>
                            续打
                        </Button>
                        <Button type="primary" onClick={() => handlePrint(false)}>
                            打印
                        </Button>
                    </div>
                )}
                /*为了获取更新数据后的页面*/
                onBeforeGetContent={async () => {
                    setTimeout(() => { }, 100);
                }}
                content={() => printTableRef.current}
            />,
        ];
    }

    function handleMoreBtn() {

        set_isShowPrintTable(true)
    };

    function printTable() {

        return (
            <Modal
                centered
                title="产检记录"
                className={styles['FurtherTable']}
                visible={isShowPrintTable}
                width="90%"
                onCancel={handleCancel}
                footer={buttons()}
            >
                <div ref={printTableRef}>
                    {
                        renderTable(true)
                    }
                </div>

            </Modal>
        );
    }



    const renderTable = (isAll = false) => <Table bordered pagination={false} size='small'
        // rowSelection={{
        //     selectedRowKeys: selectKeys,
        //     onChange(keys, rows) {
        //         mchcLogger.log({ keys, rows })
        //         set_selectKeys(keys)
        //         set_selectRows(rows)
        //     }
        // }}

        onRow={(record) => {

            return {
                onClick(event) {
                    set_selectKeys([record.id])
                    set_selectRows([record])

                },
                onDoubleClick() {
                    setFormData(record);
                    set_isShowPrintTable(false)
                    const __diagnoses = filter_diagnoses(visitsData?.diagnoses)


                    setDiagnosesList?.(__diagnoses);
                },

            };
        }}
        rowClassName={r => {
            return r.id === formData?.id ? styles['selected-row'] : ''
        }}
        rowKey={'id'}
        dataSource={isAll ? filtered_rvisits : filtered_rvisits.slice(0, 5)}
        columns={get_table_columns()}
    />
    return (
        <div className={styles['FurtherTable']}>
            {(visitsData) ? (
                <>

                    {renderTable()}

                    <div className={styles['btn-wrap']}>
                        <span>共 {filtered_rvisits.length} 条记录</span>
                        <Button type='text' size="small" onClick={handleMoreBtn}>
                            更多...
                        </Button>
                    </div>
                    {printTable()}
                </>
            ) : (
                <LoadingPlaceholder height={80} />
            )}
        </div>
    );
}
