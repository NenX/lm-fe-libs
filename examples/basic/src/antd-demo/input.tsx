import React from 'react'
import {
    Col,
    Row,
    Space,
    Form,
    Button,
    Radio,
    Input,
    Text,
    TextArea,
    Digit,
    Select,
    InputNumber,
    LmInput,
    LmInputNumber,
    DigitRange,
    PregnancyWeekInput,
    Tooltip,
    IconFont,
    Watermark,
    Typography,
} from '@lm_fe/widgets'
import logo from '../assets/logo@3x.png'
const FormItem = Form.Item
type InputPlaygroundProps = {}
function InputPlayground() {
    return (
        <Watermark image={logo} width={40} height={30}>
            <Form layout="inline">
                <h3>1. Text 普通输入框</h3>
                <Row gutter={[12, 12]}>
                    <Col span="6">
                        <FormItem label="普通">
                            <Text placeholder="请输入" value="莲印医疗" />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="有前缀">
                            <Text prefix={<IconFont type="question-circle" />} placeholder="请输入文本" />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="有后缀">
                            <Text suffix={<IconFont type="audio" />} />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="前后缀">
                            <Text prefix={<IconFont type="question-circle" />} suffix={<IconFont type="audio" />} />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="前置标签">
                            <Text addonBefore={'https://'} />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="后置标签">
                            <Text addonAfter={<IconFont type="audio" />} />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="前后置标签">
                            <Text addonBefore={'https://'} addonAfter={'.com'} placeholder="my site" />
                        </FormItem>
                    </Col>
                </Row>
                <h3>1.1. Text 下划线</h3>
                <Row gutter={[12, 12]}>
                    <Col span="6">
                        <FormItem label="普通">
                            <Text underline placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="有前缀">
                            <Text underline prefix={<IconFont type="question-circle" />} placeholder="default size" />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="有后缀">
                            <Text underline suffix={<IconFont type="audio" />} placeholder="small size" />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="前后缀">
                            <Text
                                underline
                                prefix={<IconFont type="question-circle" />}
                                suffix={<IconFont type="audio" />}
                                placeholder="small size"
                            />
                        </FormItem>
                    </Col>

                    <Col span="6">
                        <FormItem label="前后缀">
                            <Text
                                underline
                                prefix={<IconFont type="question-circle" />}
                                suffix={<IconFont type="audio" />}
                                placeholder="small size"
                            />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="前置标签">
                            <Text underline addonBefore={'https://'} placeholder="small size" />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="后置标签">
                            <Text underline addonAfter={<IconFont type="audio" />} placeholder="small size" />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="前后置标签">
                            <Text underline addonBefore={'https://'} addonAfter={'.com'} placeholder="mysite" />
                        </FormItem>
                    </Col>
                </Row>
                <h3>1.3 read阅读模式</h3>
                <Row gutter={[12, 12]}>
                    <Col span="6">
                        <FormItem label="普通">
                            <Text mode="read" placeholder="请输入" value="莲印医疗" />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="有前缀">
                            <Text mode="read" prefix={<IconFont type="question-circle" />} placeholder="请输入文本" />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="有后缀">
                            <Text mode="read" suffix={<IconFont type="audio" />} />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="前后缀">
                            <Text
                                mode="read"
                                prefix={<IconFont type="question-circle" />}
                                suffix={<IconFont type="audio" />}
                            />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="前置标签">
                            <Text mode="read" prefix="https://" value={'www.baidu'} />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="后置标签">
                            <Text mode="read" suffix=".com" value={'www.baidu'} />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="前后置标签">
                            <Text mode="read" prefix={'https://'} suffix={'.com'} value={'www.baidu'} />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="前后置标签">
                            <Text
                                mode="read"
                                prefix={'https://'}
                                suffix={'.com'}
                                value={'www.baidu'}
                                readProps={{ copyable: true }}
                            />
                        </FormItem>
                    </Col>
                </Row>
                <h3>2. 数字输入框</h3>
                <Row gutter={[12, 12]}>
                    <Col span="24">
                        <Space>
                            <label>只读readOnly:</label>
                            <Digit readOnly />

                            <label>基本normal:</label>
                            <Digit />

                            <label>无handler:</label>
                            <Digit controls={false} />

                            <label>阈值标红提示:</label>
                            <Digit value={99} rangeRegExp={/^([1-9]|[1-5]\d)$/} />

                            <label>下划线</label>
                            <Digit underline />
                        </Space>
                    </Col>

                    <h3>2.1 Digit前缀</h3>
                    <Col span="24">
                        <Space>
                            <label>prefix:</label>
                            <Digit prefix="$" />

                            <label>addonBefore:</label>
                            <Digit addonBefore="￥" />

                            <label>addonAfter:</label>
                            <Digit addonAfter="次/秒" />

                            <label>addonBefore-addonAfter:</label>
                            <Digit addonBefore="110米栏世界纪录" addonAfter="秒" />

                            <label>before:</label>
                            <Digit addonBefore="每天收益" prefix="￥" />
                        </Space>
                    </Col>

                    <h3>2.2 Digit下划线</h3>
                    <Col span="24">
                        <Space>
                            <label>prefix:</label>
                            <Digit underline prefix="$" />

                            <label>addonBefore:</label>
                            <Digit underline addonBefore="￥" />

                            <label>addonAfter:</label>
                            <Digit underline addonAfter="次/秒" />

                            <label>addonBefore-addonAfter:</label>
                            <Digit underline addonBefore="110米栏世界纪录" addonAfter="秒" />

                            <label>before:</label>
                            <Digit underline addonBefore="每天收益" prefix="￥" />
                        </Space>
                    </Col>

                    <h3>3. Digit Range (血压、数字范围输入)</h3>
                    <Col span="24">
                        <Space>
                            <label>基本:</label>
                            <DigitRange placeholder={['最小值', '最大值']} />

                            <label>带后缀:</label>
                            <DigitRange suffix="mmHg" />

                            <label>下划线:</label>
                            <DigitRange underline suffix="mmHg" />

                            <label>血压:</label>
                            <DigitRange
                                centered
                                suffix="mmHg"
                                placeholder={['低压值', '高压值']}
                                tips="血压正常值范围，低压：60~90，高压：108~156"
                                inputStyle={[
                                    {
                                        width: 68,
                                    },
                                    {
                                        width: 68,
                                    },
                                ]}
                            />
                        </Space>
                    </Col>

                    <h3>3.1 form item组合</h3>
                    <Col>
                        <Space>
                            <FormItem
                                label={
                                    <span>
                                        血压
                                        <Tooltip title="血压正常值范围，低压：60~90，高压：108~156">
                                            <IconFont type="question-circle" style={{ marginLeft: 4 }} />
                                        </Tooltip>
                                    </span>
                                }
                            >
                                <Input.Group compact>
                                    <FormItem name={'h'} noStyle rules={[{ required: true, message: 'h is required' }]}>
                                        <LmInputNumber controls={false} placeholder="高压" />
                                    </FormItem>
                                    <FormItem noStyle>
                                        <Input
                                            disabled
                                            placeholder="/"
                                            style={{ width: '24px', textAlign: 'center' }}
                                        />
                                    </FormItem>
                                    <FormItem name={'l'} noStyle rules={[{ required: true, message: 'l is required' }]}>
                                        <LmInputNumber controls={false} placeholder="低压" />
                                    </FormItem>
                                    <FormItem
                                        style={{ textAlign: 'center', padding: '0 4px', marginRight: 0, lineHeight: 1 }}
                                    >
                                        mmHg
                                    </FormItem>
                                </Input.Group>
                            </FormItem>

                            <FormItem label="Form Item组合体">
                                <Input.Group compact>
                                    <FormItem name={'h'} noStyle rules={[{ required: true, message: 'h is required' }]}>
                                        <LmInputNumber controls={false} placeholder="高压" />
                                    </FormItem>
                                    <FormItem noStyle>
                                        <Input
                                            disabled
                                            placeholder="/"
                                            style={{ width: '24px', textAlign: 'center' }}
                                        />
                                    </FormItem>
                                    <FormItem name={'l'} noStyle rules={[{ required: true, message: 'l is required' }]}>
                                        <LmInputNumber controls={false} placeholder="低压" />
                                    </FormItem>
                                    <FormItem
                                        style={{ textAlign: 'center', padding: '0 4px', marginRight: 0, lineHeight: 1 }}
                                    >
                                        <Tooltip title="血压正常值范围，低压：60~90，高压：108~156">
                                            <IconFont type="question-circle" />
                                        </Tooltip>
                                        <p style={{ fontSize: '13px' }}>mmHg</p>
                                    </FormItem>
                                </Input.Group>
                            </FormItem>
                        </Space>

                        <Space direction="vertical" style={{ marginLeft: 24 }}></Space>
                    </Col>

                    <h3>3.2 Digit Range 只读模式</h3>
                    <Col span="24">
                        <Space>
                            <label>基本(阅读模式):</label>
                            <DigitRange
                                mode="read"
                                placeholder={['最小值', '最大值']}
                                value={[56, 125]}
                                suffix="mmHg"
                            />
                        </Space>
                    </Col>

                    <h3>4. 孕周组件</h3>
                    <Col span={24}>
                        <Space>
                            <label>孕周组件:</label>
                            <PregnancyWeekInput defaultValue="32+5" addonAfter="周" />
                            <label>孕周组件:</label>
                            <PregnancyWeekInput defaultValue="23" suffix="周" />
                            <PregnancyWeekInput value="32+5" suffix="周" />
                            <PregnancyWeekInput defaultValue="28+1" suffix="周" />

                            <label>孕周</label>
                            <PregnancyWeekInput underline defaultValue="28+1" suffix="周" />
                        </Space>
                    </Col>
                    <Col span={24}>
                        <Space>
                            <label>孕周组件:</label>
                            <PregnancyWeekInput mode="separate" defaultValue="32+5" addonAfter="周" />

                            <label>孕周组件:</label>
                            <PregnancyWeekInput mode="separate" defaultValue="23" suffix="周" />

                            <PregnancyWeekInput mode="separate" value="32+5" suffix="周" />

                            <PregnancyWeekInput mode="separate" defaultValue="28+1" suffix="周" />

                            <label>孕周</label>
                            <PregnancyWeekInput underline mode="separate" defaultValue="28+1" suffix="周" />
                        </Space>
                    </Col>
                    <h3>4.1 孕周组件 只读</h3>
                    <Col span={24}>
                        <Space>
                            <label>基本:</label>
                            <PregnancyWeekInput underline mode="read" value="28" suffix="周" />

                            <label>基本:</label>
                            <PregnancyWeekInput underline mode="read" value="28+3" suffix="周" />

                            <label>孕周(format):</label>
                            <PregnancyWeekInput underline mode="read" value="28" format="周-天" />

                            <label>孕周(format):</label>
                            <PregnancyWeekInput underline mode="read" value="28+3" format="周-天" />

                            <label>孕周(format):</label>
                            <PregnancyWeekInput underline mode="read" value="28+3" format="W-D" />

                            <label>孕周(format):</label>
                            <PregnancyWeekInput
                                underline
                                mode="read"
                                value="28+3"
                                format={(value) => {
                                    const values = value?.split('+')
                                    const text = `${values?.[0]} 周 ${values?.[1] || ''} ${values?.[1] ? '天' : ''}`
                                    return <Typography.Text type="danger">{text}</Typography.Text>
                                }}
                            />
                        </Space>
                    </Col>
                </Row>
                <Row gutter={[12, 12]}>
                    <h3>5. textarea文本框</h3>

                    <Col span={6}>
                        <FormItem label="文本输入框">
                            <TextArea placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="文本输入框">
                            <TextArea underline placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="文本输入框">
                            <TextArea
                                showCount
                                maxLength={120}
                                placeholder="显示文本数字限制"
                                defaultValue={'君不见，黄河之水天上来，奔流到海不复回。'}
                            />
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="文本输入框">
                            <TextArea showCount underline maxLength={120} placeholder="显示文本数字限制" />
                        </FormItem>
                    </Col>

                    <Col span={6}>
                        <FormItem label="阅读模式">
                            <TextArea mode="read" value="简短文本" />
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="阅读模式">
                            <TextArea
                                mode="read"
                                value={`
                                君不见，黄河之水天上来，奔流到海不复回。
                                君不见，高堂明镜悲白发，朝如青丝暮成雪。
                                人生得意须尽欢，莫使金樽空对月。
                                天生我材必有用，千金散尽还复来。
                                烹羊宰牛且为乐，会须一饮三百杯。
                                岑夫子，丹丘生，将进酒，杯莫停。
                                与君歌一曲，请君为我倾耳听。
                                钟鼓馔玉不足贵，但愿长醉不愿醒。
                                古来圣贤皆寂寞，惟有饮者留其名。
                                陈王昔时宴平乐，斗酒十千恣欢谑。
                                主人何为言少钱，径须沽取对君酌。
                                五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。`}
                            />
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="阅读模式">
                            <TextArea
                                mode="read"
                                readProps={{ ellipsis: { rows: 6 }, copyable: true }}
                                value={`
                                君不见，黄河之水天上来，奔流到海不复回。
                                君不见，高堂明镜悲白发，朝如青丝暮成雪。
                                人生得意须尽欢，莫使金樽空对月。
                                天生我材必有用，千金散尽还复来。
                                烹羊宰牛且为乐，会须一饮三百杯。
                                岑夫子，丹丘生，将进酒，杯莫停。
                                与君歌一曲，请君为我倾耳听。
                                钟鼓馔玉不足贵，但愿长醉不愿醒。
                                古来圣贤皆寂寞，惟有饮者留其名。
                                陈王昔时宴平乐，斗酒十千恣欢谑。
                                主人何为言少钱，径须沽取对君酌。
                                五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。`}
                            />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Watermark>
    )
}
export default InputPlayground
