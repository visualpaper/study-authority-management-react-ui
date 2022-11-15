import { Fragment, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useMutation } from 'react-query'
import { loginWithCookie } from '../../apis/login'
import { Navbars } from '../../components/Navbars'
import { User } from '../../model/user'
import { UserProvider } from '../UserContext'

export const App: React.FC<{ children: any }> = ({ children }) => {
  const [loginUser, setLoginUser] = useState<User | null>(null)
  const { isLoading, isError, mutate } = useMutation<User | null>(
    loginWithCookie,
    {
      onSuccess: (loginUser: User | null) => {
        setLoginUser(loginUser)
      },
    }
  )

  /**
   * https://reactjs.org/docs/strict-mode.html#ensuring-reusable-state いわく 2 回呼ばれるらしい。
   * 開発時にのみ発生するらしいので要注意
   */
  useEffect(() => {
    mutate()
  }, [])

  if (isLoading) {
    return <Fragment />
  }
  return (
    <UserProvider loginUser={loginUser || null}>
      <Navbars />
      <Container className="justify-content-center pt-5">
        <div>{children}</div>
      </Container>
    </UserProvider>
  )
}
