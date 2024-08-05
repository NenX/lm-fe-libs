---
title: ButtonList 操作项
nav:
  title: 组件
  path: /components
group:
  title: 操作组件
  path: /operation
  order: 99
---

## 代码演示

```jsx
<ButtonList
      size="small"
      list={[
        { text: '新增', type: 'primary', onClick: () => console.log(1) },
        { text: '修改', type: 'default', onClick: () => console.log(2) },
        { text: '删除', type: 'dashed', onClick: () => console.log(3) },
        { text: '全选', type: 'default', onClick: () => console.log(4) }
      ]}
    />
```

## API

### ButtonList

| 参数      | 说明               | 类型                | 是否必须 | 默认值    | 备选值         |
| --------- | ------------------ | ------------------- | -------- | --------- | -------------- |
| className | 额外类名           | string              | 否       | --        | --             |
| style     | 额外样式           | React.CSSProperties | 否       | --        | --             |
| list      | 按钮数据           | array               | 是       | `[]`      | --             |
| size      | 按钮大小           | string              | 否       | `default` | --             |
| maxCount  | 最多显示几个按钮   | number              | 否       | `3`       | --             |
| isLink    | 按钮是否是 link    | boolean             | 否       | `false`   | --             |
| more      | 自定义更新操作节点 | ReactNode           | 否       | --        | --             |
| moreType  | 更多节点类型       | string              | 否       | --        | `text`, `icon` |
| compact   | 紧凑              | boolean             | 否       | false  |  |

**説明**

- `list` 支持 ant-design button 所有属性，加一个`text`用于设置文本
- `size` 整理设置 button 的大小
