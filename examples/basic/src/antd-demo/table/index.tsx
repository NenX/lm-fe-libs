/**
 * antd Table demo
 */
import React from 'react'
import { Col, Row, Card, Button, Table, Tooltip, IconFont } from '@lm_fe/widgets'
import './index.less'
import { _columns, _dataSource, _largeDataSource } from './data'
type Props = {}
export default function TableDemos({}: Props) {
    const tableWrapperRef = React.useRef(null)

    React.useEffect(() => {
        console.log('------current------', tableWrapperRef.current, tableWrapperRef)
    }, [])

    const onChange = (pageNumber) => {
        console.log('Page: ', pageNumber)
    }
    return (
        <Row>
            <Col
                ref={tableWrapperRef}
                span={24}
                style={{
                    marginBottom: 12,
                    padding: '12px 12px 0 12px',
                    backgroundColor: '#fff',
                    // height: 'calc(100vh - 72px)',
                    height: '400px',
                    overflow: 'auto',
                }}
            >
                <Table
                    scrollToFirstRowOnChange={true}
                    style={{ height: '100%' }}
                    id="ant-table-id"
                    bordered
                    showSorterTooltip
                    // scroll={{
                    //     x: '100%',
                    //     y: 306,
                    // }}
                    sticky={{
                        getContainer: () => tableWrapperRef.current,
                    }}
                    size="middle"
                    columns={_columns}
                    dataSource={_largeDataSource}
                    pagination={{
                        showQuickJumper: true,
                        defaultCurrent: 2,
                        pageSize: 20,
                        total: 100,
                        onChange,
                    }}
                />
            </Col>
            <Col span={24} style={{ marginBottom: 12 }}>
                <Card title="Table表格 demo" extra="更多..." size="small">
                    <Table
                        bordered
                        size="middle"
                        title={() => 'normal Table'}
                        columns={_columns}
                        dataSource={_dataSource}
                        pagination={{
                            showQuickJumper: true,
                            defaultCurrent: 2,
                            total: 500,
                            onChange,
                        }}
                    />
                </Card>
            </Col>
            <Col span={24} style={{ marginBottom: 12 }}>
                <Table
                    bordered
                    title={() => 'large Table'}
                    columns={_columns}
                    dataSource={_dataSource}
                    pagination={{
                        showQuickJumper: true,
                        defaultCurrent: 2,
                        total: 500,
                        onChange,
                    }}
                />
            </Col>
            <Col span={24}>
                <Table
                    bordered={false}
                    size="small"
                    title={() => 'small Table'}
                    columns={_columns}
                    dataSource={_dataSource}
                    pagination={{
                        showQuickJumper: true,
                        defaultCurrent: 1,
                        total: 500,
                        onChange,
                    }}
                />
            </Col>
            <Col span={24}></Col>
        </Row>
    )
}
