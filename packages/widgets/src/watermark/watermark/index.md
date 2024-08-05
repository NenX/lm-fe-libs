| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| markStyle | 水印层的样式 | React.CSSProperties | - | 2.3.0 |
| markClassName | 水印层的类名 | string | - | 2.3.0 |
| gapX | 水印之间的水平间距 | number | 212 | 2.4.0 |
| gapY | 水印之间的垂直间距 | number | 222 | 2.4.0 |
| offsetLeft | 水印在 canvas 画布上绘制的水平偏移量, 正常情况下，水印绘制在中间位置, 即 `offsetTop = gapX / 2` | number | `offsetTop = gapX / 2` | 2.4.0 |
| offsetTop | 水印在 canvas 画布上绘制的垂直偏移量，正常情况下，水印绘制在中间位置, 即 `offsetTop = gapY / 2` | number | `offsetTop = gapY / 2` | 2.4.0 |

### 水印 API 可视化

```jsx | inline
import react from 'react';

export default () => (
  <div>
    <img
      src="https://gw.alipayobjects.com/zos/alicdn/joeXYy8j3/jieping2021-01-11%252520xiawu4.47.15.png"
      width="100%"
    />
  </div>
);
```
