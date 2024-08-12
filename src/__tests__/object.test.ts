import { has, get } from '..'

describe('has', () => {
  it('should return true when the key exists in the object', () => {
    const obj = { foo: 'bar', baz: 'qux' }
    expect(has(obj, 'foo')).toBe(true)
    expect(has(obj, 'baz')).toBe(true)
  })

  it('should return false when the key does not exist in the object', () => {
    const obj = { foo: 'bar', baz: 'qux' }
    expect(has(obj, 'foo-bar' as any)).toBe(false)
    expect(has(obj, 'qux' as any)).toBe(false)
  })

  it('should return false when the value is empty', () => {
    expect(has(undefined!, 'foo')).toBe(false)
    expect(has('' as any, 'foo')).toBe(false)
    expect(has(null!, 'foo')).toBe(false)
  })
})

describe('get', () => {
  it('should return the value at the specified path', () => {
    expect(get({ a: [{ b: { c: 'c' } }, 2, 3] }, 'a[0].b.c')).toBe('c')
    expect(get({ a: { b: { c: 'c' } } }, 'a[b][c]')).toBe('c')
    expect(get({ a: { b: { c: 'c' } } }, 'a.b.c')).toBe('c')
    expect(get({ a: { b: { c: 'c' } } }, 'a[b]c')).toBe('c')
    expect(get({ a: [1, 2, 3] }, 'a[1]')).toBe(2)
    expect(get({ a: 'a' }, 'a')).toBe('a')
  })

  it('should return the default value when the object is empty', () => {
    expect(get({}, 'a', 0)).toBe(0)
  })

  it('should return undefined when the path is empty', () => {
    expect(get({ a: 'a' }, '')).toBeUndefined()
  })

  it('should return the default value when the path does not exist', () => {
    expect(get({ a: { b: { c: 'c' } } }, 'b.c.d"', 0)).toBe(0)
    expect(get({ a: { b: { c: 'c' } } }, 'b.c.d', 0)).toBe(0)
    expect(get({ a: 'a' }, 'b', 0)).toBe(0)
    expect(get({ a: 'a' }, 'b')).toBeUndefined()
  })
})
