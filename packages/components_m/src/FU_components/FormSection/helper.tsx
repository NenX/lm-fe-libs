import { mchcEvent, mchcLogger } from '@lm_fe/env';
import { IMchc_FormDescriptions_Field, IMchc_FormDescriptions_Field_Nullable, IMchc_FormDescriptions_MIX } from '@lm_fe/service';
import { expect_array, safe_json_parse } from '@lm_fe/utils';
import { FormInstance, Tabs, message } from 'antd';
import classnames from 'classnames';
import { isArray, isEmpty, isFunction, isObject, isString } from 'lodash';
import React, { useEffect, useState } from 'react';
import { get_form_item_title, parse_form_item_name } from 'src/utils';
import { get_form_item_name_str } from '../../utils/form';
import styles from '../../BaseEditPanel/less/base-edit-panel-form.module.less';
import { IFormSectionProps, } from './types';



export function getFormItemControl(getFieldValue: (k: string | string[]) => any, config: IMchc_FormDescriptions_Field) {
    const dependency = config?.inputProps?.dependency

    if (dependency) {
        return getFormItemControlByDependency(getFieldValue, config)
    } else {
        return getFormItemControlByNew(getFieldValue, config)
    }

}

function getFormItemControlByNew(getFieldValue: (k: string | string[]) => any, config: IMchc_FormDescriptions_Field) {

    const showDeps = config?.showDeps ?? {}
    const requiredDeps = config?.requiredDeps ?? {}
    const disabledDeps = config?.disabledDeps ?? {}
    const showDeps_keys = Object.keys(showDeps)
    const required_keys = Object.keys(requiredDeps)
    const disabledDeps_keys = Object.keys(disabledDeps)
    return {
        isShow: showDeps_keys.reduce((state, k) => state || getDepStatus(getFieldValue, k, showDeps[k]), !config?.showDeps),
        isDisabled: disabledDeps_keys.reduce((state, k) => state || getDepStatus(getFieldValue, k, disabledDeps[k]), false),
        isRequired: required_keys.reduce((state, k) => state || getDepStatus(getFieldValue, k, requiredDeps[k]), false),
    }
}

function getFormItemControlByDependency(getFieldValue: (k: string | string[]) => any, config: IMchc_FormDescriptions_Field) {
    const dependency = config?.inputProps?.dependency

    return {
        isShow: getDepStatus(getFieldValue, dependency?.show?.key, dependency?.show?.value),
        isDisabled: getDepStatus(getFieldValue, dependency?.disabled?.key, dependency?.disabled?.value),
        isRequired: getDepStatus(getFieldValue, dependency?.required?.key, dependency?.required?.value),
    }
}

function getDepStatus(getValue: (k: string | string[]) => any, depKey: string | string[] = '', depValue: any[] = []) {





    //key值有.的情况下showKey处理
    if (isString(depKey) && depKey.includes('.')) {
        depKey = depKey.split('.')
    }
    const __showVal = getValue(depKey)
    const targetShowVal = getUglyValue(__showVal)

    return depValue.includes(targetShowVal)
}

function getUglyValue(v: any) {
    const __value = safe_json_parse(v, v)

    let checkedValue = __value
    if (isArray(__value)) {
        return getUglyArrValue(__value)
    }
    if (isObject(__value)) {
        // [todo]:如果是多选的情况 如何处理
        return getUglyObjValue(__value)
    }
    return checkedValue
}

function getUglyArrValue(__arr: any) {
    if (!isArray(__arr)) return __arr
    if (__arr.length > 1) {
        return __arr.map(getUglyObjValue).join(',')
    }
    return getUglyObjValue(__arr[0])
}
function getUglyObjValue(__obj: any) {
    return __obj?.value ?? __obj?.key ?? __obj?.checkedValues?.[0]
}

export function RenderTab(props: { fds: IMchc_FormDescriptions_Field_Nullable[], renderContent(arr: IMchc_FormDescriptions_Field_Nullable[]): any, form?: FormInstance }) {
    const { fds, renderContent, form } = props

    const configArr = expect_array(fds)
    const firstTab = configArr[0]
    const FirstTitle = getFormItemTitleOrName(firstTab)

    const [activeKey, setActiveKey] = useState(FirstTitle)

    function changeActiveKey(k: string) {
        setActiveKey(k)
        mchcEvent.emit('my_form', {
            type: 'onTabChange',
            activeKey: k,
            oldKey: activeKey,
            form,
        })
    }

    return <Tabs
        activeKey={activeKey}
        onChange={k => {
            const items = configArr.find(_ => {
                const title = getFormItemTitleOrName(_)
                return title === activeKey
            })
            if (form && items) {
                const arr = items.children ?? []

                const keys = arr.map(_ => parse_form_item_name(_))
                form.validateFields(keys)
                    .then(
                        () => changeActiveKey(k)
                    )
                    .catch((e) => {

                        const errorFields: any[] = e?.errorFields ?? []
                        const str = errorFields
                            .map(_ => {
                                const errorText = _.errors[0]
                                return errorText as string
                            })
                            .filter(_ => _)
                            .join('、')
                        message.warn(str)

                    })

            } else {
                changeActiveKey(k)
            }
        }}

    >
        {
            configArr.map(_ => {
                const title = getFormItemTitleOrName(_)
                const tabConfig = _?.children ?? []


                return <Tabs.TabPane tabKey={title} key={title} tab={title}>

                    {isEmpty(tabConfig) ? `请配置${title}的 children` : renderContent(tabConfig)}

                </Tabs.TabPane>

            })
        }
    </Tabs >
};



export function RenderSection(props: { fd: IMchc_FormDescriptions_Field_Nullable, renderContent(arr: IMchc_FormDescriptions_Field_Nullable[]): any, form?: FormInstance }) {
    const { fd, renderContent, } = props
    if (!fd) return null
    const { containerType = 'section(default)', children = [] } = fd
    if (isEmpty(children)) return null
    const title = getFormItemTitleOrName(fd)


    const node = renderContent(children)
    if (containerType === 'plain')
        return (
            <>
                {/* {this.renderItem({ ...withTitle, inputType: 'title' })} */}
                <div hidden={!title} style={{ padding: '4px 0', fontWeight: 'bold', fontSize: 20, color: '#150f55', borderBottom: '1px dashed #150f55', margin: '6px 0 12px 0', textIndent: 12 }}>
                    {title}
                </div>
                {node}
            </>
        )



    return title
        ? <div className={classnames(styles['base-edit-panel-form_section'], { [styles['border']]: true })} >
            <span className={styles["base-edit-panel-form_section_title"]} >
                {title}
            </span>
            {node}
        </div>
        : node
};

function getFormItemTitleOrName(fd: IMchc_FormDescriptions_Field_Nullable) {
    return get_form_item_title(fd) ?? get_form_item_name_str(fd)
}


export function use_form_config(props: IFormSectionProps) {
    const { formDescriptions } = props
    const [form_config, setForm_config] = useState<IMchc_FormDescriptions_Field_Nullable[]>()

    useEffect(() => {

        get_form_config(formDescriptions)
            .then(setForm_config)

        return () => {

        }
    }, [formDescriptions])
    return [form_config]
}

export async function get_form_config(config: IMchc_FormDescriptions_MIX) {
    let f: IMchc_FormDescriptions_Field_Nullable[] = []

    if (Array.isArray(config)) {

        f = config

    }
    else if (isFunction(config)) {

        const r = await config()
        if (isFunction(r)) {

            f = r()

        } else {

            const res = Array.isArray(r)
                ? r
                : r.__lazy_config ?? []

            f = res
        }



    }
    else if (isObject(config)) {

        f = Object.values(config)

    }

    return f

}