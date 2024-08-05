---
title: RangePickerPro 时间范围选择增强版
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
  path: /data-entry
---

# RangePickerPro 时间范围选择增强版

基于 AndDesign RangePicker 组件 提供禁用逻辑

## 代码演示

### 简单示例

```tsx
export default () => {
return (
    <>
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
                moment().subtract(1, 'days').endOf('day')
            ]}
            onChange={(values) => {
            console.log('demo-01');
                if (!Array.isArray(values)) {
                    values.rangeTime.forEach((item) => {
                        console.log(moment(item).format('YYYY-MM-DD HH:mm:ss'));
                    });
                }
            }}
        />
    </>
    );
};
```

### 隐藏切换

```tsx
export default () => {
    return (
        <RangePickerPro
            options={[
                { label: '15分钟', value: 'minute', periodValue: 15 }
            ]}
            disabledSelect
            onChange={(values) => {
                if (!values) return;
                console.log('demo-02');
                if (Array.isArray(values)) {
                    console.log('array');
                    values.forEach((item) => {
                        console.log(moment(item).format('YYYY-MM-DD HH:mm:ss'));
                    });
                } else {
                    console.log('object');
                    values.rangeTime.forEach((item) => {
                        console.log(moment(item).format('YYYY-MM-DD HH:mm:ss'));
                    });
                }
            }}
        />
    );
};
```

## API

文本链接的属性说明如下：

| 参数               | 说明                                                                    | 类型                                           | 默认值   | 版本 |
| ------------------ | ----------------------------------------------------------------------- | ---------------------------------------------- | -------- | ---- |
| disabledSelect | 是否禁用选择                                                  | `boolean`                                   | `false`   | --   |
| disabledAfterToday | 是否禁用今天之后的日期                                                  | `boolean`                                   | `true`   | --   |
| periodChangeClearDate | 粒度改变时是否清空时间                                                  | `boolean`                                        | `true`   | --   |
| dateNotNullChange | 时间框非空才可触发onChange                                                  | `boolean`                                        | `true`   | --   |
| defaultTimes       | 默认的时间，设置则会触发`onChange`                                      | `RangePickerProps['value']`                    | --       | --   |
| options            | 选择项配置   | `{ value: PeriodType, label: string, periodValue?: number }[]`       | --       | --   |
| optionType          | 选项类型  | `default` \| `button`    | `button`       | --   |
| spaceSize            | 粒度筛选项与时间选择器的间隔，单位px  | `number`       | `8`       | --   |
| value              | 值                                                                      | `{ period: PeriodType; rangeTime: number[]; }` | --       | --   |
| onChange           | 值修改的回调                                                            | `(value) => void`                              | --       | --   |

PeriodType:

```ts
type PeriodType = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';
```

**注意:**

- options 属于必填参数
- disabledSelect 会改变value值
  - 设置为false则value类型为: `[number, number]`;
  - 设置为true则value类型为 `{ period: PeriodType; rangeTime: [number, number] }`
