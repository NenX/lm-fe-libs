import { LoadingPlaceholder, MyFormSectionForm, OkButton, PanelTitle } from '@lm_fe/components_m';
import { IMchc_FormDescriptions_Field_Nullable, SLocal_State } from '@lm_fe/service';
import {
    getSearchParamsValue,
    //  fubaoRequest as
    request
} from '@lm_fe/utils';
import { Form } from 'antd';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { load_form_config_women_exam_records } from '../form_config';



export default (props: any) => {
    const id = props.id ?? getSearchParamsValue('id')
    const patientId = props.patientId ?? getSearchParamsValue('patientId')
    const [form] = Form.useForm()
    const [data, setData] = useState<any>()
    const [config, setConfig] = useState<IMchc_FormDescriptions_Field_Nullable[]>()
    const [loading, setLoading] = useState(false)
    useEffect(() => {

        (async () => {

            let data: any;
            setLoading(true)
            data = id
                ? (await request.get(`/api/gynecological-visits/${id}`)).data
                : {
                    gynecologicalPatient: (await request.get(`/api/gynecological-patients/${patientId}`)).data,
                    archivistNo:SLocal_State.userData.id,
                    archivist:SLocal_State.userData.firstName,
                };
            setLoading(false)
            form.setFieldsValue(data)
            setData(data)

        })()

        load_form_config_women_exam_records()
            .then(r => {
                setConfig(r.__lazy_config)
            })
        return () => {

        }
    }, [])

    const h = [
        { title: '姓名', value: get(data, 'gynecologicalPatient.name') },
        { title: '年龄', value: get(data, 'gynecologicalPatient.age') },
        { title: '门诊号', value: get(data, 'gynecologicalPatient.outpatientNO') },
        // { title: '联系电话', value: get(data, 'gynecologicalPatient.telephone') },
    ]
    return loading ? <LoadingPlaceholder /> : <div style={{ background: '#fff', height: '100%', overflowY: 'scroll' }}>
        <PanelTitle headerItems={h} />
        {
            config
                ? <MyFormSectionForm
                    style={{ paddingTop: 0 }}
                    // defaultRequired
                    form={form}
                    formDescriptions={load_form_config_women_exam_records}
                />
                : <LoadingPlaceholder />
        }

        <div style={{ height: 40, margin: 12 }}>
            <OkButton primary size='large' style={{ float: 'right' }}
                onClick={() => {
                    const values = form.getFieldsValue()
                    const gynecologicalPatient = Object.assign({}, data.gynecologicalPatient, values.gynecologicalPatient)
                    const submitData = Object.assign({}, data, form.getFieldsValue(), { gynecologicalPatient })
                    const p = data?.id
                        ? request.put('/api/gynecological-visits', submitData, { successText: '操作成功！' })
                        : request.post('/api/gynecological-visits', submitData, { successText: '操作成功！' })
                    p.then(res => setData(res.data))

                }}
            >保存</OkButton>
        </div>
    </div>
}
