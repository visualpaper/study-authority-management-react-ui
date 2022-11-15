import { createContext, ReactNode, FC } from 'react'
import { User } from '../model/user'

export const UserContext = createContext<User | null>(null)

interface UserProviderProps {
  loginUser: User | null
  children: ReactNode
}

export const UserProvider: FC<UserProviderProps> = (props) => {
  const { loginUser, children } = props

  return (
    <UserContext.Provider value={loginUser}>{children}</UserContext.Provider>
  )
}
