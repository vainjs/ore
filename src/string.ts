import { isString } from './typed'

export const capitalize = (str: string) => {
  if (!str || !isString(str)) return ''
  return str.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())
}

export const snakeCase = (str: string) => {
  if (!str || !isString(str)) return ''
  return str
    .replace(/[\W_]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .replace(/([a-z])([0-9])/g, '$1 $2')
    .replace(/([0-9])([a-z])/g, '$1 $2')
    .trim()
    .replace(/ /g, '_')
}
