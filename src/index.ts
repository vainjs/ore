export {
  isPlainObject,
  isObjectLike,
  isPrimitive,
  isFunction,
  isPromise,
  isBoolean,
  isBrowser,
  isRegExp,
  isString,
  isNumber,
  isArray,
  isDate,
  isNaN,
  isNil,
  isInt,
} from './typed'

export { isEqual, isEmpty, has, reduce } from './collection'

export {
  type DebounceOptions,
  type ThrottleOptions,
  debounce,
  throttle,
} from './control'

export {
  capitalize,
  pascalCase,
  snakeCase,
  camelCase,
  kebabCase,
} from './string'

export { sleep, tryit } from './async'

export { compact, filter } from './array'
