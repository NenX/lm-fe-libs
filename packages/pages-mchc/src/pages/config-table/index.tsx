import { MyBaseList } from "@lm_fe/components_m";
import { mchcEvent } from "@lm_fe/env";
import { Button } from "antd";
import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { form_config } from "./form_config";
const halfLayout = { span: 12, labelCol: 8, wrapperCol: 14 }
const oneThirdLayout = { span: 8, labelCol: 12, wrapperCol: 12 }
const towThirdLayout = { span: 16, labelCol: 6, wrapperCol: 18 }
const quarterLayout = { span: 6, labelCol: 16, wrapperCol: 8 }
// { title: '检测方法：1. PRP 2.TRUST 3.USR 4.VDRL 5其他,请注明:', inputType: 'title', hidden: true, inputProps: { bold: false } },
export default (props) => {
    const history = useHistory()
    useEffect(() => {
        // const _message = message
        const rm = mchcEvent.on_rm('my_form', (event) => {

            const { values, setValue, } = event
            console.log('globalEvent', event)
            if (event.type === 'onChange' && setValue) {
                const { name, value } = event
                if (name === 'age') {
                    // setValue('name', '1年龄增加到' + value)
                }
            }
            if (event.type === 'onClick' && values && setValue) {

                if (event.btnName) {
                    const age = values.age || 0
                    // setValue('age', age + 1)

                }
            }
        })

        return rm
    }, [])
    return <div>

        <MyBaseList
            showExport
            showPrint
            searchParams={{
            }}
            initialSearchValue={{
                // apiPrefix: '/api'
            }}
            RenderBtns={() => {
                return <div>请不要再设置接口前缀!!</div>
            }}
            searchConfig={[
                { inputType: 'MyInput', label: '名称', name: 'title', },
                { inputType: 'MyInput', label: '接口路径', name: 'name', },
                // { inputType: 'MyInput', label: '接口前缀', name: 'apiPrefix', },
            ]}
            baseTitle='梅毒感染孕产妇登记卡'
            // name="/syphilis-quality-control"
            name="/tableConfig"
            tableColumns={form_config(props) as any}

            modalFormConfig={
                {
                    width: "96vw",
                    bodyStyle: { height: '80vh', overflowY: 'scroll' },
                    modal_data: {
                        modalFormSize: 'small'
                    }
                }
            }
            requestBeforeEdit

            // apiPrefix="/as"
            ActionAddonBefore={({ rowData, createOrUpdate }) => {
                const { id, ...newData } = rowData
                return <Button size="small" onClick={() => {
                    createOrUpdate({ ...newData, title: `${newData.title}-复制` })
                }}>复制</Button>
            }}
        />
        <div style={{ margin: 12 }}></div>
    </div>
}