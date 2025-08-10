[EN](https://hotonlion.github.io/lightweight-watermark/) | [ZH](https://hotonlion.github.io/lightweight-watermark/README-ZH.html)



<p align="center">
  <a href="https://hotonlion.github.io/lightweight-watermark/">
    <img src="./static/logo.png" alt="lightweight watermark" />
  </a>
</p>


# Lightweight Watermark

一个**零依赖**的 ES6 JavaScript 类库，用于在网页中添加**持久性文字水印**。 

水印使用 `<canvas>` 绘制并作为平铺背景显示，支持在 DOM 被删除时自动恢复。



## ✨ 特点

- **零依赖** — 纯原生 JavaScript 实现
- **持久保护** — 使用 `MutationObserver` 监听并恢复被删除的水印
- **高度可定制** — 可配置文字、字体、大小、粗细、颜色、旋转角度、层级
- **性能友好** — 生成单个小图片平铺显示，而不是重复创建 DOM 元素
- **内置校验** — 输入参数严格校验并提供错误码
- **广泛兼容** — 兼容现代浏览器



## 📦 安装

使用 `npm`：

```bash
npm install lw-watermark
```



## 🚀 使用示例

### 基础示例

```js
import Watermark from 'lw-watermark';

const wm = new Watermark({
  content: '仅供内部使用',
  font: 'Arial',
  fontSize: 24,
  fontWeight: 'bold',
  rotate: 30,
  color: 'rgba(255, 0, 0, 0.15)',
  zIndex: 999999999
});

wm.create()
  .then(() => console.log('水印已添加！'))
  .catch(err => console.error('水印错误：', err));
```

### 参数说明

| 参数         | 类型                 | 默认值                 | 说明                                           |
| ------------ | -------------------- | ---------------------- | ---------------------------------------------- |
| `content`    | `string`             | `"lw-watermark"`       | 水印文字内容                                   |
| `font`       | `string`             | `"serif"`              | CSS 字体名称                                   |
| `fontSize`   | `number` \| `string` | `30`                   | 字体大小（像素）                               |
| `fontWeight` | `string` \| `number` | `"normal"`             | 字体粗细（如：`normal`、`bold`、`300`、`700`） |
| `rotate`     | `number`             | `30`                   | 旋转角度（度数）                               |
| `color`      | `string` (rgba)      | `"rgba(0, 0, 0, 0.6)"` | 水印颜色（必须为 rgba 格式）                   |
| `zIndex`     | `number`             | `999999999`            | CSS z-index                                    |
| `maxLength`  | `number`             | `30`                   | 水印文字最大长度                               |


### 方法

- `create()`: Promise`<void>`

  创建并添加水印。
  返回一个 Promise，当水印成功添加时会 resolve。

- `destroy()`: `void`

  销毁水印并停止 DOM 监听。

### 错误码

类会抛出自定义的 ErrorMessage 对象，包含 code 和 message。

| 错误码    | 描述                       |
| ------ | ------------------------ |
| `1011` | 水印文字超过最大长度               |
| `1021` | `content` 必须是 `string` 类型       |
| `1022` | `fontSize` 必须是 `string`/ `number` 类型   |
| `1023` | `fontWeight` 必须是 `string`/ `number` 类型 |
| `1031` | `fontSize` 格式无效          |
| `1032` | `fontWeight` 格式无效        |
| `1033` | 颜色格式无效（必须为 rgba 格式）      |



## 优势

防篡改：即使有人通过开发者工具删除水印，也会自动恢复

轻量高效：无需外部图片，完全由 `<canvas>` 动态生成

高度可定制：可调整文字、样式、旋转、层级

跨浏览器支持：在 Chrome、Firefox、Edge 等现代浏览器中运行良好

不干扰操作：通过 pointer-events: none 避免阻挡点击和 UI 交互



## 许可证

MIT

> 提示：水印是一种**视觉防护**手段，无法完全阻止截屏或复制，但可以有效起到提醒和防止随意传播的作用。

