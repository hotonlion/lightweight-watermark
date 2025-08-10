[EN](https://hotonlion.github.io/lightweight-watermark/) | [ZH](https://hotonlion.github.io/lightweight-watermark/README-ZH.html)



<p align="center">
  <a href="https://hotonlion.github.io/lightweight-watermark/">
    <img src="./static/logo.png" />
  </a>
</p>



# Lightweight Watermark

A lightweight, dependency-free JavaScript ES6 class for adding **persistent text watermarks** to any webpage.  

The watermark is drawn using `<canvas>` and applied as a repeating background, with automatic restoration if removed from the DOM.



## ✨ Features

- **No dependencies** — pure vanilla JavaScript.
- **Persistent protection** — uses `MutationObserver` to detect and restore watermark if removed.
- **Highly customizable** — text, font, size, weight, color, rotation, z-index.
- **Performance-friendly** — generates a single small repeating image instead of heavy DOM elements.
- **Error-safe** — built-in validation with clear error codes.
- **Works everywhere** — compatible with modern browsers.




## 📦 Installation

use npm

```bash
npm install lw-watermark
```



## 🚀Usage

### Basic Example

```js
import Watermark from 'lw-watermark';

const wm = new Watermark({
  content: 'lightweight watermark',
  font: 'Arial',
  fontSize: 24,
  fontWeight: 'bold',
  rotate: 30,
  color: 'rgba(255, 0, 0, 0.15)',
  zIndex: 999999999
});

wm.create()
  .then(() => console.log('Watermark added!'))
  .catch(err => console.error('Watermark error:', err));
```



### Options

| Option       | Type               | Default                | Description                                            |
| ------------ | ------------------ | ---------------------- | ------------------------------------------------------ |
| `content`    | `string`           | `"lw-watermark"`       | Text to display in the watermark                       |
| `font`       | `string`           | `"serif"`              | CSS font family                                        |
| `fontSize`   | `number` \| `string` | `30`                   | Font size in pixels                                    |
| `fontWeight` | `string` \| `number` | `"normal"`             | CSS font-weight (e.g., `normal`, `bold`, `300`, `700`) |
| `rotate`     | `number`           | `30`                   | Rotation angle in degrees                              |
| `color`      | `string` (rgba)    | `"rgba(0, 0, 0, 0.6)"` | Watermark color                                        |
| `zIndex`     | `number`           | `999999999`            | CSS z-index                                            |
| `maxLength`  | `number`           | `30`                   | Max allowed length of content text                     |



### Methods

- `create()`: Promise`<void>`

  Creates and applies the watermark.
  Returns a promise that resolves when the watermark is successfully added.

- `destroy()`: `void`

  Removes the watermark and stops the DOM observer.



### Error Handling

The class throws custom `ErrorMessage` instances with both `code` and `message`.

|  Code  | Message                                                      |
| :----: | :----------------------------------------------------------- |
| `1011` | The maximum length of content is exceeded                    |
| `1021` | The content should be of string type                         |
| `1022` | The font-size should be of string or number type             |
| `1023` | The font-weight should be of string or number type           |
| `1031` | The font-size is invalid                                     |
| `1032` | The font-weight is invalid                                   |
| `1033` | The color is invalid, you should use `rgba(R, G, B, alpha)` format |



## Advantages over other solutions

- DOM tamper-proof: Automatically restores itself if someone tries to delete it via dev tools.

- Lightweight: No large image files — generated entirely from `<canvas>` in memory.

- Customizable: Full control over text, style, rotation, and positioning.

- Cross-browser: Works in Chrome, Firefox, Edge, and most modern browsers without polyfills.

- Non-intrusive: Uses pointer-events: none so it doesn’t block clicks or UI interactions.



## License

MIT

> Tip: This watermark is a visual deterrent. It won't stop determined users from copying text or screenshots, but it's great for discouraging casual sharing and maintaining brand presence.

