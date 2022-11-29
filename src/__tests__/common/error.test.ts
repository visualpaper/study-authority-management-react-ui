import { AppError, ifAppErrorWith, isAppError } from '../../common/error'

describe('isAppError', () => {
  class Fixture {
    public error: any
    public errorClass?: any
    public expected: boolean

    constructor(error: any, errorClass: any, expected: boolean) {
      this.error = error
      this.errorClass = errorClass
      this.expected = expected
    }
  }

  test.each([
    new Fixture(new AppError('test'), undefined, true),
    new Fixture(new AppError('test'), AppError, true),
    new Fixture(new Error('test'), undefined, false),
    new Fixture(new Error('test'), Error, true),
  ])('theory', (fx) => {
    expect(isAppError(fx.error, fx.errorClass)).toBe(fx.expected)
  })
})

describe('ifAppErrorWith', () => {
  const doFunc = jest.fn()

  class Fixture {
    public error: any
    public errorClass?: any
    public expected: any

    constructor(error: any, errorClass: any, expected: any) {
      this.error = error
      this.errorClass = errorClass
      this.expected = expected
    }
  }

  beforeEach(() => {
    doFunc.mockReturnValueOnce('expect')
  })

  test.each([
    new Fixture(new AppError('test'), undefined, 'expect'),
    new Fixture(new AppError('test'), AppError, 'expect'),
    new Fixture(new Error('test'), undefined, null),
    new Fixture(new Error('test'), Error, 'expect'),
  ])('theory', (fx) => {
    expect(ifAppErrorWith(fx.error, doFunc, fx.errorClass)).toBe(fx.expected)
  })
})
