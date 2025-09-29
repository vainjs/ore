import config from '@vainjs/eslint-config'

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  { rules: { '@typescript-eslint/no-explicit-any': 'warn' } },
]
