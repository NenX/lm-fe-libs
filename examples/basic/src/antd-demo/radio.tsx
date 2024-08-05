import React from 'react'
import {
    Row,
    Col,
    Space,
    RadioGroup,
    RadioGroupInput,
    CheckboxGroup,
    CheckboxGroupInput,
    Checkbox,
    WatermarkPro,
    Form,
} from '@lm_fe/widgets'
import { OPTIONS, complication_options, NORMAL_COLOR_OPTIONS, FRUITS_OPTIONS } from './select'
const FormItem = Form.Item
type Props = {}
const RadioDemo = (props: Props) => {
    return (
        <WatermarkPro text={['莲印医疗', '测试水印']} fontSize={12}>
            <Form layout="inline" id="watermark">
                <Row gutter={[12, 12]}>
                    <h3>1. Radio Group</h3>
                    <FormItem label="基本">
                        <RadioGroup
                            value={undefined}
                            options={[
                                { label: '全部', value: 2, disabled: true },
                                { label: '审核中', value: 0 },
                                { label: '通过', value: 1 },
                                { label: '驳回', value: -1 },
                            ]}
                        />
                    </FormItem>
                    <FormItem label="规格大小">
                        <RadioGroup options={['大', '中', '小']} />
                    </FormItem>
                    <FormItem label="colors">
                        <RadioGroup defaultValue="success" options={NORMAL_COLOR_OPTIONS} />
                    </FormItem>
                </Row>
                <Row>
                    <h3>1.1 Radio Group (optionType === 'button)</h3>
                    <FormItem label="button-radio">
                        <RadioGroup
                            value={'error'}
                            optionType="button"
                            options={[
                                { label: '审核中', value: 0 },
                                { label: '通过', value: 1 },
                                { label: '驳回', value: -1 },
                                { label: '全部', value: 2, disabled: true },
                            ]}
                        />
                    </FormItem>
                    <FormItem label="">
                        <RadioGroup value={'error'} optionType="button" options={NORMAL_COLOR_OPTIONS} />
                    </FormItem>
                    <FormItem>
                        <RadioGroup
                            value={'error'}
                            optionType="button"
                            buttonStyle="solid"
                            options={NORMAL_COLOR_OPTIONS}
                        />
                    </FormItem>
                </Row>
                <Row>
                    <h3>1.2 Radio Group (阅读模式)</h3>
                    <FormItem label="number">
                        <RadioGroup value={'2'} mode={'read'} options={['1', '2', '3']} />
                    </FormItem>

                    <FormItem label="进度">
                        <RadioGroup value={'通过'} mode="read" options={['审核中', '通过', '驳回', '全部']} />
                    </FormItem>

                    <FormItem label="进度">
                        <RadioGroup
                            value={2}
                            mode="read"
                            options={[
                                { label: '审核中', value: 0, color: 'processing' },
                                { label: '通过', value: 1, color: 'success' },
                                { label: '驳回', value: -1, color: 'error' },
                                { label: '全部', value: 2, color: 'default' },
                            ]}
                        />
                    </FormItem>
                    <FormItem>
                        <RadioGroup value={'error'} mode="read" options={NORMAL_COLOR_OPTIONS} />
                    </FormItem>
                    <FormItem>
                        <RadioGroup value={'success'} optionType="button" mode="read" options={NORMAL_COLOR_OPTIONS} />
                    </FormItem>
                </Row>
                <Row>
                    <h3>2. Radio Group Input</h3>

                    <FormItem label="怀孕方式" style={{ width: '100%' }}>
                        <RadioGroupInput
                            name="pregnancyWay"
                            value={{ pregnancyWay: 'ivf' }}
                            options={[
                                { label: '自然', value: 'natural' },
                                { label: 'IVF', value: 'ivf' },
                                { label: 'ICSI', value: 'icsi' },
                                { label: 'PGT', value: 'pgt' },
                                { label: 'AIH', value: 'aih' },
                                { label: 'AID', value: 'aid' },
                                { label: '其他', value: 'other', input: { underline: true } },
                            ]}
                        />
                    </FormItem>
                    <FormItem label="怀孕方式" style={{ width: '100%' }}>
                        <RadioGroupInput
                            name="pregnancyWay"
                            value={{ pregnancyWay: 'icsi', pregnancyWayNote: '手术时间2021-12-20' }}
                            options={[
                                { label: '自然', value: 'natural' },
                                { label: 'IVF', value: 'ivf' },
                                { label: 'ICSI', value: 'icsi', input: { underline: true } },
                                { label: 'PGT', value: 'pgt', input: { underline: true } },
                                { label: 'AIH', value: 'aih', color: 'error', input: { underline: true } },
                                { label: 'AID', value: 'aid', color: 'warning', input: { underline: true } },
                            ]}
                        />
                    </FormItem>

                    <FormItem label="吸烟">
                        <RadioGroupInput
                            name="smoke"
                            value={{ smoke: 0 }}
                            options={[
                                { label: '无', value: 0 },
                                {
                                    label: '有',
                                    color: 'error',
                                    value: 1,
                                    input: {
                                        type: 'number',
                                        underline: true,
                                        addonAfter: '支/天',
                                        style: { width: 56 },
                                    },
                                },
                            ]}
                        />
                    </FormItem>
                    <FormItem label="饮酒">
                        <RadioGroupInput
                            name="alcohol"
                            value={{ alcohol: 1, alcoholNote: 500 }}
                            options={[
                                { label: '无', value: 0 },
                                {
                                    label: '有',
                                    value: 1,
                                    color: 'error',
                                    input: {
                                        type: 'number',
                                        underline: true,
                                        addonAfter: 'ml/天',
                                        style: { width: 56 },
                                    },
                                },
                            ]}
                        />
                    </FormItem>
                </Row>
                <Row>
                    <h3>2.1 Radio Group Input (阅读模式)</h3>
                    <FormItem label="受孕方式">
                        <RadioGroupInput
                            name="pregnancyWay"
                            mode="read"
                            value={{ pregnancyWay: 'natural', pregnancyWayNote: '4545' }}
                            options={[
                                { label: '自然', value: 'natural' },
                                { label: 'IVF', value: 'ivf' },
                                { label: 'ICSI', value: 'icsi', input: { underline: true } },
                                { label: 'PGT', value: 'pgt', input: { underline: true } },
                                { label: 'AIH', value: 'aih', color: 'error', input: { underline: true } },
                                { label: 'AID', value: 'aid', color: 'warning', input: { underline: true } },
                            ]}
                        />
                    </FormItem>
                    <FormItem label="受孕方式">
                        <RadioGroupInput
                            name="pregnancyWay"
                            mode="read"
                            value={{ pregnancyWay: 'icsi', pregnancyWayNote: '手术时间2021-12-20' }}
                            options={[
                                { label: '自然', value: 'natural' },
                                { label: 'IVF', value: 'ivf' },
                                { label: 'ICSI', value: 'icsi', input: { underline: true } },
                                { label: 'PGT', value: 'pgt', input: { underline: true } },
                                { label: 'AIH', value: 'aih', color: 'error', input: { underline: true } },
                                { label: 'AID', value: 'aid', color: 'warning', input: { underline: true } },
                            ]}
                        />
                    </FormItem>
                    <FormItem label="吸烟">
                        <RadioGroupInput
                            name="smoke"
                            mode="read"
                            value={{ smoke: 0 }}
                            options={[
                                { label: '无', value: 0 },
                                {
                                    label: '有',
                                    color: 'error',
                                    value: 1,
                                    input: {
                                        type: 'number',
                                        underline: true,
                                        addonAfter: '支/天',
                                        style: { width: 56 },
                                    },
                                },
                            ]}
                        />
                    </FormItem>
                    <FormItem label="饮酒">
                        <RadioGroupInput
                            name="alcohol"
                            mode="read"
                            value={{ alcohol: 1, alcoholNote: 500 }}
                            options={[
                                { label: '无', value: 0 },
                                {
                                    label: '有',
                                    value: 1,
                                    color: 'error',
                                    input: {
                                        type: 'number',
                                        underline: true,
                                        addonAfter: 'ml/天',
                                        style: { width: 56 },
                                    },
                                },
                            ]}
                        />
                    </FormItem>
                </Row>
                <Row>
                    <h3>3. CheckBox Group</h3>
                    <Col span="24">
                        <FormItem label="checkbox">
                            <Checkbox>选中</Checkbox>
                        </FormItem>
                    </Col>
                    <Col>
                        <FormItem label="过敏原">
                            <CheckboxGroup options={['青霉素', '氯霉素', '花生', '花粉', '粉尘', '芒果', '西瓜']} />
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem label="基本色调">
                            <CheckboxGroup options={NORMAL_COLOR_OPTIONS} />
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem label="基本色调">
                            <CheckboxGroup options={NORMAL_COLOR_OPTIONS} defaultValue={['error', 'success']} />
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem label="基础疾病">
                            <CheckboxGroup options={complication_options} />
                        </FormItem>
                    </Col>
                    <Col span="18">
                        <FormItem label="水果大餐">
                            <CheckboxGroup selectAll options={FRUITS_OPTIONS} />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <h3>3.1 CheckBox Group (阅读模式)</h3>
                    <FormItem label="过敏原">
                        <CheckboxGroup
                            mode="read"
                            value="氯霉素,花生"
                            options={['青霉素', '氯霉素', '花生', '花粉', '粉尘', '芒果', '西瓜']}
                        />
                    </FormItem>
                    <FormItem label="基本色调">
                        <CheckboxGroup options={NORMAL_COLOR_OPTIONS} defaultValue={['error', 'success']} />
                    </FormItem>
                    <Col span="18">
                        <FormItem label="水果大餐">
                            <CheckboxGroup
                                mode="read"
                                options={FRUITS_OPTIONS}
                                value={['西瓜', '香蕉', '草莓', '樱桃', '菠萝']}
                            />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <h3>4. CheckBox Group Input</h3>
                    <Col span={24}>
                        <FormItem label="colors">
                            <CheckboxGroupInput options={NORMAL_COLOR_OPTIONS} />
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem label="过敏史">
                            <CheckboxGroupInput
                                value={{ food: true, foodNote: '花生' }}
                                options={[
                                    { value: 'nothing', label: '无', exclusion: true },
                                    { value: 'medicine', label: '药物', color: 'success', input: {} },
                                    { value: 'food', label: '食物', color: 'error', input: {} },
                                    { value: 'other', label: '其他', color: 'warning', input: {} },
                                ]}
                            />
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem label="过敏史">
                            <CheckboxGroupInput
                                value={{ medicine: true, medicineNote: '氯霉素', food: true, foodNote: '花生' }}
                                valueType="number"
                                options={[
                                    { value: 'nothing', label: '无', exclusion: true },
                                    { value: 'medicine', label: '药物', input: { type: 'string' } },
                                    { value: 'food', label: '食物', input: { type: 'string' } },
                                    { value: 'other', label: '其他', input: {} },
                                ]}
                            />
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem label="过敏史">
                            <CheckboxGroupInput
                                value={{ medicine: 1, medicineNote: '青霉素' }}
                                valueType="number"
                                options={[
                                    { value: 'nothing', label: '无', exclusion: true },
                                    {
                                        value: 'medicine',
                                        label: '药物',
                                        input: {
                                            type: 'select',
                                            options: [{ value: '青霉素' }, { value: '氯霉素' }, { value: '蛋白' }],
                                        },
                                    },
                                    {
                                        value: 'food',
                                        label: '食物',
                                        input: {
                                            type: 'select',
                                            options: [
                                                { value: '花生' },
                                                { value: '海鲜' },
                                                { value: '芒果' },
                                                { value: '鲜牛奶' },
                                            ],
                                        },
                                    },
                                    {
                                        value: 'other',
                                        label: '其他',
                                        input: {
                                            type: 'autoComplete',
                                            options: [{ value: '花粉' }, { value: '宠物毛发' }, { value: '尘螨' }],
                                        },
                                    },
                                ]}
                            />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <h3>4. CheckBox Group Input (阅读模式)</h3>
                    <FormItem label="colors">
                        <CheckboxGroupInput
                            mode="read"
                            value={{ warning: 1, error: 1 }}
                            options={NORMAL_COLOR_OPTIONS}
                        />
                    </FormItem>

                    <FormItem label="过敏史">
                        <CheckboxGroupInput
                            mode="read"
                            value={{ food: true, foodNote: '花生' }}
                            options={[
                                { value: 'nothing', label: '无', exclusion: true },
                                { value: 'medicine', label: '药物', color: 'success', input: {} },
                                { value: 'food', label: '食物', color: 'error', input: {} },
                                { value: 'other', label: '其他', color: 'warning', input: {} },
                            ]}
                        />
                    </FormItem>

                    <FormItem label="过敏史">
                        <CheckboxGroupInput
                            mode="read"
                            value={{ medicine: true, medicineNote: '头孢、氯霉素', food: true, foodNote: '花生、地豆' }}
                            options={[
                                { value: 'nothing', label: '无', exclusion: true },
                                { value: 'medicine', label: '药物', color: 'success', input: {} },
                                { value: 'food', label: '食物', color: 'error', input: {} },
                                { value: 'other', label: '其他', color: 'warning', input: {} },
                            ]}
                        />
                    </FormItem>
                </Row>
            </Form>
        </WatermarkPro>
    )
}
export default RadioDemo
