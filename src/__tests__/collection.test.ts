import { reduce, map } from '..'

describe('reduce', () => {
  it('should reduce an array', () => {
    expect(reduce([1, 2, 3, 4], (a, b) => a + b, 0)).toBe(10)
    expect(reduce([1, 2, 3, 4], (a, b) => a + b)).toBe(10)
    expect(reduce([], (a, b) => a + b, {})).toEqual({})
    expect(reduce([], (a, b) => a, [1])).toEqual([1])
    expect(reduce([], (a, b) => a + b, 0)).toBe(0)
  })

  it('should throw an error if initialValue is not provided for an empty array', () => {
    expect(() => reduce([], (a, b: any) => a + b)).toThrow(
      'Reduce of empty array with no initial value'
    )
  })

  it('should reduce an object', () => {
    const object = { a: 1, b: 2, c: 3, d: 4 }
    expect(reduce(object, (a, b) => a + b, 0)).toBe(10)
    expect(reduce(object, (a, b) => a + b)).toBe(10)
    expect(reduce({}, (a) => a, [1])).toEqual([1])
    expect(reduce({}, (a) => a, {})).toEqual({})
    expect(reduce({}, (a) => a, 0)).toBe(0)
  })

  it('should throw an error if initialValue is not provided for an empty object', () => {
    expect(() => reduce({}, (a: any, b) => a + b)).toThrow(
      'Reduce of empty object with no initial value'
    )
  })

  it('should return undefined if initialValue is not provided for a non-object or non-array', () => {
    expect(reduce('reduce' as any, (a: any, b) => a + b)).toBe(undefined)
    expect(reduce(true as any, (a: any, b) => a + b)).toBe(undefined)
    expect(reduce(undefined!, (a: any, b) => a + b)).toBe(undefined)
    expect(reduce(null!, (a: any, b) => a + b)).toBe(undefined)
  })

  it('should return initialValue if initialValue is provided for a non-object or non-array', () => {
    expect(reduce(null!, (a: any, b) => a + b, 'reduce')).toBe('reduce')
    expect(reduce(true as any, (a: any, b) => a + b, {})).toEqual({})
    expect(reduce(undefined!, (a: any, b) => a + b, [])).toEqual([])
    expect(reduce('reduce' as any, (a: any, b) => a + b, 0)).toBe(0)
  })
})

describe('map', () => {
  it('should correctly map an array', () => {
    expect(map([1, 2, 3], (v) => v * 2)).toEqual([2, 4, 6])
    expect(map([{ a: 1 }, { a: 2 }, { a: 3 }], 'a')).toEqual([1, 2, 3])
    // @ts-ignore
    expect(map([{ a: 1 }, 2, 3], 'a')).toEqual([1, null, null])
  })

  it('should correctly map an object', () => {
    expect(map({ a: 1, b: 2, c: 3 }, (v) => v * 2)).toEqual([2, 4, 6])
  })

  it('should return an empty array for invalid input', () => {
    expect(map(null!, null!)).toEqual([])
    // @ts-ignore
    expect(map([1, 2, 3], 'a')).toEqual([null, null, null])
    // @ts-ignore
    expect(map({ a: 1, b: 2, c: 3 }, 'a')).toEqual([null, null, null])
  })
})
