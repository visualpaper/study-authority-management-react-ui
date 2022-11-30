import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Navbars } from '../../../components/Navbars'
import { UserProvider } from '../../../pages/UserContext'

describe('Navbars', () => {
  test('user が null の場合', () => {
    render(
      <BrowserRouter basename={''}>
        <UserProvider loginUser={null} setLoginUser={() => {}}>
          <Navbars />
        </UserProvider>
      </BrowserRouter>
    )

    // Register が表示されていること
    expect(screen.queryByText('Register')).toBeInTheDocument()

    // Login が表示されていること
    expect(screen.queryByText('Login')).toBeInTheDocument()

    // Setting が表示されていないこと
    expect(screen.queryByText('Setting')).not.toBeInTheDocument()
  })

  test('user が null 以外の場合', () => {
    render(
      <BrowserRouter basename={''}>
        <UserProvider
          loginUser={{ id: '0001', name: 'aaa', authorityLevel: 'USER' }}
          setLoginUser={() => {}}
        >
          <Navbars />
        </UserProvider>
      </BrowserRouter>
    )

    // Register が表示されていないこと
    expect(screen.queryByText('Register')).toBeInTheDocument()

    // Login が表示されていないこと
    expect(screen.queryByText('Login')).not.toBeInTheDocument()

    // name が表示されていること
    expect(screen.queryByText(/aaa さん/)).toBeInTheDocument()

    // Setting が表示されていること
    expect(screen.queryByText('Setting')).toBeInTheDocument()
  })
})
