import { isAdmin, sameUser, User } from '../../model/user'

describe('isAdmin', () => {
  class Fixture {
    constructor(public user: User | null, public expected: boolean) {
      this.user = user
      this.expected = expected
    }
  }

  test.each([
    new Fixture(null, false),
    new Fixture({ id: '1', name: 'sample', authorityLevel: 'USER' }, false),
    new Fixture({ id: '1', name: 'sample', authorityLevel: 'ADMIN' }, true),
  ])('theory', (fx) => {
    expect(isAdmin(fx.user)).toBe(fx.expected)
  })
})

describe('sameUser', () => {
  class Fixture {
    constructor(
      public user: User | null,
      public id: string,
      public expected: boolean
    ) {
      this.user = user
      this.id = id
      this.expected = expected
    }
  }

  test.each([
    new Fixture(null, '1', false),
    new Fixture(
      { id: '1', name: 'sample', authorityLevel: 'USER' },
      '2',
      false
    ),
    new Fixture(
      { id: '1', name: 'sample', authorityLevel: 'ADMIN' },
      '1',
      true
    ),
  ])('theory', (fx) => {
    expect(sameUser(fx.user, fx.id)).toBe(fx.expected)
  })
})
