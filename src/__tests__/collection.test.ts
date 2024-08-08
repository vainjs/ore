import { isEqual, isEmpty, reduce } from '..'

describe('isEqual', () => {
  it('should return true for same object', () => {
    const obj = { a: 1, b: 2 }
    expect(isEqual(obj, obj)).toBe(true)
    expect(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true)
    expect(isEqual({ a: 1, b: { c: 3 } }, { b: { c: 3 }, a: 1 })).toBe(true)
  })

  it('should return false for different object', () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false)
  })

  it('should return true for same array', () => {
    const arr = [1, 2, 3]
    expect(isEqual(arr, arr)).toBe(true)
    expect(isEqual([1, 2, { a: 1 }], [1, 2, { a: 1 }])).toBe(true)
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true)
  })

  it('should return false for different array', () => {
    expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false)
    expect(isEqual([1, 2, 3], [1, 3, 2])).toBe(false)
  })

  it('should return true for same Date', () => {
    expect(isEqual(new Date(2021, 0, 1), new Date(2021, 0, 1))).toBe(true)
  })

  it('should return false for different Date', () => {
    expect(isEqual(new Date(2021, 0, 1), new Date(2021, 1, 1))).toBe(false)
  })

  it('should return true for same RegExp', () => {
    expect(isEqual(new RegExp('abc', 'g'), new RegExp('abc', 'g'))).toBe(true)
    expect(isEqual(new RegExp('abc'), new RegExp('abc'))).toBe(true)
    expect(isEqual(/abc/g, /abc/g)).toBe(true)
    expect(isEqual(/abc/, /abc/)).toBe(true)
  })

  it('should return false for different RegExp', () => {
    expect(isEqual(new RegExp('abc', 'g'), new RegExp('abc'))).toBe(false)
    expect(isEqual(new RegExp('abc'), new RegExp('def'))).toBe(false)
    expect(isEqual(/abc/, /abc/g)).toBe(false)
    expect(isEqual(/abc/, /def/)).toBe(false)
  })

  it('should return true for same string', () => {
    expect(isEqual('abc', 'abc')).toBe(true)
    expect(isEqual(String('abc'), String('abc'))).toBe(true)
    expect(isEqual(new String('abc'), new String('abc'))).toBe(true)
  })

  it('should return false for different string', () => {
    expect(isEqual('abc', 'abcd')).toBe(false)
    expect(isEqual(String('abc'), String('abcd'))).toBe(false)
    expect(isEqual(new String('abc'), new String('abcd'))).toBe(false)
  })

  it('should return true for same boolean', () => {
    expect(isEqual(true, true)).toBe(true)
    expect(isEqual(Boolean('abc'), Boolean('abc'))).toBe(true)
    expect(isEqual(Boolean('abc'), true)).toBe(true)
    expect(isEqual(new Boolean('abc'), new Boolean('abc'))).toBe(true)
  })

  it('should return false for different boolean', () => {
    expect(isEqual(true, false)).toBe(false)
    expect(isEqual(Boolean('abc'), false)).toBe(false)
    expect(isEqual(new Boolean('abc'), true)).toBe(false)
  })

  it('should return true for same number', () => {
    expect(isEqual(1, 1)).toBe(true)
    expect(isEqual(NaN, NaN)).toBe(true)
    expect(isEqual(Number(1), Number(1))).toBe(true)
    expect(isEqual(Number(1), Number('1'))).toBe(true)
    expect(isEqual(Number(1), 1)).toBe(true)
    expect(isEqual(new Number(1), new Number(1))).toBe(true)
    expect(isEqual(new Number(1), new Number('1'))).toBe(true)
  })

  it('should return false for different number', () => {
    expect(isEqual(+0, -0)).toBe(false)
    expect(isEqual(1, 2)).toBe(false)
    expect(isEqual(Number(1), Number(2))).toBe(false)
    expect(isEqual(Number(1), Number('2'))).toBe(false)
    expect(isEqual(new Number(1), new Number(2))).toBe(false)
    expect(isEqual(new Number(1), new Number('2'))).toBe(false)
    expect(isEqual(Number(1), new Number(1))).toBe(false)
    expect(isEqual(1, new Number(1))).toBe(false)
  })

  it('should return false for different Symbol', () => {
    expect(isEqual(Symbol('a'), Symbol('a'))).toBe(false)
    expect(isEqual(Symbol('a'), Symbol('b'))).toBe(false)
  })

  it('should return true for same BigInt', async () => {
    expect(isEqual(BigInt(1n), BigInt(1n))).toBe(true)
    expect(isEqual(1n, BigInt(1n))).toBe(true)
    expect(isEqual(1n, 1n)).toBe(true)
  })

  it('should return false for different BigInt', async () => {
    expect(isEqual(2n, BigInt(1n))).toBe(false)
    expect(isEqual(1n, 2n)).toBe(false)
  })

  it('should return true for same nil', async () => {
    expect(isEqual(undefined, undefined)).toBe(true)
    expect(isEqual(null, null)).toBe(true)
  })

  it('should return false for different nil', async () => {
    expect(isEqual(null, undefined)).toBe(false)
  })
})

describe('isEmpty', () => {
  test('should return true for empty primitive value', () => {
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty(false)).toBe(true)
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty(0n)).toBe(true)
    expect(isEmpty(0)).toBe(true)
  })

  test('should return false for non-empty primitive value', () => {
    expect(isEmpty(Symbol('isEmpty'))).toBe(false)
    expect(isEmpty('isEmpty')).toBe(false)
    expect(isEmpty(Symbol())).toBe(false)
    expect(isEmpty(true)).toBe(false)
    expect(isEmpty(12n)).toBe(false)
    expect(isEmpty(12)).toBe(false)
  })

  test('should return true for empty array', () => {
    expect(isEmpty([])).toBe(true)
  })

  test('should return false for non-empty array', () => {
    expect(isEmpty([1, 2, 3])).toBe(false)
  })

  test('should return true for empty object', () => {
    expect(isEmpty({})).toBe(true)
  })

  test('should return false for non-empty object', () => {
    expect(isEmpty({ key: 'value' })).toBe(false)
  })

  test('should return true for empty Map', () => {
    expect(isEmpty(new Map())).toBe(true)
  })

  test('should return false for non-empty Map', () => {
    expect(isEmpty(new Map([['key', 'value']]))).toBe(false)
  })

  test('should return true for empty Set', () => {
    expect(isEmpty(new Set())).toBe(true)
  })

  test('should return false for non-empty Set', () => {
    expect(isEmpty(new Set([1, 2, 3]))).toBe(false)
  })

  test('should return false for function', () => {
    expect(isEmpty(() => {})).toBe(false)
  })

  test('should return false for Date', () => {
    expect(isEmpty(new Date())).toBe(false)
  })
})

describe('reduce', () => {
  it('should reduce an array', () => {
    expect(
      reduce(
        [1, 2, 3, 4],
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    ).toBe(10)
    expect(
      reduce(
        [1, 2, 3, 4],
        (accumulator, currentValue) => accumulator + currentValue
      )
    ).toBe(10)
  })

  it('should throw an error if initialValue is not provided for an empty array', () => {
    expect(() =>
      reduce(
        [],
        (accumulator: any, currentValue: any) => accumulator + currentValue
      )
    ).toThrow('Reduce of empty array with no initial value')
  })

  it('should reduce an object', () => {
    const object = { a: 1, b: 2, c: 3, d: 4 }
    expect(
      reduce(
        object,
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    ).toBe(10)
    expect(
      reduce(object, (accumulator, currentValue) => accumulator + currentValue)
    ).toBe(10)
  })

  it('should throw an error if initialValue is not provided for an empty object', () => {
    expect(() =>
      reduce({}, (accumulator: any, currentValue) => accumulator + currentValue)
    ).toThrow('Reduce of empty object with no initial value')
  })
})
