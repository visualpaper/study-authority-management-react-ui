import { Fragment, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Navbars } from '../../components/Navbars'
import { User } from '../../model/user'
import { UserProvider } from './UserContext'

export const App: React.FC<{ children: any }> = ({ children }) => {
  const [loginUser, setLoginUser] = useState<User | null>(null)

  useEffect(() => {
    setLoginUser({
      id: 'b',
      name: 'aaa',
      authorityLevel: 'USER',
    })
  }, [])

  if (!loginUser) {
    return <Fragment />
  }
  return (
    <UserProvider loginUser={loginUser}>
      <Navbars />
      <Container className="justify-content-center pt-5">
        <div>{children}</div>
      </Container>
    </UserProvider>
  )
}
