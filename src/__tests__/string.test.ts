import { capitalize, snakeCase } from '..'

describe('capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('hello world')).toBe('Hello world')
    expect(capitalize('  hello')).toBe('  hello')
    expect(capitalize('123abc')).toBe('123abc')
    expect(capitalize('@hello')).toBe('@hello')
    expect(capitalize('$hello')).toBe('$hello')
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
  it('should convert any string to snake_case', () => {
    expect(snakeCase('HelloWord')).toEqual('hello_word')
    expect(snakeCase('helloWord')).toEqual('hello_word')
    expect(snakeCase('helloWORd')).toEqual('hello_word')
    expect(snakeCase('hello007')).toEqual('hello_007')
    expect(snakeCase('007hello')).toEqual('007_hello')
    expect(snakeCase('007Hello')).toEqual('007_hello')
    expect(snakeCase('007HELlo')).toEqual('007_hello')
    expect(snakeCase('007@Hello')).toEqual('007_hello')
    expect(snakeCase('helloWord007')).toEqual('hello_word_007')
    expect(snakeCase('helloWord007@haha')).toEqual('hello_word_007_haha')
    expect(snakeCase('helloWord007 haha')).toEqual('hello_word_007_haha')
    expect(snakeCase('helloWord007 haha')).toEqual('hello_word_007_haha')
    expect(snakeCase('@helloWord007    haha')).toEqual('hello_word_007_haha')
    expect(snakeCase('_helloWord007    haha')).toEqual('hello_word_007_haha')
    expect(snakeCase('hello_Word007    haha')).toEqual('hello_word_007_haha')
    expect(snakeCase('hello_Word007___haha')).toEqual('hello_word_007_haha')
    expect(snakeCase('@@@hello_Word007  haha@')).toEqual('hello_word_007_haha')
  })

  it('should return an empty string if the input is not a string', () => {
    expect(capitalize(123 as unknown as string)).toBe('')
    expect(capitalize({} as unknown as string)).toBe('')
    expect(capitalize(undefined!)).toBe('')
    expect(capitalize(null!)).toBe('')
  })
})
