---
title: Tags 多标签
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  path: /data-display
---

# Tags 多标签

需要折叠展示的多标签

## 代码演示

### 指定数量

通过指定标签的数量，进行展示


```tsx
  <Tags
      max={4}
      list={[
        { text: 'tag1' },
        { text: 'tag2' },
        { text: 'tag3' },
        { text: 'tag4', color: 'red' },
        { text: 'tag5', color: '#87d068' }
      ]}
    />
```

### 自适应
通过计算容器宽度，自己计算需要展示的标签。可通过改变浏览器大小查看效果

```tsx
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
        { text: 'tag20', color: '#87d068' }
      ]}
    />
```

## API

| 参数      | 说明                         | 类型          | 默认值 | 版本 |
| --------- | ---------------------------- | ------------- | ------ | ---- |
| className | 额外的样式类                 | string        | --     | --   |
| style     | 额外的样式                   | CSSProperties | --     | --   |
| list      | 配置数据                     | array         | []     | --   |
| max       | 显示的最大数目               | number        | 3      | --   |
| flexible  | 是否根据容器宽度动态显示 tag | boolean       | false  | --   |

**配置数据类型**

```ts
{
  text: string;
  icon?: ReactNode;
  color?: string;
}
```
