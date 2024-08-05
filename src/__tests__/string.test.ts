import { capitalize, snakeCase, camelCase, pascalCase, kebabCase } from '..'

describe('capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('007hello world')).toBe('007hello world')
    expect(capitalize('@hello world')).toBe('@hello world')
    expect(capitalize(' hello world')).toBe(' hello world')
    expect(capitalize('hello world')).toBe('Hello world')
    expect(capitalize('hello WOrld')).toBe('Hello world')
    expect(capitalize('hello')).toBe('Hello')
    expect(capitalize('')).toBe('')
  })

  it('should return an empty string if the input is not a string', () => {
    expect(capitalize(123 as unknown as string)).toBe('')
    expect(capitalize({} as unknown as string)).toBe('')
    expect(capitalize(undefined!)).toBe('')
    expect(capitalize(null!)).toBe('')
  })
})

describe('snakeCase', () => {
  it('should convert any string to snakeCase', () => {
    expect(snakeCase('@@he@ll@oWord007 haha@')).toEqual('he_ll_o_word_007_haha')
    expect(snakeCase('@@@helloWord007  haha@')).toEqual('hello_word_007_haha')
    expect(snakeCase('@007@@_ helloWord ')).toEqual('007_hello_word')
    expect(snakeCase('007@@_ helloWord')).toEqual('007_hello_word')
    expect(snakeCase('007@helloWord')).toEqual('007_hello_word')
    expect(snakeCase('007helloWord')).toEqual('007_hello_word')
    expect(snakeCase('007HElloWord')).toEqual('007_hello_word')
    expect(snakeCase('helloWord007')).toEqual('hello_word_007')
    expect(snakeCase('helloWord')).toEqual('hello_word')
    expect(snakeCase('HelloWord')).toEqual('hello_word')
    expect(snakeCase('helloWORD')).toEqual('hello_word')
    expect(snakeCase('')).toEqual('')
  })

  it('should return an empty string if the input is not a string', () => {
    expect(snakeCase(123 as unknown as string)).toBe('')
    expect(snakeCase({} as unknown as string)).toBe('')
    expect(snakeCase(undefined!)).toBe('')
    expect(snakeCase(null!)).toBe('')
  })
})

describe('camelCase', () => {
  it('should convert any string to camelCase', () => {
    expect(camelCase('@@he@ll@oWord007 haha@')).toEqual('heLlOWord007Haha')
    expect(camelCase('@@@helloWord007  haha@')).toEqual('helloWord007Haha')
    expect(camelCase('@007@@_ helloWord ')).toEqual('007HelloWord')
    expect(camelCase('007@@_ helloWord')).toEqual('007HelloWord')
    expect(camelCase('007@helloWord')).toEqual('007HelloWord')
    expect(camelCase('007helloWord')).toEqual('007HelloWord')
    expect(camelCase('007HElloWord')).toEqual('007HelloWord')
    expect(camelCase('helloWord007')).toEqual('helloWord007')
    expect(camelCase('helloWord')).toEqual('helloWord')
    expect(camelCase('HelloWord')).toEqual('helloWord')
    expect(camelCase('helloWORD')).toEqual('helloWord')
    expect(camelCase('')).toEqual('')
  })

  it('should return an empty string if the input is not a string', () => {
    expect(camelCase(123 as unknown as string)).toBe('')
    expect(camelCase({} as unknown as string)).toBe('')
    expect(camelCase(undefined!)).toBe('')
    expect(camelCase(null!)).toBe('')
  })
})

describe('pascalCase', () => {
  it('should convert any string to pascalCase', () => {
    expect(pascalCase('@@he@ll@oWord007 haha@')).toEqual('HeLlOWord007Haha')
    expect(pascalCase('@@@helloWord007  haha@')).toEqual('HelloWord007Haha')
    expect(pascalCase('@007@@_ helloWord ')).toEqual('007HelloWord')
    expect(pascalCase('007@@_ helloWord')).toEqual('007HelloWord')
    expect(pascalCase('007@helloWord')).toEqual('007HelloWord')
    expect(pascalCase('007helloWord')).toEqual('007HelloWord')
    expect(pascalCase('007HElloWord')).toEqual('007HelloWord')
    expect(pascalCase('helloWord007')).toEqual('HelloWord007')
    expect(pascalCase('helloWord')).toEqual('HelloWord')
    expect(pascalCase('HelloWord')).toEqual('HelloWord')
    expect(pascalCase('helloWORD')).toEqual('HelloWord')
    expect(pascalCase('')).toEqual('')
  })

  it('should return an empty string if the input is not a string', () => {
    expect(pascalCase(123 as unknown as string)).toBe('')
    expect(pascalCase({} as unknown as string)).toBe('')
    expect(pascalCase(undefined!)).toBe('')
    expect(pascalCase(null!)).toBe('')
  })
})

describe('kebabCase', () => {
  it('should convert any string to kebabCase', () => {
    expect(kebabCase('@@he@ll@oWord007 haha@')).toEqual('he-ll-o-word-007-haha')
    expect(kebabCase('@@@helloWord007  haha@')).toEqual('hello-word-007-haha')
    expect(kebabCase('@007@@_ helloWord ')).toEqual('007-hello-word')
    expect(kebabCase('007@@_ helloWord')).toEqual('007-hello-word')
    expect(kebabCase('007@helloWord')).toEqual('007-hello-word')
    expect(kebabCase('007helloWord')).toEqual('007-hello-word')
    expect(kebabCase('007HElloWord')).toEqual('007-hello-word')
    expect(kebabCase('helloWord007')).toEqual('hello-word-007')
    expect(kebabCase('helloWord')).toEqual('hello-word')
    expect(kebabCase('HelloWord')).toEqual('hello-word')
    expect(kebabCase('helloWORD')).toEqual('hello-word')
    expect(kebabCase('')).toEqual('')
  })

  it('should return an empty string if the input is not a string', () => {
    expect(kebabCase(123 as unknown as string)).toBe('')
    expect(kebabCase({} as unknown as string)).toBe('')
    expect(kebabCase(undefined!)).toBe('')
    expect(kebabCase(null!)).toBe('')
  })
})
