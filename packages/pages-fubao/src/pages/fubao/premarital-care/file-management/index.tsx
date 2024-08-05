import { DeleteOutlined, EyeOutlined, PrinterOutlined } from '@ant-design/icons';
import { MyBaseList, fubaoHistoryPush, mchcModal } from '@lm_fe/components_m';
import { ModelService } from '@lm_fe/service';
import { formatRangeDate, fubaoRequest as request } from '@lm_fe/utils';
import { Button, Divider } from 'antd';
import { get } from 'lodash';
import React from 'react';
import { tableColumns } from './config/table';
const s = new ModelService({ n: 'PremaritalCheckArchives', prePath: '/premarital/check', apiPrefix: `/fb/api`, fuckPage: true })
export default function FileManagementList(props: any) {
  const handlePrint = (rowData: any, resource: any) => () => {
    const { id } = rowData;

    mchcModal.open('print_modal', {
      modal_data: {
        request,
        requestData: {
          url: '/api/premaritalCheckupsPrint',
          resource,
          id,
        }

      }
    })
    // message.info('暂未开放此功能，敬请期待；');
  };

  const handleEdit = (rowData: any) => () => {
    const { id } = rowData;

    fubaoHistoryPush(`/premarital-care/file-management/edit?id=${id}`, props)
  };

  const handleDelete = (rowData: any) => async () => {
    const _res = await request.delete(`/api/premarital/check/deletePremaritalCheckArchives/${get(rowData, 'id')}`);

  };

  return <MyBaseList genColumns={({ handleDelete }) => {
    return [...tableColumns as any,
    {
      title: '操作',
      showSorter: false,
      showFilter: false,
      fixed: 'right',
      width: 330,

      render: (value: any, rowData: any, index: number) => {
        return (
          <>
            <Button
              type="link"
              size="small"
              icon={<EyeOutlined className="global-table-action-icon global-table-action-view" />}
              onClick={() => {
                const { id } = rowData;
                fubaoHistoryPush(`/premarital-care/wife-v2/wife-exam?id=${id}`, props)
              }}
            >
              查看
            </Button>
            <Divider type="vertical" />
            <Button
              type="link"
              size="small"
              icon={<PrinterOutlined className="global-table-action-icon global-table-action-edit" />}
              onClick={handlePrint(rowData, 'womanPremaritalCheckupsPrint')}
            >
              打印<span style={{ color: '#6c6b6b' }}>(女方)</span>
            </Button>
            <Divider type="vertical" />
            <Button
              type="link"
              size="small"
              icon={<PrinterOutlined className="global-table-action-icon global-table-action-edit" />}
              onClick={handlePrint(rowData, 'manPremaritalCheckupsPrint')}
            >
              打印<span style={{ color: '#6c6b6b' }}>(男方)</span>
            </Button>
            <Divider type="vertical" />
            <Button
              onClick={() => handleDelete(rowData)}
              type="link"
              size="small"
              icon={<DeleteOutlined className="global-table-action-icon global-table-action-delete" />}
            >
              删除
            </Button>
          </>
        );
      },
    }].map(_ => ({ ..._, align: 'center' }))
  }}
    customModelService={s}
    showRowDelBtn
    baseTitle='档案管理'
    showAdd={false}
    fuckPage
    RenderBtns={({ getSearchParams }) => {


      return <>

      </>
    }}
    beforeSearch={(v) => {
      const { filingDay, ...others } = v
      const rangeData = formatRangeDate({ filingDay })
      const res = {

        ...rangeData,
        ...others,
      }
      return res
    }}
    beforeSubmit={v => {
      const { configurationValue, configurationReplenishExplain, } = v
      let configurationState = v.configurationState
      if (configurationValue && configurationReplenishExplain) {
        configurationState = 1
      }
      if (!configurationValue && !configurationReplenishExplain) {
        configurationState = 0
      }
      v.configurationState = configurationState


      return v
    }}
    searchSchema={[
      { type: 'RangePicker', outerOptions: { name: 'filingDay', label: '建档日期' }, innerOptions: {} },
      { type: 'Input', outerOptions: { name: 'womanTelephone', label: '女方手机号码' }, innerOptions: { style: { width: 130 } } },
      { type: 'Input', outerOptions: { name: 'womanName', label: '女方姓名' }, innerOptions: { style: { width: 130 } } },
      { type: 'Input', outerOptions: { name: 'manTelephone', label: '男方手机号码' }, innerOptions: { style: { width: 130 } } },
      { type: 'Input', outerOptions: { name: 'manName', label: '男方姓名' }, innerOptions: { style: { width: 130 } } },
      // {
      //   type: 'Select', outerOptions: { name: 'configurationState', label: '配置状态' }, innerOptions: {
      //     options: [{ label: '未配置', value: '0' },
      //     { label: '已配置', value: '1' },]
      //   }
      // },

    ]}
    searchParams={{ pageSize: 10 }}


  />
}


