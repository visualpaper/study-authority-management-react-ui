import { createContext, ReactNode, FC } from 'react'
import { User } from '../model/user'

export const UserContext = createContext<{
  user: User | null
  setUser: (user: User) => void
}>({
  user: null,
  setUser: () => {},
})

interface UserProviderProps {
  loginUser: User | null
  setLoginUser: (user: User) => void
  children: ReactNode
}

export const UserProvider: FC<UserProviderProps> = (props) => {
  const { loginUser, setLoginUser, children } = props

  return (
    <UserContext.Provider
      value={{
        user: loginUser,
        setUser: setLoginUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
