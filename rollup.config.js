import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import path from 'node:path'
import json from '@rollup/plugin-json'
import { babel } from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import del from 'rollup-plugin-delete'
import browserSync from 'rollup-plugin-browsersync'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const require = createRequire(import.meta.url)
const resolve = p => path.resolve(__dirname, p)
const pkg = require(resolve('./package.json'))
const name = pkg.name

const port = 3300
const __DEV__ = process.env.NODE_ENV === 'development'

export default {
  input: 'src/main.js',
  output: {
    file: `./dist/${name}.esm-browser.js`,
    format: 'es'
  },
  watch: {
    include: ['src/**'],
    exclude: 'node_modules/**'
  },
  plugins: [
    json(),
    babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] }),
    terser(),
    del({ targets: 'dist' }),
    __DEV__ && browserSync({
      notify: false,
      server: {
        baseDir: ['dist', 'public', 'static']
      },
      files: ['dist/**', 'public/**'],
      open: true,
      port: 3300,
      callbacks: {
        ready: () => {
          console.log(`the server run in localhost: ${port}`)
        },
        watchFile: () => {
          const date = new Date()
          console.log(`[${date.toLocaleDateString('uk').split('.').reverse().join('-')} ${date.toLocaleTimeString()}] compile success ...`)
        }
      }
    })
  ]
}
