/**
 * 日期选择
 */
import React from 'react'
import {
    Row,
    Col,
    Space,
    Form,
    LmDatePicker,
    LmTimePicker,
    TimeRangePicker,
    RangePicker,
    DaysRange,
    RangePickerPro,
} from '@lm_fe/widgets'
import { isNumber } from 'lodash'
import moment from 'moment'
const FormItem = Form.Item
type Props = {}
const DatePicker = (props: Props) => {
    return (
        <Form layout="inline">
            <Row gutter={[12, 12]}>
                <h3>1. date picker / time picker</h3>

                <FormItem label="年-月-日 时:分:秒">
                    <LmDatePicker picker="datetime" value={'2022-07-25 12:15:25'} />
                </FormItem>

                <FormItem label="年-月-日">
                    <LmDatePicker value={moment()} />
                </FormItem>

                <FormItem label="年-周">
                    <LmDatePicker picker="week" />
                </FormItem>

                <FormItem label="年-月">
                    <LmDatePicker picker="month" />
                </FormItem>

                <FormItem label="年-季度">
                    <LmDatePicker picker="quarter" />
                </FormItem>

                <FormItem label="年">
                    <LmDatePicker picker="year" />
                </FormItem>

                <FormItem label="时:分:秒">
                    <LmDatePicker picker="time" />
                </FormItem>

                <FormItem label="TimePicker">
                    <LmTimePicker />
                </FormItem>
                <FormItem label="TimeRangePicker">
                    <TimeRangePicker />
                </FormItem>
                <FormItem label="时-分">
                    <TimeRangePicker format="HH:mm" />
                </FormItem>
                <FormItem label="时">
                    <TimeRangePicker format="HH" />
                </FormItem>
            </Row>

            <Row gutter={[12, 12]}>
                <h3>1.2 下划线</h3>
                <FormItem label="年-月-日 时:分:秒">
                    <LmDatePicker underline picker="datetime" />
                </FormItem>

                <FormItem label="年-月-日">
                    <LmDatePicker underline />
                </FormItem>

                <FormItem label="年-周">
                    <LmDatePicker underline picker="week" />
                </FormItem>

                <FormItem label="年-月">
                    <LmDatePicker underline picker="month" />
                </FormItem>

                <FormItem label="年-季度">
                    <LmDatePicker underline picker="quarter" />
                </FormItem>

                <FormItem label="年">
                    <LmDatePicker underline picker="year" />
                </FormItem>

                <FormItem label="时:分:秒">
                    <LmDatePicker underline picker="time" />
                </FormItem>

                <FormItem label="TimePicker">
                    <LmTimePicker underline={true} />
                </FormItem>
                <FormItem label="TimeRangePicker">
                    <TimeRangePicker underline />
                </FormItem>
                <FormItem label="时-分">
                    <TimeRangePicker underline format="HH:mm" />
                </FormItem>

                <FormItem label="时">
                    <TimeRangePicker underline format="HH" />
                </FormItem>
            </Row>
            <Row gutter={[12, 12]}>
                <h3>1.3 无边框</h3>
                <FormItem label="年-月-日 时:分:秒">
                    <LmDatePicker picker="datetime" bordered={false} />
                </FormItem>

                <FormItem label="年-月-日">
                    <LmDatePicker bordered={false} />
                </FormItem>

                <FormItem label="年-周">
                    <LmDatePicker picker="week" bordered={false} />
                </FormItem>

                <FormItem label="年-月">
                    <LmDatePicker picker="month" bordered={false} />
                </FormItem>

                <FormItem label="年-季度">
                    <LmDatePicker picker="quarter" bordered={false} />
                </FormItem>

                <FormItem label="年">
                    <LmDatePicker picker="year" bordered={false} />
                </FormItem>

                <FormItem label="时:分:秒">
                    <LmDatePicker picker="time" bordered={false} />
                </FormItem>
            </Row>
            <Row gutter={[12, 12]}>
                <h3>1.4 阅读模式</h3>
                <FormItem label="年-月-日 时:分:秒">
                    <LmDatePicker mode="read" picker="datetime" value="2022-07-05 10:57:40" />
                </FormItem>

                <FormItem label="年-月-日">
                    <LmDatePicker mode="read" value="2022-07-05 10:57:40" />
                </FormItem>

                <FormItem label="年-周">
                    <LmDatePicker mode="read" picker="week" value="2022-07-05 10:57:40" />
                </FormItem>

                <FormItem label="年-月">
                    <LmDatePicker mode="read" picker="month" value="2022-07-05 10:57:40" />
                </FormItem>

                <FormItem label="年-季度">
                    <LmDatePicker mode="read" picker="quarter" value="2022-07-05 10:57:40" />
                </FormItem>

                <FormItem label="年">
                    <LmDatePicker mode="read" picker="year" value="2022-07-05 10:57:40" />
                </FormItem>

                <FormItem label="时:分:秒">
                    <LmDatePicker mode="read" picker="time" value="2022-07-05 10:57:40" />
                </FormItem>

                {/* <FormItem label="TimePicker">
                    <LmTimePicker underline mode="read" value="10:57:40" />
                </FormItem> */}
            </Row>
            <Row gutter={[12, 12]}>
                <h3>2. 区间时间 range picker</h3>

                <FormItem label="年-月-日 时:分:秒">
                    <RangePicker
                        picker="datetime"
                        value={[moment('2022-07-05 12:00:01'), moment('2022-07-08 12:00:01')]}
                    />
                </FormItem>

                <FormItem label="年-月-日">
                    <RangePicker value={['2022-07-05 12:00:01', '2022-07-08 12:00:01']} />
                </FormItem>

                <FormItem label="年-周">
                    <RangePicker picker="week" />
                </FormItem>

                <FormItem label="年-月">
                    <RangePicker picker="month" />
                </FormItem>

                <FormItem label="年-季度">
                    <RangePicker picker="quarter" />
                </FormItem>

                <FormItem label="年">
                    <RangePicker picker="year" />
                </FormItem>
            </Row>
            <Row gutter={[12, 12]}>
                <h3>2.1 range picker other</h3>

                <FormItem label="下划线">
                    <RangePicker underline />
                </FormItem>

                <FormItem label="下划线">
                    <TimeRangePicker underline />
                </FormItem>

                <FormItem label="无边框">
                    <RangePicker bordered={false} />
                </FormItem>
            </Row>

            <Row gutter={[12, 12]}>
                <h3>2.2 read阅读模式</h3>

                <FormItem label="下划线">
                    <RangePicker mode="read" value={[moment('2022-07-05'), moment('2022-07-08')]} />
                </FormItem>

                <FormItem label="下划线">
                    <RangePicker
                        mode="read"
                        picker="datetime"
                        value={[moment('2022-07-05 12:00:01'), moment('2022-07-08 12:00:01')]}
                    />
                </FormItem>

                <FormItem label="时分秒">
                    <TimeRangePicker
                        mode="read"
                        value={[moment('2022-07-05 12:00:01'), moment('2022-07-05 14:42:05')]}
                    />
                </FormItem>
                <FormItem label="时分">
                    <TimeRangePicker
                        mode="read"
                        format="HH:mm"
                        value={[moment('2022-07-05 12:00:01'), moment('2022-07-05 14:42:05')]}
                    />
                </FormItem>
            </Row>

            <Row gutter={[12, 12]}>
                <h3>5. range picker pro</h3>

                <FormItem label="简单示例">
                    <RangePickerPro
                        options={[
                            { label: '5秒钟', value: 'second', periodValue: 5 },
                            { label: '15分钟', value: 'minute', periodValue: 15 },
                            { label: '小时', value: 'hour', periodValue: 1 },
                            { label: '日', value: 'day', periodValue: 1 },
                            { label: '月', value: 'month', periodValue: 1 },
                            { label: '年', value: 'year', periodValue: 1 },
                        ]}
                        defaultTimes={[
                            moment().subtract(7, 'days').startOf('day'),
                            moment().subtract(1, 'days').endOf('day'),
                        ]}
                        onChange={(values) => {
                            console.log('demo-01')
                            if (!Array.isArray(values)) {
                                values.rangeTime.forEach((item) => {
                                    console.log(moment(item).format('YYYY-MM-DD HH:mm:ss'))
                                })
                            }
                        }}
                    />
                </FormItem>

                <FormItem label="隐藏切换">
                    <RangePickerPro
                        options={[{ label: '15分钟', value: 'minute', periodValue: 15 }]}
                        disabledSelect
                        onChange={(values) => {
                            if (!values) return
                            console.log('demo-02')
                            if (Array.isArray(values)) {
                                console.log('array')
                                values.forEach((item) => {
                                    console.log(moment(item).format('YYYY-MM-DD HH:mm:ss'))
                                })
                            } else {
                                console.log('object')
                                values.rangeTime.forEach((item) => {
                                    console.log(moment(item).format('YYYY-MM-DD HH:mm:ss'))
                                })
                            }
                        }}
                    />
                </FormItem>
            </Row>

            <Row gutter={[12, 12]}>
                <h3>6. days range</h3>

                <FormItem label="天数范围">
                    <DaysRange
                        marks={[1, 7, 30]}
                        onChange={(data) => {
                            console.log(data)
                        }}
                    />
                </FormItem>
                <FormItem label="单选风格">
                    <DaysRange
                        type="radio"
                        onChange={(data) => {
                            console.log(data)
                        }}
                    />
                </FormItem>
                <FormItem label="formatter">
                    <DaysRange
                        type="radio"
                        onChange={(data) => {
                            console.log(data)
                        }}
                        formatter={(val) => {
                            if (isNumber(val)) {
                                return `近${val}天`
                            }
                            return undefined
                        }}
                    />
                </FormItem>
                <FormItem label="disabled-mount-change">
                    <DaysRange
                        isMountChange={false}
                        marks={[5, 20]}
                        onChange={(data) => {
                            console.log(data)
                        }}
                    />
                </FormItem>

                <FormItem label="fast">
                    <DaysRange.Fast
                        onChange={(data) => {
                            console.log(data)
                        }}
                    />
                </FormItem>

                <FormItem label="天数范围">
                    <DaysRange
                        showCustomize
                        onChange={(data) => {
                            console.log(data)
                        }}
                    />
                </FormItem>

                <FormItem label="单选风格">
                    <DaysRange
                        showCustomize
                        type="radio"
                        onChange={(data) => {
                            console.log(data)
                        }}
                    />
                </FormItem>
            </Row>
        </Form>
    )
}
export default DatePicker
