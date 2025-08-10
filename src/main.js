const WATERMARK_ELEMENT_ID = 'light-weight-watermark'
const bodyElement = document.body
const watermarkElement = document.createElement('div')
watermarkElement.id = WATERMARK_ELEMENT_ID
let observer

const getPrimitiveType = (value) => typeof value
function demo() {}
export default class Watermark {
  constructor(options = {}) {
    this.content = options.content || 'lw-watermark'
    this.font = options.font || 'serif'
    this.fontSize = options.fontSize || 30
    this.fontWeight = options.fontWeight || 'normal'
    this.rotate = options.rotate || 30
    this.color = options.color || 'rgba(0, 0, 0, 0.6)'
    this.zIndex = options.zIndex || 999999999
    this.maxLength = options.maxLength || 30
  }

  get angle() {
    return (this.rotate * Math.PI) / 180
  }

  #calculateSize(ctx) {
    const base = 1.2
    const padding = 32
    ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.font}`
    const { width } = ctx.measureText(this.content)
    const height = this.fontSize * base
    const originWidth = width + padding
    const originHeight = height + padding
    const cos = Math.cos(this.angle)
    const sin = Math.sin(this.angle)
    const rotatedWidth = Math.abs(originWidth * cos) + Math.abs(originHeight * sin)
    const rotatedHeight = Math.abs(originWidth * sin) + Math.abs(originHeight * cos)
    return {
      width: Math.ceil(rotatedWidth),
      height: Math.ceil(rotatedHeight)
    }
  }

  #check() {
    if (getPrimitiveType(this.content) !== 'string') {
      throw new ErrorMessage('1021', 'The content should be of string type.')
    } else {
      if (this.content.length > Number(this.maxLength)) {
        throw new ErrorMessage('1011', `The maximum length of content is ${this.maxLength}.`)
      }
    }
    if (
      getPrimitiveType(this.fontSize) !== 'number' &&
      getPrimitiveType(this.fontSize) !== 'string'
    ) {
      throw new ErrorMessage('1022', 'The fontSize should be of string or number type.')
    } else {
      if (!this.fontSize.toString().match(/^[1-9]\d*$/)) {
        throw new ErrorMessage('1031', 'The fontSize is invalid.')
      }
    }
    if (
      getPrimitiveType(this.fontWeight) !== 'number' &&
      getPrimitiveType(this.fontWeight) !== 'string'
    ) {
      throw new ErrorMessage('1023', 'The fontWeight should be of string or number type.')
    } else {
      const target = ['normal', 'bold', 'lighter', 'bolder']
      if (
        !this.fontWeight.toString().match(/^(1000|[1-9]\d{0,2})$/) &&
        !target.includes(this.fontWeight)
      ) {
        throw new ErrorMessage('1032', 'The fontWeight is invalid.')
      }
    }

    const rgbaReg = /rgba\((?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\s*,\s*){3}(?:0|1|0?\.\d+|1\.0*)\)/

    if (!this.color.match(rgbaReg)) {
      throw new ErrorMessage(
        '1033',
        'The color is invalid, the correct format should be rgba(R, G, B, alpha).'
      )
    }
  }

  #observer() {
    const MutationObserver = window.MutationObserver
    if (!MutationObserver) return
    const config = {
      childList: true,
      subtree: true,
      attributes: true
    }
    observer = new MutationObserver((mutations, _observer) => {
      outer: for (const mutation of mutations) {
        if (mutation.target === watermarkElement) {
          mutation.target.remove()
          _observer.disconnect()
          this.create()
          break
        }
        const { removedNodes } = mutation
        for (const node of removedNodes) {
          if (node.id === WATERMARK_ELEMENT_ID) {
            _observer.disconnect()
            setTimeout((_) => this.create(), 300)
            break outer
          }
        }
      }
    })
    observer.observe(bodyElement, config)
  }

  create() {
    return new Promise((resolve, reject) => {
      try {
        this.#check()
        const sign = -1
        const canvasElement = document.createElement('canvas')
        const ctx = canvasElement.getContext('2d')
        const { width, height } = this.#calculateSize(ctx)
        canvasElement.width = width
        canvasElement.height = height
        ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.font}`
        ctx.fillStyle = 'transparent'
        ctx.strokeStyle = this.color
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.lineWidth = 1
        ctx.translate(width / 2, height / 2)
        ctx.rotate(sign * this.angle)
        ctx.fillText(this.content, 0, 0)
        ctx.strokeText(this.content, 0, 0)
        ctx.setTransform(1, 0, 0, 1, 0, 0)

        const stylesheetRules = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: ${this.zIndex};
        background: url(${canvasElement.toDataURL()}) top left repeat`
        watermarkElement.setAttribute('style', stylesheetRules)
        bodyElement.insertBefore(watermarkElement, bodyElement.firstChild)
        this.#observer()
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  destroy() {
    if (observer) {
      observer.disconnect()
    }
    if (document.getElementById(WATERMARK_ELEMENT_ID)) {
      bodyElement.removeChild(watermarkElement)
    }
  }
}

class ErrorMessage extends Error {
  constructor(code, message) {
    super({ code, message })
    this.code = code
    this.message = message
  }
}
