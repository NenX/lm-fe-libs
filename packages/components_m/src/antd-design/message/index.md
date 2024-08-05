```jsx
import { message, customMessage } from '@/components/antd-design/message';

customMessage({
  type: 'success', // info/success/error
  icon: '图标',
  title: '标题',
  description: '副标题',
  duration: 1000,
  ... // 其他同antd-design message
});

```

`config` 对象属性如下：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 自定义 CSS class | string | - |
| content | 提示内容 | ReactNode | - |
| duration | 自动关闭的延时，单位秒。设为 0 时不自动关闭 | number | 3 |
| icon | 自定义图标 | ReactNode | - |
| key | 当前提示的唯一标志 | string \| number | - |
| style | 自定义内联样式 | [CSSProperties](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/e434515761b36830c3e58a970abf5186f005adac/types/react/index.d.ts#L794) | - |
| onClick | 点击 message 时触发的回调函数 | function | - |
| onClose | 关闭时触发的回调函数 | function | - |
