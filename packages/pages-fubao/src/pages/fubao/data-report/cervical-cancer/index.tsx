import { MyBaseList } from "@lm_fe/components_m"
import { mchcLogger } from "@lm_fe/env"
import { formatDate, fubaoRequest, getMomentRange, request } from "@lm_fe/utils"
import { Button } from "antd"
import React from "react"
export default function CervicalCancerDataReport(prop: any) {
    return <MyBaseList
        // apiPrefix="/fb/api"
        needChecked
        useListSourceCount
        initialSearchValue={{
            validateDate: getMomentRange().这个星期.map(formatDate)
        }}
        searchConfig={[
            { label: '建档日期', name: 'validateDate', inputType: 'rangeDate' },
            { label: '就诊卡号', name: 'outpatientNO', inputType: 'Input' },
            { label: '上报状态', name: 'uploadState', inputType: 'MS', inputProps: { optionKey: '上报状态' } },
        ]}
        name="/two/cancer/screening/findAllCervicalCancerReportedData"
        showAction={false}
        showAdd={false}
        RenderBtns={(ctx) => {
            const selectRows = ctx.getCheckRows()
            return <Button disabled={!selectRows.length} onClick={async () => {
                mchcLogger.log('select xx', { rows: selectRows })
                request.post('/api/dataReport/reportCervicalCancerScreening', { ids: selectRows.map(_ => _.id), });
                ctx.handleSearch()
            }}>上报</Button>
        }}
        tableColumns={[
            // { title: '建档日期', dataIndex: 'validateDate' },
            { title: '姓名', dataIndex: 'name' },
            { title: '就诊卡号', dataIndex: 'outpatientNO' },
            // { title: '身份证号', dataIndex: 'idNO' },
            { title: '检查日期', dataIndex: 'checkDate' },
            // { title: '审核人', dataIndex: 'auditorName' },
            { title: '上报状态', dataIndex: 'uploadState', inputType: 'MS', inputProps: { optionKey: '上报状态', marshal: 0 } },
            { title: '上报说明', dataIndex: 'uploadMsg', },
            { title: '上报时间', dataIndex: 'uploadDate', },
        ]}
    />
}