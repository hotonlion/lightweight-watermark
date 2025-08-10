import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['*.config.js']),
  {
    files: ['**/*.js'],
    ignores: ['dist/**'],
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:prettier/recommended'
    ],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
  }
])
