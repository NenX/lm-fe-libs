import React from 'react'
import classnames from 'classnames'
import {
    Col,
    Row,
    Space,
    Button,
    ButtonList,
    Radio,
    Tag,
    Tags,
    IconFont,
    CountDown,
    SendCode,
    Clock,
    Timer,
    Fullscreen,
    BaseWatermark,
} from '@lm_fe/widgets'
export default function ButtonPlayground(params: any) {
    const pageRef = React.useRef(null)
    const watermark = React.useRef<BaseWatermark>()

    const [fullscreen, setFullscreen] = React.useState(false)
    const [size, setSize] = React.useState(undefined)
    const [loadings, setLoadings] = React.useState<boolean[]>([])

    const [start, setStart] = React.useState(false)

    React.useEffect(() => {
        watermark.current = new BaseWatermark({
            text: '莲印医疗',
            fontSize: 12,
            container: 'watermark', // container.current
        })
        watermark.current.hide()

        return () => {
            watermark.current && watermark.current.destroy()
        }
    }, [])

    const handleFullscreenClick = () => {
        setFullscreen(!fullscreen)
    }

    const enterLoading = (index: number) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings]
            newLoadings[index] = true
            return newLoadings
        })

        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings]
                newLoadings[index] = false
                return newLoadings
            })
        }, 3000)
    }

    function handleSendCodeClick() {
        setStart(true)
    }

    const handleShowWatermark = () => {
        watermark.current && watermark.current.show()
    }

    const handleHideWatermark = () => {
        watermark.current && watermark.current.hide()
    }

    return (
        <Fullscreen
            enabled={fullscreen}
            // target={document.body}
            onClose={(error) => {
                console.log('close')
            }}
        >
            <div id="watermark">
                <Row gutter={[12, 12]} ref={pageRef} className={classnames('page', { 'full-page': fullscreen })}>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Space>
                            <Button onClick={handleShowWatermark}>显示水印</Button>
                            <Button onClick={handleHideWatermark}>隐藏水印</Button>
                            <Button
                                icon={<IconFont type={fullscreen ? 'fullscreen-exit' : 'fullscreen'} />}
                                onClick={handleFullscreenClick}
                            >
                                {fullscreen ? '退出全屏' : '全屏'}
                            </Button>
                        </Space>
                    </Col>
                    <h3>1. Buttons Group</h3>
                    <Col span={24}>
                        <Space className="flex-wrap">
                            <Radio.Group value={size} size={size} onChange={(e) => setSize(e.target.value)}>
                                <Radio.Button value="large">大的</Radio.Button>
                                <Radio.Button value="default">默认</Radio.Button>
                                <Radio.Button value="small">小的</Radio.Button>
                            </Radio.Group>

                            <Radio.Group
                                value={size}
                                size={size}
                                buttonStyle="solid"
                                onChange={(e) => setSize(e.target.value)}
                            >
                                <Radio.Button value="large">大的</Radio.Button>
                                <Radio.Button value="default">默认</Radio.Button>
                                <Radio.Button value="small">小的</Radio.Button>
                            </Radio.Group>
                        </Space>
                    </Col>
                    <h3>2. Buttons Type 类型</h3>
                    <Col span={24}>
                        <Space className="flex-wrap">
                            <Button type="primary" size={size}>
                                Priamry Button
                            </Button>
                            <Button type="default" size={size}>
                                Default Button
                            </Button>
                            <Button type="dashed" size={size}>
                                虚线 Button
                            </Button>
                            <Button type="text" size={size}>
                                文本 Button
                            </Button>
                            <Button type="link" size={size}>
                                链接 Button
                            </Button>

                            <Button danger type="primary">
                                Danger Primary
                            </Button>
                            <Button danger>Danger Default</Button>
                            <Button danger type="dashed">
                                虚线 Danger
                            </Button>
                            <Button danger type="text">
                                Danger Text
                            </Button>
                            <Button danger type="link">
                                Danger Link
                            </Button>
                        </Space>
                    </Col>
                    <Col span={24}>
                        <Space>
                            <Button type="primary" shape="round" size={size}>
                                Priamry Button
                            </Button>
                            <Button type="default" shape="round" size={size}>
                                Default Button
                            </Button>
                            <Button type="dashed" shape="round" size={size}>
                                Dashed Button
                            </Button>

                            <Button type="primary" shape="circle" size={size}>
                                圆
                            </Button>
                            <Button shape="circle" size={size}>
                                圆
                            </Button>
                            <Button type="dashed" shape="circle" size={size}>
                                圆
                            </Button>
                        </Space>
                    </Col>
                    <Col span={24}>
                        <Space>
                            <Button disabled type="primary" size={size}>
                                Priamry Button
                            </Button>
                            <Button disabled type="default" size={size}>
                                Default Button
                            </Button>
                            <Button disabled type="dashed" size={size}>
                                虚线 Button
                            </Button>
                            <Button disabled type="text" size={size}>
                                文本 Button
                            </Button>
                            <Button disabled type="link" size={size}>
                                链接 Button
                            </Button>

                            <Button danger disabled type="primary">
                                Danger Primary
                            </Button>
                            <Button danger disabled>
                                Danger Default
                            </Button>
                            <Button danger disabled type="dashed">
                                虚线 Danger
                            </Button>
                            <Button danger disabled type="text">
                                Danger Text
                            </Button>
                            <Button danger disabled type="link">
                                Danger Link
                            </Button>
                        </Space>
                    </Col>
                    <h3>3. 幽灵按钮</h3>
                    <Col>
                        <Space style={{ padding: '6px', backgroundColor: '#bec8c8' }}>
                            <Button disabled type="default" size={size}>
                                主button
                            </Button>
                            <Button danger size={size}>
                                Danger Default
                            </Button>
                            <Button danger type="text" size={size}>
                                Danger Text
                            </Button>
                            <Button type="link" size={size} danger>
                                Danger Link
                            </Button>
                            <Button type="primary" ghost size={size}>
                                幽灵按钮
                            </Button>
                            <Button ghost size={size}>
                                幽灵按钮
                            </Button>
                            <Button type="dashed" size={size} ghost>
                                幽灵按钮
                            </Button>
                            <Button type="primary" size={size} danger ghost>
                                幽灵按钮
                            </Button>
                            <Button shape="circle" size={size}>
                                方
                            </Button>
                            <Button shape="round" size={size}>
                                圆
                            </Button>
                        </Space>
                    </Col>
                    <h3>4. 带Icon Button</h3>
                    <Col span={24}>
                        <Space>
                            <Button
                                type="primary"
                                size={size}
                                shape="circle"
                                icon={<IconFont type="cloud-download" />}
                            />
                            <Button size={size} shape="circle" icon={<IconFont type="cloud-download" />} />
                            <Button
                                type="dashed"
                                size={size}
                                shape="circle"
                                icon={<IconFont type="cloud-download" />}
                            />

                            <Button type="primary" size={size} shape="round" icon={<IconFont type="cloud-upload" />} />
                            <Button size={size} shape="round" icon={<IconFont type="cloud-upload" />} />
                            <Button type="dashed" size={size} shape="round" icon={<IconFont type="cloud-upload" />} />

                            <Button icon={<IconFont type="save" />} type="primary" size={size}>
                                保存
                            </Button>
                            <Button icon={<IconFont type="undo" />} type="primary" size={size}>
                                重置
                            </Button>
                            <Button icon={<IconFont type="printer" />} type="primary" size={size}>
                                打印
                            </Button>
                            <Button icon={<IconFont type="search" />} type="primary" size={size}>
                                搜索
                            </Button>

                            <Button icon={<IconFont type="cloud-download" />} size={size}>
                                download
                            </Button>
                            <Button icon={<IconFont type="cloud-upload" />} type="dashed" size={size}>
                                upload
                            </Button>

                            <Button icon={<IconFont type="filter" />} size={size}>
                                筛选
                            </Button>
                        </Space>
                    </Col>
                    <h3>5. Loading...</h3>
                    <Col span={24}>
                        <Space>
                            <Button loading type="primary" size={size}>
                                加载中
                            </Button>
                            <Button loading type="primary" size={size}></Button>

                            <Button type="primary" size={size} loading={loadings[0]} onClick={() => enterLoading(0)}>
                                加载中
                            </Button>
                            <Button
                                icon={<IconFont type="poweroff" />}
                                type="primary"
                                size={size}
                                loading={loadings[1]}
                                onClick={() => enterLoading(1)}
                            >
                                加载中
                            </Button>
                            <Button
                                icon={<IconFont type="poweroff" />}
                                type="primary"
                                size={size}
                                loading={loadings[2]}
                                onClick={() => enterLoading(2)}
                            ></Button>
                        </Space>
                    </Col>
                    <h3>6. button list</h3>

                    <Col>
                        <Space>
                            <span>基本:</span>
                            <ButtonList
                                list={[
                                    { key: 'add', text: '新增', type: 'primary', onClick: () => console.log(1) },
                                    { key: 'update', text: '修改', type: 'default', onClick: () => console.log(2) },
                                    { key: 'delete', text: '删除', type: 'dashed', onClick: () => console.log(3) },
                                    { key: 'selectAll', text: '全选', type: 'default', onClick: () => console.log(4) },
                                    { key: 'other', text: '其他', type: 'default', onClick: () => console.log(5) },
                                ]}
                                onClick={(key) => console.log('---key---', key)}
                            />

                            <span>紧凑的:</span>
                            <ButtonList
                                compact
                                list={[
                                    { key: 'add', text: '新增', type: 'primary', onClick: () => console.log(1) },
                                    { key: 'update', text: '修改', type: 'default', onClick: () => console.log(2) },
                                    { key: 'delete', text: '删除', type: 'dashed', onClick: () => console.log(3) },
                                    { key: 'selectAll', text: '全选', type: 'default', onClick: () => console.log(4) },
                                    { key: 'other', text: '其他', type: 'default', onClick: () => console.log(5) },
                                ]}
                            />

                            <span>small button:</span>
                            <ButtonList
                                compact
                                size="small"
                                list={[
                                    { key: 'add', text: '新增', type: 'primary', onClick: () => console.log(1) },
                                    { key: 'update', text: '修改', type: 'default', onClick: () => console.log(2) },
                                    { key: 'delete', text: '删除', type: 'dashed', onClick: () => console.log(3) },
                                    { key: 'selectAll', text: '全选', type: 'default', onClick: () => console.log(4) },
                                    { key: 'other', text: '其他', type: 'default', onClick: () => console.log(5) },
                                ]}
                            />
                        </Space>
                    </Col>

                    <h3>7. Tag 标签</h3>
                    <Col span={24}>
                        <Space>
                            <Tag>TAG</Tag>
                            <Tag icon={<IconFont type="question-circle" />}>TAG</Tag>
                            <Tag color="#311b92">TAG</Tag>
                            <Tag color="#f50">TAG</Tag>

                            <Tag color="success">成功</Tag>
                            <Tag color="success" icon={<IconFont type="question-circle" />}>
                                成功
                            </Tag>
                            <Tag color="processing">进行中</Tag>
                            <Tag color="error">错误</Tag>
                            <Tag color="warning">警告</Tag>
                            <Tag color="default">默认</Tag>
                        </Space>
                    </Col>

                    <h3>7.1 Tags</h3>
                    <Col>
                        <Space>
                            <label>tags</label>
                            <Tags
                                max={4}
                                list={[
                                    { text: 'tag1' },
                                    { text: 'tag2' },
                                    { text: 'tag3' },
                                    { text: 'tag4', color: 'red' },
                                    { text: 'tag5', color: '#87d068' },
                                ]}
                            />

                            <label>flex tags</label>
                            <Tags
                                flexible
                                style={{ width: '100%' }}
                                list={[
                                    { text: 'tag01' },
                                    { text: 'tag02' },
                                    { text: 'tag03' },
                                    { text: 'tag04' },
                                    { text: 'tag05' },
                                    { text: 'tag06' },
                                    { text: 'tag07' },
                                    { text: 'tag08' },
                                    { text: 'tag09' },
                                    { text: 'tag10' },
                                    { text: 'tag11' },
                                    { text: 'tag12' },
                                    { text: 'tag13' },
                                    { text: 'tag14' },
                                    { text: 'tag15' },
                                    { text: 'tag16' },
                                    { text: 'tag17' },
                                    { text: 'tag18' },
                                    { text: 'tag19', color: 'red' },
                                    { text: 'tag20', color: '#87d068' },
                                ]}
                            />
                        </Space>
                    </Col>

                    <h3>8. 倒计时</h3>
                    <Col span={24}>
                        <Space>
                            <label>基本:</label>
                            <CountDown target={new Date().getTime() + 1000 * 60 * 66} />

                            <label>solid:</label>
                            <CountDown type="solid" target={new Date().getTime() + 1000 * 60 * 58} />

                            <label>text:</label>
                            <CountDown type="text" target={new Date().getTime() + 1000 * 60} />
                        </Space>
                    </Col>
                    <h3>9. 时钟</h3>
                    <Col span={24}>
                        <Space>
                            <label>时钟:</label>
                            <Clock />
                            <Clock format="MM-DD HH:mm:ss" />
                            <Clock format="HH:mm:ss" />
                            <Clock format="HH:mm:ss" type="solid" />
                            <Clock use12Hours format="HH:mm:ss" type="solid" />
                        </Space>
                    </Col>
                    <h3>10. 计时器</h3>
                    <Col span={24}>
                        <Space>
                            <label>计时器:</label>
                            <Timer />

                            <label>自动开始:</label>
                            <Timer autoStart />
                        </Space>
                    </Col>
                    <h3>11. send code</h3>
                    <Col>
                        <Space>
                            <label>基本:</label>
                            <SendCode
                                // start={start}
                                onClick={handleSendCodeClick}
                                onEnd={() => {
                                    setStart(false)
                                }}
                            />

                            <label>自定义倒计时：</label>
                            <SendCode
                                // start={start}
                                second={15}
                                initText="点击"
                                runText="剩余{%s}秒"
                                onClick={handleSendCodeClick}
                                resetText="重新发送"
                                onEnd={() => {
                                    setStart(false)
                                }}
                            />

                            <label>刷新页面倒计时继续：</label>
                            <SendCode
                                // start={start}
                                storageKey="plus-send-code"
                                onClick={handleSendCodeClick}
                                initText="刷新页面倒计时还会继续"
                                onEnd={() => {
                                    setStart(false)
                                }}
                            />
                        </Space>
                    </Col>
                </Row>
            </div>
        </Fullscreen>
    )
}
