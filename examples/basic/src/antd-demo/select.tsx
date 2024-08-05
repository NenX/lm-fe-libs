import React from 'react'
import {
    Form,
    Col,
    Row,
    Space,
    Select,
    SingleSelect,
    MultipleSelect,
    Tooltip,
    IconFont,
    AddressCascader,
    AddressSelect,
    Modal,
    message,
} from '@lm_fe/widgets'
const FormItem = Form.Item
export const OPTIONS = [
    { label: '选择项_1', value: '1' },
    { label: '选择项_222222222222', value: '2' },
    { label: '选择项_3', value: '3' },
    { label: '选择项_4', value: '4' },
    { label: '选择项_5', value: '5' },
    { label: '选择项_6', value: '6' },
    { label: '选择项_7', value: '7' },
]
export const NORMAL_COLOR_OPTIONS = [
    { label: '主色调', value: 'info', color: 'info' },
    { label: '成功色', value: 'success', color: 'success' },
    { label: '警告色', value: 'warning', color: 'warning' },
    { label: '危险色', value: 'error', color: 'error' },
    { label: '进行中', value: 'processing', color: 'processing' },
    { label: '其他颜色', value: 'other', input: {} },
]
export const complication_options = [
    { label: '无', value: '无', exclusion: true },
    { label: '糖尿病', value: '糖尿病' },
    { label: '高血压', value: '高血压' },
    { label: '高血脂', value: '高血脂' },
    { label: '先天畸形', value: '先天畸形' },
    { label: '遗传疾病', value: '遗传疾病' },
    { label: '心脏病', value: '心脏病' },
    { label: '其他', value: '其他' },
]
export const FRUITS_OPTIONS = [
    { label: '🍇葡萄', value: '葡萄' },
    { label: '🍈甜瓜', value: '甜瓜' },
    { label: '🍉西瓜', value: '西瓜' },
    { label: '🍊柑橘', value: '柑橘' },
    { label: '🍋柠檬', value: '柠檬' },
    { label: '🍌香蕉', value: '香蕉' },
    { label: '🍍菠萝', value: '菠萝' },
    { label: '🍎红苹果', value: '红苹果' },
    { label: '🍏青苹果', value: '青苹果' },
    { label: '🍐梨', value: '梨' },
    { label: '🍑桃子', value: '桃子' },
    { label: '🍒樱桃', value: '樱桃' },
    { label: '🍓草莓', value: '草莓' },
    { label: '🥝 猕猴桃', value: '猕猴桃' },
    { label: '🍅 西红柿', value: '西红柿' },
    { label: '🥥 椰子', value: '椰子' },
    { label: '😒 不喜欢', value: '不喜欢', exclusion: true },
]
type SelectPlaygroundProps = {}
const SelectPlayground = (props: SelectPlaygroundProps) => {
    return (
        <Form layout="inline">
            <Row>
                <h3>1. 单项选择</h3>
                <FormItem label="基础(string[])">
                    <SingleSelect
                        allowClear
                        placeholder="请选择"
                        options={['无', '糖尿病', '高血压', '高血脂', '先天畸形', '遗传疾病', '心脏病']}
                    />
                </FormItem>
                <FormItem label="基础(LabeledValue[])">
                    <SingleSelect allowClear placeholder="请选择" options={OPTIONS} />
                </FormItem>
                <FormItem label="带颜色选择框">
                    <SingleSelect allowClear placeholder="请选择" options={NORMAL_COLOR_OPTIONS} />
                </FormItem>

                <FormItem label="disabled">
                    <SingleSelect
                        allowClear
                        disabled
                        value="error"
                        placeholder="请选择"
                        options={NORMAL_COLOR_OPTIONS}
                    />
                </FormItem>
                <FormItem label="option disabled">
                    <SingleSelect
                        allowClear
                        placeholder="请选择"
                        options={[...NORMAL_COLOR_OPTIONS, { label: '天空蓝', value: 'skyblue', disabled: true }]}
                    />
                </FormItem>
            </Row>
            <Row>
                <h3>1.1. 单项选择 (下划线)</h3>
                <FormItem label="基础(string[])">
                    <SingleSelect
                        underline
                        allowClear
                        placeholder="请选择"
                        options={['无', '糖尿病', '高血压', '高血脂', '先天畸形', '遗传疾病', '心脏病']}
                    />
                </FormItem>
                <FormItem label="基础(LabeledValue[])">
                    <SingleSelect underline allowClear placeholder="请选择" options={OPTIONS} />
                </FormItem>
                <FormItem label="带颜色选择框">
                    <SingleSelect underline allowClear placeholder="请选择" options={NORMAL_COLOR_OPTIONS} />
                </FormItem>

                <FormItem label="disabled">
                    <SingleSelect
                        underline
                        allowClear
                        disabled
                        value="info"
                        placeholder="请选择"
                        options={NORMAL_COLOR_OPTIONS}
                    />
                </FormItem>
                <FormItem label="option disabled">
                    <SingleSelect
                        underline
                        allowClear
                        placeholder="请选择"
                        options={[...NORMAL_COLOR_OPTIONS, { label: '天空蓝', value: 'skyblue', disabled: true }]}
                    />
                </FormItem>
            </Row>
            <Row>
                <h3>1.2 single select (mode==='read')</h3>
                <FormItem label="基础(string[])">
                    <SingleSelect
                        mode="read"
                        placeholder="请选择"
                        options={['无', '糖尿病', '高血压', '高血脂', '先天畸形', '遗传疾病', '心脏病']}
                    />
                </FormItem>

                <FormItem label="基础(LabeledValue[])">
                    <SingleSelect mode="read" value="2" placeholder="请选择" options={OPTIONS} />
                </FormItem>

                <FormItem label="带颜色选择框">
                    <SingleSelect mode="read" value="error" placeholder="请选择" options={NORMAL_COLOR_OPTIONS} />
                </FormItem>

                <FormItem label="">
                    <SingleSelect mode="read" value="success" placeholder="请选择" options={NORMAL_COLOR_OPTIONS} />
                </FormItem>
            </Row>
            <Row>
                <h3>2. 多项选择</h3>
                <Col span={6}>
                    <FormItem label="多选">
                        <MultipleSelect showArrow allowClear placeholder="请选择" options={NORMAL_COLOR_OPTIONS} />
                    </FormItem>
                </Col>
                <Col span={6}>
                    <FormItem label="多选">
                        <MultipleSelect
                            showArrow
                            allowClear
                            style={{ width: 228 }}
                            placeholder="请选择你喜欢的水果"
                            options={FRUITS_OPTIONS}
                        />
                    </FormItem>
                </Col>
                <Col span={6}>
                    <FormItem label="默认值">
                        <MultipleSelect
                            allowClear
                            showArrow
                            placeholder="多项选择"
                            defaultValue="info,error"
                            options={FRUITS_OPTIONS}
                            style={{ width: 228 }}
                        />
                    </FormItem>
                </Col>
                <Col span={6}>
                    <FormItem label="赋值">
                        <MultipleSelect
                            allowClear
                            showArrow
                            placeholder="多项选择"
                            value="info,error"
                            options={FRUITS_OPTIONS}
                            style={{ width: 228 }}
                        />
                    </FormItem>
                </Col>
                <Col span={6}>
                    <FormItem label="含有互斥选项">
                        <MultipleSelect
                            allowClear
                            showArrow
                            placeholder="含有互斥选项"
                            options={FRUITS_OPTIONS}
                            style={{ minWidth: 168 }}
                        />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <h3>2.1 无边框</h3>
                <Col span={6}>
                    <FormItem label="基本选择框">
                        <MultipleSelect allowClear underline placeholder="请选择" options={complication_options} />
                    </FormItem>
                </Col>
                <Col span={6}>
                    <FormItem label="你的颜色">
                        <MultipleSelect allowClear underline placeholder="请选择" options={NORMAL_COLOR_OPTIONS} />
                    </FormItem>
                </Col>
                <Col span={6}>
                    <FormItem label="你的水果">
                        <MultipleSelect
                            allowClear
                            showArrow
                            underline
                            placeholder="多项选择"
                            value="香蕉,红苹果,草莓"
                            options={FRUITS_OPTIONS}
                            style={{ width: 228 }}
                        />
                    </FormItem>
                </Col>
            </Row>
            <Row style={{ width: '100%' }}>
                <h3>2.2. 阅读模式</h3>
                <Col span={6}>
                    <FormItem label="基础病">
                        <MultipleSelect
                            allowClear
                            mode="read"
                            placeholder="请选择"
                            value="糖尿病"
                            options={complication_options}
                        />
                    </FormItem>
                </Col>
                <Col span={6}>
                    <FormItem label="你的颜色">
                        <MultipleSelect
                            allowClear
                            mode="read"
                            placeholder="请选择"
                            value="error,info"
                            options={NORMAL_COLOR_OPTIONS}
                        />
                    </FormItem>
                </Col>
                <Col span={6}>
                    <FormItem label="你的水果">
                        <MultipleSelect
                            mode="read"
                            placeholder="多项选择"
                            value="香蕉,红苹果,草莓"
                            options={FRUITS_OPTIONS}
                            style={{ width: 228 }}
                        />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <h3>2.3 其他</h3>
                <FormItem label="定制内容回填">
                    <Select
                        showArrow
                        allowClear
                        mode="multiple"
                        optionLabelProp="label"
                        placeholder="请选择"
                        style={{ width: 236 }}
                    >
                        <Select.Option value="china" label="China">
                            <div>
                                <span role="img" aria-label="China">
                                    🇨🇳
                                </span>
                                {` China (中国)`}
                            </div>
                        </Select.Option>
                        <Select.Option value="usa" label="USA">
                            <div>
                                <span role="img" aria-label="USA">
                                    🇺🇸
                                </span>
                                {` USA (美国)`}
                            </div>
                        </Select.Option>
                        <Select.Option value="japan" label="Japan">
                            <div>
                                <span role="img" aria-label="Japan">
                                    🇯🇵
                                </span>
                                {` Japan (日本)`}
                            </div>
                        </Select.Option>
                    </Select>
                </FormItem>
                <FormItem label="搜索">
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        options={OPTIONS}
                        placeholder="带排序的搜索"
                        optionFilterProp="children"
                        filterOption={(input, option) => {
                            if (option!.children) {
                                return (option!.children as unknown as string).includes(input)
                            }
                            if (option!.label) {
                                return (option!.label as string).includes(input)
                            }
                            return false
                        }}
                        filterSort={(optionA, optionB) => {
                            return (optionA!.label as unknown as string)
                                .toLowerCase()
                                .localeCompare((optionB!.label as unknown as string).toLowerCase())
                        }}
                    ></Select>
                </FormItem>
            </Row>
            <Row>
                <h3>5. 地址选择器(Cascader模式)</h3>
                <Col span={6}>
                    <FormItem label="省市区选择">
                        <AddressCascader />
                    </FormItem>
                </Col>
                <Col span={6}>
                    <FormItem label="省市选择">
                        <AddressCascader level={2} />
                    </FormItem>
                </Col>
                <Col span={6}>
                    <FormItem label="省选择">
                        <AddressCascader level={1} />
                    </FormItem>
                </Col>
                <Col span={6}>
                    <FormItem label="addonAfter">
                        <AddressCascader level={1} addonAfterBtns={[{ text: '拷贝', key: 'copy' }]} />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    <FormItem label="省市区选择">
                        <AddressCascader underline />
                    </FormItem>
                </Col>
                <Col span={6}>
                    <FormItem label="省市选择">
                        <AddressCascader underline level={2} />
                    </FormItem>
                </Col>
                <Col span={6}>
                    <FormItem label="省选择">
                        <AddressCascader underline level={1} />
                    </FormItem>
                </Col>
                <Col span={6}>
                    <FormItem label="addonAfter">
                        <AddressCascader
                            underline
                            level={1}
                            addonAfterBtns={[
                                { text: '同妻子居住地址', key: 'paste' },
                                { text: '拷贝', key: 'copy' },
                            ]}
                        />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <FormItem label="省市区选择(mode=read)">
                    <AddressCascader underline mode="read" value="广州市,天河区,林和街道" />
                </FormItem>
                <FormItem label="省市选择">
                    <AddressCascader underline level={2} mode="read" value="广州市,天河区" />
                </FormItem>
                <FormItem label="省选择">
                    <AddressCascader underline level={1} mode="read" value="广州市" />
                </FormItem>
                <FormItem label="省市区选择(format)">
                    <AddressCascader
                        underline
                        mode="read"
                        value="广州市,天河区,林和街道"
                        format={(value) => <span style={{ color: '#fcf', fontWeight: 600 }}>{value}</span>}
                    />
                </FormItem>
            </Row>
            <Row>
                <Col span={24}>
                    <FormItem label="地址选择1">
                        <AddressCascader hasInput />
                    </FormItem>
                </Col>

                <Col span={24}>
                    <FormItem label="省市区地址选择">
                        <AddressCascader hasInput value="广东省,广州市,天河区#天河东路240号" />
                    </FormItem>
                </Col>

                <Col span={24}>
                    <FormItem label="直辖市地址选择">
                        <AddressCascader hasInput value="北京市,朝阳区#东三环中路32号" />
                    </FormItem>
                </Col>
                <Col span={24}>
                    <FormItem label="addonAfterBtn">
                        <AddressCascader
                            hasInput
                            value="贵州省,毕节市,威宁彝族回族苗族自治县#阳光新城"
                            addonAfterBtns={[
                                { text: '同妻子居住地址', type: 'link', key: 'paste' },
                                { text: '拷贝', type: 'link', key: 'copy' },
                            ]}
                        />
                    </FormItem>
                </Col>
                <Col span={24}>
                    <FormItem label="地址选择(underline)">
                        <AddressCascader hasInput underline />
                    </FormItem>
                </Col>
                <Col span={24}>
                    <FormItem label="addonAfterBtn(underline)">
                        <AddressCascader hasInput underline addonAfterBtns={[{ text: '拷贝', key: 'copy' }]} />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <FormItem label="省市区选择(mode=read)">
                    <AddressCascader mode="read" value="广州市,天河区,林和街道#天河东路240号" />
                </FormItem>
                <FormItem label="省市选择">
                    <AddressCascader level={2} mode="read" value="广州市,天河区" />
                </FormItem>
                <FormItem label="省选择">
                    <AddressCascader level={1} mode="read" value="广州市" />
                </FormItem>
                <FormItem label="省市区选择(format)">
                    <AddressCascader
                        underline
                        mode="read"
                        value="广州市,天河区,林和街道"
                        format={(value) => <span style={{ color: '#fcf', fontWeight: 600 }}>{value}</span>}
                    />
                </FormItem>
            </Row>

            <Row>
                <h3>5.1 地址选择器(select模式)</h3>
                <Col span={24}>
                    <FormItem label="地址选择">
                        <AddressSelect />
                    </FormItem>
                </Col>
                <Col span={24}>
                    <FormItem label="地址选择(has input)">
                        <AddressSelect hasInput />
                    </FormItem>
                </Col>
                <Col span={24}>
                    <FormItem label="省市区地址选择">
                        <AddressSelect hasInput defaultValue="广东省,广州市,天河区#天河东路240号" />
                    </FormItem>
                </Col>
                <Col span={24}>
                    <FormItem label="直辖市地址选择">
                        <AddressSelect defaultValue="北京市,朝阳区#东三环中路32号" />
                    </FormItem>
                </Col>
                <Col span={24}>
                    <FormItem label="地址选择addonAfterBtn">
                        <FormItem label="">
                            <AddressSelect
                                value="贵州省,毕节市,威宁彝族回族苗族自治县#阳光新城"
                                addonAfterBtns={[
                                    {
                                        text: '复制',
                                        type: 'primary',
                                        key: 'copy',
                                        onClick: () => {
                                            message.success('复制成功！')
                                        },
                                    },
                                ]}
                            />
                        </FormItem>
                    </FormItem>
                </Col>
                <Col span={24}>
                    <FormItem label="地址选择addonAfterBtn">
                        <AddressSelect
                            hasInput
                            value="贵州省,毕节市,威宁彝族回族苗族自治县#阳光新城"
                            addonAfterBtns={[
                                {
                                    key: 'paste',
                                    text: '同妻子居住地址',
                                    type: 'primary',
                                    danger: true,
                                    onClick: () => {
                                        Modal.info({
                                            title: 'Tips',
                                            content: <div>拷贝妻子居住地址到这里？</div>,
                                            onOk() {},
                                        })
                                    },
                                },
                                {
                                    text: '复制',
                                    type: 'primary',
                                    key: 'copy',
                                    onClick: () => {
                                        message.success('复制成功！')
                                    },
                                },
                            ]}
                        />
                    </FormItem>
                </Col>

                <h3>underline</h3>
                <Col span={24}>
                    <FormItem label="地址选择">
                        <AddressSelect underline />
                    </FormItem>
                </Col>
                <Col span={24}>
                    <FormItem label="地址选择">
                        <AddressSelect underline addonAfterBtns={[{ text: '拷贝', key: 'copy' }]} />
                    </FormItem>
                </Col>
                <Col span={24}>
                    <FormItem label="地址选择">
                        <AddressSelect
                            underline
                            hasInput
                            addonAfterBtns={[{ text: '拷贝', key: 'copy' }]}
                            value="贵州省,毕节市,威宁彝族回族苗族自治县#阳光新城"
                        />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <FormItem label="省市区选择(mode=read)">
                    <AddressSelect mode="read" value="广州市,天河区,林和街道#天河东路240号" />
                </FormItem>
                <FormItem label="省市选择">
                    <AddressSelect level={2} mode="read" value="广州市,天河区" />
                </FormItem>
                <FormItem label="省选择">
                    <AddressSelect level={1} mode="read" value="广州市" />
                </FormItem>
                <FormItem label="省市区选择(format)">
                    <AddressSelect
                        underline
                        mode="read"
                        value="广州市,天河区,林和街道"
                        format={(value) => <span style={{ color: '#fcf', fontWeight: 600 }}>{value}</span>}
                    />
                </FormItem>
            </Row>
        </Form>
    )
}
export default SelectPlayground
