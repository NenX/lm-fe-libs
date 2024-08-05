---
title: Fullscreen 全屏组件


# Fullscreen

## 代码演示

### 基本示例

<code src="./demo/simple.tsx" />

### 控制 Dom

<code src="./demo/control-img.tsx" />

## API

### FullScreen

| 参数    | 说明                    | 类型        | 是否必须 | 默认值  | 备选值 |
| ------- | ----------------------- | ----------- | -------- | ------- | ------ |
| enabled | 全屏开关(受控属性)      | boolean     | 是       | --      | --     |
| isBody  | 是否是整个页面          | boolean     | 否       | `false` | --     |
| target  | 需要控制全屏的 DOM 元素 | HTMLElement | 否       | --      | --     |
| onClose | 全屏关闭回调            | function    | 否       | --      | --     |
