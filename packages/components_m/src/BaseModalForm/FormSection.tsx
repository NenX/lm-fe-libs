import { IMchc_FormDescriptions_Field, IMchc_FormDescriptions_Field_Nullable, IMchc_FormDescriptions_InputProps } from '@lm_fe/service';
import { expect_array, safe_json_parse } from '@lm_fe/utils';
import { Col, Form, FormInstance, FormItemProps, Row, Space, Tabs, TabsProps, message } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import classnames from 'classnames';
import { cloneDeep, get, isArray, isEmpty, isNil, isObject, isString, join, map, set } from 'lodash';
import React, { lazy, useState } from 'react';
import { format_form_item_name_and_label, get_form_item_title, parse_form_item_name } from 'src/utils';
import styles from '../BaseEditPanel/less/base-edit-panel-form.module.less';
import { MyLazyComponent } from '../MyLazyComponent';
import { RenderEditItem, formatFormConfig } from './utils';
import { get_form_item_name_raw, get_form_item_name_str } from '../utils/form';
import { mchcEnv, mchcEvent } from '@lm_fe/env';
const RenderFormSectionComponent = lazy(() => import('./RenderFormSectionComponent'))
// import commonStyles from '../themes/common.less'
export interface IFormSectionProps {
  renderEditItem?: (key: string, ReactNode: React.ReactNode, others?: FormItemProps) => React.ReactNode
  renderEditItemInner?: typeof RenderEditItem
  formDescriptions?: IMchc_FormDescriptions_Field_Nullable[]
  id?: number | string
  formName?: string
  data?: any
  extraData?: any
  form?: any
  products?: any
  events?: any
  disableAll?: boolean
  defaultOptions?: FormItemProps
  onExtra?: () => void
  registrationEvents?: any
  size?: SizeType
  sectionName?: string
  span?: number
  inline?: boolean
  targetLabelCol?: number
  defaultFormItemLayout?: string
  defaultRequired?: boolean
  requiredKeys?: { [x: string]: boolean }
}
export class FormSection extends React.Component<IFormSectionProps> {
  private renderRowAndCol = (formDescriptionArr: IMchc_FormDescriptions_Field[] = [], dynamicFormItemProps: FormItemProps = {}) => {
    let configArr = formDescriptionArr
    const rowKey = join(map(formDescriptionArr, 'key'), '~')

    return (
      <Row key={rowKey}>
        {map(formDescriptionArr, (_config) => {
          if (!_config) return
          const dependency = _config.inputProps?.dependency
          const showDeps = _config.showDeps
          const disabledDeps = _config.disabledDeps
          const requiredDeps = _config.requiredDeps

          const span = get(_config, 'span') ?? this.props.span
          const offset = _config.offset ?? 0
          const push = _config.push ?? 0
          const pull = _config.pull ?? 0



          if (dependency || showDeps || disabledDeps || requiredDeps) {
            return (
              <Form.Item noStyle shouldUpdate key={_config.key}>
                {({ getFieldValue }) => {

                  const { isShow, isDisabled, isRequired } = getFormItemControl(getFieldValue, _config)


                  let newDescription = cloneDeep(_config)
                  if (isDisabled) {
                    set(newDescription, 'inputProps.disabled', true)
                  }
                  if (isRequired) {
                    set(newDescription, 'required', true)
                  }

                  if (!isShow) {
                    return null
                  }
                  return (
                    <Col span={span} offset={offset} push={push} pull={pull}>
                      {this.renderItem(newDescription, dynamicFormItemProps)}
                    </Col>
                  )
                }}
              </Form.Item>
            )
          }
          return (
            <Col span={span} push={push} pull={pull} offset={offset} key={_config.key}>
              {this.renderItem(_config, dynamicFormItemProps)}
            </Col>
          )
        })}
      </Row>
    )
  }
  private renderTab = (configArr: IMchc_FormDescriptions_Field[] = [], dynamicFormItemProps: FormItemProps = {}) => {
    const rowKey = join(map(configArr, 'key'), '~')

    return (
      <RenderTab fds={configArr} key={rowKey} form={this.props.form} renderContent={this.renderContent.bind(this)}>
      </RenderTab>
    )
  }
  private getLabelCol() {
    const value = this.props.targetLabelCol ?? 2
    return value as number
  }
  // 返回 renderEditItem 的返回
  private renderItem = (_config: IMchc_FormDescriptions_Field<false>, dynamicFormItemProps: FormItemProps = {}) => {
    const {
      id,
      data,
      extraData,
      products,
      events,
      form,
      onExtra,
      formName,
      registrationEvents,
      disableAll = false,
      // defaultOptions 
      defaultOptions = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 20,
        },
      }
    } = this.props

    if (!_config) return null
    const _inputProps = _config.inputProps!
    const parseProps = safe_json_parse<IMchc_FormDescriptions_InputProps>(_inputProps, {})!
    _config.inputProps = (typeof _inputProps === 'object' ? { ..._inputProps } : parseProps)
    _config.inputProps = _config.inputProps ?? {}

    _inputProps.size = this.props.size
    if ((_config as any).editable === false) {
      _inputProps.disabled = true

    }

    // const renderEditItem = this.props.renderEditItem ?? this._renderEditItemInner(_config, defaultOptions)
    const renderEditItem = this._renderEditItemInner(_config, { ...defaultOptions, ...dynamicFormItemProps })

    const option = { formDescription: _config, id, formName, renderEditItem, disableAll, form, registrationEvents, events, products, data, extraData, targetLabelCol: this.getLabelCol() }
    // 返回 renderEditItem 的返回
    return <RenderFormSectionComponent {...option} />


  }
  private _renderEditItemInner(config: IMchc_FormDescriptions_Field_Nullable, defaultOptions?: FormItemProps<any>) {
    const R = this.props.renderEditItemInner ?? RenderEditItem
    return (key: string, ReactNode: React.ReactNode, userSetConfig: FormItemProps = {}) => R(config, ReactNode, { ...defaultOptions, ...userSetConfig },)
  }
  private renderContent(fds: IMchc_FormDescriptions_Field_Nullable<false>[], dynamicFormItemProps: FormItemProps = {}) {
    const { inline = false } = this.props
    let tempArr: IMchc_FormDescriptions_Field[] = []
    let tempTabItemArr: IMchc_FormDescriptions_Field[] = []
    let tempSpan = 0
    const formArray: any[] = []
    const len = fds.length
    const flush = () => {
      if (!isEmpty(tempArr)) {
        formArray.push(this.renderRowAndCol(tempArr, dynamicFormItemProps))
        tempArr = []
        tempSpan = 0
      }
    }
    const flushTab = () => {
      if (!isEmpty(tempTabItemArr)) {
        formArray.push(this.renderTab(tempTabItemArr, dynamicFormItemProps))
        tempTabItemArr = []

      }
    }
    let metTabItem = false
    map(fds, (_config, index) => {
      if (!_config) return
      const span = get(_config, 'span') ?? this.props.span
      const offset = _config.offset ?? 0
      if (!_config.isActive) return
      const children = _config.children

      if (_config.containerType === 'tabs') {
        flush()
        tempTabItemArr.push(_config)

      } else {
        flushTab()
        if (children && !isEmpty(children)) {

          flush()
          const n = this.renderSection(_config)
          formArray.push(n)

        }
        else if (!isNil(span) && !isNil(offset) && !inline) {


          if (get(_config, 'isNewRow')) {
            flush()
          }


          if (tempSpan < 25 && tempSpan + span + offset < 25) {
            tempSpan = tempSpan + span + offset
            tempArr.push(_config)
            if (Number(index) === len - 1) {
              flush()
            }
          } else {
            flush()

            tempSpan = tempSpan + span + offset

            tempArr.push(_config)
          }
        }
        else {
          // 修改位置！
          flush()
          // 修改位置！

          formArray.push(this.renderItem(_config, dynamicFormItemProps))
        }
      }

    })
    // 修改位置！

    flushTab()
    flush()



    // 修改位置！
    return <MyLazyComponent>
      {formArray}
    </MyLazyComponent>

  }


  private renderSection(fd: IMchc_FormDescriptions_Field_Nullable) {
    return <RenderSection fd={fd} form={this.props.form} renderContent={this.renderContent.bind(this)} />

  };
  private renderSectionOld(fds: IMchc_FormDescriptions_Field_Nullable<false>[], withTitle: IMchc_FormDescriptions_Field<false>) {
    return (
      (true) ?
        <div className={classnames(styles['base-edit-panel-form_section'], { [styles['border']]: true })} >
          <span className={styles["base-edit-panel-form_section_title"]} >
            {withTitle.label ?? withTitle.name ?? '**'}
          </span>
          {this.renderContent(fds)}
        </div> : <>
          {this.renderItem({ ...withTitle, inputType: 'title' })}
          {this.renderContent(fds)}
        </>
    );
  };
  // renderTab(fd: IMchc_FormDescriptions_Field_Nullable) {

  //   return <RenderTab fd={fd} form={this.props.form} renderContent={this.renderContent.bind(this)} />
  // };
  renderFormList(fd: IMchc_FormDescriptions_Field_Nullable) {
    if (!fd) return null
    const config = formatFormConfig(fd, this.getLabelCol())
    const { inputProps = {} } = config
    const { formDescriptions = [] } = inputProps
    const name = parse_form_item_name(config)
    return <Form.List name={name}>
      {fields =>
        fields.map(field => (

          this.renderContent(formDescriptions)


        ))
      }

    </Form.List >
  };
  __formatFormConfig(_: IMchc_FormDescriptions_Field, siblings: IMchc_FormDescriptions_Field_Nullable[]) {
    const config = formatFormConfig(_, this.getLabelCol(), { layout: this.props.defaultFormItemLayout, required: this.props.defaultRequired })
    const formItemName = config.name!
    const requiredKeys = this.props.requiredKeys ?? {}
    const keys = Object.keys(requiredKeys)
    if (keys.includes(formItemName)) {
      config.required = requiredKeys[formItemName]
    }

    const arr = config.children ?? config.fields

    if (arr) {
      const filterArr = arr.filter(_ => _)

      config.children = filterArr
        .map(c => this.__formatFormConfig(c!, filterArr))
    }
    config.siblings = siblings

    return config
  }

  render() {
    const formDescriptions = this.props.formDescriptions ?? []
    const arr = Array.isArray(formDescriptions) ? formDescriptions : Object.values(formDescriptions)
    const filterArr: any[] = (arr ?? []).filter(_ => _)

    const fds = filterArr
      .map(_ => {
        return this.__formatFormConfig(_!, filterArr)
      })
    const node =
      this.props.sectionName
        ? this.renderSection({ title: this.props.sectionName, children: fds })
        : this.renderContent(fds)

    return node
  }
}
export default FormSection


function getFormItemControl(getFieldValue: (k: string | string[]) => any, config: IMchc_FormDescriptions_Field) {
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

function RenderTab(props: { fds: IMchc_FormDescriptions_Field_Nullable[], renderContent(arr: IMchc_FormDescriptions_Field_Nullable[]): React.ReactNode, form?: FormInstance }) {
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



function RenderSection(props: { fd: IMchc_FormDescriptions_Field_Nullable, renderContent(arr: IMchc_FormDescriptions_Field_Nullable[]): React.ReactNode, form?: FormInstance }) {
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