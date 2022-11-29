import { toDateString } from '../../common/date'

describe('toDateString', () => {
  test('toDateString - 正常系', () => {
    const actual = new Date(Date.UTC(2020, 9, 14, 16, 28, 5, 114))

    expect(toDateString(actual)).toBe('2020-10-14T16:28:05Z')
  })
})
