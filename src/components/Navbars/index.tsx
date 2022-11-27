import React, { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../pages/UserContext'
import styles from './index.module.css'

export const Navbars: React.FC<{}> = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid className={styles.container}>
        <Navbar.Brand
          className={styles.container_title}
          onClick={() => {
            navigate('/')
          }}
        >
          Authrity Management
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate('/users')
              }}
            >
              Users
            </Nav.Link>
          </Nav>
          <Nav>
            {!user && (
              <>
                <Nav.Link
                  onClick={() => {
                    navigate('/users/regist')
                  }}
                >
                  Register
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate('/login')
                  }}
                >
                  Login
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Navbar.Text>{user.name} さん </Navbar.Text>
                <Nav.Link
                  onClick={() => {
                    navigate('/setting')
                  }}
                >
                  Setting
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
