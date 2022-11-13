export type AuthorityLevel = 'ADMIN' | 'USER'

export interface User {
  id: string
  name: string
  authorityLevel: AuthorityLevel
}

export const isAdmin = (user: User | null): boolean => {
  if (!user) {
    return false
  }
  return user.authorityLevel == 'ADMIN'
}

export const sameUser = (user: User | null, id: string): boolean => {
  if (!user) {
    return false
  }
  return user.id == id
}
