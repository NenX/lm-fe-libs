---
nav:
  title: 示例
  path: /example
group:
  title: 框架
  path: /frames
---

# React

## 代码示例

### 基本示例

```tsx
<WatermarkPro text="测试水印" style={{ overflow: 'hidden' }}>
  ...
</WatermarkPro>
```

### 多行水印

```tsx
export default () => {
  const options = {
    text: ['示例水印', '17766666666'],
    width: 120,
    height :64,
    gapX: 150,
    gapY: 150,
  }

  return (
    <Watermark {...options}>
      ...
    </Watermark>
  )
}
```

### 显示隐藏

```tsx
export default () => {
  const [visible, setVisible] = useState<boolean>();

  const handleShow = () => {
    setVisible(true);
  }

  const handleHide = () => {
    setVisible(false);
  }

  return (
    <>
      <Space>
        <Button onClick={handleShow}>显示</Button>
        <Button onClick={handleHide}>隐藏</Button>
      </Space>

      <Watermark visible={visible} text="测试水印">
        <Content />
      </Watermark>
    </>
  )
}
```

### 图片水印

```tsx
export default () => {
  const options = {
    gapX: 200,
    gapY: 200,
    width: 120,
    height: 32,
    opacity: 1,
    image: 'https://gw.alipayobjects.com/zos/bmw-prod/59a18171-ae17-4fc5-93a0-2645f64a3aca.svg',
  }

  return (
    <Watermark {...options}>
      ...
    </Watermark>
  )
}
```

### 整个页面

```tsx
export default () => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleShow = () => {
    setVisible(true);
  }

  const handleHide = () => {
    setVisible(false);
  }

  return (
    <div>
      <Space>
        <Button onClick={handleShow}>显示</Button>
        <Button onClick={handleHide}>隐藏</Button>
      </Space>
      <Watermark isBody visible={visible} text="测试水印" />
    </div>
  );
}
```

### 动态内容

```tsx
export default () => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleShow = () => {
    setVisible(true);
  }

  const handleHide = () => {
    setVisible(false);
  }

  return (
    <>
      <Watermark text="测试水印">
        <>
          <Space>
            <Button onClick={handleShow}>显示</Button>
            <Button onClick={handleHide}>隐藏</Button>
          </Space>
          <Content />
          {visible && <p>动态内容</p>}
        </>
      </Watermark>
    </>
  );
}
```

### 内容可包含水印组件

```tsx
export default () => {
  return (
    <div style={{ position: 'relative' }}>
      <Watermark monitor={false} pack={false} text="测试水印" />
      <Content />
    </div>
  );
}
```

## API

### 基本参数

|参数|说明|类型|默认值|
|---|---|---|---|
|visible|水印是否显示|`boolean`|`true`|
|image|图片源，建议导出 2 倍或 3 倍图，优先使用图片渲染水印|`string`|-|
|text|水印文本, 为数组时表示多行水印|`string` \| `string[]`|-|
|zIndex|水印层级|`number`|`9999`|
|width|单个水印宽度|`number`|`120`|
|height|单个水印高度|`number`|`64`|
|opacity|水印透明度|`number`|`0.15`|
|rotate|旋转的角度|`number`|`-22`|
|fontSize|设置字体大小|`number`|`16`|
|fontWeight|设置字体粗细|`number` \| `string` |`normal`|
|fontStyle|规定字体样式|`string`|`normal`|
|fontVariant|规定字体变体|`string`|`normal`|
|fontColor|设置字体颜色|`string`|`#000`|
|fontFamily|设置水印文字的字体|`string`|`sans-serif`|

### 高级参数

|参数|说明|类型|默认值|
|---|---|---|---|
|monitor|是否开启保护模式|`boolean`|`true`|
|mode|展示模式，interval表示错行展示|`string`|`interval`|
|gapX|水印之间的水平间距|`number`|`100`|
|gapY|水印之间的垂直间距|`number`|`100`|
|offsetLeft|水印在 canvas 画布上绘制的水平偏移量|`number`|`0`|
|offsetTop|水印在 canvas 画布上绘制的垂直偏移量|`number`|`0`|
|width|单个水印宽度|`number`|`120`|
|height|单个水印高度|`number`|`64`|
|pack|是否使用水印组件包裹内容|`boolean`|`true`|
